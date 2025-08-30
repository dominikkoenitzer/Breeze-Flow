import React, { useState, useEffect, useCallback } from 'react';
import { Play, Pause, Square, Settings } from 'lucide-react';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';

const DEFAULT_WORK_TIME = 25 * 60; // 25 minutes in seconds
const DEFAULT_BREAK_TIME = 5 * 60; // 5 minutes in seconds
const DEFAULT_LONG_BREAK_TIME = 15 * 60; // 15 minutes in seconds

const STORAGE_KEY = 'breeze_flow_timer_state';

const PomodoroTimer = () => {
  const [timeLeft, setTimeLeft] = useState(DEFAULT_WORK_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [pomodorosCompleted, setPomodorosCompleted] = useState(0);
  const [workTime, setWorkTime] = useState(DEFAULT_WORK_TIME);
  const [breakTime, setBreakTime] = useState(DEFAULT_BREAK_TIME);
  const [longBreakTime, setLongBreakTime] = useState(DEFAULT_LONG_BREAK_TIME);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [lastSaved, setLastSaved] = useState(Date.now());

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem(STORAGE_KEY);
    if (savedState) {
      try {
        const state = JSON.parse(savedState);
        
        // Calculate time elapsed since last save if timer was running
        if (state.isRunning && state.lastSaved) {
          const timeElapsed = Math.floor((Date.now() - state.lastSaved) / 1000);
          const newTimeLeft = Math.max(0, state.timeLeft - timeElapsed);
          
          setTimeLeft(newTimeLeft);
          
          // If time ran out while away, handle completion
          if (newTimeLeft === 0 && state.timeLeft > 0) {
            handleComplete(state.isBreak, state.pomodorosCompleted);
            setIsRunning(false);
          } else {
            setIsRunning(state.isRunning);
          }
        } else {
          setTimeLeft(state.timeLeft);
          setIsRunning(false);
        }
        
        setIsBreak(state.isBreak || false);
        setPomodorosCompleted(state.pomodorosCompleted || 0);
        setWorkTime(state.workTime || DEFAULT_WORK_TIME);
        setBreakTime(state.breakTime || DEFAULT_BREAK_TIME);
        setLongBreakTime(state.longBreakTime || DEFAULT_LONG_BREAK_TIME);
      } catch (error) {
        console.error('Failed to load timer state:', error);
      }
    }
  }, []);

  // Save state to localStorage whenever relevant state changes
  useEffect(() => {
    const state = {
      timeLeft,
      isRunning,
      isBreak,
      pomodorosCompleted,
      workTime,
      breakTime,
      longBreakTime,
      lastSaved: Date.now()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    setLastSaved(Date.now());
  }, [timeLeft, isRunning, isBreak, pomodorosCompleted, workTime, breakTime, longBreakTime]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const showNotification = (title, message) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body: message, icon: '/favicon.ico' });
    }
  };

  const handleComplete = useCallback((currentIsBreak = isBreak, currentPomodoros = pomodorosCompleted) => {
    const isWorkComplete = !currentIsBreak;
    if (isWorkComplete) {
      const newPomodorosCompleted = currentPomodoros + 1;
      setPomodorosCompleted(newPomodorosCompleted);
      setIsBreak(true);
      const nextBreakTime = newPomodorosCompleted % 4 === 0 ? longBreakTime : breakTime;
      setTimeLeft(nextBreakTime);
      showNotification('Work Session Complete!', 'Time for a break 🎉');
    } else {
      setIsBreak(false);
      setTimeLeft(workTime);
      showNotification('Break Complete!', 'Ready to focus again? 💪');
    }
    setIsRunning(false);
  }, [isBreak, pomodorosCompleted, breakTime, longBreakTime, workTime]);

  useEffect(() => {
    let interval;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, handleComplete]);

  // Request notification permission on first interaction
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(isBreak ? (pomodorosCompleted % 4 === 0 ? longBreakTime : breakTime) : workTime);
  };

  const skipSession = () => {
    setIsRunning(false);
    handleComplete();
  };

  const currentSessionTime = isBreak ? (pomodorosCompleted % 4 === 0 ? longBreakTime : breakTime) : workTime;
  const progress = ((currentSessionTime - timeLeft) / currentSessionTime) * 100;
  const totalFocusTime = Math.floor((pomodorosCompleted * workTime) / 60);

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      {/* Main Timer Card */}
      <Card className="text-center">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {isBreak ? (pomodorosCompleted % 4 === 0 ? 'Long Break' : 'Short Break') : 'Focus Time'}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-7xl font-mono font-bold text-primary">
            {formatTime(timeLeft)}
          </div>
          
          <Progress value={progress} className="h-3" />
          
          <div className="flex justify-center gap-4">
            <Button
              onClick={toggleTimer}
              size="lg"
              className="rounded-full w-16 h-16"
              variant={isRunning ? "secondary" : "default"}
            >
              {isRunning ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </Button>
            
            <Button
              onClick={resetTimer}
              size="lg"
              variant="outline"
              className="rounded-full w-16 h-16"
            >
              <Square className="h-6 w-6" />
            </Button>

            <Button
              onClick={skipSession}
              size="lg"
              variant="outline"
              className="px-6"
              disabled={timeLeft === currentSessionTime}
            >
              Skip
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-primary">{pomodorosCompleted}</div>
              <div className="text-sm text-muted-foreground">Pomodoros Completed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">{totalFocusTime}</div>
              <div className="text-sm text-muted-foreground">Minutes Focused</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings Dialog */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <div className="flex justify-center">
          <DialogTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </Button>
          </DialogTrigger>
        </div>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Timer Settings</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Work Duration (minutes)</label>
              <Input
                type="number"
                min="1"
                max="60"
                value={Math.floor(workTime / 60)}
                onChange={(e) => setWorkTime(parseInt(e.target.value) * 60)}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Short Break (minutes)</label>
              <Input
                type="number"
                min="1"
                max="30"
                value={Math.floor(breakTime / 60)}
                onChange={(e) => setBreakTime(parseInt(e.target.value) * 60)}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Long Break (minutes)</label>
              <Input
                type="number"
                min="1"
                max="60"
                value={Math.floor(longBreakTime / 60)}
                onChange={(e) => setLongBreakTime(parseInt(e.target.value) * 60)}
                className="mt-1"
              />
            </div>
            <Button 
              onClick={() => setIsSettingsOpen(false)} 
              className="w-full"
            >
              Save Settings
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PomodoroTimer; 