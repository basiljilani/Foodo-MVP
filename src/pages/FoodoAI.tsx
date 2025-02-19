import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Send } from 'lucide-react';
import Navigation from '../components/Navigation';

export default function FoodoAI() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle AI query here
    console.log('AI Query:', query);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Main Content */}
      <main className="flex flex-col h-screen pt-16">
        <div className="flex-none px-4 py-6 bg-white border-b">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-center items-center space-x-2">
              <Sparkles className="h-8 w-8 text-red-500" />
              <h1 className="text-2xl font-bold text-gray-900">
                Foodo AI Assistant
              </h1>
            </div>
            <p className="text-center mt-2 text-gray-600">
              Your personal food recommendation and ordering assistant
            </p>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="flex-1 bg-gray-50 overflow-hidden">
          <div className="h-full max-w-4xl mx-auto px-4 flex flex-col">
            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto py-6 space-y-6">
              {/* Example AI messages */}
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 bg-white rounded-lg p-4 shadow-sm">
                  <p className="text-gray-800">
                    Hello! I'm your Foodo AI assistant. I can help you find restaurants, recommend dishes, and answer questions about our service. What would you like to know?
                  </p>
                </div>
              </div>
            </div>

            {/* Input Container */}
            <div className="flex-none pb-6">
              {/* Input Form */}
              <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex space-x-4">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ask anything about food, restaurants, or orders..."
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-colors flex items-center space-x-2 flex-shrink-0"
                  >
                    <span>Send</span>
                    <Send className="h-4 w-4" />
                  </button>
                </div>

                {/* Example Queries */}
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Try asking:</h3>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => setQuery("What's the best pizza place nearby?")}
                      className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200 transition-colors"
                    >
                      What's the best pizza place nearby?
                    </button>
                    <button
                      type="button"
                      onClick={() => setQuery("Recommend healthy lunch options")}
                      className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200 transition-colors"
                    >
                      Recommend healthy lunch options
                    </button>
                    <button
                      type="button"
                      onClick={() => setQuery("Current deals on Italian restaurants")}
                      className="px-3 py-1.5 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200 transition-colors"
                    >
                      Current deals on Italian restaurants
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
