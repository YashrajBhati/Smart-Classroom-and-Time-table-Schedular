'use client';

import { Moon, Sun, User } from 'lucide-react';
import { useState } from 'react';

export default function Header({ title }: { title: string }) {
  const [isDark, setIsDark] = useState(true);

  return (
    <header className="h-16 border-b border-gray-800 bg-black flex items-center justify-between px-8">
      <h1 className="text-2xl font-bold">{title}</h1>
      
      <div className="flex items-center gap-4">
        <button
          onClick={() => setIsDark(!isDark)}
          className="w-10 h-10 rounded-lg bg-[#1a1a1a] flex items-center justify-center hover:bg-[#2a2a2a] transition-colors"
        >
          {isDark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </button>
        
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          <User className="w-5 h-5" />
        </div>
      </div>
    </header>
  );
}
