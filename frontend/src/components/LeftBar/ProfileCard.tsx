// Purpose:
//        Displays the user's profile information, including their avatar and name.





// How It Works:
//      The component displays the user's avatar and name. The avatar's background color is generated from the user's name

import React from 'react';
import { useAuthActions } from '../../store/hooks/auth';
import getColorFromString from '../../func/Color'




const ProfileCard: React.FC = () => {
    const { user, logout } = useAuthActions();
    if (!user) return null;
  
    const firstLetter = user.name.charAt(0).toUpperCase() || 'unknown';
  
    return (
      <div className="flex flex-col items-center bg-indigo-100 border border-gray-200 w-full py-6 px-4 rounded-lg">
        <div className="h-20 w-20 rounded-full border overflow-hidden">
          <img
            src={`https://placehold.co/50x50/${getColorFromString(user.name)}/31343C?font=oswald&text=${firstLetter}`}
            alt="Avatar"
            className="h-full w-full"
          />
        </div>
        <div className="text-sm font-semibold mt-2">{user.name}</div>
        {/* Add the Log Out button */}
        <button onClick={logout} className="mt-4 bg-red-500 text-white rounded-lg px-4 py-2">
          Log Out
        </button>
      </div>
    );
  };
  
  export default ProfileCard;









// // React.FC: ProfileCard is a functional component with no props.
// const ProfileCard: React.FC = () => {
//     // useAuthActions: Provides access to the current user's information from the auth store.
//     const { user } = useAuthActions();
//     const firstLetter = user?.name?.charAt(0).toUpperCase() || 'unknown';
    
//     return (
//         <div className="flex flex-col items-center bg-indigo-100 border border-gray-200 w-full py-6 px-4 rounded-lg">
//             <div className="h-20 w-20 rounded-full border overflow-hidden">
//                 <img
//                     // getColorFromString: Generates a unique color for the user's avatar based on their name.
//                 src={`https://placehold.co/50x50/${getColorFromString(user?.name as string)}/31343C?font=oswald&text=${firstLetter}`}
//                 alt="Avatar"
//                 className="h-full w-full"
//             />
//             </div>
//             <div className="text-sm font-semibold mt-2">{user?.name}</div>
            
//         </div>
//     );
// }

// export default ProfileCard;
