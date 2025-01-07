```markdown
# Space Todo API

Space Todo API is a RESTful service for managing todo lists, with features such as user authentication, password reset functionality, and more.

---

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Setup](#setup)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Database Setup](#database-setup)
  - [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Routes](#routes)
  - [Authentication Routes](#authentication-routes)
  - [Todo Routes](#todo-routes)
- [Environment Variables](#environment-variables)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **User authentication** using JWT (JSON Web Tokens)
- **Password reset** with One-Time Password (OTP)
- **CRUD operations** for todo items
- **Input validation** for request data
- **Comprehensive API documentation** with Swagger UI

---

## Technologies

This project utilizes the following technologies:

- **Node.js**: JavaScript runtime
- **Express.js**: Web framework
- **Sequelize (PostgreSQL)**: ORM for PostgreSQL
- **bcrypt**: Password hashing
- **jsonwebtoken**: JWT generation and verification
- **express-validator**: Input validation middleware
- **nodemailer**: Sending emails (for password reset)
- **speakeasy**: OTP generation for password reset
- **swagger-jsdoc**: API documentation generation
- **swagger-ui-express**: Serve Swagger UI

---

## Setup

### Prerequisites

Ensure you have the following installed before setting up the project:

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/fredybangs/space-todo.git
   ```

2. **Navigate to the project directory**:

   ```bash
   cd space-todo-api
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Configure environment variables**:
   - Create a `.env` file in the project root.
   - Add the following environment variables with your own values:
   
   ```env
   DB_URL=your_database_url
   JWT_SECRET=your_jwt_secret
   NODEMAILER_PASSWORD=your_nodemailer_password
   SPEAKEASY_SECRET=your_speakeasy_secret
   ```

### Database Setup

1. Create a PostgreSQL database for the project.
2. Update the database credentials in the `config/config.json` file.
3. **Sync the database** with migrations:

   ```bash
   npx sequelize-cli db:migrate
   ```

### Running the Application

To start the server, run the following command:

```bash
npm start
```

The server will start on `http://localhost:3000`.

---

## API Documentation

To explore the API documentation, visit the Swagger UI at:

[http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## Routes

### Authentication Routes

| Method | Endpoint                      | Description                            | Protected |
|--------|-------------------------------|----------------------------------------|-----------|
| POST   | /auth/register                | Register a new user                    | No        |
| POST   | /auth/login                   | Log in a user                          | No        |
| POST   | /auth/change-password         | Change the user's password             | Yes       |
| POST   | /auth/request-password-reset  | Request a password reset OTP           | No        |
| POST   | /auth/verify-otp              | Verify the password reset OTP          | No        |
| POST   | /auth/reset-password          | Reset the password using OTP           | No        |

### Todo Routes

| Method | Endpoint        | Description                 | Protected |
|--------|-----------------|-----------------------------|-----------|
| POST   | /todos          | Create a new todo item      | Yes       |
| GET    | /todos          | Get all todo items          | Yes       |
| GET    | /todos/:id      | Get a specific todo item    | Yes       |
| PUT    | /todos/:id      | Update a specific todo item | Yes       |
| DELETE | /todos/:id      | Delete a todo item          | Yes       |

---

## Environment Variables

| Variable            | Description                          |
|---------------------|--------------------------------------|
| `DB_URL`        | Database URL                   |
| `JWT_SECRET`        | Secret key for JWT                   |
| `NODEMAILER_PASSWORD` | Password for the email service       |
| `SPEAKEASY_SECRET`  | Secret key for Speakeasy OTP         |

---

## Contributing

We welcome contributions! To contribute, follow these steps:

1. **Fork the repository**
2. **Create a new branch**: `git checkout -b feature-branch`
3. **Commit your changes**: `git commit -m 'Add new feature'`
4. **Push to your branch**: `git push origin feature-branch`
5. **Open a Pull Request**

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
