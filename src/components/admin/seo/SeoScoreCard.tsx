
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

interface SeoScoreCardProps {
  score: number;
  title: string;
  description?: string;
  status: 'good' | 'warning' | 'error';
}

const SeoScoreCard = ({ score, title, description, status }: SeoScoreCardProps) => {
  const getStatusColor = () => {
    switch (status) {
      case 'good':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  const getStatusIcon = () => {
    switch (status) {
      case 'good':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'error':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getProgressColor = () => {
    if (score >= 70) return 'bg-green-500';
    if (score >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          <Badge variant="outline" className={getStatusColor()}>
            <span className="flex items-center gap-1">
              {getStatusIcon()}
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
          </Badge>
        </div>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-end justify-between">
            <div className="text-3xl font-bold">{score}</div>
            <div className="text-sm text-muted-foreground">out of 100</div>
          </div>
          <Progress value={score} className={getProgressColor()} />
        </div>
      </CardContent>
    </Card>
  );
};

export default SeoScoreCard;
