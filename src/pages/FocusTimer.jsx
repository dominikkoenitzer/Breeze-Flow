import React from 'react';
import PomodoroTimer from '../components/FocusTimer/PomodoroTimer';

function FocusTimer() {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Focus Timer</h1>
          <p className="text-muted-foreground text-lg">
            Stay focused with the Pomodoro Technique
          </p>
        </div>
        
        <PomodoroTimer />
        
        <div className="mt-12 text-center text-sm text-muted-foreground">
          <p>
            The Pomodoro Technique: Work for 25 minutes, then take a 5-minute break. 
            After 4 cycles, take a longer 15-minute break.
          </p>
        </div>
      </div>
    </div>
  );
}

export default FocusTimer;