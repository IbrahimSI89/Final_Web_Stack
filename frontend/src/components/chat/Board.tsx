// Purpose:
//  Displays the chat board, which shows the messages in the current chat 
// and provides an input field for sending new messages.






// How It Works:
//    The component displays the chat's messages in a scrollable area. Each message is rendered using the MessageCard component.
//    If a chat is open, it also renders an Input component for sending new messages.






import React from 'react';
import Message from '../Message';
import { useOpenChat } from '../../store/hooks/currentChat';
import Input from './Input';
import socket from '../../server';


// React.FC: Board is a functional component with no props.
const Board: React.FC = () => {
  // useOpenChat: Provides access to the current chat from the chat store.
    const { currentChat } = useOpenChat();
    const chat = currentChat;
    const messages = chat?.messages;

    // Socket.IO:
    //    Listens for new messages via Socket.IO and updates the chat board when a new message is received.
    socket.on("new_message", (data) => {
      console.log("Received new message:", data.content);
  });
  

    return (
      <>
        <div className="flex flex-col h-full overflow-x-auto mb-4">
        <div className="flex flex-col h-full">
            <div key={chat?.id} className="flex flex-col">
              <div className="text-sm text-gray-500 text-center mt-4">{chat?.created_at}</div>
              <div className="flex flex-col h-full overflow-y-auto">
                {messages && messages.map((message) => (
                  <Message key={message.id} message={message} />
                  ))}
              </div>
            </div>
        </div>
      </div>
      {currentChat &&
        <Input />
      }
      </>
    );
}

export default Board;
