#This file defines the Chat model, which represents a direct chat between two users.
# It also defines relationships with other models like Message.

#Interaction:
#   The Chat model interacts closely with the Message and User models. 
#   It references the User model for participants and the Message model for storing chat messages.


from datetime import datetime
from app.extensions import db  # Importing the initialized SQLAlchemy instance
from .message import Message


#inherits from db.Model
class Chat(db.Model):
    #specifies the name of the database table that corresponds to this model
    __tablename__ = 'chat'
    #id: Primary key for the chat.
    id = db.Column(db.Integer, primary_key=True)

    #user1 and user2: Foreign keys referencing the User model, 
    #   indicating the participants in the chat.
    user1 = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    user2 = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    #users: A JSON field storing a list of user IDs involved in the chat.
    users = db.Column(db.JSON, nullable=False)

    #created_at: Timestamp indicating when the chat was created.
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    #messages: Relationship to the Message model, establishing a one-to-many relationship 
    # (one chat can have many messages).
    messages = db.relationship(
        'Message',
        # This specifies the join condition between the Chat and Message models.
        primaryjoin='Chat.id == Message.chat',  # This creates the relationship
        #This specifies the name of the attribute on the Message model that refers back to the Chat model
        backref='message',  # This enables reverse lookup
        #This specifies the loading behavior for the relationship
        lazy='dynamic'  # Loads the chats lazily
    )

    # users is a list of users in the chat
    #__init__: Initializes a new chat instance between two users.
    def __init__(self, user1, user2):
        super().__init__()
        self.user1 = user1.id
        self.user2 = user2.id
        self.users = [user1.id, user2.id]

    #__repr__: Returns a string representation of the chat instance.
    #which is useful for debugging purposes.
    def __repr__(self):
        return f"<Chat {self.id}>"

    @staticmethod
    #exists: A static method to check if a chat already exists between two users.
    def exists(user1, user2):
        return Chat.query.filter(
            (Chat.user1 == user1.id) & (Chat.user2 == user2.id) |
            (Chat.user1 == user2.id) & (Chat.user2 == user1.id)
        ).first() is not None;

    @staticmethod
    #send_message: A static method to send a message in the chat by creating a new Message instance.
    def send_message(chat_id, sender_id, content):
        message = Message(chat_id, sender_id, content=content)
        db.session.add(message)
        db.session.commit()
        return message
