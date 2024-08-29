// Purpose:
//  Displays the chat board, which shows the messages in the current chat 
// and provides an input field for sending new messages.






// How It Works:
//    The component displays the chat's messages in a scrollable area. Each message is rendered using the MessageCard component.
//    If a chat is open, it also renders an Input component for sending new messages.






import React, { useEffect } from 'react';
import Message from '../Message';
import { useOpenChat } from '../../store/hooks/currentChat';
import Input from './Input';
import socket from '../../server';


// React.FC: Board is a functional component with no props.
const Board: React.FC = () => {
  const { currentChat, open } = useOpenChat();
  const chat = currentChat;
  const messages = chat?.messages;

  useEffect(() => {
    socket.on("new_message", (data) => {
      if (chat && data.chat_id === chat.id) {
        const updatedChat = {
          ...chat,
          messages: [...chat.messages, data]
        };
        open(updatedChat);
      }
    });

    return () => {
      socket.off("new_message");
    };
  }, [chat]);

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
};

export default Board;
