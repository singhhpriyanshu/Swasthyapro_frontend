import React from 'react';
import { DollarSign } from 'lucide-react';

interface PriceTagProps {
  amount: number;
}

export const PriceTag: React.FC<PriceTagProps> = ({ amount }) => (
  <div className="flex items-center text-gray-700 font-medium">
    <DollarSign />
    <span className="text-lg">{amount}</span>
    <span className="text-sm text-gray-500 ml-1">/visit</span>
  </div>
);