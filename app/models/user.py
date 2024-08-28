# This file defines the User model, which represents users in the chat application.
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash
from app.extensions import db


#Interaction:

#   The User model interacts with the Chat model to manage one-on-one chats 
#       and with the Group and GroupMessage models to handle group memberships and messages.
#   Password management is handled through hashing and verification methods using Werkzeug's security functions.



class User(db.Model):
    __tablename__ = 'user'

    #id: Primary key for the user.
    id = db.Column(db.Integer, primary_key=True)
    
    #name: The name of the user.
    name = db.Column(db.String(30), nullable=False)

    #email: The email of the user (must be unique).
    email = db.Column(db.String(30), nullable=False, unique=True)
    
    #password_hash: Hashed password for the user.
    password_hash = db.Column(db.String, nullable=False)
    
    #created_at: Timestamp indicating when the user was created.
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    #chats: Relationship to the Chat model, 
    # establishing a one-to-many relationship (a user can be in multiple chats).
    chats = db.relationship(
        'Chat',
        primaryjoin='or_(User.id == Chat.user1, User.id == Chat.user2)',  # This creates the relationship
        backref='chat',  # This enables reverse lookup
        lazy='dynamic'  # Loads the chats lazily
    )


    #__init__: Initializes a new user instance with the provided name, email, and password.
    def __init__(self, name, email, password):
        super().__init__()
        self.name = name
        self.email = email
        self.set_password(password)


    #set_password: Hashes and sets the user's password.
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)


    #check_password: Checks if the provided password matches the stored hashed password.
    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


    #__repr__: Returns a string representation of the user instance.
    def __repr__(self):
        return f"<User {self.name}>"
