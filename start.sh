#!/bin/bash
echo "========================================"
echo "  ShopWave - Starting Development Server"
echo "========================================"
echo ""

echo "[1/2] Installing server dependencies..."
cd server && npm install && cd ..

echo ""
echo "[2/2] Installing client dependencies..."
cd client && npm install && cd ..

echo ""
echo "✅ Setup complete! Starting servers..."
echo ""
echo "  API  → http://localhost:4000"
echo "  App  → http://localhost:3000"
echo ""

# Start API server in background
cd server && node index.js &
SERVER_PID=$!
cd ..

sleep 1

# Start Vite in foreground
cd client && npx vite

# Kill server when Vite exits
kill $SERVER_PID 2>/dev/null
