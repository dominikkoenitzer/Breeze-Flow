import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

function Calendar() {
  return (
    <div className="container mx-auto max-w-4xl space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Calendar</h1>
        <p className="text-muted-foreground">
          Plan your schedule and organize your time
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Calendar View</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              Calendar feature coming soon!
            </p>
            <p className="text-sm text-muted-foreground">
              This will include a beautiful calendar view to plan your tasks and focus sessions.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Calendar;