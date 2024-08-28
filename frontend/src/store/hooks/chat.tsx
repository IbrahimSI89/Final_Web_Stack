// This file provides a custom hook useChatActions 
// for managing chat - related actions, such as creating, listing, and sending messages in chats.


import { useAppStore } from "../store";
import { Chat, Message } from "../types";
import { useOpenChat } from "./currentChat";

export const useChatActions = () => {
    const {state, dispatch } = useAppStore();
    const {open} = useOpenChat();

    //Similar to the one in auth.tsx, 
    // it checks for the presence of a valid JWT token in localStorage.
    const validate = () => {
        if (localStorage.getItem('token') && localStorage.getItem('token') !== 'undefined') {
            return true;
        } else {
            return false;
        }
    };
    
    //Takes an email (withEmail) as input and sends a POST request to the /chat/create endpoint to start 
    // a new chat with the user who owns that email.
    // If successful, the new chat data is dispatched to the global state with the NEW_CHAT action.
    const create = async (withEmail:string) => {
        validate() &&
        fetch('http://127.0.0.1:5001/chat/create', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({withEmail})
        })
        .then(response => response.json())
        .then(data => {
            data &&
            dispatch({ type: 'NEW_CHAT', payload: data });
        });
    };

    // Fetches the list of chats that the authenticated user is involved in 
    // by making a GET request to the / chat / list endpoint.
    // The fetched chats are then dispatched to the global state using the SET_CHATS action.
    const list = async () => {
        validate() &&
        fetch('http://127.0.0.1:5001/chat/list', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token') || ''}` 
            },
        })
        .then(response => response.json())
        .then(data => {
            data &&
            dispatch({ type: 'SET_CHATS', payload: data.chats });
        });
    };

    //Takes a chat_id and content (message text) as input 
    // and sends a POST request to the / chat / send endpoint to send a new message in the specified chat.
    // The newly created message is added to the appropriate chat in the global state, updating the chat's message list.

    const send = async (chat_id: number, content: string) => {
        validate() &&
        fetch('http://127.0.0.1:5001/chat/send', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
            },
            body: JSON.stringify({chat_id, content})
        })
        .then(response => response.json())
        .then((data:Message) => {
            const chat = state.chats?.find(chat => chat.id === chat_id);
            if (chat) {
                const newChat : Chat = {...chat,
                    messages: chat.messages ? [...chat.messages, data] : [data]
                };
                open(newChat);
                const chats = state.chats?.map(chat => chat.id === chat_id ? newChat : chat) || [];
                console.log(chats);
                dispatch({ type: 'SET_CHATS', payload: chats });
            }

        });
    };

    // The hook returns the chats from the global state, as well as the create, list,
    //  and send functions for managing chat actions
    return {chats: state.chats, create, list, send};
};
