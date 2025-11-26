#Mini Video Streaming Platform

    A lightweight OTT-style Movie watching platform built with Django (REST API), React, PostgreSQL, Nginx, and Docker Compose.
    The application streams videos stored on the server, auto‑plays videos, and provides a smooth browsing experience using a modern UI.

#Features

    Video listing by categories

    Auto-play first video in page reload

    Click any video to open in a popup player with controls

    Next video navigation

    Django REST API backend

    Token-based authentication

    Fully containerized using Docker + Docker Compose

    Nginx reverse proxy serving static/media + load-balanced video streaming

#Technologies Used
    Backend

        Django

        Django REST Framework

        MySQL

        JWT Token Authentication

        Nginx 

    Frontend

        React + Vite

        Material UI

        ReactPlayer

        Axios

    Deployment

        Docker

        Docker Compose

        Nginx reverse proxy


#Architecture

    ├── backend (Django + DRF)
    │   ├── API endpoints
    │   ├── MySQL ORM models
    │   ├── media/video_files
    │   ├── media/thumbnails
    │   └── authentication
    │
    ├── frontend (React)
    │   ├── React Player-based viewer
    │   ├── Auto-play logic
    │   └── Modal video player
    │
    ├── nginx
    │   ├── nginx.conf  (serves React build + proxies API + streams video)
    │
    ├── docker-compose.yml
    │   ├── backend service
    │   ├── frontend service
    │   ├── database service
    │   └── nginx reverse proxy

#Container Communication
    Component	     Communicates With	 Purpose
    React Frontend	 Nginx	             Serves build + forwards API/video requests
    Nginx	         Django Backend	     Proxies /api/ and streams /media/
    Django Backend	 MySQL	             DB for metadata + authentication


    All containers run via a single command:

    docker compose up --build


#Assumptions

    Videos are stored in /media/videos/ and served via Nginx for performance.

    Authentication is simplified for testing (token-based with test credentials displayed in UI).

    Only admins can upload videos (out of scope for this version).

    Categories are predefined or added via Django admin.

    The frontend auto-plays only the first video on page reload as per requirements.

#API documentation

    POST /api/token/

    Request

    {
    "username": "admin",
    "password": "admin123"
    }

    Response

    {
    "token": "abcd1234..."
    }

    GET /api/categories/

    Returns list of categories.

    Response

    [
    {
        "id": 1,
        "name": "Travel"
    }
    ]

    GET /api/videos/<category_id>/

    Returns videos under a category.

    Response

    [
    {
        "id": 5,
        "title": "Beach Sunset",
        "thumbnail": "/media/thumbnails/beach.jpg",
        "video_file": "/media/videos/beach.mp4",
        "duration": "1h 0m",
        "description":"Video of a beach sunset"
    }
    ]

#Future Improvements

    Like / Watchlist feature for videos

    Admin upload UI

    Live streaming

    Filter based on category

    skelton loaders

    User roles & permission-based controls

    Watch History

    Download options

    Notifications when new video uploaded

#Installation

    1. Clone repo

    git clone <repo-url>
    cd filmy

    2. Start services

    docker compose up --build

    3.Do initial setup

    rename sample.env to .env

    docker exec -it filmy_backend bash

        python manage.py migrate
        python manage.py createsuperuser
        python manage.py initial_database

    3. Access:

        Frontend → http://localhost:4173

        Backend API → http://localhost/api/

        Admin Panel → http://localhost:8000/admin/
    

