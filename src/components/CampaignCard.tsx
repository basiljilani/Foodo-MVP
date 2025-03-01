import React from 'react';
import { Leaf } from 'lucide-react';

interface CampaignCardProps {
  onDonate: () => void;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ onDonate }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="relative h-[140px] bg-gradient-to-r from-green-600 to-green-400">
        <div className="absolute inset-0 flex items-center justify-center">
          <Leaf className="w-16 h-16 text-white" />
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">Plant a Tree Campaign</h3>
        <p className="text-sm text-gray-600 mb-4">
          Join us in making the world greener. For every order, we plant a tree.
        </p>
        
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm text-gray-500">Trees Planted</div>
            <div className="text-xl font-semibold">1,234</div>
          </div>
          
          <button
            onClick={onDonate}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Donate
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignCard;
