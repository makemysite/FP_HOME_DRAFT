
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Calculator, RotateCcw } from "lucide-react";
import ResultsDisplay from "./ResultsDisplay";

const formSchema = z.object({
  currentSales: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Current sales must be a positive number",
  }),
  previousSales: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Previous sales must be a positive number",
  }),
});

const GrowthCalculatorForm = () => {
  const [results, setResults] = React.useState<{
    currentSales: number;
    previousSales: number;
    salesGrowth: number;
    growthRate: number;
  } | null>(null);

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
    const salesGrowth = currentSales - previousSales;
    const growthRate = ((currentSales - previousSales) / previousSales) * 100;

    setResults({
      currentSales,
      previousSales,
      salesGrowth,
      growthRate,
    });
  }

  const handleReset = () => {
    form.reset();
    setResults(null);
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
            <Button type="submit" className="w-full md:w-auto">
              <Calculator className="w-4 h-4 mr-2" />
              Calculate Growth
            </Button>
            <Button type="button" variant="outline" onClick={handleReset} className="w-full md:w-auto">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </form>
      </Form>

      {results && <ResultsDisplay results={results} />}
    </div>
  );
};

export default GrowthCalculatorForm;
