"use client";

import { useState } from "react";
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
  const [sent, setSent] = useState(false);

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Open the visitor's email client, pre-addressed and pre-filled.
    const subject = `Portfolio inquiry from ${values.name}`;
    const body = `${values.message}\n\nFrom: ${values.name} (${values.email})`;
    window.location.href = `mailto:purab.ashmani@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
    form.reset();
  }

  return (
    <section id="contact" className="relative py-28 px-6 overflow-hidden bg-canvas-alt border-y border-line">
      <div className="blob w-[440px] h-[440px] bg-brand-violet/20 top-0 right-1/4" />

      <div className="relative max-w-5xl mx-auto">
        <ScrollReveal>
          <p className="eyebrow">08 · Contact</p>
          <div className="rule-brand mt-4 mb-8" />
          <h2 className="display text-5xl md:text-6xl font-bold text-ink leading-[1.0] max-w-3xl">
            <MaskReveal>Let&apos;s build</MaskReveal>
            <MaskReveal delay={0.1} className="gradient-brand">
              something.
            </MaskReveal>
          </h2>
          <p className="text-ink-soft mt-6 max-w-lg text-lg">
            I&apos;m open to opportunities across venture capital, private
            equity, and early-stage investing, and always interested in
            connecting. Whether it&apos;s a role, a collaboration, or a
            conversation, my inbox is open.
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
                {sent && (
                  <p className="text-center text-sm text-brand-violet">
                    Your email app should have opened. If not, reach me at{" "}
                    <a
                      href="mailto:purab.ashmani@gmail.com"
                      className="font-semibold underline"
                    >
                      purab.ashmani@gmail.com
                    </a>
                    .
                  </p>
                )}
              </form>
            </Form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
