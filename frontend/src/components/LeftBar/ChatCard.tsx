// Purpose:

// Displays a single chat in the chat list.
// Shows the name of the friend (other participant in the chat) 
// and allows the user to open the chat.


// How It Works:
//  The component fetches and displays the friend's name and avatar.
//  When the user clicks on the chat card, the selected chat is opened.


import React from 'react';
import { Chat, User } from '../../store/types';
import { useUserActions } from '../../store/hooks/user';
import { useAuthActions } from '../../store/hooks/auth';
import getColorFromString from '../../func/Color'
import { useOpenChat } from '../../store/hooks/currentChat';

// React.FC: ChatCard is a functional component that takes a chat prop of type Chat.
const ChatCard : React.FC<{chat: Chat}> = ({chat}) => {
    const { getUserInfo } = useUserActions();
    const { open } = useOpenChat();
    const { user } = useAuthActions();
    // useState: Manages the local state for the friend (the other user in the chat).
    const [friend, setFriend] = React.useState<User | null>(null);

    //useEffect: Fetches the friend's information when the component mounts.
    React.useEffect(() => {
        if (!user) return;
        const friendId = chat.users.find((id) => id !== user?.id);
        if (!friendId) return;

        //  Fetches information about the friend in the chat.
        getUserInfo(friendId).then((user) => {
            setFriend(user);
        });
    }, [user]);
        
        
        
    return (
        <button
            // Event Handlers:
            //  open: Opens the selected chat.
            onClick={() => open(chat)}
            key={chat.id}
            className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
            >
            <div
                className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full overflow-hidden"
            >
                <img
                    // getColorFromString: Generates a unique color for the friend's avatar based on their name.
                src={`https://placehold.co/100x100/${getColorFromString(friend?.name as string)}/31343C?font=oswald&text=${friend?.name[0]}`}
                alt="Avatar"
                className="h-full w-full"
            />
            </div>
            <div className="ml-2 text-sm font-semibold">{friend?.name}</div>
        </button>
    );
}

export default ChatCard;
