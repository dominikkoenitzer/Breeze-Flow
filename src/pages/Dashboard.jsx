import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Timer, 
  CheckSquare, 
  Calendar,
  Play,
  Plus,
  Clock,
  Target,
  Coffee
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { localStorageService } from '../services/localStorage';

function Dashboard() {
  const [stats, setStats] = useState({
    todayFocusTime: 0,
    todaySessions: 0,
    activeTasks: 0,
    completedTasks: 0,
    totalPomodoros: 0
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = () => {
    // Load focus stats
    const sessions = localStorageService.getFocusSessions();
    const today = new Date().toDateString();
    const todaySessions = sessions.filter(session => 
      new Date(session.date).toDateString() === today
    );
    
    // Load task stats
    const tasks = localStorageService.getTasks();
    const activeTasks = tasks.filter(task => !task.completed);
    const completedTasks = tasks.filter(task => task.completed);

    // Load timer state
    const timerState = localStorageService.getTimerState();
    const totalPomodoros = timerState ? timerState.pomodorosCompleted || 0 : 0;

    const todayFocusTime = todaySessions.reduce((total, session) => 
      total + (session.duration || 0), 0
    );

    setStats({
      todayFocusTime: Math.floor(todayFocusTime / 60), // in minutes
      todaySessions: todaySessions.length,
      activeTasks: activeTasks.length,
      completedTasks: completedTasks.length,
      totalPomodoros
    });
  };

  const formatTime = (minutes) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Good morning! 👋</h1>
          <p className="text-muted-foreground text-lg">
            Ready to make today productive?
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Focus Time Today</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{formatTime(stats.todayFocusTime)}</div>
              <p className="text-xs text-muted-foreground">
                {stats.todaySessions} sessions completed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Pomodoros</CardTitle>
              <Coffee className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalPomodoros}</div>
              <p className="text-xs text-muted-foreground">
                Keep the momentum going!
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
              <CheckSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeTasks}</div>
              <p className="text-xs text-muted-foreground">
                Tasks to complete
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Tasks</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.completedTasks}</div>
              <p className="text-xs text-muted-foreground">
                Great job! 🎉
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-2 border-dashed hover:border-primary transition-colors">
            <CardContent className="flex flex-col items-center justify-center py-8">
              <Timer className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Start Focus Session</h3>
              <p className="text-muted-foreground text-center mb-4">
                Begin a 25-minute focused work session
              </p>
              <Button asChild>
                <Link to="/focus">
                  <Play className="h-4 w-4 mr-2" />
                  Start Timer
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-dashed hover:border-primary transition-colors">
            <CardContent className="flex flex-col items-center justify-center py-8">
              <CheckSquare className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Manage Tasks</h3>
              <p className="text-muted-foreground text-center mb-4">
                Add, edit, and organize your tasks
              </p>
              <Button asChild variant="outline">
                <Link to="/tasks">
                  <Plus className="h-4 w-4 mr-2" />
                  View Tasks
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-dashed hover:border-primary transition-colors">
            <CardContent className="flex flex-col items-center justify-center py-8">
              <Calendar className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-lg font-semibold mb-2">Plan Your Day</h3>
              <p className="text-muted-foreground text-center mb-4">
                Schedule and track your events
              </p>
              <Button asChild variant="outline">
                <Link to="/calendar">
                  <Calendar className="h-4 w-4 mr-2" />
                  Open Calendar
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Motivation */}
        <div className="mt-12 text-center">
          <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
            <CardContent className="py-8">
              <h2 className="text-2xl font-bold mb-2">💪 Stay Focused, Stay Productive</h2>
              <p className="text-muted-foreground">
                Every small step counts towards your bigger goals. Keep going!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
