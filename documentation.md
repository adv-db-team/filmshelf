# Overview

The FilmShelf project is an educational application designed to manage a collection of films. This project integrates database design with application development, using enterprise-level technologies to provide a comprehensive solution for film inventory management.

Source code for the project is available on GitHub: [FilmShelf](https://github.com/adv-db-team/filmshelf)

Link to the website: <insert_link>

Local deployment manual is available in the [README.md](README.md) file.

## Key Components

### Database Design and Implementation
#### Schema Design

The database schema is designed to manage movies, actors, genres and posters. The main tables include:

 - movies: Stores information about films.
 - actors: Stores information about actors in film.
 - genres: Stores various film genres.
 - horizontal_posters: Stores posters for films.

The relationships are as follows:

 - A film can have multiple genres and many actors in it.
 - You can see a list of films in which an actor has played.

#### Indexing

B+-tree indexing is implemented on the films table for the title column to optimize search queries of any kind.

```sql
from models import Movie, Actor, MovieActor
    db.create_all()
    # Create indices
    db.engine.execute('CREATE INDEX IF NOT EXISTS idx_title_year ON movies (title, year)')
    db.engine.execute('CREATE INDEX IF NOT EXISTS idx_actor_name ON actors (name)')
    db.engine.execute('CREATE INDEX IF NOT EXISTS idx_movie_actor ON movies_actors (actor_id, movie_id)')
```

#### Queries

Complex SQL queries are developed to retrieve data efficiently:

1. **Join Query**: Retrieve movies along with their actors and genres. This query is used in the `get_movies_with_actors` and `get_movies_with_horizontal_posters` endpoints in the [`app.py`](backend/app.py) file.
```python3
results = session.query(Movie, Actor).outerjoin(MovieActor, Movie.movie_id == MovieActor.movie_id).outerjoin(
    Actor, MovieActor.actor_id == Actor.actor_id).all()
```

2. **Subquery**: Retrieve films for a specific actor. This query is used in the get_films_for_actor endpoint in the app.py file.
```python3
films = session.query(Movie.title).join(MovieActor, Movie.movie_id == MovieActor.movie_id).filter(
    MovieActor.actor_id == actor_id).all()
```

3. **Aggregate Function**: Retrieve genres for a specific movie. This query is used in the get_genres_for_movie endpoint in the app.py file.
```python3
genres = session.query(Genre.title).join(MovieGenre, Genre.id == MovieGenre.genre_id).filter(
    MovieGenre.movie_id == movie_id).all()
```

### Application Development

#### Frontend

The frontend is developed using React.js, providing a user-friendly interface for managing films. Key features include:

 - Film listing and search: find films by title, genre, director and actors.
 - Actors listing and search: find actors by name.
 - Add and delete film records.
 - Add and delete actor records.
 - View film details and starring actors.

#### Backend

The backend is developed using Flask. It handles API requests, manages database connections, and ensures data consistency and security.

#### Examples of queries to DB with RestAPI:

 - GET /movie: Retrieve all films.
 - GET /movie/<int:movie_id>: Retrieve a film by ID.
 - POST /movie: Add a new film.
 - DELETE /movie/<int:movie_id>: Delete a film.

#### Database Connectivity

The application uses sqlite3 library for database connectivity, ensuring efficient communication between the application and SQLite database.

```python3
conn = sqlite3.connect('movies.db')
cursor = conn.cursor()
```

### Transaction Management

Transactions are implemented to handle concurrent operations, ensuring data integrity.

We use a common pattern where session is opened at the start of a request and closed at the end. If any exceptions occur during the request, the session is rolled back, undoing any changes made during that session.

Implementation using Python and SQLite:
```python3
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
```

## Project Structure

```
filmshelf/
│
├── backend/
│   ├── instance/
│   ├── app.py
│   ├── insert_posters.py
│   ├── models.py
│   ├── movies.db
│   └── database.py
│
├── frontend/
│   ├── src/
│   └── public/
│
├── README.md
└── documentation.md
```

Team Members:
 - Nadezhda Melnikova - Project Lead, Website Design & Development, Backend Development & testing
 - Dmitrii Kotov – Website deployment & adoption, documentation, presentation
 - Roman Kovalev - Database design, SQL queries, database testing
 - Savelii Chugreev - Data collection, database population, testing