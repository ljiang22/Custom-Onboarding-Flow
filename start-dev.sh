#!/bin/bash

# Start both backend and frontend development servers

echo "Starting Custom Onboarding Flow Development Servers..."

# Start backend in background
echo "Starting backend server on port 3001..."
cd backend
npm run dev &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start frontend
echo "Starting frontend server on port 3000..."
cd ../frontend
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Both servers are starting up!"
echo "Backend: http://localhost:3001"
echo "Frontend: http://localhost:3000"
echo "Admin Panel: http://localhost:3000/admin"
echo "Data Table: http://localhost:3000/data"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for user to stop
wait

# Cleanup on exit
echo "Stopping servers..."
kill $BACKEND_PID 2>/dev/null
kill $FRONTEND_PID 2>/dev/null
echo "Servers stopped."
