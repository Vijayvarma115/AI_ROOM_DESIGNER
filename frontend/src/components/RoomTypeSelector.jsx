import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const RoomTypeSelector = ({ selectedRoomType, setSelectedRoomType }) => {
  const [isOpen, setIsOpen] = useState(false);

  const roomTypes = [
    { name: "Select room type", category: "default" },
    { name: "Living Room", category: "common", desc: "The main gathering space for relaxation and entertaining" },
    { name: "Bedroom", category: "common", desc: "Primary sleeping and relaxation space" },
    { name: "Kitchen", category: "common", desc: "Food preparation and casual dining area" },
    { name: "Dining Room", category: "common", desc: "Formal space for meals and entertaining" },
    { name: "Bathroom", category: "common", desc: "Personal hygiene and self-care space" },
    { name: "Home Office", category: "functional", desc: "Work and productivity space" },
    { name: "Study Room", category: "functional", desc: "Quiet space for reading and learning" },
    { name: "Playroom", category: "functional", desc: "Child-friendly activity space" },
    { name: "Gym/Fitness Room", category: "functional", desc: "Exercise and wellness area" },
    { name: "Media Room", category: "functional", desc: "Entertainment and media consumption space" },
    { name: "Basement", category: "additional", desc: "Below-grade multipurpose space" },
    { name: "Attic", category: "additional", desc: "Upper level space with unique architecture" },
    { name: "Sunroom", category: "additional", desc: "Glass-enclosed space connecting to outdoors" },
    { name: "Entryway/Foyer", category: "additional", desc: "Home entrance and transition area" },
    { name: "Hallway", category: "additional", desc: "Connecting passage between rooms" }
  ];

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (roomType) => {
    setSelectedRoomType(roomType);
    setIsOpen(false);
  };

  // Group room types by category
  const groupedRoomTypes = {
    common: roomTypes.filter(type => type.category === "common"),
    functional: roomTypes.filter(type => type.category === "functional"),
    additional: roomTypes.filter(type => type.category === "additional"),
  };

  // Get category title
  const getCategoryTitle = (category) => {
    switch(category) {
      case 'common': return 'Common Rooms';
      case 'functional': return 'Functional Spaces';
      case 'additional': return 'Additional Areas';
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
        <span>{selectedRoomType || "Select room type"}</span>
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
            
            {Object.keys(groupedRoomTypes).map(category => (
              <div key={category}>
                <div className="px-4 py-1 text-xs font-semibold text-gray-500 uppercase bg-primary-50 mt-1">
                  {getCategoryTitle(category)}
                </div>
                {groupedRoomTypes[category].map(type => (
                  <button
                    key={type.name}
                    className={`w-full text-left px-4 py-2 hover:bg-primary-50 rounded ${
                      selectedRoomType === type.name ? 'bg-primary-100 text-primary-700' : 'text-gray-700'
                    }`}
                    onClick={() => handleSelect(type.name)}
                  >
                    <div>
                      <span>{type.name}</span>
                      {type.desc && (
                        <p className="text-xs text-gray-500 mt-1">{type.desc}</p>
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

export default RoomTypeSelector;

