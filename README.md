<div align="center">

# Inventory & Lending Management API

<p>Express.js & Prisma REST API for Equipment Lending & Asset Tracking</p>

![Status](https://img.shields.io/badge/Status-Active-success?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
![Express.js](https://img.shields.io/badge/Express.js-blue?style=flat-square) ![Prisma ORM](https://img.shields.io/badge/Prisma%20ORM-blue?style=flat-square) ![Node.js](https://img.shields.io/badge/Node.js-blue?style=flat-square) ![Inventory Management](https://img.shields.io/badge/Inventory%20Management-blue?style=flat-square)

</div>

---

## 📌 Overview
A backend service engineered to manage organization asset inventories, equipment check-outs, return logs, and borrower authorizations.

---

## ✨ Key Features
- Asset check-in and check-out tracking with borrower logs
- Item condition status updates (Available, Borrowed, Maintenance)
- Role-based authentication for admins and borrowers

---

## 🛠️ Tech Stack
- **Framework**: Express.js
- **ORM**: Prisma ORM
- **Database**: MySQL

---

## 📁 Project Structure
```text
system-inventory/
├── controller/         # Auth, Barang, Peminjaman controllers
├── middlewares/        # JWT auth verify middleware
└── prisma/             # Database schema
```

---

## 🚀 Getting Started

### Prerequisites
Make sure you have the required runtimes and tools installed on your machine:
- Node.js (v18+ recommended) / Appropriate runtime
- Git

### Installation & Local Setup
```bash
git clone https://github.com/MohammadKevin/system-inventory.git
cd system-inventory
npm install
npx prisma migrate dev
npm run dev
```

---

## 👤 Author
**Mohammad Kevin Arif Rudianto**
- **GitHub:** [@MohammadKevin](https://github.com/MohammadKevin)
- **Portfolio:** [portfolio-mohammadkevin.vercel.app](https://portfolio-mohammadkevin.vercel.app)
- **LinkedIn:** [Mohammad Kevin](https://www.linkedin.com/in/mohammad-kevin-arif-rudianto-945733347)
- **Email:** [kvn4.200581@gmail.com](mailto:kvn4.200581@gmail.com)

---

## 📄 License
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

<div align="center">
⭐️ If you found this repository useful, please consider giving it a star!
</div>
