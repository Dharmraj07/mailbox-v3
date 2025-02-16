# Mailbox v3

## Overview
**Mailbox v3** is a web-based email management system designed for seamless communication. Built using the **MERN stack**, it enables users to send, receive, and manage emails efficiently with a user-friendly interface.

## Features
- **User Authentication**: Secure login and registration system.
- **Email Management**: Send, receive, and delete emails.
- **Inbox & Sent Items**: Categorized email storage.
- **Real-time Updates**: Automatic updates without manual refresh.
- **Rich Text Editor**: Compose emails with formatted text.
- **Responsive UI**: Built using **React Bootstrap** for a smooth experience.

## Tech Stack
### Frontend
- **React** (with Vite for fast development)
- **Redux Toolkit** (for state management)
- **React Router DOM** (for navigation)
- **React Bootstrap** (for styling)
- **Axios** (for API requests)

### Backend
- **Node.js** with **Express.js** (REST API)
- **MongoDB** (Database)
- **Nodemailer** (For sending emails)
- **JWT Authentication** (For secure user sessions)

## Installation
### Prerequisites
Ensure you have the following installed:
- **Node.js** (Latest LTS version recommended)
- **MongoDB** (Locally or via MongoDB Atlas)

### Steps to Run
#### Clone the Repository:
```sh
 git clone https://github.com/Dharmraj07/mailbox-v3.git
 cd mailbox-v3
```

### Backend Setup
1. Navigate to the backend folder:
   ```sh
   cd backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a **.env** file and configure the following:
   ```env
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   SMTP_EMAIL=your_email
   SMTP_PASSWORD=your_email_password
   ```
4. Start the backend server:
   ```sh
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend folder:
   ```sh
   cd frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a **.env** file for frontend:
   ```env
   VITE_BACKEND_URL=http://localhost:5000
   ```
4. Start the frontend:
   ```sh
   npm run dev
   ```

## Usage
- **Register/Login**: Users can create an account and log in securely.
- **Compose Email**: Use the rich text editor to draft emails.
- **Manage Inbox & Sent Items**: View received and sent emails.
- **Delete Emails**: Remove unwanted messages.



## Contribution
- Fork the repository.
- Create a new feature branch: `git checkout -b feature-name`.
- Commit your changes: `git commit -m "Add new feature"`.
- Push to the branch: `git push origin feature-name`.
- Open a Pull Request.

## License
This project is open-source and available under the **MIT License**.

---
For any queries, feel free to open an issue in the repository!

