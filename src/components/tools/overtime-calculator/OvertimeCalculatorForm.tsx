
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  hoursWorked: z.coerce.number().min(0, "Hours worked must be positive"),
  basePay: z.coerce.number().min(0, "Base pay must be positive"),
  payRateType: z.enum(["Hourly", "Daily", "Weekly", "Monthly", "Annual"]),
  expectedHours: z.coerce.number().min(0, "Expected hours must be positive"),
  overtimeRateMultiplier: z.coerce.number().min(1, "Overtime rate must be at least 1x"),
});

type OvertimeFormValues = z.infer<typeof formSchema>;

interface OvertimeCalculatorFormProps {
  onCalculate: (results: {
    totalPay: number;
    overtimeHours: number;
    overtimePay: number;
    effectiveHourlyRate: number;
  }) => void;
}

const OvertimeCalculatorForm = ({ onCalculate }: OvertimeCalculatorFormProps) => {
  const form = useForm<OvertimeFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hoursWorked: 0,
      basePay: 0,
      payRateType: "Hourly",
      expectedHours: 40, // Default to standard 40-hour work week
      overtimeRateMultiplier: 1.5,
    },
  });

  const calculateOvertime = (data: OvertimeFormValues) => {
    const {
      hoursWorked,
      basePay,
      payRateType,
      expectedHours,
      overtimeRateMultiplier,
    } = data;

    // Convert base pay to hourly rate
    const hourlyRate = payRateType === "Hourly" 
      ? basePay 
      : basePay / expectedHours;

    // Use expectedHours as regularHours
    const regularHours = expectedHours;

    let totalPay = 0;
    let overtimeHours = 0;
    let overtimePay = 0;

    if (hoursWorked <= regularHours) {
      totalPay = hoursWorked * hourlyRate;
    } else {
      overtimeHours = hoursWorked - regularHours;
      const regularPay = regularHours * hourlyRate;
      overtimePay = overtimeHours * hourlyRate * overtimeRateMultiplier;
      totalPay = regularPay + overtimePay;
    }

    onCalculate({
      totalPay,
      overtimeHours,
      overtimePay,
      effectiveHourlyRate: hourlyRate,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(calculateOvertime)} className="space-y-4">
        <FormField
          control={form.control}
          name="payRateType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Pay Rate Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select pay rate type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Hourly">Hourly</SelectItem>
                  <SelectItem value="Daily">Daily</SelectItem>
                  <SelectItem value="Weekly">Weekly</SelectItem>
                  <SelectItem value="Monthly">Monthly</SelectItem>
                  <SelectItem value="Annual">Annual</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="basePay"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Base Pay Rate ($)</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="hoursWorked"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hours Worked</FormLabel>
              <FormControl>
                <Input type="number" step="0.5" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="expectedHours"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expected Hours (per pay period)</FormLabel>
              <FormControl>
                <Input type="number" step="0.5" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="overtimeRateMultiplier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Overtime Rate Multiplier (e.g., 1.5 for time-and-a-half)</FormLabel>
              <FormControl>
                <Input type="number" step="0.5" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full bg-[#E98A23] hover:bg-[#E98A23]/90">
          Calculate Overtime
        </Button>
      </form>
    </Form>
  );
};

export default OvertimeCalculatorForm;
