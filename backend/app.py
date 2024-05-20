from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, Movie, Actor, MovieActor, HorizontalPoster, Genre, MovieGenre
from database import create_app, init_db

app = create_app()
CORS(app)


@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('query')
    if not query:
        return jsonify({'error': 'No query provided'}), 400

    if query.startswith('actor-name:'):
        search_query = query.replace('actor-name:', '').strip()
        actors = Actor.query.filter(Actor.name.ilike(f'%{search_query}%')).all()
        return jsonify([actor.to_dict() for actor in actors])

    if query.startswith('film-title:'):
            search_query = query.replace('film-title:', '').strip()
            movies = Movie.query.filter(Movie.title.ilike(f'%{search_query}%')).all()
    elif query.startswith('starring:'):
        search_query = query.replace('starring:', '').strip()
        actors = Actor.query.filter(Actor.name.ilike(f'%{search_query}%')).all()
        actor_ids = [actor.actor_id for actor in actors]
        movies = db.session.query(Movie).join(MovieActor).filter(MovieActor.actor_id.in_(actor_ids)).all()
    elif query.startswith('film-genre:'):
        search_query = query.replace('film-genre:', '').strip()
        genres = Genre.query.filter(Genre.title.ilike(f'%{search_query}%')).all()
        genre_ids = [genre.id for genre in genres]
        movies = db.session.query(Movie).join(MovieGenre).filter(MovieGenre.genre_id.in_(genre_ids)).all()
    elif query.startswith('film-director:'):
        search_query = query.replace('film-director:', '').strip()
        movies = Movie.query.filter(Movie.director.ilike(f'%{search_query}%')).all()
    else:
        return jsonify({'error': 'Invalid search type'}), 400

    movies_with_actors = []
    for movie in movies:
        movie_dict = movie.to_dict()
        actors = db.session.query(Actor).join(MovieActor, Actor.actor_id == MovieActor.actor_id).filter(MovieActor.movie_id == movie.movie_id).all()
        movie_dict['actors'] = [actor.name for actor in actors]
        movies_with_actors.append(movie_dict)

    return jsonify(movies_with_actors)

@app.route('/genres', methods=['GET'])
def get_genres():
    genres = Genre.query.all()
    return jsonify([genre.to_dict() for genre in genres])

@app.route('/movies', methods=['GET'])
def get_movies():
    movies = Movie.query.all()
    return jsonify([movie.to_dict() for movie in movies])

@app.route('/movie', methods=['POST'])
def add_movie():
    data = request.get_json()
    title = data.get('title')
    year = data.get('year')
    rating = data.get('rating')
    director = data.get('director')
    image_url = data.get('image_url')
    new_movie = Movie(title=title, year=year, rating=rating, director=director, image_url=image_url)
    db.session.add(new_movie)
    db.session.commit()

    # Add genres
    genres = data.get('genres', [])
    for genre_name in genres:
        genre = Genre.query.filter_by(name=genre_name).first()
        if genre is None:
            genre = Genre(name=genre_name)
            db.session.add(genre)
            db.session.commit()
        movie_genre = MovieGenre(movie_id=new_movie.movie_id, genre_id=genre.id)
        db.session.add(movie_genre)
        db.session.commit()

    return jsonify(new_movie.to_dict()), 201

@app.route('/actors', methods=['GET'])
def get_actors():
    actors = Actor.query.all()
    return jsonify([actor.to_dict() for actor in actors])

@app.route('/actor', methods=['POST'])
def add_actor():
    data = request.get_json()
    name = data.get('name')
    new_actor = Actor(name=name)
    db.session.add(new_actor)
    db.session.commit()
    return jsonify(new_actor.to_dict()), 201

@app.route('/movie/<int:movie_id>', methods=['DELETE'])
def delete_movie(movie_id):
    movie = Movie.query.get(movie_id)
    if movie:
        db.session.delete(movie)
        db.session.commit()
        return '', 204
    return jsonify({'error': 'Movie not found'}), 404

