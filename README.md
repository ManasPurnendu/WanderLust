# 🏡 WanderLust

A full-stack Airbnb-inspired property listing web application built using **Node.js, Express.js, MongoDB, Mongoose, EJS, and Bootstrap**. 

WanderLust allows users to create, view, edit, and delete property listings along with adding and deleting reviews. It features secure user authentication via Passport.js, interactive maps powered by Mapbox, cloud image storage via Cloudinary, and follows a strict MVC architectural pattern.

---

# 🚀 Features

## Current Features

- User Authentication & Authorization (Passport.js)
- Secure Session Management & Flash Messages
- Create, view, edit, and delete property listings
- Add and delete reviews with a 5-star interactive rating system
- Interactive Maps & Forward Geocoding (Mapbox)
- Cloud Image Uploads (Cloudinary & Multer)
- Nested routing and MVC Project Architecture
- Server-side validation using Joi
- MongoDB relationships and cascading deletions (Mongoose Middleware)
- Server-side rendering using EJS and EJS-Mate
- Responsive UI built with Bootstrap 5

---

# 🛠️ Tech Stack

## Backend

- Node.js & Express.js
- Passport.js (Authentication)
- Express-Session & Connect-Flash (State Management)
- Multer (File parsing)

## Database & Storage

- MongoDB & Mongoose
- Cloudinary (Cloud media storage)

## Frontend

- EJS & EJS-Mate (Templating)
- Bootstrap 5 (CSS Framework)
- Mapbox GL JS (Interactive Maps)
- HTML5, CSS3, JavaScript

## Validation & Utilities

- Joi (Data Validation)
- Dotenv (Environment Variables)

---

# 📁 Project Structure

```text
Project1/
│
├── controllers/          # MVC Controllers (business logic)
├── init/                 # Database initialization/seeding
├── models/               # Mongoose schemas (Listing, Review, User)
├── routes/               # Express routers
├── public/               # Static assets (CSS, JS)
├── utils/                # Error handling utilities
├── views/                # EJS templates
│
├── schema.js             # Joi validation schemas
├── cloudConfig.js        # Cloudinary configuration
├── app.js                # Application entry point
└── package.json
```

---

# ⚙️ Installation

## 1. Clone the repository

```bash
git clone https://github.com/ManasPurnendu/WanderLust.git
cd WanderLust
```

## 2. Install dependencies

```bash
npm install
```

## 3. Configure Environment Variables

Create a `.env` file in the root directory and add the following keys:
```env
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
MAP_TOKEN=your_mapbox_access_token
SECRET=your_express_session_secret
```

## 4. Start MongoDB

Make sure MongoDB Community Server is running locally or provide an Atlas URI in your `.env`.

## 5. Seed the database (Optional)

```bash
node init/index.js
```

## 6. Start the application

```bash
nodemon app.js
```

## 7. Open your browser

```
http://localhost:8080/listings
```

---

# 🎯 Future Improvements

- Search & Filtering
- Image Carousel for multiple images
- Wishlist Feature
- Booking System
- Deployment on Render & MongoDB Atlas

---

# 📚 Learning Outcomes

This project helped me gain hands-on experience with:

- MVC (Model-View-Controller) Architecture
- User Authentication & Authorization (Passport.js)
- Session & Cookie Management
- Integrating Third-Party APIs (Mapbox, Cloudinary)
- Form Data Parsing & File Uploads (Multer)
- Express Router & RESTful Routing
- Middleware & Joi Validation
- MongoDB Relationships & Middleware
- Server-side Rendering using EJS
- Git & GitHub Workflow

---

# 👨‍💻 Author

**Manas Purnendu**

GitHub: https://github.com/ManasPurnendu