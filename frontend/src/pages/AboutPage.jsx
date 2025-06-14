import React from 'react';
import { Info, User, Award, Lightbulb, Code } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-2 text-gray-800">
            <Info className="w-8 h-8 text-primary-600" />
            About Us
          </h1>
          <p className="text-gray-600">Learn more about the team behind the Free AI Room Design Generator</p>
        </header>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-800">
              <User className="w-6 h-6 text-primary-500" />
              Our Story
            </h2>
            <div className="bg-white rounded-2xl p-6 shadow-soft border border-primary-100">
              <p className="mb-4 text-gray-600">
                The Free AI Room Design Generator was born from a simple observation: most people struggle to visualize how design changes will look in their homes, leading to costly mistakes and renovation regrets. We wanted to create a tool that would make interior design exploration accessible, affordable, and risk-free.
              </p>
              <p className="mb-4 text-gray-600">
                Our team of AI enthusiasts and interior design enthusiasts joined forces to develop a tool that leverages the latest advancements in generative AI to help people visualize different designs for their spaces without the hassle and expense of actual renovation.
              </p>
              <p className="text-gray-600">
                Launched in 2024, our mission is to revolutionize how people plan and visualize home improvements while keeping this powerful technology freely accessible to all.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-800">
              <Award className="w-6 h-6 text-accent-500" />
              Our Vision
            </h2>
            <div className="bg-white rounded-2xl p-6 shadow-soft border border-primary-100">
              <p className="mb-4 text-gray-600">
                We envision a world where everyone can visualize design changes before committing time, money, and effort to renovations. Our technology aims to reduce renovation waste and disappointment by helping people make more informed design decisions.
              </p>
              <p className="text-gray-600">
                Our goal is to continuously improve our AI algorithms to provide increasingly realistic and diverse design visualizations across all types of spaces, design styles, and architectural features – while keeping our core service free for all users.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-800">
              <Lightbulb className="w-6 h-6 text-yellow-500" />
              The Technology
            </h2>
            <div className="bg-white rounded-2xl p-6 shadow-soft border border-primary-100">
              <p className="mb-4 text-gray-600">
                Our Free AI Room Design Generator is powered by cutting-edge generative AI models that have been specifically trained to understand the nuances of interior design, architectural elements, and how different materials and furniture interact with spaces.
              </p>
              <p className="mb-4 text-gray-600">
                Our technology goes beyond simple image manipulation. The AI analyzes room dimensions, lighting, fixed architectural elements, and spatial relationships to create realistic visualizations of how different design changes would actually look in your specific space – not just a generic overlay.
              </p>
              <p className="text-gray-600">
                We're continuously training and refining our models to improve design realism, material rendering, and style accuracy across different room types, lighting conditions, and architectural styles – all while keeping the service completely free.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 flex items-center gap-2 text-gray-800">
              <Code className="w-6 h-6 text-accent-500" />
              Keeping It Free
            </h2>
            <div className="bg-white rounded-2xl p-6 shadow-soft border border-primary-100">
              <p className="mb-4 text-gray-600">
                We believe everyone should have access to powerful AI tools for interior design and renovation planning without financial barriers. While maintaining a free service is challenging, we're committed to keeping our core functionality free for all users.
              </p>
              <p className="text-gray-600">
                Your support through donations helps us cover server costs, API fees, and development time. If you find our tool valuable for your home improvement projects or interior design exploration, consider buying us a coffee to help keep this service running and freely available to everyone!
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;

