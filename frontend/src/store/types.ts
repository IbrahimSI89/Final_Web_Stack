// This file defines the TypeScript types used throughout the application, ensuring type safety 
// and helping with code completion and error checking in your IDE.


// Key Types:
// User: Represents a user in the system, including properties like id, name, email, etc.
// Chat: Represents a chat, including properties like id, users, messages, etc.
// Group: Represents a group chat, including properties like id, name, members, messages, etc.
// Message: Represents a chat message, including properties like id, chat_id, content, sender_id, timestamp, etc.
// Member: Represents a group member, including properties like id, name, etc.







export type User = {
    id: number
    name: string
    email: string
    groups: number[]
    chats: number[]
    created_at: string
    created_groups: number[]
}

export type Message = {
    id: number
    content: string
    timestamp: string
    sender_id: number
    seen: boolean
}

export type Chat = {
    id: number
    user1: number
    user2: number
    users: number[]
    created_at: string
    messages: Message[]
}

export type Group = {
    id: number
    name: string
    members: Member[]
    created_at: string
    creator_id: number
    messages: Message[]
}

export type Member = {
    id: number
    name: string
    email: string
}
