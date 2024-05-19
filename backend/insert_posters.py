import sqlite3

# Connect to the SQLite database
conn = sqlite3.connect('movies.db')
cursor = conn.cursor()

# Create the horizontal_posters table
cursor.execute('''
CREATE TABLE IF NOT EXISTS horizontal_posters (
    movie_id INTEGER PRIMARY KEY,
    horizontal_poster_url TEXT
)
''')

# Insert the provided values
posters = [
    (1, 'https://images.squarespace-cdn.com/content/v1/614b7b9bb907e533422f0fa4/1632345033301-EM01O46HVLUJ67DAOQSL/image-asset.jpeg'),
    (2, 'https://images.bauerhosting.com/legacy/media/61f8/23fa/accb/d9a5/e3e0/9168/gf-michael.jpg?ar=16%3A9&fit=crop&crop=top&auto=format&w=1440&q=80'),
    (3, 'https://m.media-amazon.com/images/M/MV5BMTM1Njc5NTE0M15BMl5BanBnXkFtZTcwMDgzMTk2Mw@@._V1_.jpg'),
    (6, 'https://assetsio.reedpopcdn.com/fellowship.jpg?width=1200&height=1200&fit=bounds&quality=70&format=jpg&auto=webp'),
    (7, 'https://cdn.europosters.eu/image/hp/47521.jpg'),
    (9, 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgpkA2Hx9CWWMn4a7PUOca6HIPAJUH4LsTFHBHe9GI9oJf_ZPd-aF8HcfuJbQxVesQHSQIqlsbyoICaAbo9V6rW77epy7yvS_uBDuw-DTlYHdTxiI-iV_zr7-TXVnYR7wGpeA_4rHEd5eU/w1200-h630-p-k-no-nu/Inception-Poster-horizontal.jpg'),
    (10, 'https://static1.srcdn.com/wordpress/wp-content/uploads/2020/02/Fight-Club-1.jpg')
]

cursor.executemany('INSERT INTO horizontal_posters (movie_id, horizontal_poster_url) VALUES (?, ?)', posters)

# Commit the changes and close the connection
conn.commit()
conn.close()
