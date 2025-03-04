import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, User, Send, Loader2 } from 'lucide-react';
import NoFooterLayout from '../layouts/NoFooterLayout';

// Roman Urdu conversation starters
const SUGGESTIONS = [
  "Aaj kuch desi khana banane ka mood hai, kya suggestions hain?",
  "Mehman aa rahe hain, jaldi main kya banao?",
  "Koi esi recipe batao jo bachon ko bhi pasand aye",
  "Ramzan ke liye iftar ideas chahiye",
  "Thora healthy khana banana hai, kya options hain?"
];

// Message type definition
interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function FoodoAI() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Assalam-o-Alaikum! Khane peene, recipes, aur cooking tips ke baare mein kuch bhi pooch sakte hain!",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: query,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setQuery('');
    
    // Simulate AI typing
    setIsTyping(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(query),
        sender: 'ai',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Generate a simple AI response (in a real app, this would call an API)
  const generateAIResponse = (userQuery: string): string => {
    const lowerQuery = userQuery.toLowerCase();
    
    if (lowerQuery.includes('desi') || lowerQuery.includes('pakistani')) {
      return "Desi khane ke liye bohot options hain! Aap Biryani, Karahi, Nihari, Haleem ya Chapli Kebab bana sakte hain. Kaunsi recipe detail mein janna chahenge?";
    }
    
    if (lowerQuery.includes('mehman') || lowerQuery.includes('jaldi')) {
      return "Mehmanon ke liye jaldi mein, aap chicken karahi bana sakte hain - sirf 30 minute lagenge. Ya phir qeema aloo aur chawal - ye bhi jaldi ban jata hai aur sab ko pasand ata hai!";
    }
    
    if (lowerQuery.includes('bachon') || lowerQuery.includes('bache')) {
      return "Bachon ke liye chicken nuggets, pasta with white sauce, ya homemade pizza try karein. Ye recipes simple hain aur bachon ko bohot pasand ati hain!";
    }
    
    if (lowerQuery.includes('ramzan') || lowerQuery.includes('iftar')) {
      return "Ramzan ke iftar ke liye fruit chaat, dahi baray, pakore, samose, aur dates ke sath fresh juice accha option hai. Koi specific recipe chahiye to batayein!";
    }
    
    if (lowerQuery.includes('healthy') || lowerQuery.includes('diet')) {
      return "Healthy khane ke liye grilled chicken with vegetables, quinoa salad, ya lentil soup try karein. Ye protein se bharpur hain aur kam calories hain.";
    }
    
    return "Ye interesting sawal hai! Main aapki madad karne ki koshish kar sakta hoon. Kya aap apne sawal ko thora detail mein bata sakte hain?";
  };

  return (
    <NoFooterLayout>
      <div className="h-[calc(100vh-4rem)] bg-white flex flex-col">
        {/* Main container */}
        <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full px-4">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto py-6 space-y-6">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'} items-start`}>
                    {message.sender === 'ai' && (
                      <div className="flex-shrink-0 mr-3">
                        <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                          <Bot className="h-5 w-5 text-red-500" />
                        </div>
                      </div>
                    )}
                    
                    <div className={`px-4 py-3 rounded-lg ${
                      message.sender === 'user' 
                        ? 'bg-red-500 text-white mr-3' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <p className="text-sm leading-relaxed">{message.content}</p>
                    </div>
                    
                    {message.sender === 'user' && (
                      <div className="flex-shrink-0">
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-600" />
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="flex max-w-[85%] flex-row items-start">
                    <div className="flex-shrink-0 mr-3">
                      <div className="h-8 w-8 rounded-full bg-red-100 flex items-center justify-center">
                        <Bot className="h-5 w-5 text-red-500" />
                      </div>
                    </div>
                    
                    <div className="bg-gray-100 rounded-lg px-4 py-3">
                      <div className="flex space-x-2">
                        <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>
          
          {/* Suggestions */}
          {messages.length <= 1 && (
            <div className="pb-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SUGGESTIONS.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Input Area */}
          <div className="border-t border-gray-200 py-4">
            <form onSubmit={handleSubmit} className="flex gap-3">
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Kuch poochein..."
                className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500"
              />
              <button
                type="submit"
                disabled={!query.trim() || isTyping}
                className={`rounded-md p-2 ${
                  !query.trim() || isTyping
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-red-500 text-white hover:bg-red-600'
                } focus:outline-none transition-colors`}
              >
                {isTyping ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <Send className="h-5 w-5" />
                )}
              </button>
            </form>
            <div className="mt-2 text-center text-xs text-gray-400">
              <p>Abhi beta version mein hai.</p>
            </div>
          </div>
        </div>
      </div>
    </NoFooterLayout>
  );
}
