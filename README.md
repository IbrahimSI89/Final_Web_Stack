
# Real-Time Chat Application

## Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)
- [Frontend Overview](#frontend-overview)
- [Backend Overview](#backend-overview)
- [Socket.IO Integration](#socketio-integration)
- [API Endpoints](#api-endpoints)
- [Contributors](#contributors)
- [License](#license)

## Project Overview

This real-time chat application allows users to communicate instantly with one another. The application supports both one-on-one and group chats, with real-time updates, secure authentication, and a responsive UI. The backend is built using Flask, SQLAlchemy, and Socket.IO, while the frontend is powered by React, TypeScript, and Tailwind CSS.

## Features

- **Real-Time Messaging**: Instant communication with Socket.IO.
- **User Authentication**: Secure login and registration using JWT.
- **Group Chats**: Ability to create and manage group conversations.
- **Responsive UI**: Mobile-friendly design using Tailwind CSS.
- **Persistent Data**: Data stored in a relational database managed by SQLAlchemy.
- **Modern Frontend**: Built with React, TypeScript, and Vite for a fast and maintainable frontend.

## Tech Stack

### Frontend

- **React**: For building user interfaces.
- **TypeScript**: Provides static typing to improve code quality.
- **Tailwind CSS**: For styling and creating responsive layouts.
- **Vite**: As the build tool and development server.

### Backend

- **Flask**: Python web framework used for the backend.
- **SQLAlchemy**: ORM for database management.
- **JWT**: For secure user authentication.
- **Socket.IO**: For real-time communication.

## Project Structure

### Frontend (`frontend/`)

- **src/**
  - **App.tsx**: Main component that sets up routes and context providers.
  - **index.tsx**: Entry point of the React application.
  - **index.css**: Global styles, including Tailwind imports.
  - **pages/**: Contains all the page components (Layout, Signin, Signup, ChatApp).
  - **store/**: State management using context and hooks (auth, chat, group).
  - **types.ts**: TypeScript types for the application.
- **public/**: Public assets like images and icons.
- **vite.config.ts**: Configuration file for Vite.
- **tailwind.config.js**: Custom Tailwind configuration.
- **tsconfig.json**: TypeScript configuration.

### Backend (`server/`)

- **app/**: Main Flask application with models, routes, and extensions.
- **config.py**: Configuration settings for different environments.
- **routes/**: Contains all the route definitions for the application.
- **models.py**: SQLAlchemy models for the database.
- **extensions.py**: Initializing Flask extensions (SQLAlchemy, JWT, etc.).
- **socket.py**: Socket.IO integration for real-time communication.
- **requirements.txt**: List of Python dependencies.

### Socket.IO Integration

- **server/index.ts**: Initializes the Socket.IO client on the frontend.
- **app/socket.py**: Handles Socket.IO events on the backend.

## Installation

### Prerequisites

- **Node.js** and **npm** or **yarn**
- **Python 3.x** and **pip**
- **PostgreSQL** or **SQLite** (or any other supported SQL database)

### Frontend Setup

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Backend Setup

```bash
# Navigate to the server directory
cd server

# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip3 install -r requirements.txt

# Set up the database
flask db upgrade

# Run the application
python3 run.py
```

## Usage

1. Start the backend server.
2. Start the frontend development server.
3. Open your browser and navigate to `http://localhost:3000`.
4. Sign up or log in to start chatting!

## Frontend Overview

- **Main Entry (App.tsx)**: Handles routing and initializes authentication and chat data.
- **Layout Component**: Serves as the wrapper for all routes, determining the layout of the pages.
- **ChatApp Component**: The main chat interface where users can send and receive messages.
- **Auth Hooks**: Custom hooks to manage authentication state and actions.
- **Chat Hooks**: Custom hooks to manage chat state and actions, including Socket.IO integration.
- **Group Hooks**: Custom hooks to manage group-related state and actions.

## Backend Overview

- **Models**: Define the database schema and relationships.
- **Routes**: API endpoints for authentication, chat, and group functionalities.
- **Socket.IO**: Real-time events for sending and receiving messages.
- **JWT Authentication**: Protects routes and ensures secure communication.

## Socket.IO Integration

- **Frontend**: The `server/index.ts` file initializes the Socket.IO connection and exports the socket instance for use in the app.
- **Backend**: The `socket.py` file listens for incoming events (e.g., new messages) and broadcasts updates to connected clients.

## API Endpoints

- **POST /signup**: Register a new user.
- **POST /login**: Authenticate a user and return a JWT.
- **GET /chats**: Retrieve the list of chats the user is involved in.
- **POST /chats**: Create a new chat.
- **GET /groups**: Retrieve the list of groups.
- **POST /groups**: Create a new group.

## Contributors

- **Ibrahim Mahmoud**
- **Sondos Ahmed**

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
