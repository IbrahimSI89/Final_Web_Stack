// This file provides a custom hook useUserActions 
// for fetching user - related data, specifically fetching a user's information by their ID.




import { User } from '../types';

export const useUserActions = () => {

    // Similar to the other hooks, it checks for a valid JWT token in localStorage.
    const validate = () => {
        if (localStorage.getItem('token') && localStorage.getItem('token') !== 'undefined') {
            return true;
        } else {
            return false;
        }
    }


    // Takes a user id as input and sends a GET request to the /user/{id} endpoint 
    // to fetch the user's information.
    // Returns the fetched user data, or null if the user is not authenticated.
    const getUserInfo = async (id: number) => {
        if (!validate()) return null;
        const user = await fetch(`http://127.0.0.1:5001/user/${id}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
            },
        })
        .then(response => response.json())
        .then((data: User) => {
            return data;
        });
        return user;
    }
    

    // The hook returns the getUserInfo function, which can be used to fetch user data.
    return { getUserInfo };
};
