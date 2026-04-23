# 🚀 ThreadLoom 

A modern, high-performance community discussion platform built with the **Next.js App Router**, **Prisma ORM**, and **PostgreSQL**.

## 🌟 Features
* **Topic Discovery:** Create and explore dedicated areas for specific subjects.
* **Nested Discussions:** Post-based architecture within topics to keep conversations organized.
* **Interactive Comments:** Engage with the community through real-time-feel commenting.
* **Responsive Design:** Fully optimized for mobile and desktop using Tailwind CSS.
* **Type-Safe Database:** Robust data handling with Prisma and PostgreSQL.

## 🛠️ Tech Stack
* **Framework:** Next.js 14+ (App Router)
* **Styling:** Tailwind CSS / Lucide React
* **Database:** PostgreSQL
* **ORM:** Prisma
* **Language:** TypeScript / JavaScript

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone [https://github.com/WaleedAfridi-1/threadloom-community-engine.git](https://github.com/WaleedAfridi-1/threadloom-community-engine.git)

cd threadloom-community-engine
```

### 2. Install dependencies
```bash
npm install
```

### 3. Environment Setup
Create a .env file in the root directory and add your PostgreSQL connection string:
```bash
DATABASE_URL="postgresql://username:mypassword@localhost:5432/mydb?schema=public"
```

### 4. Database Migration
```bash
npx prisma generate
npx prisma db push
```

### 5. Run the Development Server
```bash
npm run dev
```
Open http://localhost:3000 with your browser to see the result.



## 📁 Project Structure

* **/app** – Next.js App Router (Pages and API)
* **/components** – Reusable UI components (Modals, Lists, Forms)
* **/lib** – Prisma client and fetch utilities
* **/prisma** – Database schema

---

## 🤝 Contributing

Contributions are welcome! Feel free to open an issue or submit a pull request.

---

Made with ❤️ by **Waleed Afridi**
