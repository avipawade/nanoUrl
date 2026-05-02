# 🔗 Nano Link — URL Shortener

A full-stack URL shortener web application built with **React + TypeScript** on the frontend and **Node.js + Express + MongoDB** on the backend. Paste any long URL, get a compact short link, track click counts, and manage your links from a clean dashboard.

---

## 📁 Project Structure

```
nano-link/
├── client/          # React + Vite + TypeScript frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Header.tsx       # Navigation bar
│   │   │   ├── Footer.tsx       # Footer
│   │   │   ├── Container.tsx    # Root state manager (fetches all URLs)
│   │   │   ├── FormContainer.tsx # URL input form + submit
│   │   │   └── DataTable.tsx    # Table with copy/delete actions
│   │   ├── utils/constants.ts   # Backend API base URL
│   │   ├── types.ts             # TypeScript interfaces (UrlData)
│   │   └── App.tsx              # App root — Header + Container + Footer
│   ├── .env                     # VITE_SERVER_URL (Vite env var)
│   └── vite.config.ts           # Dev server on port 3000
│
└── server/          # Node.js + Express + TypeScript backend
    ├── src/
    │   ├── config/db-config.ts      # MongoDB connection via Mongoose
    │   ├── modals/short-url.modal.ts # Mongoose schema (fullUrl, shortUrl, clicks)
    │   ├── controllers/short-url.controller.ts # CRUD logic
    │   ├── routes/short-url.route.ts # Express router
    │   └── index.ts             # App entry — express setup + server start
    └── .env                     # MONGODB_URI + PORT
```

---

## 🛠️ Prerequisites

Make sure the following are installed on your machine before proceeding:

