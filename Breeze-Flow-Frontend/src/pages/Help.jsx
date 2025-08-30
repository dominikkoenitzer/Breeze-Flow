import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

function Help() {
  return (
    <div className="container mx-auto max-w-4xl space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Help & Support</h1>
        <p className="text-muted-foreground">
          Get help with using Breeze Flow
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Help Center</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              Help documentation coming soon!
            </p>
            <p className="text-sm text-muted-foreground">
              Find answers to common questions and learn how to make the most of Breeze Flow.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Help;