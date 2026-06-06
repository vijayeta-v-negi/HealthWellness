# Health & Wellness Tracker

A full-stack MERN Health & Wellness application that helps users manage their fitness activities, nutrition intake, and personal wellness goals through an interactive dashboard and analytics.

## Live Demo

Frontend: https://healthwellness-1.onrender.com/

Backend: https://healthwellnessbck.onrender.com/

GitHub Repository: https://github.com/vijayeta-v-negi/HealthWellness/

---

# Features

## User Authentication
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- User Profile Management

## Fitness Tracking
Users can:
- Log workouts
- Track exercise duration
- Track calories burned
- Track distance covered
- View workout history
- Visualize workout progress using Chart.js

---

## Nutrition Tracking
Users can:
- Log daily meals
- Track calories consumed
- Track protein intake
- Track carbohydrates
- Track fats
- View meal history
- Visualize nutrition data using charts

---

## Goal Management

Users can create wellness goals using predefined goal types:
### Goal Types
- Steps
- Calories Burned
- Calories Consumed
- Water Intake
- Workout Duration
### Goal Features
- Create goals
- Set target values
- Track daily progress
- View goal completion percentages
- View goal history
- Delete goals
---

## Dashboard Analytics
Interactive dashboard displaying:
- Total Calories Burned
- Total Calories Consumed
- Total Workouts
- Total Meals Logged
- Goal Completion Percentage
Charts included:
- Fitness Progress Chart
- Nutrition Breakdown Chart
- Goal Analytics Chart

---

# Tech Stack

## Frontend
- React.js
- React Router DOM
- Axios
- Tailwind CSS
- Chart.js
- React Chartjs 2

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

## Deployment
- Netlify (Frontend and backend)

---

# Project Structure

## Frontend

```bash
frontend/
│
├── public/
│
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── FitnessChart.jsx
│   │   ├── NutritionChart.jsx
│   │   └── GoalChart.jsx
│   │
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Fitness.jsx
│   │   ├── Nutrition.jsx
│   │   └── Goals.jsx
│   │
│   ├── services/
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── exerciseService.js
│   │   ├── nutritionService.js
│   │   ├── goalService.js
│   │   ├── goalTrackingService.js
│   │   └── dashboardService.js
│   │
│   ├── App.jsx
│   └── main.jsx
│
└── package.json
```

## Backend
```bash
backend/
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   ├── exerciseController.js
│   ├── nutritionController.js
│   ├── goalController.js
│   └── dashboardController.js
│
├── middleware/
│   └── authMiddleware.js
│
├── models/
│   ├── User.js
│   ├── Exercise.js
│   ├── Nutrition.js
│   ├── Goal.js
│   └── GoalTracking.js
│
├── routes/
│   ├── authRoutes.js
│   ├── exerciseRoutes.js
│   ├── nutritionRoutes.js
│   ├── goalRoutes.js
│   └── dashboardRoutes.js
│
├── .env
├── server.js
└── package.json
```

---

# Installation

## Clone Repository

```bash
git clone <repository-url>
```

```bash
cd Health-Wellness-App
```

---

# Backend Setup

Navigate to backend:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_atlas_connection_string

JWT_SECRET=your_secret_key
```

Start server:

```bash
npm run dev
```

Backend runs on:

```bash
http://localhost:5000
```

---

# Frontend Setup

Navigate to frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Run application:

```bash
npm run dev
```

Frontend runs on:

```bash
http://localhost:5173
```

---

# API Endpoints

## Authentication

### Register

```http
POST /api/auth/register
```

### Login

```http
POST /api/auth/login
```

---

## Exercise

### Create Exercise

```http
POST /api/exercises
```

### Get Exercises

```http
GET /api/exercises
```

### Delete Exercise

```http
DELETE /api/exercises/:id
```

---

## Nutrition

### Create Meal

```http
POST /api/nutrition
```

### Get Meals

```http
GET /api/nutrition
```

### Delete Meal

```http
DELETE /api/nutrition/:id
```

---

## Goals

### Create Goal

```http
POST /api/goals
```

### Get Goals

```http
GET /api/goals
```

### Delete Goal

```http
DELETE /api/goals/:id
```

---

## Goal Tracking

### Add Daily Tracking

```http
POST /api/goals/:id/track
```

### Get Tracking History

```http
GET /api/goals/:id/tracking
```

---

## Dashboard

### Dashboard Statistics

```http
GET /api/dashboard
```

---

# Security Features

- Password Hashing using bcryptjs
- JWT Authentication
- Protected API Routes
- User-specific Data Isolation
- Environment Variable Protection

---
# Testing

create a user using register functionality or use demo user:
aya@gmail.com
123456

# Author

Developed using MERN Stack, Tailwind CSS, and Chart.js.
