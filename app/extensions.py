# app/extensions.py
#This file initializes extensions like SQLAlchemy, Flask-Migrate, Flask-JWT-Extended, etc.




# Interactions:
#   These initialized extensions are imported and used in __init__.py to set up the application.
#   They are also used across different parts of the application, 
#       such as in the models (for database operations) and routes (for authentication and real-time features).
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_socketio import SocketIO

# Initializes the SQLAlchemy instance, 
# which is used for database operations throughout the app.
db = SQLAlchemy()


# Initializes the JWT manager, 
# which handles JWT token creation, verification, and management.
jwt = JWTManager()


#Initializes the Socket.IO instance,
#  allowing for real-time bi-directional communication between clients and the server.
socketio = SocketIO(cors_allowed_origins="*") # allows connections from any origin, which is useful during development but should be restricted in production.
