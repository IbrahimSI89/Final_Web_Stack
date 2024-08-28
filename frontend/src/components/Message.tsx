// Purpose:
//  Displays a single chat message with information about the sender.
//  The sender's name is highlighted with a unique color generated from their name.




// When the MessageCard component is rendered, 
// it checks if the logged -in user is the sender.If not, it fetches the sender's information.
// The component displays the message content,
//  the sender's avatar (first letter of their name), and the time the message was sent.






import React from 'react'
import { Message } from '../store/types'
import { User } from '../store/types';
import { useUserActions } from '../store/hooks/user';
import { useAuthActions } from '../store/hooks/auth';
import getColorFromString from '../func/Color';

// is a functional component that takes a message prop of type Message.
const MessageCard : React.FC<{message: Message}> = ({message}) => {
    const { getUserInfo } = useUserActions();
    const { user } = useAuthActions();
    // Hooks:
    //      useState: Manages the local state for the sender (user who sent the message)
    //      and the color(background color for the sender's avatar).
    const [sender, setSender] = React.useState<User | null>(null);
    const [color, setColor] = React.useState<string>('');

    //Runs side effects, such as fetching user information if the current user is not the sender.
    React.useEffect(() => {
        if (user?.id === message.sender_id) {
            setSender(user);
            setColor(getColorFromString(user.name));
            return;
        }

        // Fetches information about the sender if the message sender is not the logged-in user.
        getUserInfo(message.sender_id).then((user) => {
            if (!user) return;
            setSender(user);
            // Generates a unique color for the sender's avatar based on their name.
            setColor(getColorFromString(user.name));
        });
    }, []);
    
  return (
    <>
       <div className="p-3 rounded-lg" key={message.id}>
            <div style = {user?.id === message.sender_id ? {flexDirection: "row-reverse"} : {flexDirection: "row"}} className="flex items-center">
                <div style={{backgroundColor: `#${color}`}} className="flex items-center justify-center h-10 w-10 rounded-full flex-shrink-0">
                    {sender?.name[0]}
                </div>
                <div
                    className="relative mx-3 text-sm bg-white py-2 px-4 shadow rounded-xl"
                >
                    <div className="text-gray-800">
                        {message.content}
                    </div>
                    <div className="text-xs text-gray-500">
                        {new Date(message?.timestamp).toLocaleTimeString()}
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default MessageCard
