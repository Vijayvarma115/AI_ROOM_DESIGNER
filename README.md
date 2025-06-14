# AI Room Design Generator - MERN Stack

A full-stack web application that uses AI to generate room design variations. Built with MongoDB, Express.js, React, and Node.js.

## Features

- **AI-Powered Room Design**: Upload a room photo and get AI-generated design variations
- **Multiple Design Options**: Choose room type, interior style, and color scheme
- **Responsive Design**: Works on desktop and mobile devices
- **Contact Form**: Users can submit feedback and inquiries
- **Database Integration**: Stores design history, feedback, and usage analytics
- **RESTful API**: Clean backend API for all operations

## Technology Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icons
- **React Router** - Client-side routing

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **Google Generative AI** - AI image generation
- **CORS** - Cross-origin resource sharing
- **Multer** - File upload handling

## Project Structure

```
mern-ai-room-design-generator/
├── backend/                 # Express.js backend
│   ├── config/             # Database configuration
│   ├── models/             # MongoDB models
│   ├── server.js           # Main server file
│   ├── package.json        # Backend dependencies
│   └── .env.example        # Environment variables template
├── frontend/               # React frontend
│   ├── public/             # Static assets
│   ├── src/                # Source code
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── lib/            # Utility functions
│   │   ├── App.jsx         # Main App component
│   │   └── main.jsx        # Entry point
│   ├── package.json        # Frontend dependencies
│   └── tailwind.config.js  # Tailwind configuration
└── README.md               # This file
```

## Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas)
- **Google Gemini API Key** (for AI functionality)

## Installation & Setup

### 1. Clone or Extract the Project

```bash
# If you have the zip file, extract it
unzip mern-ai-room-design-generator.zip
cd mern-ai-room-design-generator
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your configuration
nano .env
```

**Configure your .env file:**
```env
GEMINI_API_KEY=your_gemini_api_key_here
MONGODB_URI=mongodb://localhost:27017/ai-room-design
PORT=5000
NODE_ENV=development
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from project root)
cd frontend

# Install dependencies
npm install
```

### 4. Database Setup

**Option A: Local MongoDB**
- Install MongoDB locally
- Start MongoDB service
- The application will create the database automatically

**Option B: MongoDB Atlas**
- Create a MongoDB Atlas account
- Create a new cluster
- Get the connection string
- Update MONGODB_URI in your .env file

### 5. Get Google Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Create a new API key
3. Add it to your .env file as GEMINI_API_KEY

## Running the Application

### Development Mode

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```
The backend will run on http://localhost:5000

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
The frontend will run on http://localhost:5173

### Production Mode

**Build Frontend:**
```bash
cd frontend
npm run build
```

**Run Production Server:**
```bash
cd backend
NODE_ENV=production npm start
```

The application will serve the built frontend from the backend server.

## API Endpoints

### Public Endpoints
- `GET /api/health` - Health check
- `POST /api/design-room` - Generate room design
- `POST /api/feedback` - Submit feedback

### Admin Endpoints
- `GET /api/admin/designs` - Get design history
- `GET /api/admin/stats` - Get usage statistics

## Usage

1. **Upload Room Photo**: Click the upload area and select a room photo (max 4MB)
2. **Select Preferences**: Choose room type, interior style, and color scheme
3. **Add Description**: Optionally describe specific design requirements
4. **Generate Design**: Click the generate button to create AI variations
5. **View Results**: See the generated design variations

## Database Models

### DesignHistory
- Original image URL
- Generated images
- Design prompt and preferences
- User metadata
- Timestamp

### Feedback
- User contact information
- Message and type
- Timestamp

### ApiUsage
- Endpoint and method
- Response time and status
- User metadata
- Timestamp

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| GEMINI_API_KEY | Google Gemini API key for AI generation | Yes |
| MONGODB_URI | MongoDB connection string | Yes |
| PORT | Backend server port | No (default: 5000) |
| NODE_ENV | Environment mode | No (default: development) |

## Troubleshooting

### Common Issues

**1. "API key is missing" error**
- Ensure GEMINI_API_KEY is set in your .env file
- Restart the backend server after adding the key

**2. Database connection failed**
- Check if MongoDB is running
- Verify MONGODB_URI in .env file
- Ensure network connectivity for MongoDB Atlas

**3. Frontend not loading**
- Check if both frontend and backend servers are running
- Verify ports are not in use by other applications
- Check browser console for errors

**4. CORS errors**
- Ensure backend is running on port 5000
- Check API_BASE_URL in frontend/src/lib/api.js

### Performance Tips

- Use MongoDB indexes for better query performance
- Implement image compression for uploads
- Add caching for frequently accessed data
- Use CDN for static assets in production

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Create an issue in the repository
- Use the contact form in the application
- Email: support@example.com

## Deployment

### Frontend Deployment (Netlify/Vercel)
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder
3. Update API_BASE_URL to your backend URL

### Backend Deployment (Heroku/Railway)
1. Set environment variables
2. Deploy the backend folder
3. Ensure MongoDB is accessible

### Full-Stack Deployment (DigitalOcean/AWS)
1. Set up a server with Node.js and MongoDB
2. Clone the repository
3. Follow the installation steps
4. Use PM2 or similar for process management
5. Set up nginx as reverse proxy


