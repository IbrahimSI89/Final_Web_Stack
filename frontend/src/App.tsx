// This is the main application component that sets up routing 
// and handles the initialization of user data, chats, and groups.




// React's useEffect hook is used to run side effects in the component, 
// such as fetching data when the component mounts.
import React, { useEffect } from 'react';


import { Route, Routes } from 'react-router-dom';
// // useAuthActions, useChatActions, useGroupActions:
// These hooks are used to manage authentication, chat, and group data. 
// They provide methods to interact with the global state and backend API.
import { useAuthActions } from './store/hooks/auth';
import { useChatActions } from './store/hooks/chat';
import { useGroupActions } from './store/hooks/group';


import Layout from './pages/Layout';
import Signin from './pages/Signin';
import Signup from './pages/Signup';

import ChatApp from './pages/ChatApp'




const App: React.FC  = () => {
  const {user,me} = useAuthActions();
  const {list} = useChatActions();
  const {list: groupList} = useGroupActions();



  // This effect runs once when the component mounts and calls the me function from useAuthActions. 
  // The me function fetches the current user's data and stores it in the global state.
  useEffect(() => {
    me();
  }, []);


  // This effect runs whenever the user state changes. If a user is logged in (user is not null), 
  // it fetches the list of chats and groups associated with the user.
  useEffect(() => {
    if(user){
      list();
      groupList();
    }
  }, [user]);
    
  return(
    <>
      {/* React Router's Routes component defines the different routes in the application. Depending on whether the user is logged in, 
      it renders the ChatApp or Signin component. */}
      <Routes>
        {/* The Layout component wraps the routed pages 
        and provides a common structure or layout for them. */}
      <Route path="/" element={<Layout />} >
        {user ? <Route index element={<ChatApp />} /> : <Route index element={<Signin />} />}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Signin />} />
      </Route>
    </Routes>
    </>
    )
  };

export default App;
