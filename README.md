# 🛍️ ShopWave — E-Commerce Store

A full-stack e-commerce store with a premium dark UI, product filtering, cart, and checkout.

## 🚀 Quick Start

### Prerequisites
- **Node.js** v18+ → https://nodejs.org

### One-Command Setup

**Windows:**
```
Double-click start.bat
```

**Mac / Linux:**
```bash
chmod +x start.sh
./start.sh
```

Then open **http://localhost:3000** in your browser.

---

## 🔧 Manual Setup (if scripts don't work)

Open **two terminals**:

**Terminal 1 — API Server:**
```bash
cd server
npm install
node index.js
```

**Terminal 2 — React App:**
```bash
cd client
npm install
npx vite
```

---

## 📂 Project Structure

```
shopwave/
├── server/
│   ├── index.js          # Express API (port 4000)
│   └── products.json     # Product data
├── client/
│   ├── src/
│   │   ├── App.jsx           # Root component
│   │   ├── components/
│   │   │   ├── Navbar.jsx    # Top nav + search
│   │   │   ├── Hero.jsx      # Hero banner
│   │   │   ├── Sidebar.jsx   # Category/filter panel
│   │   │   ├── ProductCard.jsx
│   │   │   └── CartDrawer.jsx # Slide-out cart + checkout
│   │   ├── context/
│   │   │   └── CartContext.jsx
│   │   └── hooks/
│   │       └── useApi.js
│   └── vite.config.js    # Proxies /api → localhost:4000
├── start.bat             # Windows launcher
├── start.sh              # Mac/Linux launcher
└── README.md
```

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/products | List products (supports `?category=`, `?search=`, `?sort=`, `?maxPrice=`) |
| GET | /api/products/:id | Single product |
| GET | /api/categories | All categories |
| POST | /api/orders | Place an order |
| GET | /api/health | Health check |

## ✨ Features

- 12 products across 7 categories
- Real-time search + category filter + price range + sort
- Animated product cards with hover effects
- Slide-out cart drawer with quantity controls
- Checkout form with order confirmation
- Sticky navbar with scroll effect
- Fully responsive layout
- Dark luxury aesthetic (Playfair Display + DM Sans)
