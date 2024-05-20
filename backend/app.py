from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, Movie, Actor, MovieActor, HorizontalPoster, Genre, MovieGenre
from database import create_app, init_db
from contextlib import contextmanager

app = create_app()
CORS(app)


@contextmanager
def session_scope():
    session = db.session()
    try:
        yield session
        session.commit()
    except Exception as e:
        session.rollback()
        raise e
    finally:
        session.close()


@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('query')
    if not query:
        return jsonify({'error': 'No query provided'}), 400

    with session_scope() as session:
        if query.startswith('actor-name:'):
            search_query = query.replace('actor-name:', '').strip()
            actors = session.query(Actor).filter(Actor.name.ilike(f'%{search_query}%')).all()
            return jsonify([actor.to_dict() for actor in actors])

        if query.startswith('film-title:'):
            search_query = query.replace('film-title:', '').strip()
            movies = session.query(Movie).filter(Movie.title.ilike(f'%{search_query}%')).all()
        elif query.startswith('starring:'):
            search_query = query.replace('starring:', '').strip()
            actors = session.query(Actor).filter(Actor.name.ilike(f'%{search_query}%')).all()
            actor_ids = [actor.id for actor in actors]
            movies = session.query(Movie).join(MovieActor).filter(MovieActor.actor_id.in_(actor_ids)).all()
        elif query.startswith('film-genre:'):
            search_query = query.replace('film-genre:', '').strip()
            genres = session.query(Genre).filter(Genre.title.ilike(f'%{search_query}%')).all()
            genre_ids = [genre.id for genre in genres]
            movies = session.query(Movie).join(MovieGenre).filter(MovieGenre.genre_id.in_(genre_ids)).all()
        elif query.startswith('film-director:'):
            search_query = query.replace('film-director:', '').strip()
            movies = session.query(Movie).filter(Movie.director.ilike(f'%{search_query}%')).all()
        else:
            return jsonify({'error': 'Invalid search type'}), 400

        movies_with_actors = []
        for movie in movies:
            movie_dict = movie.to_dict()
            actors = session.query(Actor).join(MovieActor, Actor.id == MovieActor.actor_id).filter(
                MovieActor.movie_id == movie.id).all()
            movie_dict['actors'] = [actor.name for actor in actors]
            movies_with_actors.append(movie_dict)

        return jsonify(movies_with_actors)


@app.route('/genres', methods=['GET'])
def get_genres():
    with session_scope() as session:
        genres = session.query(Genre).all()
        return jsonify([genre.to_dict() for genre in genres])


@app.route('/movies', methods=['GET'])
def get_movies():
    with session_scope() as session:
        movies = session.query(Movie).all()
        return jsonify([movie.to_dict() for movie in movies])


@app.route('/movie', methods=['POST'])
def add_movie():
    data = request.get_json()
    title = data.get('title')
    year = data.get('year')
    rating = data.get('rating')
    director = data.get('director')
    image_url = data.get('image_url')
    description = data.get('description')

    with session_scope() as session:
        new_movie = Movie(title=title, year=year, rating=rating, director=director, image_url=image_url, description=description)
        session.add(new_movie)
        session.commit()

        genres = data.get('genres', [])
        for genre_name in genres:
            genre = session.query(Genre).filter_by(name=genre_name).first()
            if genre is None:
                genre = Genre(name=genre_name)
                session.add(genre)
                session.commit()
            movie_genre = MovieGenre(movie_id=new_movie.id, genre_id=genre.id)
            session.add(movie_genre)
            session.commit()

        return jsonify(new_movie.to_dict()), 201


@app.route('/actors', methods=['GET'])
def get_actors():
    with session_scope() as session:
        actors = session.query(Actor).all()
        return jsonify([actor.to_dict() for actor in actors])


@app.route('/actor', methods=['POST'])
def add_actor():
    data = request.get_json()
    name = data.get('name')

    with session_scope() as session:
        new_actor = Actor(name=name)
        session.add(new_actor)
        session.commit()
        return jsonify(new_actor.to_dict()), 201


