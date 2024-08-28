#This file defines the Message model, which represents a message in a one-on-one chat between users.


#Interaction:

#The Message model interacts directly with the Chat model (indicating which chat the message belongs to) 
# and the User model (indicating who sent the message).






from datetime import datetime
from app.extensions import db  # Importing the initialized SQLAlchemy instance

# Message model

class Message(db.Model):
    __tablename__ = 'message'

    #id: Primary key for the message.
    id = db.Column(db.Integer, primary_key=True)

    #content: The content of the message.
    content = db.Column(db.Text, nullable=False)

    #timestamp: Timestamp indicating when the message was sent.
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    #seen: Boolean indicating whether the message has been read.
    seen = db.Column(db.Boolean, default=False)

    #chat: Foreign key referencing the Chat model, indicating the chat where the message was sent.
    chat = db.Column(db.Integer, db.ForeignKey("chat.id"))

    #sender_id: Foreign key referencing the User model, indicating the sender of the message.
    sender_id = db.Column(db.Integer, db.ForeignKey("user.id"))


    #__init__: Initializes a new message instance with the provided chat ID, sender ID, and content.
    def __init__(self, chat_id, sender_id, content):
        super().__init__()
        self.chat = chat_id
        self.sender_id = sender_id
        self.content = content


    #__repr__: Returns a string representation of the message instance.
    def __repr__(self):
        return f"<Message {self.id}>"
