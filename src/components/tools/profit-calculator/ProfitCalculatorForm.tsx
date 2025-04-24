
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import ResultsDisplay from "./ResultsDisplay";
import { Calculator, Reset } from "lucide-react";

const formSchema = z.object({
  revenue: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Revenue must be a positive number",
  }),
  cogs: z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    message: "Cost of goods sold must be a positive number",
  }),
});

const ProfitCalculatorForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      revenue: "",
      cogs: "",
    },
  });

  const [results, setResults] = React.useState<{
    revenue: number;
    cogs: number;
    grossProfit: number;
    profitMargin: number;
  } | null>(null);

  function onSubmit(values: z.infer<typeof formSchema>) {
    const revenue = Number(values.revenue);
    const cogs = Number(values.cogs);
    const grossProfit = revenue - cogs;
    const profitMargin = (grossProfit / revenue) * 100;

    setResults({
      revenue,
      cogs,
      grossProfit,
      profitMargin,
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
              name="revenue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Revenue</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter total revenue" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cogs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cost of Goods Sold (COGS)</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter total costs" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit" className="w-full md:w-auto">
              <Calculator className="w-4 h-4 mr-2" />
              Calculate
            </Button>
            <Button type="button" variant="outline" onClick={handleReset} className="w-full md:w-auto">
              <Reset className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </form>
      </Form>

      {results && <ResultsDisplay results={results} />}
    </div>
  );
};

export default ProfitCalculatorForm;
