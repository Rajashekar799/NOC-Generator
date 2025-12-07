# NOC Generator

A full-stack MERN application for generating No Objection Certificates (NOC).

## Features

- Generate NOC by filling a form with personal details
- View generated NOC text
- Download NOC as PDF
- View all records in a table
- Search records by name or Aadhaar
- Responsive UI with Tailwind CSS
- Toast notifications for user feedback

## Tech Stack

- **Backend**: Node.js, Express, MongoDB, Mongoose, PDFKit
- **Frontend**: React, Axios, React Router, Tailwind CSS, React Toastify

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or cloud instance like MongoDB Atlas)

#### Installing MongoDB Locally (Windows)

1. Download MongoDB Community Server from https://www.mongodb.com/try/download/community
2. Install the MSI package
3. Add MongoDB bin directory to PATH (e.g., C:\Program Files\MongoDB\Server\7.0\bin)
4. Create data directory: `mkdir C:\data\db`
5. Start MongoDB: `mongod` (in a separate terminal)

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the backend directory and add your MongoDB URI:
   ```
   MONGO_URI=mongodb://localhost:27017/nocdb
   ```

4. Start the backend server:
   ```
   npm start
   ```
   The server will run on http://localhost:5000

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```
   The app will run on http://localhost:5173

### Usage

1. Open http://localhost:5173 in your browser
2. Navigate to /generate to create a new NOC
3. Fill in the form and submit
4. View the generated NOC and download as PDF
5. Navigate to /records to view all NOCs
6. Use the search bar to filter records

## API Endpoints

- `POST /api/noc` - Create a new NOC
- `GET /api/noc` - Get all NOCs
- `GET /api/noc/:id` - Get a single NOC by ID
- `DELETE /api/noc/:id` - Delete a NOC by ID
- `GET /api/noc/:id/pdf` - Download NOC as PDF
"# NOC-Generator" 
