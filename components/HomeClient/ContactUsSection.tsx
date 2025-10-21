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
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(2, "Name is too short"),
  mobile: z
    .string()
    .min(10, "Enter a valid mobile")
    .max(15, "Enter a valid mobile")
    .regex(/^[0-9+\-\s()]+$/, "Only numbers and + - ( ) allowed"),
  email: z.string().email("Enter a valid email"),
  configuration: z.string().optional(),
});

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

  async function onSubmit(values: FormValues) {
    setLoading(true);
    try {
      // TODO: send to your API endpoint
      console.log("contact form:", values);
      form.reset();
      alert("Thanks! We’ll reach out soon.");
    } catch (e) {
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact-us"
      className="relative bg-cover bg-center border-b border-black/10 overflow-hidden"
      style={{ backgroundImage: "url(/Images/contactBG_new.webp)" }}
    >
      <div className="mx-auto w-full max-w-[1450px] px-4 sm:px-4 lg:px-4 py-6 lg:py-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Left: Building Visual (55%) */}
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

          {/* Right: Form (40%) */}
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

                <FormField
                  control={form.control}
                  name="configuration"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">Configuration</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Configuration"
                          className="h-12 rounded-lg bg-white text-black shadow"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={loading}
                    className={cn(
                      "px-8 py-6 text-base font-semibold rounded-md shadow-md",
                      "bg-gradient-to-b from-[#F0B12B] to-[#B47009] text-white",
                      "hover:opacity-90"
                    )}
                  >
                    {loading ? "SUBMITTING…" : "SUBMIT"}
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
