# Overview

The FilmShelf project is an educational application designed to manage a collection of films. This project integrates database design with application development, using enterprise-level technologies to provide a comprehensive solution for film inventory management.

## Key Components

### Database Design and Implementation
#### Schema Design

The database schema is designed to manage films, directors, genres, and user reviews. The main tables include:

 - films: Stores information about films.
 - directors: Stores information about film directors.
 - genres: Stores various film genres.
 - reviews: Stores user reviews for films.

The relationships are as follows:

 - A film can have multiple genres and directors.
 - A review is linked to a specific film.

#### Indexing

B+-tree indexing is implemented on the films table for the title column to optimize search queries for film titles.

```sql
CREATE INDEX idx_film_title ON films(title);
```

#### Queries

Complex SQL queries are developed to retrieve data efficiently:

1. **Join Query**: Retrieve films along with their directors and genres.
```sql
SELECT f.title, d.name AS director, g.name AS genre
FROM films f
JOIN film_directors fd ON f.id = fd.film_id
JOIN directors d ON fd.director_id = d.id
JOIN film_genres fg ON f.id = fg.film_id
JOIN genres g ON fg.genre_id = g.id;
```

2. **Subquery**: Retrieve films with average ratings above 4.
```sql
SELECT f.title
FROM films f
WHERE (SELECT AVG(r.rating) FROM reviews r WHERE r.film_id = f.id) > 4;
```

3. **Aggregate Function**: Count the number of reviews per film.
```sql
SELECT f.title, COUNT(r.id) AS review_count
FROM films f
JOIN reviews r ON f.id = r.film_id
GROUP BY f.title;
```

### Application Development

#### Frontend

The frontend is developed using React.js, providing a user-friendly interface for managing films. Key features include:

 - Film listing and search.
 - Add, update, and delete film records.
 - View and submit reviews

#### Backend

The backend is developed using Node.js with Express.js framework. It handles API requests, manages database connections, and ensures data consistency and security.

#### Key Endpoints

 - GET /movies: Retrieve all films.
 - POST /movies: Add a new film.
 - PUT /movies/:id: Update a film.
 - DELETE /movies/:id: Delete a film.

#### Database Connectivity

The application uses node-postgres (pg) library for database connectivity, ensuring efficient communication between the application and PostgreSQL database.

### Transaction Management

Transactions are implemented to handle concurrent operations, ensuring data integrity. Example using Node.js and PostgreSQL:
```javascript
const { Pool } = require('pg');
const pool = new Pool();

const addReview = async (filmId, review) => {
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const queryText = 'INSERT INTO reviews(film_id, review) VALUES($1, $2)';
    await client.query(queryText, [filmId, review]);
    await client.query('COMMIT');
  } catch (e) {
    await client.query('ROLLBACK');
    throw e;
  } finally {
    client.release();
  }
};
```

## Project Structure

```
filmshelf/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   └── database.js
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── App.js
│   └── index.js
│
├── scripts/
│   └── start-server.sh
│
├── database/
│   ├── schema.sql
│   └── seed.sql
│
└── README.md
```