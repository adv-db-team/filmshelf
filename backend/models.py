from database import db

class Movie(db.Model):
    __tablename__ = 'movies'
    movie_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(256))
    year = db.Column(db.Integer)
    rating = db.Column(db.Numeric(3, 2))
    director = db.Column(db.String(256))
    image_url = db.Column(db.String(512))
#     description = db.Column(db.String(256))
    __table_args__ = (db.UniqueConstraint('title', 'year', 'director', name='_title_year_director_uc'),)

    def to_dict(self):
        return {
            'movie_id': self.movie_id,
            'title': self.title,
            'year': self.year,
            'rating': str(self.rating),
            'director': self.director,
            'image_url': self.image_url
        }

class Actor(db.Model):
    __tablename__ = 'actors'
    actor_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(256), unique=True)
    image_url = db.Column(db.String(512))
    __table_args__ = (db.UniqueConstraint('name',  name='_name_uc'),)

    def to_dict(self):
        return {
            'actor_id': self.actor_id,
            'name': self.name,
            'image_url': self.image_url
        }

class MovieActor(db.Model):
    __tablename__ = 'movies_actors'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    actor_id = db.Column(db.Integer, db.ForeignKey('actors.actor_id'))
    movie_id = db.Column(db.Integer, db.ForeignKey('movies.movie_id'))
    __table_args__ = (db.UniqueConstraint('actor_id', 'movie_id', name='_actor_movie_uc'),)

    def to_dict(self):
        return {
            'id': self.id,
            'actor_id': self.actor_id,
            'movie_id': self.movie_id
        }

class HorizontalPoster(db.Model):
    __tablename__ = 'horizontal_posters'
    movie_id = db.Column(db.Integer, primary_key=True)
    horizontal_poster_url = db.Column(db.String, nullable=False)

    def to_dict(self):
        return {
            'movie_id': self.movie_id,
            'horizontal_poster_url': self.horizontal_poster_url
        }

class Genre(db.Model):
    __tablename__ = 'genres'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(256))

    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title
        }

class MovieGenre(db.Model):
    __tablename__ = 'movies_genres'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    movie_id = db.Column(db.Integer, db.ForeignKey('movies.movie_id'))
    genre_id = db.Column(db.Integer, db.ForeignKey('genres.id'))
    __table_args__ = (db.UniqueConstraint('movie_id', 'genre_id', name='_movie_genre_uc'),)

    def to_dict(self):
        return {
            'id': self.id,
            'movie_id': self.movie_id,
            'genre_id': self.genre_id
        }
