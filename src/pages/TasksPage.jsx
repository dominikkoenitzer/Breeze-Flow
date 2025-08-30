import React from 'react';
import TaskList from '../components/TaskManager/TaskList';

function TasksPage() {
  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Tasks</h1>
          <p className="text-muted-foreground text-lg">
            Organize your work and stay productive
          </p>
        </div>
        
        <TaskList />
      </div>
    </div>
  );
}

export default TasksPage;
