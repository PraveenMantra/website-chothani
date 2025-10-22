"use client";

import Image from "next/image";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils"; // ✅ Shadcn UI toaster hook
import { Loader2 } from "lucide-react"; // for button spinner
import { toast } from "sonner";

// ✅ Zod validation schema
const formSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  mobile: z
    .string()
    .min(10, "Enter a valid mobile number")
    .max(15, "Enter a valid mobile number")
    .regex(/^[0-9+\-\s()]+$/, "Only numbers and + - ( ) allowed"),
  email: z.string().email("Enter a valid email"),
  configuration: z.string().optional(),
});

// ✅ Helper: Validate required environment variables
const validateEnvVars = () => {
  const requiredVars = {
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
    sourceEmail: process.env.NEXT_PUBLIC_SOURCE_EMAIL,
    regardsFrom: process.env.NEXT_PUBLIC_REGARDS_FROM,
    receiverEmails: process.env.NEXT_PUBLIC_RECEIVER_EMAILS,
    websiteId: process.env.NEXT_PUBLIC_WEBSITE_ID,
  };

  const missingVars = Object.entries(requiredVars)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missingVars.length > 0) {
    console.error("Missing environment variables:", missingVars);
    toast.error("Configuration Error", {
      description: "Missing environment configuration. Please contact support.",
    });
    return false;
  }

  return true;
};

// ✅ Format multiple email receivers
const formatEmailList = (emails?: string): string[] => {
  if (!emails) return [];
  const cleaned = emails.replace(/^\[|\]$/g, "").trim();
  return cleaned.split(",").map((email) => email.trim());
};

type FormValues = z.infer<typeof formSchema>;

export default function ContactUsSection() {
  const [loading, setLoading] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      mobile: "",
      email: "",
      configuration: "",
    },
  });

  // ✅ Submit Handler
  async function onSubmit(values: FormValues) {
    if (!validateEnvVars()) return;

    setLoading(true);
    try {
      const contactData = {
        name: values.name,
        email: values.email,
        number: values.mobile,
        message: values.configuration || "",
        website_id: process.env.NEXT_PUBLIC_WEBSITE_ID,
        Source: process.env.NEXT_PUBLIC_SOURCE_EMAIL,
        regards: process.env.NEXT_PUBLIC_REGARDS_FROM,
        sendTo: formatEmailList(process.env.NEXT_PUBLIC_RECEIVER_EMAILS),
        bodytext: "New Contact Request",
        description: `Name: ${values.name}\nEmail: ${values.email}\nMobile: ${values.mobile}\nMessage: ${values.configuration}`,
      };

      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${apiUrl}/contactus/send-mail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactData),
      });

      if (!res.ok) throw new Error("Failed to send message");

      toast.success("Message Sent ✅", {
        description: "Thank you for contacting us. We'll reach out soon!",
      });
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error("Unable to send message. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section
      id="contact-us"
      className="relative bg-cover bg-center border-b border-black/10 overflow-hidden"
      style={{ backgroundImage: "url(/Images/contactBG_new.webp)" }}
    >
      <div className="mx-auto w-full max-w-[1450px] px-4 sm:px-4 lg:px-4 py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Left: Building Visual */}
          <div className="relative flex-1 lg:basis-[55%] flex justify-center lg:justify-start">
            <div className="relative w-[120%] lg:w-[115%] -ml-[10%] lg:-ml-[5%]">
              <Image
                src="/Images/contact_us.png"
                alt="Building"
                width={1500}
                height={900}
                priority
                className="w-full h-auto object-contain drop-shadow-2xl"
              />
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="w-full lg:basis-[40%]">
            <h2
              className={cn(
                "mb-6 text-3xl sm:text-4xl font-extrabold tracking-wide",
                "bg-gradient-to-b from-[#F7CB54] to-[#B47009] bg-clip-text text-transparent drop-shadow-[0_1px_0_rgba(0,0,0,0.4)]"
              )}
            >
              CONTACT US
            </h2>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                {/* Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Name"
                          className="h-12 rounded-lg bg-white text-black shadow"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Mobile */}
                <FormField
                  control={form.control}
                  name="mobile"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Mobile</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Mobile"
                          inputMode="tel"
                          className="h-12 rounded-lg bg-white text-black shadow"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Email"
                          type="email"
                          className="h-12 rounded-lg bg-white text-black shadow"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Configuration */}
                <FormField
                  control={form.control}
                  name="configuration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Configuration</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Message"
                          className="h-12 rounded-lg bg-white text-black shadow"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={loading}
                    className={cn(
                      "px-8 py-6 text-base font-semibold rounded-md shadow-md transition-all duration-300",
                      "bg-gradient-to-b from-[#F0B12B] to-[#B47009] text-white",
                      "hover:opacity-90 disabled:opacity-70"
                    )}
                  >
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        SUBMITTING…
                      </span>
                    ) : (
                      "SUBMIT"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}
