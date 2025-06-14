const mongoose = require('mongoose');

// Design History Schema
const designHistorySchema = new mongoose.Schema({
  originalImageUrl: {
    type: String,
    required: true
  },
  generatedImages: [{
    type: String,
    required: true
  }],
  prompt: {
    type: String,
    required: true
  },
  roomType: {
    type: String,
    default: ''
  },
  style: {
    type: String,
    default: ''
  },
  colorScheme: {
    type: String,
    default: ''
  },
  userAgent: {
    type: String,
    default: ''
  },
  ipAddress: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// User Feedback Schema
const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['feedback', 'bug', 'feature', 'support'],
    default: 'feedback'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// API Usage Stats Schema
const apiUsageSchema = new mongoose.Schema({
  endpoint: {
    type: String,
    required: true
  },
  method: {
    type: String,
    required: true
  },
  statusCode: {
    type: Number,
    required: true
  },
  responseTime: {
    type: Number,
    required: true
  },
  userAgent: {
    type: String,
    default: ''
  },
  ipAddress: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const DesignHistory = mongoose.model('DesignHistory', designHistorySchema);
const Feedback = mongoose.model('Feedback', feedbackSchema);
const ApiUsage = mongoose.model('ApiUsage', apiUsageSchema);

module.exports = {
  DesignHistory,
  Feedback,
  ApiUsage
};

