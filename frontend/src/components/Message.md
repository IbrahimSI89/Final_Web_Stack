**Concepts:**

1. **React Functional Component**: The `MessageCard` component is a functional component, which means it's a pure function that takes props and returns JSX.
2. **Props**: The component takes a single prop `message` of type `Message`, which is an object containing information about the chat message.
3. **Hooks**: The component uses two React Hooks: `useState` and `useEffect`. `useState` is used to manage local state, while `useEffect` is used to handle side effects (e.g., fetching user information).
4. **Context API**: The component uses the Context API to access the `user` object from the `auth` store and the `getUserInfo` function from the `user` store.

**Div Sections:**

1. **Outer div (`.p-3 rounded-lg`)**:
	* This div wraps the entire message card component.
	* The `key` prop is set to `message.id` to ensure that each message card has a unique key.
	* The `className` prop sets the padding and rounded corner styles for the div.
2. **Inner div (`.flex items-center`)**:
	* This div contains the sender's avatar and message content.
	* The `style` prop is conditionally set based on whether the logged-in user is the sender or not. If the user is the sender, the flex direction is set to `row-reverse`, which reverses the order of the avatar and message content.
3. **Sender's avatar div (`.flex items-center justify-center h-10 w-10 rounded-full`)**:
	* This div displays the sender's avatar, which is a rounded circle with a unique background color generated from the sender's name.
	* The `style` prop sets the background color of the avatar using the `color` state variable.
	* The avatar displays the first letter of the sender's name using the `sender?.name[0]` expression.
4. **Message content div (`.relative mx-3 text-sm bg-white py-2 px-4 shadow rounded-xl`)**:
	* This div contains the message content and timestamp.
	* The `className` prop sets various styles for the div, including margins, padding, background color, and rounded corners.
5. **Message content sub-div (`.text-gray-800`)**:
	* This div displays the message content using the `message.content` expression.
6. **Timestamp sub-div (`.text-xs text-gray-500`)**:
	* This div displays the timestamp of the message using the `new Date(message?.timestamp).toLocaleTimeString()` expression.

**State and Effects:**

1. **`sender` state**: This state variable stores the sender's information, which is initially set to `null`.
2. **`color` state**: This state variable stores the unique background color generated for the sender's avatar, which is initially set to an empty string.
3. **`useEffect` hook**: This hook is used to fetch the sender's information and generate the unique color when the component mounts. If the logged-in user is the sender, the hook sets the `sender` state to the logged-in user and generates the color based on their name. If the sender is not the logged-in user, the hook fetches the sender's information using the `getUserInfo` function and sets the `sender` state accordingly.
