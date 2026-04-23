#!/bin/bash
echo "Starting Palantir Satellite & RF Tracker..."
echo ""

# Start server
echo "[1/2] Starting backend server on port 3001..."
cd "$(dirname "$0")/server"
node src/index.js &
SERVER_PID=$!
sleep 2

# Start client
echo "[2/2] Starting frontend on port 5173..."
cd "$(dirname "$0")/client"
npx vite --host &
CLIENT_PID=$!

echo ""
echo "============================================"
echo "  Palantir Satellite & RF Intelligence"
echo "============================================"
echo "  Frontend: http://localhost:5173"
echo "  Backend:  http://localhost:3001"
echo "  API Docs: http://localhost:3001/api/health"
echo "============================================"
echo ""
echo "Press Ctrl+C to stop both servers"

trap "kill $SERVER_PID $CLIENT_PID 2>/dev/null; exit" INT TERM
wait
