# 💰 Expense Tracker Pro (React)

A sleek, functional single-page application (SPA) built with **React JS** to help users track their daily spending. This project demonstrates core React concepts including state management, controlled forms, validation logic, and dynamic data filtering.

---

## 🚀 Features

### **1. Expense Management (CRUD)**
* **Add Expense:** Create new entries with a title, amount, category, and optional description.
* **View List:** A real-time updated dashboard of all logged expenses.
* **Edit Expense:** Update existing records in-place without refreshing the page.
* **Delete Expense:** Remove entries instantly with state-driven UI updates.

### **2. Smart Filtering & Insights**
* **Category Filter:** A dropdown mechanism to isolate spending by specific categories (e.g., Food, Transport, Utilities).
* **Dynamic Totals:** Automatically calculates the total expenditure for the currently filtered view.

### **3. Robust Validation**
* **Title:** Mandatory field to ensure data clarity.
* **Amount:** Must be a valid positive number. 
* **Categories:** Selection restricted to a predefined list to maintain data integrity.

---

## 🏗️ Architecture & Data Strategy

### **Current Data Handling**
The application currently uses **Local Component State** stored as an array of objects.
* **Format:** `JSON` (JavaScript Object Notation).
* **Why:** For a frontend-only demo, JSON is the most efficient way to manage structured data in JavaScript. It allows for high-speed UI updates and is easily convertible if we decide to use `localStorage`.

### **Scalable Backend Architecture**
If this app were moved to production with a database, the architecture would look as follows:

1.  **Database Choice:** **PostgreSQL** (Relational).
    * *Why:* Financial data is structured and requires strict consistency (ACID compliance).
2.  **Database Schema:**
    * `id`: UUID (Primary Key)
    * `title`: VARCHAR(100)
    * `amount`: DECIMAL(10, 2)
    * `category`: VARCHAR(50)
    * `description`: TEXT
    * `created_at`: TIMESTAMP
3.  **Communication Flow:**
    * **Frontend:** React (State managed via Context API or Redux).
    * **Backend:** Node.js
    * **Protocol:** RESTful API using JSON over HTTPS.



## 💻 Installation & Setup

1.  **Clone the Repository:**
    ```bash
    git clone [https://github.com/your-username/expense-tracker-react.git](https://github.com/your-username/expense-tracker-react.git)
    ```
2.  **Navigate to Directory:**
    ```bash
    cd expense-tracker-react
    ```
3.  **Install Dependencies:**
    ```bash
    npm install
    ```
4.  **Start Development Server:**
    ```bash
    npm start
    ```
    *The app will be available at `http://localhost:3000`.*
