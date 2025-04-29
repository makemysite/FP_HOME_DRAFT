
import React from 'react';
import { SeoFactor } from '@/services/seoBot';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, AlertTriangle, CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SeoFactorsListProps {
  factors: SeoFactor[];
}

const SeoFactorsList: React.FC<SeoFactorsListProps> = ({ factors }) => {
  const getStatusIcon = (status: 'good' | 'warning' | 'error') => {
    switch (status) {
      case 'good':
        return <CheckCircle className="h-4 w-4" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4" />;
      case 'error':
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: 'good' | 'warning' | 'error') => {
    switch (status) {
      case 'good':
        return 'text-green-500';
      case 'warning':
        return 'text-yellow-500';
      case 'error':
        return 'text-red-500';
    }
  };

  const getAlertVariant = (status: 'good' | 'warning' | 'error'): 'default' | 'destructive' => {
    switch (status) {
      case 'good':
        return 'default';
      case 'warning':
        return 'default'; // Use default for warning as well since 'warning' is not a valid variant
      case 'error':
        return 'destructive';
      default:
        return 'default';
    }
  };

  return (
    <Accordion type="single" collapsible className="w-full">
      {factors.map((factor, index) => (
        <AccordionItem key={`${factor.name}-${index}`} value={`item-${index}`}>
          <AccordionTrigger className="flex justify-between text-left">
            <div className="flex items-center gap-2">
              <span className={getStatusColor(factor.status)}>{getStatusIcon(factor.status)}</span>
              <span>{factor.name}</span>
            </div>
            <Badge 
              className="ml-auto mr-2" 
              variant={factor.status === 'good' ? 'default' : factor.status === 'warning' ? 'outline' : 'destructive'}
            >
              {factor.score}/100
            </Badge>
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 p-1">
              <p className="text-sm text-muted-foreground">{factor.description}</p>
              
              <Alert variant={getAlertVariant(factor.status)}>
                <AlertTitle>Findings</AlertTitle>
                <AlertDescription>
                  <ul className="list-disc pl-5 space-y-1">
                    {factor.suggestions.map((suggestion, i) => (
                      <li key={i} className="text-sm">{suggestion}</li>
                    ))}
                  </ul>
                </AlertDescription>
              </Alert>
            </div>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default SeoFactorsList;
