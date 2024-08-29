# app/socketio.py
#This file defines the event handlers for Socket.IO,
#  handling real-time communication events such as joining chat rooms.

from app.extensions import socketio
from app.models.message import Message
from app.extensions import db




# Interactions:
#   The socketio instance from extensions.py is used to manage Socket.IO events.
#   This file interacts with the Message model and the database via db (though not explicitly shown here, 
#       it could be used for more complex event handling).
#   It integrates with the rest of the application to provide real-time updates to clients,
#   such as notifying users when a new message is sent in a chat they are part of.




# join_room Event Handler:
#   This event handler listens for the join_room event emitted by clients.
#   It allows a client to join a specific chat room based on the chat_id provided in the data.
#   socketio.join_room(str(chat_id)): Adds the client's Socket.IO connection to the specified chat room,
#       enabling them to receive messages sent to that room.
@socketio.on("join_room")
def join_room(data):
    chat_id = data.get("chat_id")
    socketio.join_room(str(chat_id))




@socketio.on("send_message")
def handle_message(data):
    chat_id = data.get("chat_id")
    content = data.get("content")
    sender_id = data.get("sender_id")

    # Create and store the message in the database
    message = Message(chat_id=chat_id, sender_id=sender_id, content=content)
    db.session.add(message)
    db.session.commit()

    # Emit the message to the chat room
    socketio.emit("new_message", {
        "chat_id": chat_id,
        "sender_id": sender_id,
        "content": content,
        "timestamp": message.timestamp.isoformat()
    }, room=str(chat_id))
