import React from 'react';
import { Leaf, TreePine } from 'lucide-react';

interface CampaignCardProps {
  onDonate?: () => void;
}

export default function CampaignCard({ onDonate }: CampaignCardProps) {
  return (
    <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl overflow-hidden shadow-sm border border-emerald-100">
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
              <TreePine className="w-5 h-5 text-emerald-600" />
              Plant a Tree Campaign
            </h3>
            <p className="mt-2 text-sm text-gray-600">
              Join us in making the world greener! For every order above Rs. 1000, we'll plant a tree in your name.
            </p>
          </div>
          <div className="bg-emerald-100 rounded-full p-2">
            <Leaf className="w-5 h-5 text-emerald-600" />
          </div>
        </div>
        
        <div className="mt-4">
          <div className="w-full bg-emerald-100 rounded-full h-2">
            <div 
              className="bg-emerald-500 h-2 rounded-full" 
              style={{ width: '65%' }}
            />
          </div>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="text-gray-600">325 trees planted</span>
            <span className="text-emerald-600 font-medium">Goal: 500</span>
          </div>
        </div>

        <button
          onClick={onDonate}
          className="mt-4 w-full bg-emerald-600 text-white py-2.5 px-4 rounded-lg font-medium hover:bg-emerald-700 transition-colors"
        >
          Contribute to Green Future
        </button>
      </div>
    </div>
  );
}
