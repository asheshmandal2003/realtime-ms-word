# Realtime Document Editor

Welcome to realtime document editor. Here you can create your own document, can edit it in realtime and can share it with anyone who are signed in with this application, and also revoke their access. You can change your document access type (public, private) and share it to everyone.

## Features

- **User Registration and Authentication**: Users can sign up, log in, and securely manage their accounts using Passport.js for authentication.

- **Document Management**: Registered users can add new document, also document can be shared only with the registered users.

- **Text Editor**: The editor is built up using Quill js. Here you can find various type of document editing features.

- **Add Collaborators**: You can add collaborators in your document with "read-only" and "write" policy, "read-only" users are not allowed to edit the document the can only read the document.

- **Document Access Policy**:You can set your document as public, where anyone can view it without registering with the website, or you can set it as private and share it only with people you know.

- **Simple Design**: The whole application is built up with Material UI for the best user experience.

## Technologies Used

- React.js
- Redux.js
- Socket.io
- Quill js
- Node.js
- Express.js
- MongoDB (with Mongoose ODM)
- Passport.js for user authentication
- Material UI

## Installation and Setup

1. Clone the GitHub repository:

   ```shell
   git clone https://github.com/asheshmandal2003/realtime-ms-word.git
   ```

2. Navigate to the project directory:

   ```shell
   cd realtime-ms-word
   ```
3. Navigate to the server directory:

   ```shell
   cd server
   ```
4. Install backend dependencies:

   ```shell
   yarn
   ```
5. Create a `.env` file using the `.example.env` file.

6. Run the backend development server:

   ```shell
   yarn run devServer


6. Run the socket server from the "server" directory:

   ```shell
   yarn run socketServer
   ```

7. Navigate to the client directory:

   ```shell
   cd client
   ```

8. Create a `.env` file using the `.example.env` file.

9. Install frontend dependencies:

   ```shell
   yarn
   ```
10. Start frontend development server:

   ```shell
   yarn dev
   or yarn dev --port ${port}
   ```

## Project Structure


   - `client/`: Contains the React.js frontend application.
   - `server/`: Contains the Node.js backend API.
   - `server/socket.js`: Defines Websockets backend
   - `server/routes/`: Defines the API routes.
   - `server/controllers/`: Implements the route controllers.
   - `server/models/`: Defines the database models (using mongoose ODM).
   - `client/src/components`: Contains React components.
   - `client/src/state`: Contains Redux js cofigurations

