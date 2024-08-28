**User Type**
```
export type User = {
  id: number
  name: string
  email: string
  groups: number[]
  chats: number[]
  created_at: string
  created_groups: number[]
}
```
The `User` type represents a user in the system. It has the following properties:

* `id`: a unique identifier for the user (a number)
* `name`: the user's name (a string)
* `email`: the user's email address (a string)
* `groups`: an array of group IDs that the user is a member of (an array of numbers)
* `chats`: an array of chat IDs that the user is a part of (an array of numbers)
* `created_at`: the timestamp when the user account was created (a string)
* `created_groups`: an array of group IDs that the user has created (an array of numbers)

**Message Type**
```
export type Message = {
  id: number
  content: string
  timestamp: string
  sender_id: number
  seen: boolean
}
```
The `Message` type represents a chat message. It has the following properties:

* `id`: a unique identifier for the message (a number)
* `content`: the text content of the message (a string)
* `timestamp`: the timestamp when the message was sent (a string)
* `sender_id`: the ID of the user who sent the message (a number)
* `seen`: a boolean indicating whether the message has been seen by the recipient (true or false)

**Chat Type**
```
export type Chat = {
  id: number
  user1: number
  user2: number
  users: number[]
  created_at: string
  messages: Message[]
}
```
The `Chat` type represents a one-on-one chat between two users. It has the following properties:

* `id`: a unique identifier for the chat (a number)
* `user1`: the ID of one of the users in the chat (a number)
* `user2`: the ID of the other user in the chat (a number)
* `users`: an array of user IDs in the chat (an array of numbers)
* `created_at`: the timestamp when the chat was created (a string)
* `messages`: an array of `Message` objects representing the chat history (an array of `Message` objects)

**Group Type**
```
export type Group = {
  id: number
  name: string
  members: Member[]
  created_at: string
  creator_id: number
  messages: Message[]
}
```
The `Group` type represents a group chat. It has the following properties:

* `id`: a unique identifier for the group (a number)
* `name`: the name of the group (a string)
* `members`: an array of `Member` objects representing the group members (an array of `Member` objects)
* `created_at`: the timestamp when the group was created (a string)
* `creator_id`: the ID of the user who created the group (a number)
* `messages`: an array of `Message` objects representing the group chat history (an array of `Message` objects)

**Member Type**
```
export type Member = {
  id: number
  name: string
  email: string
}
```
The `Member` type represents a group member. It has the following properties:

* `id`: a unique identifier for the member (a number)
* `name`: the member's name (a string)
* `email`: the member's email address (a string)

These type definitions provide a structure for the data in the application, ensuring that the code is type-safe and helping with code completion and error checking in the IDE.
