## How These Models Interact with Each Other
### User and Chat:

Users can participate in one-on-one chats, represented by the Chat model. Each chat references two users (user1 and user2).
The Chat model stores messages through its relationship with the Message model.
User and Group:

Users can create and join groups. The Group model tracks group members using the Membership model, which manages the many-to-many relationship.
Group chats are managed by the GroupMessage model, where each group message references the group and the sender.
Message and Chat:

Each Message is linked to a specific chat via the chat foreign key. Messages belong to a specific chat, which is linked to two users.
GroupMessage and Group:

GroupMessage represents messages sent within a group, and each message is linked to a specific group and the user who sent it.
