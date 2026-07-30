<div align="center">
  <h1>🏡 WanderLust</h1>
  <p>A full-stack, scalable property rental platform inspired by Airbnb.</p>
  
  [![Live Demo](https://img.shields.io/badge/Live_Demo-View_Website-success?style=for-the-badge)](https://wanderlust-1fem.onrender.com/listings)
</div>

<br />

## 📖 About The Project

WanderLust is a comprehensive, full-stack property listing application that allows users to seamlessly discover, create, and review rental properties worldwide. Built with a robust **Node.js/Express.js** backend and a responsive **Bootstrap 5/EJS** frontend, this platform demonstrates production-level features including secure user authentication, geospatial mapping, and cloud-based media storage.

**Live Project Link:** [WanderLust Live Demo](https://wanderlust-1fem.onrender.com/listings)

---

## 🏗️ Architecture & Flow

The application is built on a strict **MVC (Model-View-Controller)** architectural pattern, ensuring a clear separation of concerns, scalability, and maintainable codebase.

1.  **Client (View)**: Server-side rendered EJS templates combined with Bootstrap 5 present a dynamic, responsive UI. Mapbox GL JS handles interactive geospatial data.
2.  **Router (Express)**: Modularized routes (`/listings`, `/reviews`, `/users`) intercept HTTP requests and pass them through security and validation middleware.
3.  **Controller**: Houses the core business logic. It processes input, coordinates with third-party APIs (Cloudinary, Mapbox), and interacts with the database.
4.  **Database (Model)**: Mongoose schemas define the structure for Users, Listings, and Reviews in MongoDB, utilizing middleware hooks for data integrity (e.g., cascading deletes).

---

## ✨ Core Features

*   **Secure Authentication & Authorization:** Implemented using `Passport.js` with local strategies. Routes are protected via custom middleware to ensure only authorized owners can edit or delete their listings/reviews.
*   **Persistent Sessions:** Utilizes `express-session` backed by `connect-mongo` to store session data securely in a distributed MongoDB Atlas cluster, maintaining user state across server restarts.
*   **Geospatial Mapping & Forward Geocoding:** Integrated the **Mapbox SDK** to automatically convert user-entered location strings into GeoJSON coordinates, rendering an interactive map on the property details page.
*   **Cloud Media Management:** Integrated **Cloudinary** and `multer-storage-cloudinary` to handle direct, secure image uploads from the client, optimizing and storing media assets in the cloud.
*   **Interactive Review System:** Users can leave detailed comments and a 5-star visual rating. Average ratings dynamically update on the frontend.
*   **Robust Data Validation:** Utilizes `Joi` schema validation on the backend to enforce strict data sanitization and prevent malformed data from reaching the database.
*   **Custom Error Handling:** A centralized `wrapAsync` utility and custom `ExpressError` class catch asynchronous errors and render a clean, user-friendly error page.

---

## 💻 Technical Stack

### Frontend
*   **EJS & EJS-Mate:** Dynamic HTML templating and layout management.
*   **Bootstrap 5:** Responsive, mobile-first CSS framework.
*   **Mapbox GL JS:** Interactive map rendering.
*   **CSS3 & HTML5:** Custom styling and structure.

### Backend
*   **Node.js & Express.js:** Server runtime and web framework.
*   **Passport.js:** Authentication middleware.
*   **Multer:** `multipart/form-data` parser for file uploads.
*   **Joi:** Object schema validation.

### Database & Cloud Services
*   **MongoDB Atlas:** Fully managed cloud database.
*   **Mongoose:** Elegant MongoDB object modeling.
*   **Cloudinary:** Cloud-based image management.
*   **Mapbox API:** Geocoding services.
*   **Render:** Production cloud hosting platform.

---

## 🗄️ Database Schema & Relations

WanderLust uses a relational document structure within MongoDB:
*   **User:** Stores username, email, and hashed password.
*   **Listing:** Contains title, description, price, location, `geometry` (GeoJSON point), `image` (URL/filename), an array of Review ObjectIds (One-to-Many), and an `owner` ObjectId (One-to-One).
*   **Review:** Contains rating, comment, and an `author` ObjectId.
*   *Integrity:* Mongoose `findOneAndDelete` post-middleware ensures that when a Listing is deleted, all associated Reviews are also wiped from the database to prevent orphaned documents.

---

## ⚙️ Local Setup & Installation

To run this project locally, follow these steps:

### 1. Clone the repository
```bash
git clone https://github.com/ManasPurnendu/WanderLust.git
cd WanderLust
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory and add your API keys:
```env
# Cloudinary (Image Storage)
CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_api_key
CLOUD_API_SECRET=your_api_secret

# Mapbox (Geocoding & Maps)
MAP_TOKEN=your_mapbox_token

# MongoDB & Sessions
ATLASDB_URL=your_mongodb_connection_string
SECRET=your_secure_session_secret
```

### 4. Start the Application
```bash
nodemon app.js
# OR
node app.js
```
Navigate to `http://localhost:8080/listings` in your browser.

---

## 👨‍💻 Author

**Manas Purnendu**
- **GitHub:** [@ManasPurnendu](https://github.com/ManasPurnendu)
- **Live Demo:** [WanderLust](https://wanderlust-1fem.onrender.com/listings)