@app.route('/actor/<int:actor_id>', methods=['DELETE'])
def delete_actor(actor_id):
    actor = Actor.query.get(actor_id)
    if actor:
        db.session.delete(actor)
        db.session.commit()
        return '', 204
    return jsonify({'error': 'Actor not found'}), 404

@app.route('/horizontal_posters', methods=['GET'])
def get_horizontal_posters():
    posters = HorizontalPoster.query.all()
    return jsonify([poster.to_dict() for poster in posters])

@app.route('/horizontal_poster', methods=['POST'])
def add_horizontal_poster():
    data = request.get_json()
    movie_id = data.get('movie_id')
    horizontal_poster_url = data.get('horizontal_poster_url')
    new_poster = HorizontalPoster(movie_id=movie_id, horizontal_poster_url=horizontal_poster_url)
    db.session.add(new_poster)
    db.session.commit()
    return jsonify(new_poster.to_dict()), 201

@app.route('/horizontal_poster/<int:movie_id>', methods=['DELETE'])
def delete_horizontal_poster(movie_id):
    poster = HorizontalPoster.query.get(movie_id)
    if poster:
        db.session.delete(poster)
        db.session.commit()
        return '', 204
    return jsonify({'error': 'Poster not found'}), 404

@app.route('/movies_with_horizontal_posters', methods=['GET'])
def get_movies_with_horizontal_posters():
    results = db.session.query(Movie, HorizontalPoster).join(HorizontalPoster, Movie.movie_id == HorizontalPoster.movie_id).all()
    movies_with_posters = []

    for movie, poster in results:
        movie_dict = movie.to_dict()
        movie_dict['horizontal_poster_url'] = poster.horizontal_poster_url

        actors = db.session.query(Actor).join(MovieActor, Actor.actor_id == MovieActor.actor_id).filter(MovieActor.movie_id == movie.movie_id).all()
        movie_dict['actors'] = [actor.name for actor in actors]

        genres = db.session.query(Genre).join(MovieGenre, Genre.id == MovieGenre.genre_id).filter(MovieGenre.movie_id == movie.movie_id).all()
        movie_dict['genres'] = [genre.title for genre in genres]

        movies_with_posters.append(movie_dict)

    return jsonify(movies_with_posters)

@app.route('/movies_with_actors', methods=['GET'])
def get_movies_with_actors():
    # Perform a single query to join movies, movie_actors, and actors tables
    results = db.session.query(Movie, Actor).outerjoin(MovieActor, Movie.movie_id == MovieActor.movie_id).outerjoin(Actor, MovieActor.actor_id == Actor.actor_id).all()

    # Use a dictionary to group actors by movies
    movies = {}
    for movie, actor in results:
        if movie.movie_id not in movies:
            movies[movie.movie_id] = movie.to_dict()
            movies[movie.movie_id]['actors'] = []
        if actor:
            movies[movie.movie_id]['actors'].append(actor.name)

    return jsonify(list(movies.values()))


@app.route('/actor/<int:actor_id>/movies', methods=['GET'])
def get_films_for_actor(actor_id):
    films = db.session.query(Movie.title).join(MovieActor, Movie.movie_id == MovieActor.movie_id).filter(MovieActor.actor_id == actor_id).all()
    film_titles = [film.title for film in films]
    return jsonify(film_titles)

@app.route('/movie/<int:movie_id>/genres', methods=['GET'])
def get_genres_for_movie(movie_id):
    genres = db.session.query(Genre.title).join(MovieGenre, Genre.id == MovieGenre.genre_id).filter(MovieGenre.movie_id == movie_id).all()
    genre_titles = [genre.title for genre in genres]
    return jsonify(genre_titles)

if __name__ == '__main__':
    with app.app_context():
        init_db()
    app.run(debug=True)
