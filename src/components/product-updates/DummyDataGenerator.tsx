
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { createDummyProductUpdate } from "@/utils/seedProductUpdate";
import { useNavigate } from "react-router-dom";

export default function DummyDataGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreateDummy = async () => {
    setIsLoading(true);
    try {
      const updateId = await createDummyProductUpdate();
      if (updateId) {
        // Refresh the page to show the new data
        window.location.reload();
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleCreateDummy} 
      disabled={isLoading}
      variant="outline"
      className="mb-6"
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Creating...
        </>
      ) : (
        "Generate Dummy Product Update"
      )}
    </Button>
  );
}
