const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenAI } = require('@google/genai');
const multer = require('multer');
const path = require('path');
const connectDB = require('./config/database');
const { DesignHistory, Feedback, ApiUsage } = require('./models');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Get API key from environment variables
const apiKey = process.env.GEMINI_API_KEY;

// Check if API key exists
if (!apiKey) {
  console.error('Gemini API key is missing. Please set GEMINI_API_KEY environment variable.');
}

// Initialize the Google Generative AI client
const ai = new GoogleGenAI({ apiKey });

/**
 * Extracts the base64 data from a data URL
 */
function extractBase64FromDataUrl(dataUrl) {
  // Extract the MIME type from the data URL
  const match = dataUrl.match(/^data:([^;]+);base64,(.+)$/);
  if (!match) {
    throw new Error('Invalid data URL format');
  }
  
  return {
    mimeType: match[1],
    data: match[2]
  };
}

// Middleware to log API usage
const logApiUsage = async (req, res, next) => {
  const startTime = Date.now();
  
  res.on('finish', async () => {
    const responseTime = Date.now() - startTime;
    
    try {
      await ApiUsage.create({
        endpoint: req.path,
        method: req.method,
        statusCode: res.statusCode,
        responseTime,
        userAgent: req.get('User-Agent') || '',
        ipAddress: req.ip || req.connection.remoteAddress || ''
      });
    } catch (error) {
      console.error('Error logging API usage:', error);
    }
  });
  
  next();
};

app.use(logApiUsage);

// API Routes

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'AI Room Design Generator Backend is running' });
});

// Room design endpoint
app.post('/api/design-room', async (req, res) => {
  try {
    const { imageData, prompt, roomType, style, colorScheme } = req.body;

    if (!imageData || !prompt) {
      return res.status(400).json({ 
        error: 'Missing required fields: imageData and prompt are required' 
      });
    }

    // Check if API key exists
    if (!apiKey) {
      return res.status(500).json({
        error: 'API key is missing. Please configure your environment variables.',
        images: [],
        text: "API key is missing. Please configure your environment variables."
      });
    }

    // Extract the base64 data and MIME type from the data URL
    const { data: base64Image, mimeType } = extractBase64FromDataUrl(imageData);
    
    // Prepare the content parts for the API request
    const contents = [
      { text: `Redesign this room with: ${prompt}. Only modify the interior design elements while preserving the room's structure, dimensions, windows, doors, and general layout. Make the new design look realistic, practical, and harmonious with the existing space.` },
      {
        inlineData: {
          mimeType,
          data: base64Image
        }
      }
    ];

    // Make the API request
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp-image-generation',
      contents,
      config: {
        responseModalities: ['Text', 'Image']
      },
    });

    // Extract images and text from the response
    const images = [];
    let text = '';

    if (response.candidates && response.candidates.length > 0) {
      const candidate = response.candidates[0];
      
      if (candidate.content && candidate.content.parts) {
        candidate.content.parts.forEach(part => {
          if (part.text) {
            text = part.text;
          } else if (part.inlineData) {
            images.push(`data:${part.inlineData.mimeType};base64,${part.inlineData.data}`);
          }
        });
      }
    }

    // Save design history to database
    try {
      await DesignHistory.create({
        originalImageUrl: imageData.substring(0, 100) + '...', // Store truncated version
        generatedImages: images,
        prompt,
        roomType: roomType || '',
        style: style || '',
        colorScheme: colorScheme || '',
        userAgent: req.get('User-Agent') || '',
        ipAddress: req.ip || req.connection.remoteAddress || ''
      });
    } catch (dbError) {
      console.error('Error saving design history:', dbError);
      // Continue without saving to database
    }

    res.json({
      images,
      text,
      success: true
    });

  } catch (error) {
    console.error('Error designing room:', error);
    res.status(500).json({ 
      error: 'Failed to design room',
      message: error.message,
      images: [],
      text: ''
    });
  }
});

// Feedback endpoint
app.post('/api/feedback', async (req, res) => {
  try {
    const { name, email, message, type } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ 
        error: 'Missing required fields: name, email, and message are required' 
      });
    }

    // Save feedback to database
    try {
      await Feedback.create({
        name,
        email,
        message,
        type: type || 'feedback'
      });
    } catch (dbError) {
      console.error('Error saving feedback:', dbError);
      // Continue without saving to database
    }

    res.json({
      success: true,
      message: 'Feedback received successfully'
    });

  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(500).json({ 
      error: 'Failed to save feedback',
      message: error.message
    });
  }
});

// Get design history (for admin/analytics)
app.get('/api/admin/designs', async (req, res) => {
  try {
    const designs = await DesignHistory.find()
      .sort({ createdAt: -1 })
      .limit(100)
      .select('-originalImageUrl -generatedImages'); // Exclude large image data
    
    res.json({
      success: true,
      designs
    });
  } catch (error) {
    console.error('Error fetching designs:', error);
    res.status(500).json({ 
      error: 'Failed to fetch designs',
      message: error.message
    });
  }
});

// Get API usage stats (for admin/analytics)
app.get('/api/admin/stats', async (req, res) => {
  try {
    const stats = await ApiUsage.aggregate([
      {
        $group: {
          _id: '$endpoint',
          count: { $sum: 1 },
          avgResponseTime: { $avg: '$responseTime' }
        }
      }
    ]);
    
    res.json({
      success: true,
      stats
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ 
      error: 'Failed to fetch stats',
      message: error.message
    });
  }
});

// Serve static files from frontend build (for production)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
}

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Health check: http://localhost:${PORT}/api/health`);
});

module.exports = app;

