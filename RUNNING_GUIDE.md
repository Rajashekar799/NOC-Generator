# NOC Generator App - How to Run

## Prerequisites
- Node.js installed (version 16 or higher)
- npm installed
- Windows Command Prompt or PowerShell

## Quick Start Guide

### Step 1: Open Two Terminals
1. Press `Win + R`, type `cmd`, press Enter (opens first terminal)
2. Press `Win + R` again, type `cmd`, press Enter (opens second terminal)

### Step 2: Navigate to Project Directory (Both Terminals)
In BOTH terminals, run:
```cmd
cd C:\Users\rikku\OneDrive\Desktop\project
```

### Step 3: Start Backend Server (Terminal 1)
In the FIRST terminal, run:
```cmd
npm run --prefix backend start
```
**Success indicators:**
- You should see: `Server running on port 5000 (in-memory mode)`
- The terminal will stay running (don't close it)

### Step 4: Start Frontend Server (Terminal 2)
In the SECOND terminal, run:
```cmd
npm run --prefix frontend dev
```
**Success indicators:**
- You should see: `Local: http://localhost:5174/`
- The terminal will stay running (don't close it)

### Step 5: Open the Application
1. Open your web browser (Chrome, Firefox, Edge)
2. Go to: `http://localhost:5174/`
3. You should see the NOC Generator homepage

## What Each Server Does

### Backend Server (Port 5000)
- Handles data storage (in memory)
- Provides API endpoints for NOC operations
- Generates PDF files
- **Must stay running** for the app to work

### Frontend Server (Port 5174)
- Serves the React web application
- Provides the user interface
- Communicates with backend API
- **Must stay running** for the app to work

## Testing the Application

### Generate a NOC
1. Click "Generate NOC" in the navigation
2. Fill the form:
   - Full Name: John Doe
   - Aadhaar Number: 123456789012
   - Phone Number: 9876543210
   - Address: 123 Main Street
   - Purpose: Employment
3. Click "Generate NOC"
4. You should see a success message

### View Records
1. Click "Records" in the navigation
2. You should see the NOC you just created
3. Click the download button to get the PDF

## Troubleshooting

### Problem: "npm command not found"
**Solution:** Install Node.js from https://nodejs.org/

### Problem: "Cannot find package.json"
**Solution:** Make sure you're in the project root directory:
```cmd
cd C:\Users\rikku\OneDrive\Desktop\project
```

### Problem: Port already in use
**Solution:** Close other applications using port 5000 or 5174, or change ports in server.js and vite.config.js

### Problem: Backend/Frontend not connecting
**Solution:** Ensure both servers are running and check the browser console for errors

## Stopping the Servers
- Press `Ctrl + C` in each terminal to stop the servers
- Close the terminal windows

## Development Mode
- Backend uses in-memory storage (data resets on restart)
- For production, configure MongoDB in backend/.env
- Frontend hot-reloads on code changes

---
**Need help?** Check that both terminals show the success messages above, and both servers are running simultaneously.
