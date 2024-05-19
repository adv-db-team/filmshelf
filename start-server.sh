#!/bin/bash

cd backend || exit 1
./set-up-env.sh
source venv/bin/activate
export FLASK_APP=app.py
flask run & flask_pid=$!
cd ..



#cd db && json-server --watch db.json --port 3001 && cd ..

cd frontend && npm start
cd ..

kill $flask_pid
lsof -i :5000 | grep Python | awk '{print $2}' | xargs kill -9

echo "Server stopped"