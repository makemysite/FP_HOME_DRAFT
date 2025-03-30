
import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
    error: null
  };

  static getDerivedStateFromError(error: Error): State {
    console.error("ErrorBoundary caught an error:", error);
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("Error details:", error);
    console.error("Component stack:", errorInfo.componentStack);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return (
        <Alert variant="destructive" className="my-4">
          <AlertTriangle className="h-4 w-4 mr-2" />
          <AlertDescription>
            <div className="space-y-2">
              <p className="font-semibold">Something went wrong</p>
              <p className="text-sm">
                {this.state.error?.message || "An unexpected error occurred"}
              </p>
              <button 
                onClick={() => window.location.reload()}
                className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded mt-2"
              >
                Reload page
              </button>
            </div>
          </AlertDescription>
        </Alert>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
