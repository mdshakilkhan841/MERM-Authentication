# MERN JWT Authentication

This is a full-stack web application that implements user authentication using JWT (JSON Web Tokens). It is built using the MERN stack, consisting of MongoDB, Express.js, React.js, and Node.js. This project demonstrates secure authentication methods, including user registration, login, password reset, and email verification.

## Demo

You can check out the live demo of the application here: [MERN JWT Authentication](https://mern-authentication-ix18.onrender.com/).

## Features

- User registration with email verification
- User login with JWT authentication
- Password reset functionality
- Secure routes accessible only by authenticated users
- Integration with Mailtrap for email services
- Responsive UI built with React.js and Tailwind CSS

## Technologies Used

### Frontend

- **React.js**: JavaScript library for building user interfaces
- **Tailwind CSS**: Utility-first CSS framework for styling
- **shadcn**: Component library for React, providing a set of pre-designed UI components and utilities
- **Vite**: Fast and lean development environment for modern web projects

### Backend

- **Node.js**: JavaScript runtime built on Chrome's V8 JavaScript engine
- **Express.js**: Web framework for Node.js
- **MongoDB**: NoSQL database for storing user data
- **Mongoose**: ODM (Object Data Modeling) library for MongoDB and Node.js
- **JWT**: JSON Web Tokens for securing API routes
- **Mailtrap**: Email testing tool for safe email development

## Installation and Setup

### Prerequisites

- Node.js installed
- MongoDB installed and running locally or have a MongoDB Atlas account

### Setup Instructions

1. Clone the repository:

    ```bash
    git clone https://github.com/mdshakilkhan841/MERN-Authentication.git
    cd MERN-Authentication
    ```

2. **Backend Setup**:

    - Create a `.env` file in the root directory and add your environment variables (MongoDB URI, JWT Secret, Mailtrap credentials, etc.).
    - Install backend dependencies:

        ```bash
        npm install
        ```

    - Start the backend server:

        ```bash
        npm run server
        ```

3. **Frontend Setup**:

    - Navigate to the frontend directory:

        ```bash
        cd frontend
        ```

    - Create a `.env` file in the frontend directory and add your environment variables.
    - Install frontend dependencies:

        ```bash
        npm install
        ```

    - Start the frontend development server:

        ```bash
        npm run dev
        ```

### Build and Deploy

- Build the frontend for production:

    ```bash
    npm run build
    ```

- Deploy the application to Vercel or any other hosting platform of your choice.

## Project Structure

```plaintext
├── backend
│   ├── controllers
│   ├── database
│   ├── mail
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── utils
│   └── server.js
├── frontend
│   ├── dist
│   ├── public
│   ├── src
│   ├── .gitignore
│   ├── package.json
│   ├── README.md
│   └── vite.config.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Usage

- **Register**: Create a new account using your email. A verification email will be sent to your inbox.
- **Login**: Access your account using your registered email and password.
- **Reset Password**: Reset your password by providing your registered email if you forget it.
- **Secure Routes**: Access protected routes only after logging in.

## Acknowledgments
- Render for hosting the live demo
- Mailtrap for providing email testing services
