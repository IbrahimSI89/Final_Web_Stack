//This file provides a custom hook useAuthActions 
// for handling authentication - related actions(login, logout, register, fetch user info).



import { useAppStore } from "../store";

// This hook uses the global state and dispatch functions 
// from AppContext to access the app's state and trigger state changes.
export const useAuthActions = () => {
    const {state, dispatch } = useAppStore();

    // This function checks if a valid token is present in localStorage.
    //  If a token is found and is not 'undefined', it returns true, indicating that the user is authenticated.
    const validate = () => {
        if (localStorage.getItem('token') && localStorage.getItem('token') !== 'undefined') {
            return true;
        } else {
            return false;
        }
    }
    

    // Fetches the current user's details from the backend if the user is authenticated. 
    // It makes a GET request to the / auth / me endpoint
    // with the JWT token included in the Authorization header.
    // The fetched user data is then dispatched to the global state using the SET_USER action.
    const me = async () => {
        validate() &&
        fetch('http://127.0.0.1:5001/auth/me', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token') || ''}` 
            },
        })
        .then(response => response.json())
        .then(data => {
            dispatch({ type: 'SET_USER', payload: data });
        });
    };

    // Takes the user's email and password as input, 
    // and sends a POST request to the / auth / login endpoint to authenticate the user.
    // If successful, the JWT token is stored in localStorage, 
    // and the me function is called to fetch and store the user's data
    const login = async ({email, password}: {email:string, password:string}) => {
        fetch('http://127.0.0.1:5001/auth/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password})
        })
        .then(response => response.json())
            .then(data => {
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    me();
                } else {
                    alert(data.message);
                }
        });
    }; 

    // Sends a POST request to the /auth/logout endpoint to log out the user. The JWT token is removed from localStorage, 
    // and the user's state is cleared by dispatching SET_USER with null as the payload.
    const logout = () => {
        fetch('http://127.0.0.1:5001/auth/logout', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
            },
        })
        .then(response => response.json())
        .then(() => {
            localStorage.removeItem('token');
            dispatch({ type: 'SET_USER', payload: null });
        });
    };

    // Takes name, email, and password as input 
    // and sends a POST request to the / auth / register endpoint to create a new user account.
    // On success, the JWT token is saved in localStorage, 
    // and the me function is called to fetch and store the user's data.
    const register = async ({email, password, name}: {email:string, password:string, name:string}) => {
        fetch('http://127.0.0.1:5001/auth/register', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email, password, name})
        })
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('token', data.token);
            me();
        });
    }


    // Return Value:
    // The hook returns the functions login, logout, me, register, and the current user 
    // from the global state, allowing components to perform authentication actions and access user data.
    return { login, logout, user: state.user , me, register };
};
