import React from 'react';
import { Clock } from 'lucide-react';
import { Badge } from "../components/ui/Badge";
import { PriceTag } from "../components/ui/PriceTag";

interface DoctorCardMinimalProps {
  name: string;
  specialty: string;
  isActive: boolean;
  fees: number;
  imageUrl: string;
  nextAvailable: string;
}

export const DoctorCardMinimal: React.FC<DoctorCardMinimalProps> = ({
  name,
  specialty,
  isActive,
  fees,
  imageUrl,
  nextAvailable,
}) => (
  <div className="w-80 bg-gray-50 rounded-lg p-4 border border-gray-200">
    <div className="flex space-x-4">
      <img
        src={imageUrl}
        alt={`Dr. ${name}`}
        className="w-24 h-24 rounded-full object-cover"
      />
      <div className="flex-1">
        <div className="flex justify-between">
          <h3 className="text-lg font-semibold text-gray-900">Dr. {name}</h3>
          <Badge active={isActive} />
        </div>
        <p className="text-sm text-gray-600 mt-1">{specialty}</p>
        <div className="flex items-center mt-2 text-sm text-gray-500">
          <Clock  />
          <span>Next: {nextAvailable}</span>
        </div>
      </div>
    </div>
    
    <div className="mt-4 flex justify-between items-center pt-4 border-t border-gray-200">
      <PriceTag amount={fees} />
      <button className="px-4 py-2 text-blue-500 hover:text-blue-600 font-medium">
        Schedule
      </button>
    </div>
  </div>
);