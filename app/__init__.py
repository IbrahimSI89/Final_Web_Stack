# app/__init__.py
#This file is the application factory, which initializes the Flask app,
#  configures extensions, and registers blueprints for routes.

# This file serves as the application factory for your Flask app.
#  It creates and configures the Flask application instance, initializes extensions,
#  and registers blueprints for the routes.






# Interactions:
#       This file interacts with every other major component of the application, 
#           including configurations, extensions, models, and routes.
#       It's the central piece that ties everything together 
#           and sets up the environment for the Flask app to run.





##The main Flask class to create the application instance.
from flask import Flask 
##These are initialized extensions imported from extensions.py.
from .extensions import db, jwt, socketio 
## The configuration class imported from config.py.
from .config import Config  
##Flask extension for handling Cross-Origin Resource Sharing (CORS),
#  allowing the frontend to communicate with the backend.
from flask_cors import CORS 

# Ensure blueprints are imported correctly
#auth_blueprint, chat_blueprint, group_blueprint, user_blueprint:
#   Blueprints for different route modules imported from their respective files in the routes folder.
from .routes.auth import auth_blueprint
from .routes.chat import chat_blueprint
from .routes.group import group_blueprint
from .routes.user import user_blueprint


#This function is responsible for creating the Flask application instance.
def create_app():
    app = Flask(__name__)
    CORS(
        app,
        origins=["http://localhost:5173"],
        methods=["GET", "POST", "OPTIONS", "PUT", "DELETE"],
        # access cookies from the frontend
        allow_headers=["Content-Type", "Authorization", "Cookie"],
        supports_credentials=True,
    )
    app.config.from_object(Config)

    # Initialize extensions

    #Initializes the SQLAlchemy database connection with the Flask app.
    db.init_app(app)


    # Creates all the database tables based on the models defined,
    #  ensuring the database schema is set up.
    with app.app_context():
        db.create_all()


    #Initializes JWT for handling authentication tokens.
    jwt.init_app(app)

    #Initializes Socket.IO for real-time communication.
    socketio.init_app(app)

    # Register blueprints:
    #       Registers the blueprints (i.e., auth, chat, group, and user) with specific URL prefixes.
    #       This organizes your routes by functionality,
    #       making the codebase more modular and maintainable.
    app.register_blueprint(auth_blueprint, url_prefix="/auth")
    app.register_blueprint(chat_blueprint, url_prefix="/chat")
    app.register_blueprint(group_blueprint, url_prefix="/group")
    app.register_blueprint(user_blueprint, url_prefix="/user")

    return app
