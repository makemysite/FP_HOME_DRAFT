
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const formSchema = z.object({
  mode: z.enum(["Percent Off", "Fixed Amount Off"]),
  priceBeforeDiscount: z.coerce.number().min(0),
  discountValue: z.coerce.number().min(0),
});

type DiscountFormValues = z.infer<typeof formSchema>;

interface DiscountCalculatorFormProps {
  onCalculate: (results: {
    priceAfterDiscount: number;
    discountPercentage: number;
    originalPrice: number;
    discountAmount: number;
  }) => void;
}

const DiscountCalculatorForm = ({ onCalculate }: DiscountCalculatorFormProps) => {
  const form = useForm<DiscountFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      mode: "Percent Off",
      priceBeforeDiscount: 0,
      discountValue: 0,
    },
  });

  const calculateDiscount = (data: DiscountFormValues) => {
    const { mode, priceBeforeDiscount, discountValue } = data;
    let priceAfterDiscount = 0;
    let discountPercentage = 0;

    if (mode === "Percent Off") {
      discountPercentage = discountValue;
      priceAfterDiscount = priceBeforeDiscount - (priceBeforeDiscount * (discountValue / 100));
    } else {
      priceAfterDiscount = priceBeforeDiscount - discountValue;
      discountPercentage = (discountValue / priceBeforeDiscount) * 100;
    }

    onCalculate({
      priceAfterDiscount,
      discountPercentage,
      originalPrice: priceBeforeDiscount,
      discountAmount: priceBeforeDiscount - priceAfterDiscount,
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(calculateDiscount)} className="space-y-4">
        <FormField
          control={form.control}
          name="mode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Discount Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select discount type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Percent Off">Percent Off</SelectItem>
                  <SelectItem value="Fixed Amount Off">Fixed Amount Off</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="priceBeforeDiscount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Original Price ($)</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" min="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="discountValue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {form.watch("mode") === "Percent Off" ? "Discount Percentage (%)" : "Discount Amount ($)"}
              </FormLabel>
              <FormControl>
                <Input type="number" step="0.01" min="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full bg-[#E98A23] hover:bg-[#E98A23]/90">
          Calculate Discount
        </Button>
      </form>
    </Form>
  );
};

export default DiscountCalculatorForm;
