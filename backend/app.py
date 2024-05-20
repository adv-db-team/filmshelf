from flask import Flask, request, jsonify
from flask_cors import CORS
from models import db, Movie, Actor, MovieActor, HorizontalPoster
from database import create_app, init_db
from sqlalchemy.exc import IntegrityError

app = create_app()
CORS(app)  # Enable CORS for all routes

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
    new_movie = Movie(title=title, year=year, rating=rating, director=director)

    try:
        db.session.add(new_movie)
        db.session.commit()
        return jsonify(new_movie.to_dict()), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({'error': 'An error occurred while adding the movie'}), 500

@app.route('/actors', methods=['GET'])
def get_actors():
    actors = Actor.query.all()
    return jsonify([actor.to_dict() for actor in actors])

@app.route('/actor', methods=['POST'])
def add_actor():
    data = request.get_json()
    name = data.get('name')
    new_actor = Actor(name=name)

    try:
        db.session.add(new_actor)
        db.session.commit()
        return jsonify(new_actor.to_dict()), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({'error': 'An error occurred while adding the actor'}), 500

@app.route('/movie/<int:movie_id>', methods=['DELETE'])
def delete_movie(movie_id):
    movie = Movie.query.get(movie_id)
    if movie:
        try:
            db.session.delete(movie)
            db.session.commit()
            return '', 204
        except IntegrityError:
            db.session.rollback()
            return jsonify({'error': 'An error occurred while deleting the movie'}), 500
    return jsonify({'error': 'Movie not found'}), 404

@app.route('/actor/<int:actor_id>', methods=['DELETE'])
def delete_actor(actor_id):
    actor = Actor.query.get(actor_id)
    if actor:
        try:
            db.session.delete(actor)
            db.session.commit()
            return '', 204
        except IntegrityError:
            db.session.rollback()
            return jsonify({'error': 'An error occurred while deleting the actor'}), 500
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

    try:
        db.session.add(new_poster)
        db.session.commit()
        return jsonify(new_poster.to_dict()), 201
    except IntegrityError:
        db.session.rollback()
        return jsonify({'error': 'An error occurred while adding the horizontal poster'}), 500

@app.route('/horizontal_poster/<int:movie_id>', methods=['DELETE'])
def delete_horizontal_poster(movie_id):
    poster = HorizontalPoster.query.get(movie_id)
    if (poster):
        try:
            db.session.delete(poster)
            db.session.commit()
            return '', 204
        except IntegrityError:
            db.session.rollback()
            return jsonify({'error': 'An error occurred while deleting the horizontal poster'}), 500
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

        movies_with_posters.append(movie_dict)

    return jsonify(movies_with_posters)

@app.route('/movies_with_actors', methods=['GET'])
def get_movies_with_actors():
    movies = db.session.query(Movie).all()
    movies_with_actors = []

    for movie in movies:
        actors = db.session.query(Actor).join(MovieActor, Actor.actor_id == MovieActor.actor_id).filter(MovieActor.movie_id == movie.movie_id).all()
        movie_dict = movie.to_dict()
        movie_dict['actors'] = [actor.name for actor in actors]
        movies_with_actors.append(movie_dict)

    return jsonify(movies_with_actors)

if __name__ == '__main__':
    with app.app_context():
        init_db()
    app.run(debug=True)
