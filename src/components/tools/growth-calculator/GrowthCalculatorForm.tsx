
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, RotateCcw } from "lucide-react";

type GrowthCalculatorFormProps = {
  onCalculate: (currentSales: number, previousSales: number) => void;
};

const formSchema = z.object({
  currentSales: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Current sales must be a positive number",
  }),
  previousSales: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Previous sales must be a positive number",
  }),
});

const GrowthCalculatorForm = ({ onCalculate }: GrowthCalculatorFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentSales: "",
      previousSales: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const currentSales = Number(values.currentSales);
    const previousSales = Number(values.previousSales);
    
    // Call the parent component's onCalculate function
    onCalculate(currentSales, previousSales);
  }

  const handleReset = () => {
    form.reset();
  };

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <FormField
              control={form.control}
              name="currentSales"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Period Sales</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter current sales" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="previousSales"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Previous Period Sales</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter previous sales" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit" className="w-full md:w-auto bg-[#E98A23] hover:bg-[#d47b1e]">
              <Calculator className="w-4 h-4 mr-2" />
              Calculate Growth
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={handleReset} 
              className="w-full md:w-auto"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default GrowthCalculatorForm;
