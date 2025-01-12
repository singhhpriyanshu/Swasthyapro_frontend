import React from 'react';

interface BadgeProps {
  active: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ active, className = '' }) => (
  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
    active 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800'
  } ${className}`}>
    {active ? 'Available' : 'Unavailable'}
  </span>
);