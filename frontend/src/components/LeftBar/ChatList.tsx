

// Purpose:
//  Displays a list of all chats the user is involved in.
//  Provides an input field to create a new chat by entering the email of the other participant.





// How It Works:
//  The component displays an input field for creating a new chat. When the form is submitted, 
//          a new chat is created with the entered email.
//  The component also maps through the list of chats and renders a ChatCard for each chat.



import React, { useState } from 'react'
import { useChatActions } from '../../store/hooks/chat';
import ChatCard from './ChatCard';


// React.FC: ChatList is a functional component with no props.
const ChatList: React.FC = () => {
    // useChatActions: Provides actions to interact with the chat store,
    // like fetching chats and creating new ones.
    const { chats, create } = useChatActions();
    // useState: Manages the local state for the email input field.
    const [email, setEmail] = useState<string>('');

    // Event Handlers:
    //  CreateChat: Handles the creation of a new chat when the form is submitted.
    const CreateChat = (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        create(email);
        setEmail('');
    }

  return (
    <div className="flex flex-col space-y-1 mt-4 -mx-2 overflow-y-auto">
        <div className="flex flex-row items-center p-2 relative">
            <form onSubmit={CreateChat}>
                <input
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-transparent outline-none focus:bg-gray-100 hover:bg-gray-100  p-2 rounded-xl w-full"
                    placeholder="Create chat with"
                    type="email" name="" id="" />
                <button
                type='submit'
                className="bg-indigo-500 hover:bg-indigo-600 rounded-full w-12 h-10 p-2 right-0 text-white absolute">+</button>
            </form>
        </div>
        {chats && chats.map((chat) => (
            <ChatCard key={chat.id} chat={chat} />
        ))}
    </div>
  )
}

export default ChatList
