import React, { useState } from 'react';
import { Mail, Send, User, MessageSquare } from 'lucide-react';
// import { submitFeedback } from '../lib/api';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      await submitFeedback(formData.name, formData.email, formData.message, 'feedback');
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setError('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-2 text-gray-800">
            <Mail className="w-8 h-8 text-primary-600" />
            Contact Us
          </h1>
          <p className="text-gray-600">Have questions or feedback about our free AI Room Design Generator? We'd love to hear from you!</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-6 shadow-soft border border-primary-100">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-800">
              <MessageSquare className="w-5 h-5 text-primary-500" />
              Get in Touch
            </h2>
            <p className="text-gray-600 mb-6">
              We're always looking to improve our free AI Room Design Generator. Your feedback helps us make the tool better for everyone!
            </p>
            
            <h3 className="text-lg font-semibold mb-2 text-gray-800">We Want to Hear About:</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600 mb-6">
              <li>Feature suggestions</li>
              <li>Bug reports</li>
              <li>Success stories</li>
              <li>Business inquiries</li>
              <li>Technical support</li>
            </ul>
            
            <h3 className="text-lg font-semibold mb-2 text-gray-800">Response Time</h3>
            <p className="text-gray-600">
              We typically respond to all inquiries within 24-48 hours during business days.
            </p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-soft border border-primary-100">
            {submitted ? (
              <div className="text-center py-8">
                <div className="bg-primary-100 text-primary-600 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">Message Sent!</h3>
                <p className="text-gray-600">
                  Thank you for reaching out. We'll get back to you as soon as possible.
                </p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-4 py-2 bg-primary-600 hover:bg-primary-700 rounded-xl text-white transition-colors shadow-soft"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-primary-300" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="block w-full pl-10 bg-primary-50 border border-primary-200 rounded-xl p-2.5 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300"
                      placeholder="Your name"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-primary-300" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="block w-full pl-10 bg-primary-50 border border-primary-200 rounded-xl p-2.5 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="block w-full bg-primary-50 border border-primary-200 rounded-xl p-2.5 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-300 focus:border-primary-300"
                    placeholder="Your message..."
                  />
                </div>
                
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 p-3 rounded-xl text-sm">
                    {error}
                  </div>
                )}
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:text-gray-500 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-colors shadow-soft"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;

