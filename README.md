# Custom Onboarding Flow

A flexible, customizable user onboarding system built with Next.js, Express, and MongoDB. This application allows (non-technical) administrators to easily configure and manage user onboarding flows through a drag-and-drop admin interface.

## 🚀 Features

### User Onboarding
- **3-Step Wizard**: Clean, guided onboarding process
- **Progress Tracking**: Visual progress bar and step indicators
- **Form Persistence**: Users can resume where they left off
- **Customizable Components**: Dynamic form fields based on admin configuration
- **Completion Screen**: Professional finish with success confirmation

### Admin Panel
- **Drag & Drop Interface**: Easy component reordering with `@dnd-kit`
- **Component Management**: Add/remove form components from pages
- **Cross-Page Validation**: Prevents duplicate components across pages
- **Minimum Requirements**: Ensures each page has at least one component
- **Real-time Preview**: See changes immediately

### Data Management
- **User Data Table**: View all collected user information
- **Individual & Bulk Delete**: Manage user data efficiently
- **Status Tracking**: See onboarding progress for each user
- **Export Ready**: Clean data structure for analysis

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **@dnd-kit** - Drag and drop functionality
- **Axios** - HTTP client

### Backend
- **Express.js** - Node.js web framework
- **TypeScript** - Type-safe backend development
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **CORS** - Cross-origin resource sharing

## 📋 Available Components

The system supports three customizable form components:

1. **About Me** - Large text area for personal information
2. **Address** - Street, city, state, and zip code fields
3. **Birthdate** - Date picker for birth date selection

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MongoDB 4.4+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Custom-Onboarding-Flow
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install
   
   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Set up environment variables**
   
   **Backend** (`backend/config.env`):
   ```env
   PORT=3001
   MONGODB_URI=mongodb://localhost:27017/onboarding-flow
   CORS_ORIGIN=http://localhost:3000
   ```

   **Frontend** (`frontend/.env.local`):
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3001
   ```

4. **Start MongoDB**
   ```bash
   # Make sure MongoDB is running on your system
   mongod
   ```

5. **Start the application**
   ```bash
   # Start backend (from backend directory)
   npm run dev
   
   # Start frontend (from frontend directory)
   npm run dev
   ```

6. **Access the application (local)**
   - **User Onboarding**: http://localhost:3000
   - **Admin Panel**: http://localhost:3000/admin
   - **Data Table**: http://localhost:3000/data
  
7. **Access the application (production)**
   - **User Onboarding**: https://custom-onboarding-flow-h6pm.vercel.app
   - **Admin Panel**: https://custom-onboarding-flow-h6pm.vercel.app/admin
   - **Data Table**: https://custom-onboarding-flow-h6pm.vercel.app/data

## 📖 Usage Guide

### For Users
1. **Start Onboarding**: Enter your email address
2. **Complete Steps**: Fill out the required information on each page
3. **Progress Tracking**: See your progress with the step indicator
4. **Resume Later**: Your progress is saved automatically
5. **Completion**: Get confirmation when onboarding is complete

### For Administrators
1. **Access Admin Panel**: Navigate to `/admin`
2. **Configure Pages**: Drag and drop components between Page 2 and Page 3
3. **Add Components**: Click the "+" buttons to add new components
4. **Remove Components**: Click "Remove" on components (minimum 1 per page)
5. **Save Configuration**: Click "Save Configuration" to apply changes
6. **View Data**: Check `/data` to see collected user information

## 🏗️ Project Structure

```
Custom-Onboarding-Flow/
├── backend/
│   ├── src/
│   │   ├── controllers/     # API route handlers
│   │   ├── models/          # MongoDB schemas
│   │   ├── routes/          # API routes
│   │   ├── database.ts      # MongoDB connection
│   │   ├── app.ts           # Express app setup
│   │   └── server.ts        # Server entry point
│   ├── config.env           # Environment variables
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── app/             # Next.js app directory
│   │   │   ├── admin/       # Admin panel page
│   │   │   ├── data/        # Data table page
│   │   │   └── page.tsx     # Main onboarding page
│   │   ├── components/      # React components
│   │   │   ├── onboarding/  # Onboarding step components
│   │   │   └── ...
│   │   ├── lib/             # Utilities and API client
│   │   └── types/           # TypeScript type definitions
│   └── package.json
└── README.md
```

## 🔧 API Endpoints

### User Management
- `GET /api/users` - Get all users
- `GET /api/users/:email` - Get user by email
- `POST /api/users` - Create new user
- `PUT /api/users/:email` - Update user
- `DELETE /api/users/:email` - Delete user

### Configuration
- `GET /api/config` - Get onboarding configuration
- `PUT /api/config` - Update onboarding configuration

## 🎨 Customization

### Adding New Components
1. Create component in `frontend/src/components/onboarding/components/`
2. Add component type to `ComponentType` in `frontend/src/types/index.ts`
3. Update component mapping in Step2 and Step3 components
4. Add component label in admin panel

### Styling
- Uses Tailwind CSS for styling
- Customize colors and spacing in component files
- Admin panel uses consistent design system

## 🧪 Testing

### Manual Testing
1. **User Flow**: Complete onboarding with different email addresses
2. **Admin Flow**: Configure components and verify changes
3. **Data Flow**: Check data persistence and display
4. **Edge Cases**: Test minimum components, duplicate prevention

### Data Validation
- Email format validation
- Required field validation
- Component uniqueness validation
- Minimum component requirements

## 🚀 Deployment

### Backend Deployment
1. Build the TypeScript code: `npm run build`
2. Set production environment variables
3. Start with: `npm start`

### Frontend Deployment
1. Build the Next.js app: `npm run build`
2. Deploy to Vercel, Netlify, or your preferred platform
3. Update API URL in environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Common Issues
- **MongoDB Connection**: Ensure MongoDB is running and connection string is correct
- **Port Conflicts**: Check if ports 3000 and 3001 are available
- **Build Errors**: Clear node_modules and reinstall dependencies
- **TypeScript Errors**: Restart TypeScript language server in your IDE

### Getting Help
- Check the console for error messages
- Verify environment variables are set correctly
- Ensure all dependencies are installed
- Check MongoDB connection status

---


**Built with ❤️ using Next.js, Express, and MongoDB**


