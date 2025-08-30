import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

function Settings() {
  return (
    <div className="container mx-auto max-w-4xl space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">
          Customize your Breeze Flow experience
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>App Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">
              Settings page coming soon!
            </p>
            <p className="text-sm text-muted-foreground">
              Configure notifications, themes, and productivity preferences.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Settings;