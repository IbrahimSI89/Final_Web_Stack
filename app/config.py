#This file contains configuration settings for your Flask app,
#  like database URI, secret keys, etc.

from dotenv import load_dotenv
import os
from datetime import timedelta
load_dotenv()

class Config:
    
    #Used for session management and securing cookies.
    SECRET_KEY = os.getenv("SECRET_KEY", "default_secret_key")

    #The URI for the database connection. Defaults to a local SQLite database if not specified.
    SQLALCHEMY_DATABASE_URI = os.getenv("DATABASE_URI", "sqlite:///chat_app.db")

    #Secret key for encoding and decoding JWT tokens.
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY", "default_jwt_secret_key")

    # Disables a feature of SQLAlchemy that tracks modifications, which can save memory.
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Configure JWT to use cookies
    JWT_TOKEN_LOCATION = ["cookies"]  # JWTs will be read from cookies
    # JWT_SESSION_COOKIE = False
    # JWT_COOKIE_SECURE = True  # Only send cookies over HTTPS
    JWT_ACCESS_COOKIE_NAME = "access_token"  # Cookie name for the JWT access token

    #Enables CSRF protection for JWT cookies.
    JWT_COOKIE_CSRF_PROTECT = True

    #Sets the expiration time for the JWT token (15 days).
    JWT_ACCESS_TOKEN_EXPIRES = timedelta(days=15)
    JWT_COOKIE_MAX_AGE = timedelta(days=15)  # Set the cookie to expire after 15 days

    #Controls cross-site cookie behavior.
    JWT_COOKIE_SAMESITE = "Lax"  # Controls cross-site cookie behavior
