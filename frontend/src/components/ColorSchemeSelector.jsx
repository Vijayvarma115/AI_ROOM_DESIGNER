import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const ColorSchemeSelector = ({ selectedColorScheme, setSelectedColorScheme }) => {
  const [isOpen, setIsOpen] = useState(false);

  const colorSchemes = [
    { name: "Select color scheme", category: "default" },
    { name: "Neutral Palette", category: "basic", desc: "Whites, beiges, grays, and blacks" },
    { name: "Monochromatic", category: "basic", desc: "Different shades of a single color" },
    { name: "Earth Tones", category: "basic", desc: "Browns, tans, warm greens, and terracotta" },
    { name: "Cool Tones", category: "basic", desc: "Blues, greens, and purples" },
    { name: "Warm Tones", category: "basic", desc: "Reds, oranges, yellows, and warm browns" },
    { name: "Pastel Colors", category: "basic", desc: "Soft, light colors with low saturation" },
    { name: "Bold & Bright", category: "basic", desc: "Vibrant, high-contrast colors" },
    { name: "Dark & Moody", category: "basic", desc: "Deep, rich, saturated colors" },
    { name: "Blue & White", category: "combination", desc: "Classic, clean combination" },
    { name: "Black & White", category: "combination", desc: "High-contrast, timeless combination" },
    { name: "Green & Brown", category: "combination", desc: "Nature-inspired, organic feel" },
    { name: "Gray & Yellow", category: "combination", desc: "Modern combination with visual interest" },
    { name: "Navy & Gold", category: "combination", desc: "Luxurious, sophisticated pairing" },
    { name: "Burgundy & Beige", category: "combination", desc: "Rich, warm, elegant combination" }
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (colorScheme) => {
    setSelectedColorScheme(colorScheme);
    setIsOpen(false);
  };

  // Group color schemes by category
  const groupedColorSchemes = {
    basic: colorSchemes.filter(scheme => scheme.category === "basic"),
    combination: colorSchemes.filter(scheme => scheme.category === "combination"),
  };

  // Get category title
  const getCategoryTitle = (category) => {
    switch(category) {
      case 'basic': return 'Basic Color Schemes';
      case 'combination': return 'Color Combinations';
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
        <span>{selectedColorScheme || "Select color scheme"}</span>
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
            
            {Object.keys(groupedColorSchemes).map(category => (
              <div key={category}>
                <div className="px-4 py-1 text-xs font-semibold text-gray-500 uppercase bg-primary-50 mt-1">
                  {getCategoryTitle(category)}
                </div>
                {groupedColorSchemes[category].map(scheme => (
                  <button
                    key={scheme.name}
                    className={`w-full text-left px-4 py-2 hover:bg-primary-50 rounded ${
                      selectedColorScheme === scheme.name ? 'bg-primary-100 text-primary-700' : 'text-gray-700'
                    }`}
                    onClick={() => handleSelect(scheme.name)}
                  >
                    <div>
                      <span>{scheme.name}</span>
                      {scheme.desc && (
                        <p className="text-xs text-gray-500 mt-1">{scheme.desc}</p>
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

export default ColorSchemeSelector;

