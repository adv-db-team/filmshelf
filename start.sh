#!/bin/sh

# Start the Flask backend using waitress
cd /backend
/bin/sh
waitress-serve --host=0.0.0.0 --port=5000 app:app &

# Start the React frontend using serve
cd /frontend/build
serve -s . -l 3000 --no-clipboard
