// Purpose:
//    The main page of the chat application,
//    combining the sidebar and the chat board.







// How It Works:

// The page is divided into two sections: the sidebar (left) and the chat board (right). 
// The sidebar contains the logo, profile information, 
//      and chat list, while the chat board displays the current chat's messages.








import React, { useState } from 'react';
import Logo from '../components/LeftBar/Logo';
import ProfileCard from '../components/LeftBar/ProfileCard';
import ChatList from '../components/LeftBar/ChatList';
import Board from '../components/chat/Board';
import { useGroupActions } from '../store/hooks/group';
import { useChatActions } from '../store/hooks/chat';

const ChatApp: React.FC = () => {
  const { create } = useGroupActions();
  const { chats } = useChatActions();
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  const handleCreateGroup = () => {
    const groupName = prompt("Enter group name:");
    if (!groupName) return;
    const participants = prompt(`Enter user IDs to add (comma-separated):\nAvailable: ${chats?.map(chat => chat.users).flat().join(', ')}`);
    if (!participants) return;
    let selected: number[] = [];
    try {
      selected = participants.split(',').map(Number).filter(Boolean);
    } catch (error) {
      alert("Invalid input. Please enter comma-separated numbers.");
      return;
    }
    setSelectedUsers(selected);
    if (selected.length > 0) {
      create(groupName, selected);
    } else {
      alert("You must select at least one user.");
    }
  };

  return (
    <div className="flex h-screen antialiased text-gray-800">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <div className="flex flex-col flex-shrink-0 p-4 w-60 bg-white gap-4">
          <Logo />
          <ProfileCard />
          <ChatList />
          <p>Selected users: {selectedUsers.join(', ')}</p>
          <button onClick={handleCreateGroup} className="mb-4 bg-blue-500 text-white rounded-lg px-4 py-2">
            Add Group
          </button>
        </div>
        <div className="flex flex-col flex-shrink-0 flex-auto bg-gray-100 p-4">
          <Board />
        </div>
      </div>
    </div>
  );
};


export default ChatApp;











// import React from 'react';


// //Composition: Combines several components (Logo, ProfileCard, ChatList, Board) 
// //  to create the full chat interface.

// // bar
// import Logo from '../components/LeftBar/Logo';
// import ProfileCard from '../components/LeftBar/ProfileCard';
// import ChatList from '../components/LeftBar/ChatList';

// // chat
// import Board from '../components/chat/Board';
// import { useGroupActions } from '../store/hooks/group';


// const ChatApp: React.FC = () => {
//   const { create } = useGroupActions();

//   const handleCreateGroup = () => {
//     const groupName = prompt("Enter group name:");
//     if (groupName) {
//       create(groupName);
//     }
//   };

//   return (
//     <div className="flex h-screen antialiased text-gray-800">
//       <div className="flex flex-row h-full w-full overflow-x-hidden">
//         <div className="flex flex-col flex-shrink-0 p-4 w-60 bg-white gap-4">
//           <Logo />
//           <ProfileCard />
//           <ChatList />
//           <button onClick={handleCreateGroup} className="mb-4 bg-blue-500 text-white rounded-lg px-4 py-2">
//             Add Group
//           </button>
//         </div>
//         <div className="flex flex-col flex-shrink-0 flex-auto bg-gray-100 p-4">
//           <Board />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatApp;

















// React.FC: ChatApp is a functional component with no props.
// const ChatApp: React.FC = () => {  

//   return (
//     <div className="flex h-screen antialiased text-gray-800">
//         <div className="flex flex-row h-full w-full overflow-x-hidden">

//           <div className="flex flex-col flex-shrink-0  p-4 w-60 bg-white gap-4">
//             <Logo />

//             <ProfileCard />

//             <ChatList />
//           </div>

          
//             <div className="flex flex-col flex-shrink-0 flex-auto bg-gray-100 p-4">
//               <Board />

//             </div>

//         </div>
//       </div>
//   );
// };

// export default ChatApp;
