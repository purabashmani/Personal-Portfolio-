"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, Mail, MapPin, Linkedin } from "lucide-react";
import ScrollReveal from "./ScrollReveal";
import MaskReveal from "./MaskReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const details = [
  {
    icon: Mail,
    label: "Personal Email",
    value: "purab.ashmani@gmail.com",
    href: "mailto:purab.ashmani@gmail.com",
  },
  {
    icon: Mail,
    label: "School Email",
    value: "ashmaniwala.p@northeastern.edu",
    href: "mailto:ashmaniwala.p@northeastern.edu",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "/in/purab-ashmaniwala",
    href: "https://www.linkedin.com/in/purab-ashmaniwala",
  },
  {
    icon: MapPin,
    label: "Based",
    value: "Boston / East Coast (prev. Bay Area)",
    href: undefined,
  },
];

const formSchema = z.object({
  name: z.string().min(2, { message: "Please enter your name." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  message: z
    .string()
    .min(10, { message: "Your message should be at least 10 characters." }),
});

const EASE = [0.22, 1, 0.36, 1] as const;

export default function Contact() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", email: "", message: "" },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Placeholder — wire up to Formspree / Resend / your backend.
    alert(`Thanks, ${values.name}! This form is a placeholder for now.`);
    form.reset();
  }

  return (
    <section id="contact" className="relative py-28 px-6 overflow-hidden">
      <div className="blob w-[440px] h-[440px] bg-brand-violet/20 top-0 right-1/4" />

      <div className="relative max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="rule-brand mb-8" />
          <h2 className="display text-5xl md:text-6xl font-bold text-ink leading-[1.0] max-w-3xl">
            <MaskReveal>Let&apos;s build</MaskReveal>
            <MaskReveal delay={0.1} className="gradient-brand">
              something.
            </MaskReveal>
          </h2>
          <p className="text-ink-soft mt-6 max-w-lg text-lg">
            Recruiting for VC, PE, or investing roles, or just want to talk
            startups? My inbox is open.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mt-14">
          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: EASE }}
            className="lg:col-span-2 space-y-5"
          >
            {details.map(({ icon: Icon, label, value, href }) => {
              const inner = (
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-brand-indigo to-brand-pink flex items-center justify-center shrink-0">
                    <Icon size={18} className="text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs uppercase tracking-wider text-ink-mute">
                      {label}
                    </p>
                    <p className="text-sm font-medium text-ink break-words">
                      {value}
                    </p>
                  </div>
                </div>
              );
              return href ? (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="block group hover:opacity-80 transition-opacity"
                >
                  {inner}
                </a>
              ) : (
                <div key={label}>{inner}</div>
              );
            })}
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.1, ease: EASE }}
            className="lg:col-span-3 card p-8"
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
                noValidate
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Your name" {...field} />
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
                        <Input
                          type="email"
                          placeholder="your.email@example.com"
                          {...field}
                        />
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
                        <Textarea
                          rows={5}
                          placeholder="Your message..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  variant="brand"
                  size="lg"
                  className="w-full"
                >
                  Send Message
                  <Send size={16} />
                </Button>
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