| Tool | Version | Install |
|------|---------|---------|
| Node.js | ≥ 18.x | [nodejs.org](https://nodejs.org) |
| npm | ≥ 9.x | Comes with Node.js |
| MongoDB | ≥ 6.x | [mongodb.com](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free cloud) |

---

## ⚙️ Setup & Running Locally

### Step 1 — Clone and navigate

```bash
git clone <your-repo-url>
cd nano-link
```

---

### Step 2 — Setup the Backend (Server)

```bash
cd server
```

**Install dependencies:**
```bash
npm install
```

**Create the `.env` file** in the `server/` directory:
```env
MONGODB_URI=mongodb://localhost:27017/nanolink
PORT=3001
```

> 💡 If you're using **MongoDB Atlas** (cloud), replace the URI with your Atlas connection string:
> ```
> MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/nanolink
> ```

**Start the server in dev mode:**
```bash
npm run dev
```

You should see:
```
server is running at port: 3001
database connected to localhost
```

> The server runs on **http://localhost:3001**

---

### Step 3 — Setup the Frontend (Client)

Open a **new terminal tab** and run:

```bash
cd client
```

**Install dependencies:**
```bash
npm install
```

**Verify the `.env` file** in `client/` (already set up):
```env
VITE_SERVER_URL=http://localhost:3001/api
```

**Start the frontend dev server:**
```bash
npm run dev
```

The app will open automatically at **http://localhost:3000**

---

### ✅ Running Order Summary

```
Terminal 1:  cd server  →  npm run dev   (starts backend on :3001)
Terminal 2:  cd client  →  npm run dev   (starts frontend on :3000)
```

Open your browser → http://localhost:3000

---

## 🔌 API Endpoints

Base URL: `http://localhost:3001/api`

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/short-url` | Create a new short URL |
| `GET` | `/short-url` | Get all short URLs (sorted by newest) |
| `GET` | `/short-url/:id` | Redirect to original URL + increment click count |
| `DELETE` | `/short-url/:id` | Delete a short URL by MongoDB `_id` |

### Example Request

```bash
# Create a short URL
curl -X POST http://localhost:3001/api/short-url \
  -H "Content-Type: application/json" \
  -d '{"fullUrl": "https://www.example.com/very/long/url"}'

# Response
{
  "message": "url created successfully",
  "shortUrl": {
    "_id": "...",
    "fullUrl": "https://www.example.com/very/long/url",
    "shortUrl": "aB3xZ9kLmN",
    "clicks": 0,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

## 🧠 How It Works — Architecture

```
User Browser
    │
    ▼
React Frontend (port 3000)
    │  HTTP requests via Axios
    ▼
Express REST API (port 3001)
    │  Mongoose ODM
    ▼
MongoDB Database (nanolink collection)
```

1. User enters a long URL in the form.
2. Frontend sends `POST /api/short-url` to backend.
3. Backend checks if the URL already exists (deduplication).
4. If new, Mongoose creates a document with `nanoid` generating a unique 10-character short code.
5. The short URL appears in the table below.
6. Clicking the short URL hits `GET /api/short-url/:id` → increments click count → redirects to original URL.
7. Users can copy the short link to clipboard or delete it.

---

## 🌐 Tech Stack

### Frontend
- **React 19** — UI library
- **TypeScript** — Type safety
- **Vite** — Lightning-fast dev server & bundler
- **Tailwind CSS** — Utility-first styling
- **Axios** — HTTP client
- **React Router DOM** — Client-side routing

### Backend
- **Node.js** — Runtime
- **Express.js** — REST API framework
- **TypeScript** — Type safety
- **Mongoose** — MongoDB ODM
- **MongoDB** — NoSQL database
- **nanoid** — Short unique ID generation
- **dotenv** — Environment variable management
- **cors** — Cross-Origin Resource Sharing

---

## 🎤 STAR Pattern — Interview Answer

### **"Tell me about a project you built."**

---

**⭐ S — Situation**

> "During my learning journey, I wanted to build a real-world full-stack project that touched every layer of web development — frontend, backend, database, and REST API design. I noticed that developers and content creators often share extremely long URLs that are hard to remember or share cleanly. I decided to solve that by building a URL shortener from scratch."

---

**⭐ T — Task**

> "My goal was to build a fully functional URL shortener called **Nano Link** that could:
> - Accept any long URL and generate a unique short code
> - Track how many times each short URL was clicked
> - Let users copy and delete their links from a dashboard
> - Store all data persistently in a database
> - Be built with a modern, production-relevant tech stack"

---

**⭐ A — Action**

> "I architected it as a **monorepo** with two separate applications — a **React + TypeScript** frontend powered by Vite and Tailwind, and a **Node.js + Express + TypeScript** REST API backend.
>
> On the backend, I designed a MongoDB schema using Mongoose with three fields: `fullUrl`, `shortUrl` (auto-generated using **nanoid** — a library that creates unique 10-character alphanumeric IDs), and `clicks` for analytics.
>
> I exposed four RESTful API endpoints — `POST` to create, `GET` to list all, `GET /:id` to redirect (which also increments the click count), and `DELETE /:id` to remove a URL.
>
> On the frontend, I built a state management flow using React hooks — the `Container` component owns the data state and passes it down to a `FormContainer` for input and a `DataTable` for display. When a new URL is submitted, a reload flag triggers a fresh fetch from the API, keeping the UI in sync.
>
> I also implemented deduplication — if the same URL is submitted twice, the server returns the existing entry with a `409 Conflict` instead of creating duplicates."

---

**⭐ R — Result**

> "The end result is a fully working full-stack application with a clean dashboard UI. Users can shorten any URL, see all their links in a table with click analytics, copy them to clipboard in one click, and delete entries they no longer need. The project taught me the complete request lifecycle — from a browser form submission all the way to a database write and back — and gave me hands-on experience with TypeScript on both the client and server side."

---

## 🐛 Known Issues Fixed

| Issue | Fix Applied |
|-------|------------|
| `.env` was inside `src/` — Vite ignores it | Moved `.env` to `client/` root |
| `VITE_SERVER_URL` pointed to port `3000` (same as client) | Fixed to point to port `3001` (backend) |
| Server had no `.env` — `MONGODB_URI` was `undefined` | Created `server/.env` with correct values |
| `typescript` was missing from server devDependencies | Installed `typescript` + `ts-node` |
| No `dev` script on server | Added `nodemon --exec ts-node` dev script |
