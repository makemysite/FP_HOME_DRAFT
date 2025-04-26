
import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Calculator, RotateCcw } from "lucide-react";

const formSchema = z.object({
  previousSales: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Previous sales must be a positive number",
  }),
  currentSales: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Current sales must be a positive number",
  }),
  investmentYears: z.number().min(1).max(10),
});

type FormData = z.infer<typeof formSchema>;

type ROICalculatorFormProps = {
  onCalculate: (
    previousSales: number,
    currentSales: number,
    investmentYears: number
  ) => void;
};

const ROICalculatorForm = ({ onCalculate }: ROICalculatorFormProps) => {
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      previousSales: "",
      currentSales: "",
      investmentYears: 1
    },
  });

  const onSubmit = (values: FormData) => {
    onCalculate(
      Number(values.previousSales),
      Number(values.currentSales),
      values.investmentYears
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <FormField
            control={form.control}
            name="previousSales"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Previous Sales ($)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter previous sales" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="currentSales"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Sales ($)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter current sales" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="investmentYears"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Investment Years ({field.value})</FormLabel>
              <FormControl>
                <Slider
                  min={1}
                  max={10}
                  step={1}
                  value={[field.value]}
                  onValueChange={(value) => field.onChange(value[0])}
                  className="py-4"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <Button type="submit" className="w-full md:w-auto bg-[#E98A23] hover:bg-[#d47b1e]">
            <Calculator className="w-4 h-4 mr-2" />
            Calculate ROI
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => form.reset()} 
            className="w-full md:w-auto"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ROICalculatorForm;
