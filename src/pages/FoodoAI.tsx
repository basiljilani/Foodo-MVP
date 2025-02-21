import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Send } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';

export default function FoodoAI() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle AI query here
    console.log('AI Query:', query);
  };

  return (
    <MainLayout>
      {/* Main Content */}
      <main className="flex flex-col h-[calc(100vh-4rem)]">
        <div className="flex-1 overflow-auto px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
            {/* Hero Section */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-gray-900 flex items-center justify-center gap-2">
                <Sparkles className="h-8 w-8 text-red-500" />
                Foodo AI
              </h1>
              <p className="mt-4 text-lg text-gray-600">
                Your personal food companion. Ask me anything about recipes, ingredients, or cooking tips!
              </p>
            </div>

            {/* Chat Messages */}
            <div className="space-y-4 mb-8">
              {/* Sample message */}
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="h-10 w-10 rounded-full bg-red-500 flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="bg-white rounded-lg shadow-sm p-4">
                    <p className="text-gray-700">
                      Hi! I'm your Foodo AI assistant. How can I help you today?
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Query Input */}
        <div className="border-t border-gray-200 bg-white p-4">
          <form onSubmit={handleSubmit} className="mx-auto max-w-3xl">
            <div className="flex gap-4">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask anything about food..."
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <button
                type="submit"
                className="inline-flex items-center gap-2 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                <Send className="h-5 w-5" />
                Send
              </button>
            </div>
          </form>
        </div>
      </main>
    </MainLayout>
  );
}
