import React from 'react';
import { Home, ChevronDown, ChevronUp, Sparkles, Image, UserCheck } from 'lucide-react';

const SEOText = () => {
  const [expandedSection, setExpandedSection] = React.useState('about');

  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };

  return (
    <div className="py-8 bg-white rounded-2xl shadow-soft border border-primary-100">
      <div className="max-w-5xl mx-auto px-8">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b border-primary-100 pb-4 flex items-center">
          <Home className="w-7 h-7 mr-3 text-primary-600" />
          Free AI Room Design Generator
        </h2>
        
        <div className="space-y-4">
          {/* About Section */}
          <div className="border border-primary-100 rounded-xl overflow-hidden">
            <button 
              className={`w-full text-left px-6 py-4 font-semibold text-lg flex justify-between items-center ${expandedSection === 'about' ? 'bg-primary-50 text-primary-800' : 'bg-white text-gray-700'}`}
              onClick={() => toggleSection('about')}
            >
              <span className="flex items-center">
                <Home className="w-5 h-5 mr-2 text-primary-600" />
                What Is AI Room Design Generation?
              </span>
              {expandedSection === 'about' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            
            {expandedSection === 'about' && (
              <div className="px-6 py-4 bg-white">
                <div className="grid md:grid-cols-5 gap-8">
                  <div className="md:col-span-3">
                    <p className="mb-4 text-gray-700 leading-relaxed">
                      Our <strong className="text-primary-700">AI Room Design Generator</strong> uses advanced artificial intelligence to let you see how your rooms could look with different designs, furniture, colors, and styles without actual renovation. This revolutionary technology analyzes your room photo and transforms the interior design while preserving the room's structure, dimensions, and architectural elements.
                    </p>
                    <p className="text-gray-700 leading-relaxed">
                      Unlike basic photo editing that just overlays elements onto your image, our AI understands spatial relationships, lighting conditions, and interior design principles. It creates realistic visualizations of how your room would look with different design elements, helping you make confident design decisions before spending any money.
                    </p>
                  </div>
                  <div className="md:col-span-2 flex justify-center items-center">
                    <div className="bg-primary-50 p-5 rounded-lg">
                      <div className="flex flex-col space-y-3">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white">
                            <Sparkles className="w-5 h-5" />
                          </div>
                          <span className="ml-3 text-gray-700 font-medium">Visualize Before Renovating</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white">
                            <Image className="w-5 h-5" />
                          </div>
                          <span className="ml-3 text-gray-700 font-medium">Style Experimentation</span>
                        </div>
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center text-white">
                            <UserCheck className="w-5 h-5" />
                          </div>
                          <span className="ml-3 text-gray-700 font-medium">100% Free to Use</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* How It Works Section */}
          <div className="border border-primary-100 rounded-xl overflow-hidden">
            <button 
              className={`w-full text-left px-6 py-4 font-semibold text-lg flex justify-between items-center ${expandedSection === 'how' ? 'bg-primary-50 text-primary-800' : 'bg-white text-gray-700'}`}
              onClick={() => toggleSection('how')}
            >
              <span className="flex items-center">
                <Image className="w-5 h-5 mr-2 text-primary-600" />
                How to Redesign Your Room Virtually
              </span>
              {expandedSection === 'how' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            
            {expandedSection === 'how' && (
              <div className="px-6 py-4 bg-white">
                <ol className="list-none space-y-4">
                  {[
                    { step: 1, title: "Upload your room photo", desc: "Choose a clear, well-lit image of the room you want to redesign" },
                    { step: 2, title: "Select room type", desc: "Specify if it's a living room, bedroom, kitchen, etc." },
                    { step: 3, title: "Choose an interior style", desc: "Select from modern, minimalist, traditional, farmhouse, and more" },
                    { step: 4, title: "Pick a color scheme", desc: "Choose colors that match your preference and existing elements" },
                    { step: 5, title: "Add custom details", desc: "Describe specific elements you want in your new design" },
                    { step: 6, title: "Generate designs", desc: "Our AI will create realistic versions of your room with the new design" },
                    { step: 7, title: "Download or share", desc: "Save your favorite designs or share them with friends and designers" }
                  ].map((item) => (
                    <li key={item.step} className="flex">
                      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center mr-4 mt-0.5">
                        {item.step}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{item.title}</h4>
                        <p className="text-gray-600">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </div>
          
          {/* Benefits Section */}
          <div className="border border-primary-100 rounded-xl overflow-hidden">
            <button 
              className={`w-full text-left px-6 py-4 font-semibold text-lg flex justify-between items-center ${expandedSection === 'benefits' ? 'bg-primary-50 text-primary-800' : 'bg-white text-gray-700'}`}
              onClick={() => toggleSection('benefits')}
            >
              <span className="flex items-center">
                <UserCheck className="w-5 h-5 mr-2 text-primary-600" />
                Why Use Our AI Room Design Generator
              </span>
              {expandedSection === 'benefits' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            
            {expandedSection === 'benefits' && (
              <div className="px-6 py-4 bg-white">
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    { title: "Visualize Before Renovating", desc: "See how changes will look before spending money on actual renovations" },
                    { title: "Save Time and Money", desc: "Avoid costly design mistakes and unnecessary purchases" },
                    { title: "Explore Multiple Designs", desc: "Try different styles and layouts without commitment" },
                    { title: "Overcome Decision Paralysis", desc: "See realistic options to help make confident choices" },
                    { title: "Communicate Your Vision", desc: "Share designs with contractors, designers, or family members" },
                    { title: "Spark Creativity", desc: "Get inspired with designs you might not have considered" }
                  ].map((item, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-primary-700 mb-2">{item.title}</h4>
                      <p className="text-gray-600">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {/* Popular Uses Section */}
          <div className="border border-primary-100 rounded-xl overflow-hidden">
            <button 
              className={`w-full text-left px-6 py-4 font-semibold text-lg flex justify-between items-center ${expandedSection === 'uses' ? 'bg-primary-50 text-primary-800' : 'bg-white text-gray-700'}`}
              onClick={() => toggleSection('uses')}
            >
              <span className="flex items-center">
                <Sparkles className="w-5 h-5 mr-2 text-primary-600" />
                Popular Uses and Examples
              </span>
              {expandedSection === 'uses' ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
            
            {expandedSection === 'uses' && (
              <div className="px-6 py-4 bg-white">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-primary-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-primary-700 mb-2 border-b border-primary-100 pb-2">Home Renovation Planning</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>Test paint colors virtually</li>
                      <li>Visualize new furniture layouts</li>
                      <li>Preview flooring replacements</li>
                      <li>Experiment with different lighting</li>
                      <li>See wall removal/addition impacts</li>
                      <li>Plan storage solutions visually</li>
                    </ul>
                  </div>
                  
                  <div className="bg-primary-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-primary-700 mb-2 border-b border-primary-100 pb-2">Real Estate & Staging</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>Virtual staging for listings</li>
                      <li>Show property potential to buyers</li>
                      <li>Update dated property photos</li>
                      <li>Transform empty spaces</li>
                      <li>Showcase different use cases</li>
                      <li>Create appealing marketing photos</li>
                    </ul>
                  </div>
                  
                  <div className="bg-primary-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-primary-700 mb-2 border-b border-primary-100 pb-2">Interior Design</h4>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      <li>Test different design concepts</li>
                      <li>Create mood boards for clients</li>
                      <li>Compare before/after scenarios</li>
                      <li>Explore seasonal decor changes</li>
                      <li>Visualize room transformations</li>
                      <li>Test trends before committing</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-6 bg-gray-50 p-5 rounded-lg text-center">
                  <p className="text-gray-700">
                    Whether you're planning a major renovation, redecorating a room, or staging a property for sale, our AI Room Design Generator lets you see countless design possibilities without the commitment or expense of actual changes.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SEOText;

