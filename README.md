# 🏡 WanderLust

A full-stack Airbnb-inspired property listing web application built using **Node.js, Express.js, MongoDB, Mongoose, EJS, and Bootstrap**.

WanderLust allows users to create, view, edit, and delete property listings along with adding and deleting reviews. The project follows RESTful architecture, server-side rendering, modular routing using Express Router, and MongoDB relationships with Mongoose.

---

# 🚀 Features

## Current Features

- Create new property listings
- View all listings
- View individual listing details
- Edit existing listings
- Delete listings
- Add reviews to listings
- Delete reviews
- Nested routing using Express Router
- Server-side validation using Joi
- MongoDB relationships using Mongoose
- Cascading deletion of reviews using Mongoose Middleware
- Server-side rendering using EJS
- Layout management using EJS-Mate
- Responsive UI built with Bootstrap 5

---

# 🛠️ Tech Stack

## Backend

- Node.js
- Express.js

## Database

- MongoDB
- Mongoose

## Frontend

- EJS
- Bootstrap 5
- HTML5
- CSS3
- JavaScript

## Validation

- Joi

## Development Tools

- Nodemon
- Git
- GitHub

---

# 📁 Project Structure

```text
Project1/
│
├── init/
│   ├── data.js
│   └── index.js
│
├── models/
│   ├── listing.js
│   └── review.js
│
├── routes/
│   ├── listing.js
│   └── review.js
│
├── public/
│   └── css/
│
├── utils/
│   ├── ExpressError.js
│   └── wrapAsync.js
│
├── views/
│   ├── includes/
│   ├── layouts/
│   └── listings/
│
├── schema.js
├── app.js
├── package.json
└── package-lock.json
```

---

# ⚙️ Installation

## 1. Clone the repository

```bash
git clone https://github.com/ManasPurnendu/WanderLust.git
```

## 2. Navigate into the project

```bash
cd WanderLust
```

## 3. Install dependencies

```bash
npm install
```

## 4. Start MongoDB

Make sure MongoDB Community Server is running.

## 5. Seed the database

```bash
node init/index.js
```

## 6. Start the application

```bash
nodemon app.js
```

or

```bash
node app.js
```

## 7. Open your browser

```
http://localhost:8080/listings
```

---

# 📷 Screenshots

Coming Soon

- Home Page
- Listing Details
- Create Listing
- Edit Listing
- Review Section

---

# 🎯 Future Improvements

- User Authentication
- Authorization
- Cloudinary Image Uploads
- Interactive Maps
- Search & Filtering
- Image Carousel
- Wishlist Feature
- Booking System
- Responsive Mobile UI
- Flash Messages
- Deployment on Render

---

# 📚 Learning Outcomes

This project helped me gain hands-on experience with:

- Express.js
- Express Router
- RESTful Routing
- CRUD Operations
- Nested Routes
- Route Modularization
- Middleware
- Joi Validation
- MongoDB & Mongoose
- Mongoose Relationships
- Mongoose Middleware (Hooks)
- Server-side Rendering using EJS
- MVC-style Project Organization
- Git & GitHub Workflow

---

# 👨‍💻 Author

**Manas Purnendu**

GitHub: https://github.com/ManasPurnendu