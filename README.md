# Mini LinkedIn-like Community Platform

A simple LinkedIn-style community platform with user authentication, public post feed, and profile pages.

---

## 🚀 Live Demo

[Live Demo URL](https://linkedin-clone-aditya.vercel.app)  


---

## 📦 GitHub Repository

[GitHub Repo Link](https://github.com/aditya-sadavare/Linkedin-Clone-Project)  

---

## 🛠️ Tech Stack

- **Frontend:** React (Vite)
- **Backend:** Node.js, Express
- **Database:** MongoDB (Mongoose)
- **Deployment:** Vercel (frontend), Vercal (backend)

---

## ✨ Features

- **User Authentication**
  - Register/Login (Email & Password)
  - Profile with name, email, bio
  - JWT, Bcrypt
- **Public Post Feed**
  - Create, read, and display text-only posts
  - Home feed with author’s name and timestamp
- **Profile Page**
  - View a user’s profile and their posts
  - Edit/Delete your own posts

---

## ⚙️ Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/your-repo.git
cd your-repo
```

### 2. Setup Backend

```bash
cd backend
npm install
```

- Create a `.env` file in `/backend`:
  ```
  PORT=5000
  MONGO_URI=mongodb://127.0.0.1:27017/linkedin_clone
  JWT_SECRET=your_jwt_secret
  FRONTEND_URL=http://localhost:5173
  ```
- Start MongoDB locally (`mongod`).
- Start the backend:
  ```bash
  npm run dev
  ```

### 3. Setup Frontend

```bash
cd ../frontend
npm install
```

- Create a `.env` file in `/frontend`:
  ```
  VITE_BACKEND_URL=http://localhost:5000
  ```
- Start the frontend:
  ```bash
  npm run dev
  ```

---

## 👤 Demo User Logins

You can register a new user, or use these demo credentials (if seeded):

- **Email:** demo@gmail.com
- **Password:** demo

---

## 🌐 Deployment

- **Frontend:** Deploy `/frontend` on [Vercel](https://linkedin-clone-aditya.vercel.app/) 
- **Backend:** Deploy `/backend` on [Vercel]([https://render.com/](https://linkedin-backend-aditya.vercel.app))
- Update your `.env` files with the deployed URLs.

---

## 📝 Extra Features

- JWT authentication with httpOnly cookies (secure and sessionless)
- Only post owners can edit/delete their posts
- Responsive UI

---

## 📄 License

MIT

---

> **Made with ❤️ for Humanity Founders Full Stack Internship Challenge**
