**useGroupActions Hook**

The `useGroupActions` hook is a custom hook that provides a way to manage group-related actions in the application. It returns an object with several functions and the current state of groups.

**validate Function**

The `validate` function checks if a valid JWT token is present in the local storage. It returns `true` if the token is valid and `false` otherwise. This function is used to ensure that the user is authenticated before making API requests.

**create Function**

The `create` function creates a new group with the given `name` parameter. Here's what it does:

1. It checks if the user is authenticated using the `validate` function.
2. If authenticated, it sends a POST request to the `/group/create` endpoint with the group name in the request body.
3. The request includes the JWT token in the `Authorization` header.
4. Upon successful creation, it dispatches a `NEW_GROUP` action with the newly created group data as the payload.

**list Function**

The `list` function fetches the list of groups the authenticated user is part of. Here's what it does:

1. It checks if the user is authenticated using the `validate` function.
2. If authenticated, it sends a GET request to the `/group/my_groups` endpoint.
3. The request includes the JWT token in the `Authorization` header.
4. Upon successful response, it checks if the response contains an error key. If it does, it dispatches a `SET_GROUPS` action with a null payload, indicating that the user is not authenticated.
5. If no error, it dispatches a `SET_GROUPS` action with the list of groups as the payload.

**send Function**

The `send` function sends a message to a specific group with the given `group_id` and `content` parameters. Here's what it does:

1. It checks if the user is authenticated using the `validate` function.
2. If authenticated, it sends a POST request to the `/group/{group_id}/send` endpoint with the message content in the request body.
3. The request includes the JWT token in the `Authorization` header.
4. Upon successful response, it updates the group's message list in the global state by adding the new message.

**addMember Function**

The `addMember` function adds a new member to a specific group with the given `group_id` and `email` parameters. Here's what it does:

1. It checks if the user is authenticated using the `validate` function.
2. If authenticated, it sends a POST request to the `/group/{group_id}/add_member` endpoint with the email in the request body.
3. The request includes the JWT token in the `Authorization` header.
4. Upon successful response, it updates the group's member list in the global state by adding the new member.

**deleteGroup Function**

The `deleteGroup` function deletes a specific group with the given `group_id` parameter. Here's what it does:

1. It checks if the user is authenticated using the `validate` function.
2. If authenticated, it sends a DELETE request to the `/group/{group_id}/delete` endpoint.
3. The request includes the JWT token in the `Authorization` header.
4. Upon successful response, it updates the global state by removing the deleted group from the list of groups.

**Returning the Hook**

The `useGroupActions` hook returns an object with the following properties:

* `groups`: The current list of groups in the global state.
* `create`: The `create` function for creating a new group.
* `list`: The `list` function for fetching the list of groups.
* `send`: The `send` function for sending a message to a group.
* `addMember`: The `addMember` function for adding a new member to a group.
* `deleteGroup`: The `deleteGroup` function for deleting a group.

By using this hook, components can easily access and manage group-related actions in the application.
