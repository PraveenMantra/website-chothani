"use client";

import Image from "next/image";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, Variants } from "framer-motion";
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
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

/* ---------- Validation ---------- */
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

type FormValues = z.infer<typeof formSchema>;

/* ---------- Animations ---------- */
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};
const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
};
const fadeInRight: Variants = {
  hidden: { opacity: 0, x: 60 },
  show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] } },
};

/* ---------- WhatsApp helper ---------- */
const WHATSAPP_PHONE = "918828607952"; // +91 88286 07952, without the '+' for wa.me

function buildWhatsAppUrl(values: FormValues) {
  const lines = [
    "*New 27 Palazzo Enquiry*",
    "",
    `*Name:* ${values.name}`,
    `*Mobile:* ${values.mobile}`,
    `*Email:* ${values.email}`,
    values.configuration ? `*Message:* ${values.configuration}` : undefined,
    "",
    "— Sent from 27 Palazzo website",
  ].filter(Boolean);

  const text = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${WHATSAPP_PHONE}?text=${text}`;
}

export default function ContactUsSection() {
  const [loading, setLoading] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", mobile: "", email: "", configuration: "" },
  });

  async function onSubmit(values: FormValues) {
    setLoading(true);
    try {
      const url = buildWhatsAppUrl(values);
      // Open in a new tab/window so users can return easily
      window.open(url, "_blank", "noopener,noreferrer");

      toast.success("Opening WhatsApp ✅", {
        description: "Your details are prefilled. Please send the message to complete.",
      });
      form.reset();
    } catch (err) {
      console.error(err);
      toast.error("Unable to open WhatsApp ❌", {
        description: "Please check your connection or try again later.",
      });
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
      <div className="mx-auto w-full max-w-[1450px] px-4 sm:px-4 lg:px-4 py-8 lg:py-12">
        <motion.div
          className="flex flex-col lg:flex-row items-center justify-between gap-10"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Left: Visual */}
          <motion.div
            variants={fadeInLeft}
            className="relative flex-1 lg:basis-[55%] flex justify-center lg:justify-start"
          >
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
          </motion.div>

          {/* Right: Form */}
          <motion.div variants={fadeInRight} className="w-full lg:basis-[40%]">
            <motion.h2
              variants={fadeInUp}
              className={cn(
                "mb-6 text-3xl sm:text-4xl font-extrabold tracking-wide",
                "bg-gradient-to-b from-[#F7CB54] to-[#B47009] bg-clip-text text-transparent drop-shadow-[0_1px_0_rgba(0,0,0,0.4)]"
              )}
            >
              CONTACT US
            </motion.h2>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                {["name", "mobile", "email", "configuration"].map((fieldName, index) => (
                  <motion.div key={fieldName} variants={fadeInUp} transition={{ delay: index * 0.1 }}>
                    <FormField
                      control={form.control}
                      name={fieldName as keyof FormValues}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="sr-only">{fieldName}</FormLabel>
                          <FormControl>
                            <Input
                              placeholder={
                                fieldName === "configuration" ? "Message" : fieldName.charAt(0).toUpperCase() + fieldName.slice(1)
                              }
                              type={fieldName === "email" ? "email" : "text"}
                              inputMode={fieldName === "mobile" ? "tel" : undefined}
                              className="h-12 rounded-lg bg-white text-black shadow focus:ring-2 focus:ring-[#F0B12B] transition-all"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </motion.div>
                ))}

                <motion.div
                  variants={fadeInUp}>
                  <div className="flex justify-end">
                    <Button type="submit" disabled={loading} className={cn("cursor-pointer px-8 py-6 text-base font-semibold rounded-md shadow-md transition-all duration-300", "bg-gradient-to-b from-[#F0B12B] to-[#B47009] text-white", "hover:opacity-90 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed")} > {loading ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending... </span>
                    ) : ("SUBMIT")}
                    </Button>
                  </div>
                </motion.div>
              </form>
            </Form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
