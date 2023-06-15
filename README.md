<div align="center">

<!-- Title: -->
  <a target="_blank">
    <img src="./Screenshot 2023-06-14 004446.png" height="150" alt="Logo with shadow">
  </a>

<!-- Short description: -->
<h2>TransFund</h2>

<!-- Labels: -->
  <div>
    <img src="https://badges.frapsoft.com/os/v1/open-source.svg?v=102" height="20">
  <a href="https://mernauth.rohittewari.live" target="_blank">
    <img src="https://img.shields.io/website-up-down-green-red/https/mernauth.rohittewari.live.svg" height="20" alt="Website up">
  </a>
  <img src="https://img.shields.io/github/repo-size/rtewari056/mern-stack-authentication-boilerplate.svg?label=Repo%20size" height="20" alt="Repo size">
  <img src="https://img.shields.io/github/languages/top/rtewari056/mern-stack-authentication-boilerplate" height="20" alt="GitHub top language">
  <a href="./LICENSE">
    <img src="https://img.shields.io/github/license/rtewari056/mern-stack-authentication-boilerplate" height="20" alt="MIT License">
  </a>
  </div>

</div>

## 🚀 Demo

This application will be deployed on  

## 🖥️ Tech Stack

**Frontend:**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)&nbsp;
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)&nbsp;
![JavaScript](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)&nbsp;
![Bootstrap](https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white)&nbsp;
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)&nbsp;
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)&nbsp;

**Backend:**

![Node JS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)&nbsp;
![HTML5](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)&nbsp;
![JWT](https://img.shields.io/badge/json%20web%20tokens-323330?style=for-the-badge&logo=json-web-tokens&logoColor=pink)&nbsp;

**Database:**

![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)&nbsp;

**Deployed On:**



## ⚡️ Features

- [x] Protected routes with Higher Order Components
- [x] Login with forgot password feature.
- [x] JWT protected APIs
- [x] Passwords are encrypted.
- [x] Image upload with Cloudinary
- [x] Toast notifications for user actions.

## 📁 Project structure
```terminal
├── client/
│   ├── public/
│   │   ├── favicon.ico
│   │   ├── index.html
│   │   ├── logo192.png
│   │   ├── logo512.png
│   │   ├── manifest.json
│   │   └── robots.txt
│   ├── src/
│   │   ├── assets/
│   │   │   ├── email.svg
│   │   │   ├── green_check.svg.json
│   │   │   ├── index.js
│   │   │   ├── logo.png
│   │   │   └── user.svg
│   │   ├── components/
│   │   │   ├── NavigationBar/
│   │   │   │   ├── NavigationBar.jsx
│   │   │   │   └── NavigationBar.css
│   │   │   ├── ProfileModal/
│   │   │   │   └── ProfileModal.jsx
│   │   │   └── index.js
│   │   ├── context/
│   │   │   └── AuthProvider.jsx
│   │   ├── Pages/
│   │   │   ├── ForgotPasswordPage/
│   │   │   │   ├── ForgotPasswordPage.css
│   │   │   │   └── ForgotPasswordPage.jsx
│   │   │   ├── HomePage/
│   │   │   │   ├── HomePage.css
│   │   │   │   └── HomePage.jsx
│   │   │   ├── LoginPage/
│   │   │   │   ├── LoginPage.css
│   │   │   │   └── LoginPage.jsx
│   │   │   ├── PasswordResetPage/
│   │   │   │   ├── PasswordResetPage.css
│   │   │   │   └── PasswordResetPage.jsx
│   │   │   ├── RegisterPage/
│   │   │   │   ├── RegisterPage.css
│   │   │   │   └── RegisterPage.jsx
│   │   │   └── index.js
│   │   ├── Utils/
│   │   │   ├── index.js
│   │   │   ├── notify.js
│   │   │   └── PrivateRoutes.jsx
│   │   ├── App.css
│   │   ├── App.jsx
│   │   └── index.js
│   ├── .env.example
│   ├── package-lock.json
│   └── package.json
├── config/
│   └── db.js
├── controllers/
│   ├── auth.js
│   └── private.js
├── middleware/
│   ├── auth.js
│   └── error.js
├── models/
│   └── User.js
├── routes/
│   ├── auth.js
│   └── private.js
├── utils/
│   ├── errorResponse.js
│   └── sendEmail.js
├── .env.example
├── .gitignore
├── LICENSE
├── package-lock.json
├── package.json
├── README.md
└── server.js
```

## 📖 Prerequisites

In order to run the project you need `node>=16` and `npm>=8` installed on your machine.

## MongoDB

Install MongoDB Compass. And make sure path env is set. Then run `mongod` in terminal. 
Afterwards, start server. (remember to set env variable in .env file using 127.0.0.1 NOT localhost)

## 🚩 Getting Started

### 1. Clone this repository

### 2. Navigate into repo

### 3. Rename `.env.example` into `.env` and put all necessary creadentials

### 4. Install package dependencies:

```bash
# Server dependencies
npm install express cors mongoose dotenv jsonwebtoken bcrypt

cd client

# Client dependencies
npm install 
```

### 4. Run project:
In the `root` directory, open two terminal sessions and run both commands separately:

```bash
npm run client
npm run server
```

### 5. Open your browser and go to `http://localhost:3000`
