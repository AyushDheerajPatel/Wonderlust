# 🌍 WanderLust - Travel Listing Web Application

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18+-green?style=for-the-badge&logo=node.js"/>
  <img src="https://img.shields.io/badge/Express.js-Backend-black?style=for-the-badge&logo=express"/>
  <img src="https://img.shields.io/badge/MongoDB-Database-green?style=for-the-badge&logo=mongodb"/>
  <img src="https://img.shields.io/badge/EJS-Template-orange?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Cloudinary-Image%20Storage-blue?style=for-the-badge&logo=cloudinary"/>
</p>

## 📌 Overview

**WanderLust** is a full-stack travel listing web application inspired by Airbnb. Users can explore travel destinations, create their own listings, upload images, leave reviews, and manage their travel properties through a secure authentication system.

The project follows the MVC architecture and provides a clean, responsive, and user-friendly interface.

---

# ✨ Features

### 👤 Authentication
- User Registration
- Secure Login & Logout
- Password Encryption
- Session Management
- Authorization & Authentication

### 🏡 Listings
- View all listings
- Create new listings
- Edit existing listings
- Delete listings
- Detailed listing page
- Image upload with Cloudinary

### ⭐ Reviews
- Add Reviews
- Delete Reviews
- Star Rating System

### 🗺️ Location
- Interactive Map Integration
- Geocoding using Mapbox
- Location-based Listings

### 🔒 Security
- Input Validation
- Authentication Middleware
- Authorization Middleware
- Flash Messages
- Error Handling

---

# 🛠️ Tech Stack

## Frontend

- HTML5
- CSS3
- Bootstrap 5
- JavaScript
- EJS

## Backend

- Node.js
- Express.js

## Database

- MongoDB
- Mongoose

## Authentication

- Passport.js
- Passport Local

## Cloud Services

- Cloudinary
- Multer

## Maps

- Mapbox / MapLibre

---

# 📂 Project Structure

```
WanderLust
│
├── models/
├── routes/
├── controllers/
├── middleware/
├── views/
├── public/
│
├── utils/
├── app.js
├── cloudConfig.js
├── schema.js
└── package.json
```

---

# 🚀 Installation

Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/WanderLust.git
```

Move into project directory

```bash
cd WanderLust
```

Install dependencies

```bash
npm install
```

Create a **.env** file

```env
ATLASDB_URL=your_mongodb_connection

CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_key
CLOUD_API_SECRET=your_cloudinary_secret

MAP_TOKEN=your_mapbox_token

SECRET=your_secret
```

Run the project

```bash
npm start
```

or

```bash
nodemon app.js
```

Open

```
http://localhost:8080
```

---

# 📸 Screenshots

## Home Page

<img width="1520" height="689" alt="image" src="https://github.com/user-attachments/assets/c786afc0-0968-4e51-bfc8-493977302820" />


## Listing Details

<img width="1520" height="862" alt="image" src="https://github.com/user-attachments/assets/7a894694-a0a9-4a7a-ace7-cdfa75fd125b" />


## Add Listing

<img width="1519" height="694" alt="image" src="https://github.com/user-attachments/assets/211a179d-e02a-4ed2-a45a-0c23be795a5b" />


## Sign Up

<img width="1536" height="696" alt="image" src="https://github.com/user-attachments/assets/5e41b3a3-b894-4f2a-97b9-169d65065283" />


## Map

<img width="1521" height="692" alt="image" src="https://github.com/user-attachments/assets/5b363e3c-7157-48b9-ac61-7c1ac16f525a" />


---

# 📚 Learning Outcomes

During this project I learned:

- MVC Architecture
- REST APIs
- CRUD Operations
- Authentication & Authorization
- MongoDB Relationships
- Image Upload using Cloudinary
- Express Middleware
- Session Management
- Server-side Validation
- Error Handling
- Git & GitHub Workflow

---

# 🌟 Future Improvements

- Wishlist Feature
- Booking System
- Payment Gateway
- User Profile
- Search Filters
- Google OAuth Login
- Responsive Mobile UI
- Admin Dashboard

---

# 🤝 Contributing

Contributions are always welcome.

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature-name
```

3. Commit changes

```bash
git commit -m "Added new feature"
```

4. Push

```bash
git push origin feature-name
```

5. Create a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Developer

### Ayush Patel

B.Tech CSE Student

📧 Email: ayushdheerajpatel@gmail.com

🔗 LinkedIn:
https://www.linkedin.com/in/ayush-patel-seri/

💻 GitHub:
https://github.com/AyushDheerajPatel

---

## ⭐ If you like this project, don't forget to give it a Star!
