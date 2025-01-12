import React from 'react';
import { ReactNode } from 'react';

interface LinkProps {
  href: string;
  icon: ReactNode;
  children: ReactNode;
}

export function Link({ href, icon, children }: LinkProps) {
  return (
    
    <a href={href} className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-teal-800/50 transition-colors duration-200 text-teal-50 hover:text-white group" >
      <span className="text-teal-300 group-hover:text-teal-200">{icon}</span>
      <span>{children}</span>
    </a>
    
  );
}