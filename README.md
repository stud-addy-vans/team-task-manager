# Team Task Manager

A full-stack collaborative project management application built with the MERN stack (MongoDB, Express, React, Node.js). This platform allows users to securely register, create projects, manage role-based teams, and track task progress through an interactive dashboard.

## 🚀 Live Demo
**https://superb-respect-production.up.railway.app/**

---

## 🛑 For Reviewers / Evaluators
If you are evaluating this project, you can use the following test credentials to immediately access the dashboard without creating a new account:

* **Email:** `user@gmail.com`
* **Password:** `user1234`

*(Note: You can also use the native Sign-Up page to create a fresh test account if you prefer).*

---

## 🛠️ Tech Stack
* **Frontend:** React, Vite, Tailwind CSS, React Router, Axios
* **Backend:** Node.js, Express.js, JSON Web Tokens (JWT), bcryptjs
* **Database:** MongoDB Atlas (Mongoose ODM)
* **Deployment:** Railway (Monorepo deployment)

## ✨ Core Features
* **Secure Authentication:** JWT-based login and registration with encrypted passwords.
* **Project Management:** Users can create projects and automatically are assigned the 'Admin' role.
* **Task Tracking:** Full CRUD operations for tasks (Title, Description, Due Date, Priority).
* **Dynamic Dashboard:** Real-time calculation of total tasks, status breakdowns (To Do, In Progress, Done), and overdue tasks.
* **Role-Based Access:** Protected API routes ensure users can only see projects and tasks they are authorized to view.

## ⚙️ Local Setup Instructions

If you wish to run this application locally, follow these steps:

**1. Clone the repository:**
```bash
git clone [https://github.com/YOUR_USERNAME/team-task-manager.git](https://github.com/YOUR_USERNAME/team-task-manager.git)
cd team-task-manager
```

**2. Backend Setup:**
   * `cd backend`
   * `npm install`
   * Create a `.env` file with `PORT`, `MONGO_URI`, and `JWT_SECRET`.
   * `npm run dev`

**3. Frontend Setup:**
   * Open a new terminal and run `cd frontend`
   * `npm install`
   * Create a `.env` file with `VITE_API_URL=http://localhost:5000`
   * `npm run dev`

## ☁️ Deployment Architecture
This application is deployed as a monorepo on **Railway**.
  * `The backend runs as a continuous Node.js service connecting to a cloud-hosted MongoDB Atlas cluster`.
  * `The frontend utilizes Vite's production build system, configured with explicitly allowed hosts to securely serve the static React assets. API calls are dynamically routed via environment variables`.

---
&copy; 2026 Aditya. All rights reserved.
