FROM python:3.9-slim

RUN apt-get update && apt-get install -y nodejs npm sqlite3

WORKDIR /app

# Create the backend directory before copying the contents
RUN mkdir -p /app/backend
COPY backend /app/backend

# Create the frontend directory before copying the contents
RUN mkdir -p /app/frontend
COPY frontend /app/frontend

WORKDIR /app/backend
# Create the virtual environment
RUN python -m venv venv
# Activate the virtual environment and install the dependencies
RUN /bin/bash -c "source venv/bin/activate && pip install -r requirements.txt"

WORKDIR /app/frontend
RUN npm install

EXPOSE 5000
EXPOSE 3000

COPY start.sh /start.sh
RUN chmod +x /start.sh

CMD ["/start.sh"]
