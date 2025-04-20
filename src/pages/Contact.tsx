
import React from "react";
import { useForm } from "react-hook-form";
import { Mail, MessageSquare, User, Phone, Clock } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ClientPageWrapper from "@/components/layout/ClientPageWrapper";
import { supabase } from "@/integrations/supabase/client";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .insert([data]);

      if (error) throw error;

      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      form.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error sending message",
        description: "Please try again later.",
        variant: "destructive"
      });
    }
  };

  return (
    <ClientPageWrapper
      title="Contact Us"
      description="Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible."
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          placeholder="Your name" 
                          className="pl-10" 
                          {...field} 
                        />
                        <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input 
                          placeholder="your.email@example.com" 
                          type="email" 
                          className="pl-10" 
                          {...field} 
                        />
                        <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Textarea 
                          placeholder="Your message" 
                          className="min-h-[150px] pl-10" 
                          {...field} 
                        />
                        <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full bg-[#E98A23] hover:bg-[#E98A23]/90 text-white"
              >
                Send Message
              </Button>
            </form>
          </Form>
        </div>

        {/* Contact Details */}
        <div className="bg-gray-50 p-8 rounded-lg space-y-6">
          <h2 className="text-2xl font-bold text-[#170F49] mb-4">Ways to Reach Us</h2>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Phone className="h-6 w-6 text-[#E98A23]" />
              <div>
                <h3 className="font-semibold text-lg">Call Us</h3>
                <p className="text-gray-600">+1 (888) 249-9201</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Mail className="h-6 w-6 text-[#E98A23]" />
              <div>
                <h3 className="font-semibold text-lg">E-mail</h3>
                <p className="text-gray-600">info@fieldpromax.com</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Clock className="h-6 w-6 text-[#E98A23]" />
              <div>
                <h3 className="font-semibold text-lg">Timing</h3>
                <p className="text-gray-600">Mon-Fri</p>
                <p className="text-gray-600">8:00 AM to 7:00 PM CST</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ClientPageWrapper>
  );
};

export default Contact;
