//This file provides a custom hook useOpenChat for managing the current open chat in the application.This file provides a custom hook useOpenChat 
// for managing the current open chat in the application.

import { useAppStore } from "../store";
import { Chat } from "../types";

//Takes a chat object as input and dispatches it to the global state using the OPEN_CHAT action, 
// setting it as the currently open chat.
export const useOpenChat = () => {
    const {state, dispatch } = useAppStore();

    const open = (chat: Chat) => {
        dispatch({ type: 'OPEN_CHAT', payload: chat });
    };

    //The hook returns the open function for setting the current chat, and currentChat, 
    // which holds the currently open chat from the global state.
    return { open , currentChat: state.currentChat };
};
