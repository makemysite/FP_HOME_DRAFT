
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ContactSubmissionsManager from '../ContactSubmissionsManager';

const ContactSubmissionsPage = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Contact Form Submissions</CardTitle>
        </CardHeader>
        <CardContent>
          <ContactSubmissionsManager />
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactSubmissionsPage;
