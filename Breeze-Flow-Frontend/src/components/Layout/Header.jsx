import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from '../ui/button';

function Header({ onMenuClick }) {
  return (
    <header className="fixed top-0 right-0 left-0 lg:left-64 z-40 h-16 bg-background/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden mr-2"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-muted-foreground">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden sm:block text-sm font-medium text-foreground">
            Welcome back!
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;