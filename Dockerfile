FROM python:3.9-slim as backend

WORKDIR /app

COPY backend/requirements.txt .
RUN pip install -r requirements.txt

COPY backend /app

FROM node:14 as frontend

WORKDIR /app

COPY frontend/package.json frontend/package-lock.json ./
RUN npm install

COPY frontend /app

RUN npm run build

FROM python:3.9-slim

COPY --from=backend /app /backend

COPY --from=frontend /app/build /frontend/build

RUN pip install -r /backend/requirements.txt
RUN apt-get update && apt-get install -y nodejs npm sqlite3 && npm install -g serve

WORKDIR /backend

EXPOSE 5000 3000

COPY start.sh /start.sh
RUN chmod +x /start.sh

CMD ["/start.sh"]
