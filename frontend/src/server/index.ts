// This file is responsible for establishing a connection between the frontend 
// and backend using Socket.IO, 
// which facilitates real - time communication(e.g., for chat messages).



// This imports the io function and Socket type from the socket.io-client package. 
// The io function is used to connect to the Socket.IO server.
import { io, Socket } from "socket.io-client";


// This line creates a new Socket.IO connection 
// to the backend server running on http://localhost:5001.
// The socket object is an instance of the Socket class 
// and will be used to emit and listen for events between the client and server.
const socket: Socket = io("http://localhost:5001");


// This exports the socket object so it can be used in other parts of the application, 
// particularly in components where real - time communication is required.
export default socket;
