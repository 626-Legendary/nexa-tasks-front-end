# Nexa Tasks - Modern Task Management System

**Nexa Tasks** is a powerful and modern task management system built with a full-stack architecture. It features an intuitive user interface and comprehensive task management tools, ideal for both individual users and collaborative teams.

---

## ✨ Features

- ✅ User authentication and authorization (JWT)
- 📝 Create, edit, delete, and manage task status
- 📁 File uploads and attachment support
- 📊 Data visualization with charts
- 📤 Export tasks to Excel
- 🔔 Real-time notifications
- 📱 Responsive design for all devices

---

## 🛠 Tech Stack

### Frontend
- [React 19](https://react.dev/)
- [Vite 6](https://vitejs.dev/)
- [React Router DOM 7](https://reactrouter.com/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [React Hot Toast](https://react-hot-toast.com/)
- [Recharts](https://recharts.org/)
- [Moment.js](https://momentjs.com/)

### Backend
- [Node.js](https://nodejs.org/)
- [Express 5](https://expressjs.com/)
- [MongoDB + Mongoose 8](https://mongoosejs.com/)
- [JWT](https://jwt.io/)
- [Bcryptjs](https://github.com/dcodeIO/bcrypt.js)
- [Multer](https://github.com/expressjs/multer)
- [ExcelJS](https://github.com/exceljs/exceljs)
- [CORS](https://github.com/expressjs/cors)
- [Dotenv](https://github.com/motdotla/dotenv)

---

## 📁 Project Structure

```
nexa-tasks/
├── frontend/                # Frontend (React)
│   ├── public/              # Static files
│   ├── src/                 # Source code (components, routes, pages)
│   ├── package.json         # Frontend dependencies
│   └── vite.config.js       # Vite config
│
└── backend/                 # Backend (Express + MongoDB)
    ├── config/              # Configuration files
    ├── controllers/         # Business logic
    ├── middlewares/         # Middleware (auth, errors)
    ├── models/              # Mongoose models
    ├── routes/              # API routes
    ├── uploads/             # Uploaded files
    ├── .env                 # Environment variables
    └── server.js            # Entry point
```

---

## 🚀 Getting Started

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/nexa-tasks.git
cd nexa-tasks
```

### 2️⃣ Install Dependencies & Run

#### Start Frontend

```bash
cd frontend
npm install
npm run dev
```

#### Start Backend

```bash
cd ../backend
npm install
npm run dev
```

---

## ⚙️ Environment Variables

Create a `.env` file inside the `backend/` directory with the following content:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Make sure MongoDB is installed and running.

---

## 📌 Requirements

- Node.js >= 18.0.0
- npm >= 9.0.0
- MongoDB >= 6.0

---

## 👨‍💻 Development Team

| Role         | Name   |
|--------------|--------|
| Frontend Dev | Trevor |
| Backend Dev  | Trevor |
| UI/UX Design | Trevor |

---

## 📦 Version

**v1.0.1**

---

## 📄 License

This project is licensed under the [ISC License](https://opensource.org/licenses/ISC).

---

## 📬 Contact

Feel free to open an issue or contact me via email: `your-email@example.com`.

---

Thank you for using **Nexa Tasks**! If you find this project useful, please consider giving it a ⭐️ on GitHub!
