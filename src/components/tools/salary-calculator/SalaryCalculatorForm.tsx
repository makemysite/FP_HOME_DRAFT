
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  annualSalary: z.string().transform(Number).refine((n) => n > 0, {
    message: "Annual salary must be greater than 0",
  }),
  weeklyHours: z.string().transform(Number).refine((n) => n > 0 && n <= 168, {
    message: "Weekly hours must be between 1 and 168",
  }),
  weeksPerYear: z.string().transform(Number).refine((n) => n > 0 && n <= 52, {
    message: "Weeks per year must be between 1 and 52",
  }),
});

type SalaryCalculatorFormProps = {
  onCalculate: (annualSalary: number, weeklyHours: number, weeksPerYear: number) => void;
};

const SalaryCalculatorForm = ({ onCalculate }: SalaryCalculatorFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      annualSalary: "",
      weeklyHours: "40",
      weeksPerYear: "52",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    onCalculate(
      Number(values.annualSalary),
      Number(values.weeklyHours),
      Number(values.weeksPerYear)
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="annualSalary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Annual Salary (before taxes)</FormLabel>
              <FormControl>
                <Input type="number" placeholder="Enter your annual salary" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="weeklyHours"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hours Worked Per Week</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="weeksPerYear"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Weeks Worked Per Year</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full md:w-auto">Calculate</Button>
      </form>
    </Form>
  );
};

export default SalaryCalculatorForm;
