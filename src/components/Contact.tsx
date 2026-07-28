"use client";

import { useState } from "react";
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
    <section
      id="contact"
      className="relative overflow-hidden border-y border-line bg-canvas-alt px-6 py-28"
    >
      <div className="blob right-1/4 top-0 h-[440px] w-[440px] bg-brand-violet/20" />

      <div className="relative mx-auto max-w-6xl">
        <ScrollReveal>
          <p className="eyebrow">06 · Contact</p>
          <div className="rule-brand mb-8 mt-4" />
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="grid overflow-hidden rounded-3xl border border-line bg-white shadow-[0_40px_90px_-40px_rgba(147,51,234,0.4)] lg:grid-cols-2">
            {/* Left: gradient panel with the pitch + contact links */}
            <div className="relative flex flex-col justify-between gap-10 bg-gradient-to-br from-brand-indigo via-brand-violet to-brand-pink p-9 text-white md:p-11">
              <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-white/10 blur-2xl" />

              <div className="relative">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  Open to opportunities
                </span>

                <h2 className="display mt-6 text-4xl font-bold leading-[1.0] md:text-5xl">
                  <MaskReveal>Let&apos;s build</MaskReveal>
                  <MaskReveal delay={0.1}>something.</MaskReveal>
                </h2>

                <p className="mt-5 max-w-sm text-white/85">
                  Open to opportunities across venture capital, private equity,
                  and early-stage investing. Whether it&apos;s a role, a
                  collaboration, or a conversation, my inbox is open.
                </p>
              </div>

              <div className="relative space-y-1.5">
                {details.map(({ icon: Icon, label, value, href }) => {
                  const inner = (
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-white/15">
                        <Icon size={16} className="text-white" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[0.6rem] uppercase tracking-[0.18em] text-white/60">
                          {label}
                        </p>
                        <p className="break-words text-sm font-medium text-white">
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
                      data-cursor={href.startsWith("http") ? "Visit" : "Email"}
                      className="-mx-2 block rounded-xl px-2 py-1.5 transition-colors hover:bg-white/10"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div key={label} className="px-0 py-1.5">
                      {inner}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: the form */}
            <div className="p-9 md:p-11">
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
                  <Button type="submit" variant="brand" size="lg" className="w-full">
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
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
