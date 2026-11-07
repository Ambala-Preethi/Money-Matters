# Money Matters — Personal Expense Tracker

Money Matters is a modern, responsive personal finance web application built with **ReactJS** and **REST APIs**. It empowers users to monitor their financial health, track income and expenses, analyze category spending breakdowns, and perform full CRUD operations on transactions through a clean, intuitive fintech dashboard.

---

## 🌟 Key Features

- **Executive Financial Dashboard**:
  - **Summary Cards**: Real-time metrics for Total Balance, Total Income (Credit), and Total Expenses (Debit).
  - **Inflow vs Outflow Chart**: Weekly visual comparison between credits and debits.
  - **Category Breakdown**: Percentage and progress bar visualization of expenses by category (Food, Shopping, Entertainment, Bills, etc.).
  - **Recent Transactions**: Quick view of latest financial activities with instant edit/delete triggers.

- **Complete Transaction CRUD Operations**:
  - **Transaction Listing**: View all transactions in a responsive data table (desktop) and mobile cards.
  - **Filter & Search**: Segment by type (*All Transactions*, *Debit*, *Credit*), filter by category, or search dynamically by title, note, or amount.
  - **Add Transaction**: Clean modal dialog with form validation (required fields, positive amount checks, type selection, date-time selector).
  - **Edit Transaction**: Pre-populated modal form to modify transaction values seamlessly.
  - **Delete Transaction**: Confirmation modal with danger safeguards to prevent accidental deletion.

- **State Management & Architecture**:
  - Context API (`TransactionContext`) for centralized, predictable global state.
  - Asynchronous status handling for **Loading**, **Success**, **Empty**, and **Error** states.
  - Floating Toast alerts for operation feedback.
  - Resilient REST service layer (`api.js` & `transactionService.js`) with LocalStorage fallback and configurable live REST endpoint support.

- **Responsive & Accessible Design**:
  - Matches the provided Figma design specifications.
  - Deep slate/navy sidebar with gold and emerald accents, clean cards, and smooth micro-interactions.
  - Adaptive layout for Desktop, Laptop, Tablet, and Mobile screens with slide-over navigation drawer.

---

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| **React 18** | Frontend Component Framework |
| **Vite 5** | Lightning-fast Build Tool and Dev Server |
| **JavaScript (ES6+)** | Core Application Logic |
| **CSS3** | Modern CSS Variables, Flexbox, CSS Grid & Responsive Design |
| **Lucide React** | Consistent, Accessible UI Icons |
| **REST APIs & Fetch** | Backend Service Communication |
| **Git & GitHub** | Version Control and Repository Hosting |

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:
- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **npm**: v9.0.0 or higher
- **Git**

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Ambala-Preethi/money-matters.git
   cd money-matters
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3000
   ```

### Production Build

To compile and optimize the application for production:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

---

## 🔌 REST API Configuration

The application features a centralized service layer in `src/services/api.js` and `src/services/transactionService.js`.

### Environment Variables

You can connect to a custom REST backend or the provided Postman collection API by adding a `.env` file in the root directory:

```env
VITE_API_BASE_URL=https://your-api-endpoint.com/api/rest
```

### Endpoints Covered

| Operation | HTTP Method | Endpoint | Description |
|---|---|---|---|
| **Retrieve Transactions** | `GET` | `/transactions` | Fetches all income and expense records |
| **Create Transaction** | `POST` | `/transactions` | Adds a new transaction entry |
| **Update Transaction** | `PUT` | `/transactions/:id` | Modifies an existing transaction |
| **Delete Transaction** | `DELETE` | `/transactions/:id` | Removes a transaction record |

> **Note on Offline Resilience**: If no external API is reachable or configured, the app seamlessly defaults to an in-browser REST mock with `localStorage` persistence, ensuring the user experience remains 100% interactive without runtime breaks.

---

## 📁 Project Structure

```
reacttproject/
├── public/
├── src/
│   ├── components/
│   │   ├── common/             # Reusable UI primitives (Button, Input, Select, Modal, Loader, States, Toast)
│   │   ├── Dashboard/          # SummaryCards, FinancialOverview, RecentTransactions
│   │   ├── Header/             # Global Header, search bar, mobile trigger
│   │   ├── Modals/             # TransactionModal (Add/Edit), DeleteConfirmModal, LogoutModal
│   │   ├── Sidebar/            # Navigation sidebar and user profile
│   │   └── Transactions/       # TransactionList, TransactionItem, TransactionTabs
│   ├── context/
│   │   └── TransactionContext.jsx # Global state management & CRUD actions
│   ├── constants/
│   │   └── index.js            # Categories, initial transaction datasets, user constants
│   ├── pages/
│   │   ├── DashboardPage.jsx   # Financial summary & analytics view
│   │   ├── TransactionsPage.jsx# Complete transaction table and filtering view
│   │   └── ProfilePage.jsx     # User settings, preferences, and reset utility
│   ├── services/
│   │   ├── api.js              # Centralized HTTP request client & mock REST engine
│   │   └── transactionService.js # High-level CRUD operations
│   ├── utils/
│   │   └── formatters.js       # Currency, date, and chart aggregator utilities
│   ├── App.jsx                 # Main layout & router orchestration
│   ├── main.jsx                # Application root mounting
│   ├── App.css                 # Application layout & component styles
│   └── index.css               # Design tokens, variables, and base typography
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 📹 Loom Video Walkthrough Plan

A 5-minute Loom walkthrough structure for this project:

| Time | Agenda | Highlights to Cover |
|---|---|---|
| **0:00 – 0:30** | Project Introduction | Overview of Money Matters, problem statement, and goals. |
| **0:30 – 1:15** | Architecture & Tech Stack | Component hierarchy, Vite setup, Context API, and CSS design system. |
| **1:15 – 2:00** | Dashboard & Financial Insights | Summary cards (Income/Expense/Balance), weekly inflow/outflow chart, and category breakdown. |
| **2:00 – 3:15** | CRUD Operations Demo | Demonstration of Add Transaction with validation, Edit Transaction, and Delete Transaction with confirmation. |
| **3:15 – 4:15** | API Integration & Status Handling | Review of `api.js`, `transactionService.js`, loading skeletons, error states, and toasts. |
| **4:15 – 5:00** | Responsive View & Conclusion | Demonstration of mobile drawer/card view, code review, and wrap-up. |

---

## 📄 License

This project is licensed under the MIT License.

