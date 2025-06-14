import React, { useState, useRef } from 'react';
import { Upload, Home, Image as ImageIcon, Loader2, Share2, Download } from 'lucide-react';
import { designRoom } from '../lib/api';
import RoomTypeSelector from './RoomTypeSelector';
import RoomStyleSelector from './RoomStyleSelector';
import ColorSchemeSelector from './ColorSchemeSelector';

const RoomDesigner = () => {
  const [selectedImage, setSelectedImage] = useState(null); //image in base64
  const [generatedImages, setGeneratedImages] = useState([]); //URLs 
  const [isLoading, setIsLoading] = useState(false); //whether the AI is currently generating or not
  const [error, setError] = useState(null); //Stores any error
  const [prompt, setPrompt] = useState(''); //Stores the custom text prompt
  const [selectedRoomType, setSelectedRoomType] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedColorScheme, setSelectedColorScheme] = useState('');
  const fileInputRef = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setError(null);
    
    if (file) {
      if (file.size > 4 * 1024 * 1024) {
        setError('Image size must be less than 4MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const buildPrompt = () => {
    let finalPrompt = "";
    
    if (selectedRoomType && selectedRoomType !== "Select room type") {
      finalPrompt += `redesign this ${selectedRoomType.toLowerCase()}`;
    }
    
    if (selectedStyle && selectedStyle !== "Select interior style") {
      finalPrompt += finalPrompt ? ` in ${selectedStyle} style` : `a ${selectedStyle} style design`;
    }
    
    if (selectedColorScheme && selectedColorScheme !== "Select color scheme") {
      finalPrompt += finalPrompt ? ` with ${selectedColorScheme} colors` : `a design with ${selectedColorScheme} colors`;
    }
    
    if (prompt && prompt.trim() !== "") {
      finalPrompt += finalPrompt ? `. ${prompt}` : prompt;
    }
    
    return finalPrompt.trim() || "modern interior design with neutral colors";
  };

  const handleGenerate = async () => {
    if (!selectedImage) return;
    
    setIsLoading(true);
    setError(null);
    
    const finalPrompt = buildPrompt();
    
    try {
      const result = await designRoom(selectedImage, finalPrompt, selectedRoomType, selectedStyle, selectedColorScheme);
      
      if (!result.images || result.images.length === 0) {
        if (result.text && result.text.includes("API key is missing")) {
          setError('API key is missing. Please contact the site administrator.');
        } else {
          setError('No room designs were generated. Please try again with a different photo or description.');
        }
      } else {
        setGeneratedImages(result.images);
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to generate room designs. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleShare = async (imageUrl) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'My AI Room Design',
          text: 'Check out this room design I created with the Free AI Room Design Generator!',
          url: imageUrl
        });
      } else {
        // Fallback for browsers that don't support navigator.share
        await navigator.clipboard.writeText(imageUrl);
        alert('Image URL copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleDownload = (imageUrl, index) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `room-design-${index + 1}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div 
            className="border-2 border-dashed border-primary-200 rounded-2xl p-8 text-center cursor-pointer hover:border-primary-400 transition-colors bg-white shadow-soft"
            onClick={() => fileInputRef.current?.click()}
          >
            {selectedImage ? (
              <img 
                src={selectedImage} 
                alt="Selected Room" 
                className="max-w-full h-auto rounded-xl mx-auto shadow-soft"
              />
            ) : (
              <div className="flex flex-col items-center py-12">
                <Upload className="w-16 h-16 mb-4 text-primary-500" />
                <p className="text-gray-700 text-lg font-medium">Click to upload a photo of your room</p>
                <p className="text-sm text-gray-500 mt-2">Maximum size: 4MB</p>
              </div>
            )}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              className="hidden"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4 bg-white p-6 rounded-2xl shadow-soft border border-primary-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Design Your Room</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <RoomTypeSelector 
                selectedRoomType={selectedRoomType} 
                setSelectedRoomType={setSelectedRoomType} 
              />
              
              <RoomStyleSelector 
                selectedStyle={selectedStyle} 
                setSelectedStyle={setSelectedStyle} 
              />

              <div className="md:col-span-2">
                <ColorSchemeSelector
                  selectedColorScheme={selectedColorScheme}
                  setSelectedColorScheme={setSelectedColorScheme}
                />
              </div>
            </div>

            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe additional details for your room design (e.g., 'with new furniture', 'more plants', or 'better lighting')"
              className="w-full p-3 rounded-xl bg-primary-50 text-gray-700 placeholder-gray-400 border border-primary-100 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-transparent"
              rows={3}
            />

            <button style={{backgroundColor: "#555", /* Dark gray background */
color: "white",
padding: "15px 30px",
border: "none",
borderRadius: "5px",
cursor: "pointer",
fontSize: "16px",
transition: "background-color 0.3s ease"}}
              onClick={handleGenerate}
              disabled={!selectedImage || isLoading}
              // className="w-full py-3 px-6 bg-primary-500 hover:bg-primary-600 :bg-gray-300 :text-gray-500 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-colors shadow-soft"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  Generate Room Design
                </>
              )}
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-soft border border-primary-100">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Your New Room Designs</h2>
          {generatedImages.length > 0 ? (
            <div className="space-y-6">
              {generatedImages.map((image, index) => (
                <div key={index} className="space-y-2">
                  <img
                    src={image}
                    alt={`Room design ${index + 1}`}
                    className="w-full h-auto rounded-xl shadow-soft"
                  />
                  <div className="flex justify-end space-x-3 pt-3">
                    <button
                      onClick={() => handleShare(image)}
                      className="flex items-center gap-2 bg-accent-50 hover:bg-accent-100 text-accent-600 px-4 py-3 rounded-lg text-base font-medium transition-colors"
                    >
                      <Share2 className="w-5 h-5" />
                      Share
                    </button>
                    <button
                      onClick={() => handleDownload(image, index)}
                      className="flex items-center gap-2 bg-primary-50 hover:bg-primary-100 text-primary-600 px-4 py-3 rounded-lg text-base font-medium transition-colors"
                    >
                      <Download className="w-5 h-5" />
                      Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 py-16 bg-primary-50 rounded-xl">
              <ImageIcon className="w-16 h-16 mx-auto mb-4 text-primary-300" />
              <p className="text-lg">Your new room designs will appear here</p>
              <p className="text-sm mt-2">Upload a photo of your room and customize your design preferences</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomDesigner;

