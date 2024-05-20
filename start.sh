#!/bin/bash

# Start the Flask backend using waitress
cd /app/backend

source venv/bin/activate
export FLASK_APP=app.py
flask run --host=0.0.0.0 --port=5000 & flask_pid=$!

# Start the frontend
cd /app/frontend
npm start & npm_pid=$!

wait $npm_pid
kill $flask_pid
