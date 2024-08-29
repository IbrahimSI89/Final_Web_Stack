// This file provides a custom hook useGroupActions for managing group-related actions, such as creating groups, 
// listing groups, sending group messages, adding members, and deleting groups.


import { useAppStore } from "../store";
import { Group, Member, Message } from "../types";

export const useGroupActions = () => {
    const { state, dispatch } = useAppStore();

    const validate = () => {
        return localStorage.getItem('token') !== 'undefined';
    };

    const create = async (name: string, userIds: number[]) => {
        if (validate()) {
            fetch('http://127.0.0.1:5001/group/create', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
                body: JSON.stringify({ name, userIds })
            })
            .then(response => response.json())
            .then((data: Group) => {
                dispatch({ type: 'NEW_GROUP', payload: data });
            });
        }
    };
    // Fetches the list of groups the authenticated user is part of by making 
    // a GET request to the / group / my_groups endpoint.
    // The fetched groups are then dispatched to the global state using the SET_GROUPS action.
    const list = async () => {
        validate() &&
        fetch('http://127.0.0.1:5001/group/my_groups', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
            },
        })
        .then(response => response.json())
        .then((data: Group[]) => {
            // if data has key equal to error, then user is not authenticated
            if (Object.hasOwnProperty.call(data, 'error')) {
                dispatch({ type: 'SET_GROUPS', payload: null });
            } else {
                dispatch({ type: 'SET_GROUPS', payload: data });
            }
        });
    }


    // Takes a group_id and content (message text) as input and sends a POST request to the /group/{group_id}/send endpoint 
    // to send a message in the specified group.
    // The newly created message is added to the appropriate group in the global state, updating the group's message list.
    const send = async (group_id: number, content: string) => {
        validate() &&
        fetch(`http://127.0.0.1:5001/group/${group_id}/send`,
        {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
            },
            body: JSON.stringify({content})
        })
        .then(response => response.json())
        .then((data:Message) => {
            // get this chat from state and edit it
            const group = state.groups?.find(group => group.id === group_id);
            if (group) {
                // replace the chat with the new one
                const newGroup : Group = {...group,
                     messages: group.messages ? [...group.messages, data] : [data]
                    };
                const groups = state.groups?.map(group => group.id === group_id ? newGroup : group) || [];
                dispatch({ type: 'SET_GROUPS', payload: groups });
            }
        });
    }

    //Takes a group_id and email as input, and sends a POST request to the /group/{group_id}/add_member endpoint 
    // to add a new member to the group.
    // The new member is added to the group's member list in the global state.
    const addMember = async (group_id: number, email: string) => {
        validate() &&   
        fetch(`http://127.0.0.1:5001/group/${group_id}/add_member`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
            },
            body: JSON.stringify({email})
        })
        .then(response => response.json())
        .then((data: Member) => {
            const group = state.groups?.find(group => group.id === group_id);
            if (group) {
                const newGroup : Group = {...group,
                     members: group.members ? [...group.members, data] : [data]
                    };
                const groups = state.groups?.map(group => group.id === group_id ? newGroup : group) || [];
                dispatch({ type: 'SET_GROUPS', payload: groups });
            }
        });
    }

    // Takes a group_id as input and sends a DELETE request to the /group/{group_id}/delete 
    // endpoint to delete the specified group.
    // The group is removed from the global state.
    const deleteGroup = async (group_id: number) => {
        validate() &&
        fetch(`http://127.0.0.1:5001/group/${group_id}/delete`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
            },
        })
        .then(response => response.json())
        .then(() => {
            const groups = state.groups?.filter(group => group.id !== group_id) || [];
            dispatch({ type: 'SET_GROUPS', payload: groups });
        });
    }

    // The hook returns the groups from the global state, along with the create, list, send, addMember, and deleteGroup functions for managing group actions.
    return {groups: state.groups, create, list, send, addMember, deleteGroup};
}
