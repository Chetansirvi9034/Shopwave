@echo off
echo ========================================
echo   ShopWave - Starting Development Server
echo ========================================
echo.

echo [1/2] Installing server dependencies...
cd server
call npm install
cd ..

echo.
echo [2/2] Installing client dependencies...
cd client
call npm install
cd ..

echo.
echo ✅ Setup complete! Starting servers...
echo.
echo  API   → http://localhost:4000
echo  App   → http://localhost:3000
echo.

start "ShopWave API" cmd /k "cd server && node index.js"
timeout /t 2 /nobreak >nul
start "ShopWave App" cmd /k "cd client && npx vite"

echo Both servers are starting in separate windows.
echo Open http://localhost:3000 in your browser.
pause
