from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import os

db = SQLAlchemy()


def create_app():
    app = Flask(__name__)
    base_dir = os.path.abspath(os.path.dirname(__file__))
    database_path = os.path.join(base_dir, 'movies.db')
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{database_path}'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)
    return app


def init_db():
    from models import Movie, Actor, MovieActor
    db.create_all()
    # Create indices
    db.engine.execute('CREATE INDEX IF NOT EXISTS idx_title_year ON movies (title, year)')
    db.engine.execute('CREATE INDEX IF NOT EXISTS idx_actor_name ON actors (name)')
    db.engine.execute('CREATE INDEX IF NOT EXISTS idx_actor_id ON movies_actors (actor_id)')
    db.engine.execute('CREATE INDEX IF NOT EXISTS idx_movie_a_id ON movies_actors (movie_id)')
    db.engine.execute('CREATE INDEX IF NOT EXISTS idx_genre ON genres (title)')
    db.engine.execute('CREATE INDEX IF NOT EXISTS idx_movie_g_id ON movies_genres (movie_id)')
    db.engine.execute('CREATE INDEX IF NOT EXISTS idx_genre_id ON movies_actors (genre_id)')
