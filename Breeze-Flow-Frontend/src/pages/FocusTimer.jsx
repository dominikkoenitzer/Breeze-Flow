import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Timer as TimerIcon, 
  Coffee,
  Settings as SettingsIcon,
  CheckCircle,
  Activity 
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Progress } from '../components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import localStorageService from '../services/localStorage';

function FocusTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [workDuration, setWorkDuration] = useState(25);
  const [shortBreakDuration, setShortBreakDuration] = useState(5);
  const [longBreakDuration, setLongBreakDuration] = useState(15);
  const [sessionsCompleted, setSessionsCompleted] = useState(0);
  const [totalFocusTime, setTotalFocusTime] = useState(0);
  const [currentSessionType, setCurrentSessionType] = useState('work');
  const intervalRef = useRef(null);

  // Load saved state on component mount
  useEffect(() => {
    loadTimerState();
    loadStats();
  }, []);

  // Save timer state whenever it changes
  useEffect(() => {
    saveTimerState();
  }, [timeLeft, isActive, isBreak, currentSessionType, workDuration, shortBreakDuration, longBreakDuration]);

  // Timer logic
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          const newTime = prevTime - 1;
          if (newTime <= 0) {
            handleTimerComplete();
            return 0;
          }
          return newTime;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isActive, timeLeft]);

  const loadTimerState = () => {
    const savedState = localStorageService.getTimerState();
    if (savedState) {
      setTimeLeft(savedState.timeLeft || 25 * 60);
      setIsActive(savedState.isActive || false);
      setIsBreak(savedState.isBreak || false);
      setCurrentSessionType(savedState.currentSessionType || 'work');
      setWorkDuration(savedState.workDuration || 25);
      setShortBreakDuration(savedState.shortBreakDuration || 5);
      setLongBreakDuration(savedState.longBreakDuration || 15);
    }
  };

  const saveTimerState = () => {
    localStorageService.saveTimerState({
      timeLeft,
      isActive,
      isBreak,
      currentSessionType,
      workDuration,
      shortBreakDuration,
      longBreakDuration
    });
  };

  const loadStats = () => {
    const sessions = localStorageService.getFocusSessions();
    const today = new Date().toDateString();
    const todaySessions = sessions.filter(session => 
      new Date(session.date).toDateString() === today
    );
    
    setSessionsCompleted(todaySessions.length);
    setTotalFocusTime(todaySessions.reduce((total, session) => total + session.duration, 0));
  };

  const handleTimerComplete = () => {
    setIsActive(false);
    
    if (currentSessionType === 'work') {
      // Save completed work session
      localStorageService.saveFocusSession({
        type: 'work',
        duration: workDuration,
        completed: true
      });
      
      setSessionsCompleted(prev => prev + 1);
      setTotalFocusTime(prev => prev + workDuration);
      
      // Determine break type
      const newSessionCount = sessionsCompleted + 1;
      const isLongBreak = newSessionCount % 4 === 0;
      const breakDuration = isLongBreak ? longBreakDuration : shortBreakDuration;
      
      setCurrentSessionType(isLongBreak ? 'longBreak' : 'shortBreak');
      setIsBreak(true);
      setTimeLeft(breakDuration * 60);
      
      // Show notification
      showNotification(
        'Work session complete!', 
        `Time for a ${isLongBreak ? 'long' : 'short'} break (${breakDuration} minutes)`
      );
    } else {
      // Break completed, start new work session
      setCurrentSessionType('work');
      setIsBreak(false);
      setTimeLeft(workDuration * 60);
      
      showNotification('Break complete!', 'Ready for another work session?');
    }
    
    // Clear saved timer state when session completes
    localStorageService.clearTimerState();
  };

  const showNotification = (title, body) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body });
    } else if ('Notification' in window && Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification(title, { body });
        }
      });
    }
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setCurrentSessionType('work');
    setTimeLeft(workDuration * 60);
    localStorageService.clearTimerState();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getProgress = () => {
    const totalTime = currentSessionType === 'work' 
      ? workDuration * 60 
      : (currentSessionType === 'longBreak' ? longBreakDuration : shortBreakDuration) * 60;
    return ((totalTime - timeLeft) / totalTime) * 100;
  };

  const getSessionIcon = () => {
    switch (currentSessionType) {
      case 'work': return <TimerIcon className="h-6 w-6" />;
      case 'shortBreak': return <Coffee className="h-6 w-6" />;
      case 'longBreak': return <Coffee className="h-6 w-6" />;
      default: return <TimerIcon className="h-6 w-6" />;
    }
  };

  const getSessionTitle = () => {
    switch (currentSessionType) {
      case 'work': return 'Focus Session';
      case 'shortBreak': return 'Short Break';
      case 'longBreak': return 'Long Break';
      default: return 'Focus Session';
    }
  };

  return (
    <div className="container mx-auto max-w-4xl space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Focus Timer</h1>
        <p className="text-muted-foreground">
          Stay productive with the Pomodoro Technique
        </p>
      </div>

      {/* Main Timer Card */}
      <Card className="mx-auto max-w-lg">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            {getSessionIcon()}
            <CardTitle className="text-2xl">{getSessionTitle()}</CardTitle>
          </div>
          <Progress value={getProgress()} className="h-2" />
        </CardHeader>
        
        <CardContent className="text-center space-y-6">
          {/* Timer Display */}
          <div className="text-6xl font-mono font-bold text-foreground">
            {formatTime(timeLeft)}
          </div>
          
          {/* Control Buttons */}
          <div className="flex justify-center space-x-4">
            <Button
              onClick={toggleTimer}
              size="lg"
              className="px-8"
              variant={isActive ? "secondary" : "default"}
            >
              {isActive ? (
                <>
                  <Pause className="mr-2 h-5 w-5" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="mr-2 h-5 w-5" />
                  Start
                </>
              )}
            </Button>
            
            <Button
              onClick={resetTimer}
              size="lg"
              variant="outline"
            >
              <RotateCcw className="mr-2 h-5 w-5" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <CheckCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{sessionsCompleted}</p>
                <p className="text-sm text-muted-foreground">Sessions Today</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <Activity className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{totalFocusTime}</p>
                <p className="text-sm text-muted-foreground">Minutes Focused</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <TimerIcon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {Math.round((sessionsCompleted / 8) * 100)}%
                </p>
                <p className="text-sm text-muted-foreground">Daily Goal</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Settings Dialog */}
      <div className="flex justify-center">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline">
              <SettingsIcon className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Timer Settings</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="durations" className="w-full">
              <TabsList className="grid w-full grid-cols-1">
                <TabsTrigger value="durations">Durations</TabsTrigger>
              </TabsList>
              <TabsContent value="durations" className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Work Duration (minutes)</label>
                  <Input
                    type="number"
                    value={workDuration}
                    onChange={(e) => setWorkDuration(Number(e.target.value))}
                    min="1"
                    max="120"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Short Break (minutes)</label>
                  <Input
                    type="number"
                    value={shortBreakDuration}
                    onChange={(e) => setShortBreakDuration(Number(e.target.value))}
                    min="1"
                    max="30"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Long Break (minutes)</label>
                  <Input
                    type="number"
                    value={longBreakDuration}
                    onChange={(e) => setLongBreakDuration(Number(e.target.value))}
                    min="1"
                    max="60"
                  />
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default FocusTimer;