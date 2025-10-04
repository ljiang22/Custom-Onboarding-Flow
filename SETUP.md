# Custom Onboarding Flow - Setup Instructions

This project implements a customizable onboarding flow with three main sections:

1. **User Onboarding Section** - 3-page wizard with customizable components
2. **Admin Section** - Interface to manage component placement and ordering
3. **Data Table** - View collected user data

## Prerequisites

- Node.js (v18 or higher)
- MongoDB (running locally or accessible)
- npm or yarn

## Project Structure

```
Custom-Onboarding-Flow/
├── backend/                 # Express.js API server
│   ├── src/
│   │   ├── models/         # MongoDB models
│   │   ├── controllers/    # API controllers
│   │   ├── routes/         # API routes
│   │   ├── app.ts          # Express app configuration
│   │   └── server.ts       # Server entry point
│   ├── package.json
│   └── tsconfig.json
├── frontend/               # Next.js React application
│   ├── src/
│   │   ├── app/           # Next.js app router pages
│   │   ├── components/    # React components
│   │   ├── lib/           # API client and utilities
│   │   └── types/         # TypeScript type definitions
│   ├── package.json
│   └── next.config.ts
└── README.md
```

## Setup Instructions

### 1. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in the backend directory:
```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/onboarding-flow
CORS_ORIGIN=http://localhost:3000
```

Start the backend server:
```bash
npm run dev
```

The backend will run on http://localhost:3001

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env.local` file in the frontend directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

Start the frontend development server:
```bash
npm run dev
```

The frontend will run on http://localhost:3000

### 3. MongoDB Setup

Make sure MongoDB is running on your system. The default connection string is:
```
mongodb://localhost:27017/onboarding-flow
```

## Features

### User Onboarding Flow

- **Step 1**: Email and password collection
- **Step 2**: Customizable components (About Me, Address, Birthdate)
- **Step 3**: Additional customizable components
- **Progress tracking**: Users can resume where they left off
- **Form validation**: Client-side validation with error messages

### Admin Panel (/admin)

- **Component Management**: Add/remove components from pages 2 and 3
- **Drag & Drop Ordering**: Reorder components within each page
- **Real-time Updates**: Changes are immediately reflected in the onboarding flow
- **No Authentication Required**: Accessible via /admin URL

### Data Table (/data)

- **User Data Display**: View all collected user information
- **Real-time Updates**: Refresh to see new data
- **Comprehensive View**: Shows all form fields and timestamps
- **No Authentication Required**: Accessible via /data URL

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `GET /api/users/:email` - Get user by email
- `POST /api/users` - Create new user
- `PUT /api/users/:email` - Update user data

### Configuration
- `GET /api/config` - Get onboarding configuration
- `PUT /api/config` - Update onboarding configuration

## Component Types

The system supports three types of form components:

1. **About Me** - Large text area for user description
2. **Address** - Street, city, state, and ZIP code fields
3. **Birthdate** - Date picker for birth date

## Default Configuration

On first run, the system creates a default configuration:
- **Page 2**: About Me, Birthdate
- **Page 3**: Address

## Development

### Backend Development
```bash
cd backend
npm run dev    # Start with nodemon
npm run build  # Build TypeScript
npm start      # Start production build
```

### Frontend Development
```bash
cd frontend
npm run dev    # Start Next.js dev server
npm run build  # Build for production
npm start      # Start production server
```

## Testing the Application

1. Start both backend and frontend servers
2. Visit http://localhost:3000
3. Enter an email to start onboarding
4. Complete the 3-step process
5. Visit http://localhost:3000/admin to configure components
6. Visit http://localhost:3000/data to view collected data

## Notes

- Passwords are stored in plain text (for demo purposes only)
- No authentication is required for admin or data pages
- The system automatically creates default configurations on first run
- Users can resume onboarding by entering the same email address
