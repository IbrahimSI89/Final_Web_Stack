#This file defines the Group, Membership, and GroupMessage models, 
# which handle group chats in the application.


#Interaction:

#   The Group model interacts with the User model to manage group members and with the GroupMessage model to manage messages within a group.
#   The Membership model links User and Group models together, facilitating the many-to-many relationship.
#   The GroupMessage model stores messages sent within a group and references both Group and User models.

from datetime import datetime
from app.extensions import db

class Membership(db.Model):
    #This is an associative table that represents the many-to-many relationship between User and Group.

    __tablename__ = 'membership'

    #group_id and member_id: Foreign keys referencing the Group and User models respectively.
    group_id = db.Column(db.Integer, db.ForeignKey('group.id', ondelete='CASCADE'), primary_key=True)
    member_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)

    #joined_at: Timestamp indicating when a user joined the group.
    joined_at = db.Column(db.DateTime, default=datetime.utcnow)

    def __repr__(self):
        return f'<Membership {self.group_id}-{self.member_id}>'

# Group model: represents a group in a chat application
class Group(db.Model):
    __tablename__ = 'group'
    #id: Primary key for the group.
    id = db.Column(db.Integer, primary_key=True)

    #name: The name of the group.
    name = db.Column(db.String(100), nullable=False)  # Group name

    #created_at: Timestamp indicating when the group was created.
    created_at = db.Column(db.DateTime, default=datetime.utcnow)  # Creation timestamp

    #creator_id: Foreign key referencing the User model, indicating the creator of the group.
    creator_id = db.Column(db.Integer, db.ForeignKey('user.id'))  # Creator of the group

    # Relationship to the creator of the group (assumes 'User' model exists)
    #creator: Relationship to the User model, establishing a one-to-one relationship with the creator.
    creator = db.relationship(
        'User',
        primaryjoin='Group.creator_id == User.id',
        backref='created_groups',
    )

    # Relationship to manage group members (many-to-many)
    #members: Many-to-many relationship with the User model through the Membership model.
    members = db.relationship(
        'User',
        secondary='membership',  # Associative table for many-to-many relationship
        backref='groups',
    )

    # Relationship to manage messages in the group
    #messages: Relationship to the GroupMessage model, establishing a one-to-many relationship.
    messages = db.relationship(
        'GroupMessage',
        backref='group',
        lazy='dynamic'
    )

    def __init__(self, name, creator):
        self.name = name
        self.creator_id = creator.id

    def __repr__(self):
        return f"<Group {self.name}>"

# GroupMessage model: represents messages sent within a group chat.
class GroupMessage(db.Model):
    __tablename__ = 'group_message'

    #id: Primary key for the group message.
    id = db.Column(db.Integer, primary_key=True)

    #group_id: Foreign key referencing the Group model.
    group_id = db.Column(db.Integer, db.ForeignKey('group.id', ondelete='CASCADE'), nullable=False)  # Group reference

    #sender_id: Foreign key referencing the User model.
    sender_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)  # Sender's ID
    
    #content: The content of the group message.
    content = db.Column(db.Text, nullable=False)  # Message content

    #timestamp: Timestamp indicating when the message was sent.
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)  # Timestamp for when the message was sent

    # Back-populates
    sender = db.relationship(
        'User',
        backref='sent_group_messages',
    )

    def __repr__(self):
        return f"<GroupMessage {self.id} in Group {self.group_id}>"