@app.route('/movie/<int:movie_id>', methods=['DELETE'])
def delete_movie(movie_id):
    with session_scope() as session:
        movie = session.query(Movie).get(movie_id)
        if movie:
            session.delete(movie)
            session.commit()
            return '', 204
        return jsonify({'error': 'Movie not found'}), 404


@app.route('/actor/<int:actor_id>', methods=['DELETE'])
def delete_actor(actor_id):
    with session_scope() as session:
        actor = session.query(Actor).get(actor_id)
        if actor:
            session.delete(actor)
            session.commit()
            return '', 204
        return jsonify({'error': 'Actor not found'}), 404


@app.route('/horizontal_posters', methods=['GET'])
def get_horizontal_posters():
    with session_scope() as session:
        posters = session.query(HorizontalPoster).all()
        return jsonify([poster.to_dict() for poster in posters])


@app.route('/horizontal_poster', methods=['POST'])
def add_horizontal_poster():
    data = request.get_json()
    id = data.get('id')
    horizontal_poster_url = data.get('horizontal_poster_url')

    with session_scope() as session:
        new_poster = HorizontalPoster(movie_id=movie_id, horizontal_poster_url=horizontal_poster_url)
        session.add(new_poster)
        session.commit()
        return jsonify(new_poster.to_dict()), 201


@app.route('/horizontal_poster/<int:movie_id>', methods=['DELETE'])
def delete_horizontal_poster(movie_id):
    with session_scope() as session:
        poster = session.query(HorizontalPoster).get(movie_id)
        if poster:
            session.delete(poster)
            session.commit()
            return '', 204
        return jsonify({'error': 'Poster not found'}), 404


@app.route('/movies_with_horizontal_posters', methods=['GET'])
def get_movies_with_horizontal_posters():
    with session_scope() as session:
        results = session.query(Movie, HorizontalPoster).join(HorizontalPoster,
                                                              Movie.id == HorizontalPoster.movie_id).all()
        movies_with_posters = []

        for movie, poster in results:
            movie_dict = movie.to_dict()
            movie_dict['horizontal_poster_url'] = poster.horizontal_poster_url

            actors = session.query(Actor).join(MovieActor, Actor.id == MovieActor.actor_id).filter(
                MovieActor.movie_id == movie.id).all()
            movie_dict['actors'] = [actor.name for actor in actors]

            genres = session.query(Genre).join(MovieGenre, Genre.id == MovieGenre.genre_id).filter(
                MovieGenre.movie_id == movie.id).all()
            movie_dict['genres'] = [genre.title for genre in genres]

            movies_with_posters.append(movie_dict)

        return jsonify(movies_with_posters)


@app.route('/movies_with_actors', methods=['GET'])
def get_movies_with_actors():
    with session_scope() as session:
        results = session.query(Movie, Actor).outerjoin(MovieActor, Movie.id == MovieActor.movie_id).outerjoin(
            Actor, MovieActor.actor_id == Actor.id).all()

        movies = {}
        for movie, actor in results:
            if movie.id not in movies:
                movies[movie.id] = movie.to_dict()
                movies[movie.id]['actors'] = []
            if actor:
                movies[movie.id]['actors'].append(actor.name)

        return jsonify(list(movies.values()))


@app.route('/actor/<int:actor_id>/movies', methods=['GET'])
def get_films_for_actor(actor_id):
    with session_scope() as session:
        films = session.query(Movie.title).join(MovieActor, Movie.id == MovieActor.movie_id).filter(
            MovieActor.actor_id == actor_id).all()
        film_titles = [film.title for film in films]
        return jsonify(film_titles)


@app.route('/movie/<int:movie_id>/genres', methods=['GET'])
def get_genres_for_movie(movie_id):
    with session_scope() as session:
        genres = session.query(Genre.title).join(MovieGenre, Genre.id == MovieGenre.genre_id).filter(
            MovieGenre.movie_id == movie_id).all()
        genre_titles = [genre.title for genre in genres]
        return jsonify(genre_titles)


if __name__ == '__main__':
    with app.app_context():
        init_db()
    app.run(host='0.0.0.0', port=5000, debug=True)
