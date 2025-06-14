import React from 'react';
import { Home } from 'lucide-react';
import RoomDesigner from '../components/RoomDesigner';
import SEOText from '../components/SEOText';

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-2 text-gray-800">
          <Home className="w-8 h-8 text-primary-600" />
          Free AI Room Design Generator
        </h1>
        <p className="text-gray-600">Visualize your dream space with our AI-powered room design tool</p>
      </header>

      <RoomDesigner /> 
      
      <SEOText />
    </div>
  );
};

export default HomePage;

