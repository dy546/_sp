#!/bin/bash
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

echo "Starting Satellite & RF Intelligence..."
echo ""

# Start server
echo "[1/2] Installing server dependencies and starting on port 3001..."
cd "$SCRIPT_DIR/server"
npm install --silent
node src/index.js &
SERVER_PID=$!

# Wait for server to be ready
echo "      Waiting for backend..."
for i in $(seq 1 15); do
  if curl -s http://localhost:3001/api/health > /dev/null 2>&1; then
    echo "      Backend ready."
    break
  fi
  sleep 1
done

# Start client
echo "[2/2] Installing client dependencies and starting on port 5173..."
cd "$SCRIPT_DIR/client"
npm install --silent
npx vite --host &
CLIENT_PID=$!

echo ""
echo "============================================"
echo "  Satellite & RF Intelligence"
echo "============================================"
echo "  Frontend: http://localhost:5173"
echo "  Backend:  http://localhost:3001"
echo "  API Docs: http://localhost:3001/api/health"
echo "============================================"
echo ""
echo "Press Ctrl+C to stop both servers"

trap "kill $SERVER_PID $CLIENT_PID 2>/dev/null; exit" INT TERM
wait
