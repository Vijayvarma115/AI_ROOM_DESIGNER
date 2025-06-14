import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const RoomStyleSelector = ({ selectedStyle, setSelectedStyle }) => {
  const [isOpen, setIsOpen] = useState(false);

  const interiorStyles = [
    { name: "Select interior style", category: "default" },
    { name: "Modern", category: "contemporary", desc: "Clean lines, minimal decoration, neutral colors" },
    { name: "Minimalist", category: "contemporary", desc: "Extremely simple, functional, uncluttered spaces" },
    { name: "Scandinavian", category: "contemporary", desc: "Light colors, natural materials, functional" },
    { name: "Industrial", category: "contemporary", desc: "Raw materials, exposed elements, utilitarian" },
    { name: "Mid-Century Modern", category: "contemporary", desc: "Retro 50s-60s feel, organic curves, minimal ornamentation" },
    { name: "Contemporary", category: "contemporary", desc: "Current trends, smooth lines, updated classics" },
    { name: "Traditional", category: "classic", desc: "Warm colors, classic details, symmetrical arrangements" },
    { name: "Transitional", category: "classic", desc: "Blend of traditional and modern elements" },
    { name: "Victorian", category: "classic", desc: "Ornate, detailed, rich colors and patterns" },
    { name: "Art Deco", category: "classic", desc: "Bold colors, geometric patterns, luxurious materials" },
    { name: "Neoclassical", category: "classic", desc: "Inspired by Greek and Roman antiquity, symmetrical designs" },
    { name: "Farmhouse", category: "specific", desc: "Rustic, natural materials, vintage accessories" },
    { name: "Rustic", category: "specific", desc: "Natural, rough, aged, and casual elements" },
    { name: "Coastal", category: "specific", desc: "Beach-inspired, light colors, natural light" },
    { name: "Bohemian", category: "specific", desc: "Eclectic, colorful, global influences, layered textures" },
    { name: "Japanese", category: "specific", desc: "Minimalist, natural, balance, shoji screens" },
    { name: "Mediterranean", category: "specific", desc: "Warm tones, terracotta, archways, textured walls" }
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (style) => {
    setSelectedStyle(style);
    setIsOpen(false);
  };

  // Group styles by category
  const groupedStyles = {
    contemporary: interiorStyles.filter(style => style.category === "contemporary"),
    classic: interiorStyles.filter(style => style.category === "classic"),
    specific: interiorStyles.filter(style => style.category === "specific"),
  };

  // Get category title
  const getCategoryTitle = (category) => {
    switch(category) {
      case 'contemporary': return 'Contemporary Styles';
      case 'classic': return 'Classic Styles';
      case 'specific': return 'Themed Styles';
      default: return category;
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="flex items-center justify-between w-full p-3 bg-primary-50 border border-primary-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-300"
        onClick={toggleDropdown}
      >
        <span>{selectedStyle || "Select interior style"}</span>
        {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-primary-100 rounded-xl shadow-soft max-h-60 overflow-y-auto">
          <div className="p-1">
            <button
              className="w-full text-left px-4 py-2 hover:bg-primary-50 text-gray-600 rounded"
              onClick={() => handleSelect("")}
            >
              Clear selection
            </button>
            
            {Object.keys(groupedStyles).map(category => (
              <div key={category}>
                <div className="px-4 py-1 text-xs font-semibold text-gray-500 uppercase bg-primary-50 mt-1">
                  {getCategoryTitle(category)}
                </div>
                {groupedStyles[category].map(style => (
                  <button
                    key={style.name}
                    className={`w-full text-left px-4 py-2 hover:bg-primary-50 rounded ${
                      selectedStyle === style.name ? 'bg-primary-100 text-primary-700' : 'text-gray-700'
                    }`}
                    onClick={() => handleSelect(style.name)}
                  >
                    <div>
                      <span>{style.name}</span>
                      {style.desc && (
                        <p className="text-xs text-gray-500 mt-1">{style.desc}</p>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomStyleSelector;

