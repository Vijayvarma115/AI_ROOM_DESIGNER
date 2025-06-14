// API configuration
const API_BASE_URL ='http://localhost:5000/api';

/**
 * Design room using AI
 * @param {string} imageData - Base64 encoded image data
 * @param {string} prompt - Design prompt
 * @param {string} roomType - Type of room
 * @param {string} style - Interior style
 * @param {string} colorScheme - Color scheme
 * @returns {Promise<Object>} Response with images and text
 */
export const designRoom = async (imageData, prompt, roomType = '', style = '', colorScheme = '') => {
  try {
    const response = await fetch(`${API_BASE_URL}/design-room`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        imageData,
        prompt,
        roomType,
        style,
        colorScheme
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error designing room:', error);
    throw error;
  }
};

// /**
//  * Submit feedback
//  * @param {string} name - User name
//  * @param {string} email - User email
//  * @param {string} message - Feedback message
//  * @param {string} type - Feedback type
//  * @returns {Promise<Object>} Response
//  */
// export const submitFeedback = async (name, email, message, type = 'feedback') => {
//   try {
//     const response = await fetch(`${API_BASE_URL}/feedback`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         name,
//         email,
//         message,
//         type
//       })
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error submitting feedback:', error);
//     throw error;
//   }
// };

/**
 * Health check for the backend API
 * @returns {Promise<Object>} Health status
 */
export const healthCheck = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error checking health:', error);
    throw error;
  }
};

