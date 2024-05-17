#!/bin/bash

npm start & npm_pid=$!

cd db || exit 1
json-server --watch db.json --port 3001

kill $npm_pid