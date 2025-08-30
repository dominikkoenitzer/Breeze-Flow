import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Timer, 
  CheckSquare, 
  Calendar,
  TrendingUp,
  Play,
  Plus,
  Clock,
  Target
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import localStorageService from '../services/localStorage';

function Dashboard() {
  const [stats, setStats] = useState({
    todayFocusTime: 0,
    todaySessions: 0,
    activeTasks: 0,
    completedTasks: 0,
    overdueTasks: 0
  });
  const [recentTasks, setRecentTasks] = useState([]);
  const [timerState, setTimerState] = useState(null);

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
    const overdueTasks = tasks.filter(task => 
      !task.completed && task.dueDate && new Date(task.dueDate) < new Date()
    );

    // Get recent tasks (last 5 active tasks)
    const recentActiveTasks = activeTasks
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);

    // Load timer state
    const currentTimerState = localStorageService.getTimerState();

    setStats({
      todayFocusTime: todaySessions.reduce((total, session) => total + session.duration, 0),
      todaySessions: todaySessions.length,
      activeTasks: activeTasks.length,
      completedTasks: completedTasks.length,
      overdueTasks: overdueTasks.length
    });
    
    setRecentTasks(recentActiveTasks);
    setTimerState(currentTimerState);
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="container mx-auto max-w-7xl space-y-8">
      {/* Welcome Section */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          {getGreeting()}! 👋
        </h1>
        <p className="text-xl text-muted-foreground">
          Ready to be productive today?
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Focus Time Today</CardTitle>
            <Timer className="h-4 w-4 text-muted-foreground" />
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
            <CardTitle className="text-sm font-medium">Active Tasks</CardTitle>
            <CheckSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeTasks}</div>
            <p className="text-xs text-muted-foreground">
              {stats.overdueTasks} overdue
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
              All time
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Productivity</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.completedTasks > 0 
                ? Math.round((stats.completedTasks / (stats.completedTasks + stats.activeTasks)) * 100)
                : 0}%
            </div>
            <p className="text-xs text-muted-foreground">
              Completion rate
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Timer Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Button asChild className="h-auto p-4">
                <Link to="/focus" className="flex flex-col items-center space-y-2">
                  <Play className="h-6 w-6" />
                  <span>Start Focus Session</span>
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="h-auto p-4">
                <Link to="/tasks" className="flex flex-col items-center space-y-2">
                  <Plus className="h-6 w-6" />
                  <span>Add New Task</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Timer Status */}
        <Card>
          <CardHeader>
            <CardTitle>Timer Status</CardTitle>
          </CardHeader>
          <CardContent>
            {timerState && timerState.isActive ? (
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-primary animate-pulse" />
                  <span className="text-lg font-medium">Timer is running</span>
                </div>
                <div className="text-2xl font-mono font-bold">
                  {Math.floor(timerState.timeLeft / 60).toString().padStart(2, '0')}:
                  {(timerState.timeLeft % 60).toString().padStart(2, '0')}
                </div>
                <p className="text-sm text-muted-foreground">
                  {timerState.currentSessionType === 'work' ? 'Focus session' : 'Break time'}
                </p>
                <Button asChild className="w-full">
                  <Link to="/focus">Continue Session</Link>
                </Button>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className="text-muted-foreground">
                  No active timer session
                </div>
                <Button asChild className="w-full">
                  <Link to="/focus">Start New Session</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Tasks */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Tasks</CardTitle>
          <Button asChild variant="outline" size="sm">
            <Link to="/tasks">View All</Link>
          </Button>
        </CardHeader>
        <CardContent>
          {recentTasks.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">No tasks yet</p>
              <Button asChild>
                <Link to="/tasks">Create Your First Task</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {recentTasks.map(task => (
                <div key={task.id} className="flex items-center space-x-3 p-3 rounded-lg border">
                  <div className={`w-3 h-3 rounded-full ${
                    task.priority === 'high' ? 'bg-red-500' :
                    task.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`} />
                  <div className="flex-1">
                    <h4 className="font-medium text-foreground">{task.title}</h4>
                    {task.dueDate && (
                      <p className="text-sm text-muted-foreground">
                        Due: {new Date(task.dueDate).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  {task.dueDate && new Date(task.dueDate) < new Date() && (
                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                      Overdue
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default Dashboard;
