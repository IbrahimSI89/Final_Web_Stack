// This file is the heart of the global state management system in your application, using React's useReducer 
// and useContext hooks to create a custom state management solution.



import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { User, Chat, Group } from './types';

// Define the state structure
// Defines the structure of the global state, including the user, chats, groups, and currentChat
type AppState = {
  user: User | null;
  chats: Chat[] | null;
  groups: Group[] | null;
  currentChat: Chat | null;
};

// Define action types
// Defines the possible actions that can be dispatched to the reducer. Each action has a type (indicating what kind of state change to make) 
// and a payload(the data needed to perform the state change).
type AppAction =
  | { type: 'SET_USER'; payload: AppState['user'] }
  | { type: 'SET_CHATS'; payload: AppState['chats'] }
  | { type: 'SET_GROUPS'; payload: AppState['groups'] }
  | { type: 'NEW_CHAT'; payload: Chat }
  | { type: 'NEW_GROUP'; payload: Group }
  | { type: 'OPEN_CHAT'; payload: Chat }

// Reducer function to manage state transitions
// A pure function that takes the current state and an action as arguments 
// and returns a new state based on the action type.
// Handles actions like SET_USER, SET_CHATS, SET_GROUPS, NEW_CHAT, NEW_GROUP, and OPEN_CHAT, 
// updating the global state accordingly.
const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    case 'SET_CHATS':
      return { ...state, chats: action.payload };
    case 'NEW_CHAT':
      return { ...state, chats: state.chats ? [...state.chats, action.payload] : [action.payload] };
    case 'SET_GROUPS':
      return { ...state, groups: action.payload };
    case 'NEW_GROUP':
      return { ...state, groups: state.groups ? [...state.groups, action.payload] : [action.payload] };
    case 'OPEN_CHAT':
      return { ...state, currentChat: action.payload };
    default:
      return state;
  }
};

// Create a context for the store
// A React context that holds the global state and the dispatch function, 
// allowing any component within the app to access and modify the state.
const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

// Context provider to wrap the application
// A context provider component that wraps the application. It initializes the global state using useReducer 
// and provides the state and dispatch function to the entire app via the AppContext.
export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, {
    user: null,
    chats: [],
    groups: [],
    currentChat: null,
  });

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the store
// A custom hook that allows components to access the global state 
// and dispatch function from AppContext.
// Throws an error if used outside of the AppProvider, ensuring that components are always within the correct context.
export const useAppStore = () => {
    const context = useContext(AppContext);
    if (!context) {
      throw new Error('useAppStore must be used within an AppProvider');
    }
    return context;
};
