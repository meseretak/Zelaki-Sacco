"use client";

import { useState } from "react";
import { Mail, Phone, Clock, MapPin, Building, Send, MessageSquare, Headset, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { branches, contactInfo } from "@/lib/sacco-data";
import { SectionLabel, SectionTitle } from "./section-utils";

export function Contact() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      phone: String(data.get("phone") || ""),
      subject: String(data.get("subject") || "General enquiry"),
      message: String(data.get("message") || ""),
      category: String(data.get("category") || "general"),
    };

    if (payload.name.length < 2 || !payload.email.includes("@") || payload.message.length < 5) {
      toast({
        title: "Please complete the form",
        description: "Name, email and a short message are required.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("failed");
      toast({
        title: "Message sent! ✅",
        description: "Thank you for reaching out. We'll respond within 24 hours.",
      });
      form.reset();
    } catch {
      toast({
        title: "Could not send message",
        description: "Please call us at 6671 or try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-[#F8F9FA]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <SectionLabel center>Get In Touch</SectionLabel>
          <SectionTitle center className="mt-3">
            We&apos;re Here To <span className="text-[#6DBE45]">Help</span>
          </SectionTitle>
          <p className="text-[#6B7785] mt-4 max-w-2xl mx-auto">
            We&apos;re here to help with any questions about membership, loans, savings or
            investment. Reach out and a member of our team will get back to you.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6">
          {/* Contact info + branches */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white rounded-2xl p-6 border border-[#E5E9EE]">
              <h3 className="font-display font-bold text-lg text-[#2C3E50] mb-4">Contact Information</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="w-9 h-9 rounded-lg gradient-brand flex items-center justify-center text-white shrink-0">
                    <MapPin className="w-4 h-4" />
                  </span>
                  <div>
                    <div className="text-xs text-[#6B7785] uppercase font-semibold">Address</div>
                    <div className="text-sm text-[#2C3E50]">{contactInfo.address}</div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-9 h-9 rounded-lg gradient-brand-blue flex items-center justify-center text-white shrink-0">
                    <Phone className="w-4 h-4" />
                  </span>
                  <div>
                    <div className="text-xs text-[#6B7785] uppercase font-semibold">Phone & Hotline</div>
                    <a href="tel:6671" className="text-sm text-[#2C3E50] hover:text-[#6DBE45]">{contactInfo.phone}</a>
                    <span className="text-xs text-[#6B7785]"> · 24/7 Hotline: {contactInfo.hotline}</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shrink-0">
                    <Mail className="w-4 h-4" />
                  </span>
                  <div>
                    <div className="text-xs text-[#6B7785] uppercase font-semibold">Email</div>
                    <a href={`mailto:${contactInfo.email}`} className="text-sm text-[#1F4E8C] hover:underline">{contactInfo.email}</a>
                    <br />
                    <a href={`mailto:${contactInfo.supportEmail}`} className="text-sm text-[#1F4E8C] hover:underline">{contactInfo.supportEmail}</a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-9 h-9 rounded-lg bg-[#1F4E8C] flex items-center justify-center text-white shrink-0">
                    <Clock className="w-4 h-4" />
                  </span>
                  <div>
                    <div className="text-xs text-[#6B7785] uppercase font-semibold">Business Hours</div>
                    <div className="text-sm text-[#2C3E50]">{contactInfo.hours}</div>
                    <div className="text-xs text-[#6B7785]">Sunday: Closed · 24/7 Support: 6671</div>
                  </div>
                </li>
              </ul>
            </div>

            {/* Branches */}
            <div className="bg-white rounded-2xl p-6 border border-[#E5E9EE]">
              <h3 className="font-display font-bold text-lg text-[#2C3E50] mb-4 flex items-center gap-2">
                <Building className="w-5 h-5 text-[#6DBE45]" /> Our Branches
              </h3>
              <ul className="space-y-3">
                {branches.map((b) => (
                  <li key={b.name} className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#F8F9FA] transition-colors">
                    <MapPin className="w-4 h-4 text-[#6DBE45] shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-semibold text-[#2C3E50]">{b.name}</div>
                      <div className="text-xs text-[#6B7785]">{b.address}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl shadow-xl border border-[#E5E9EE] overflow-hidden">
              <div className="gradient-brand p-6 text-white">
                <h3 className="font-display font-bold text-xl flex items-center gap-2">
                  <MessageSquare className="w-5 h-5" /> Send us a Message
                </h3>
                <p className="text-sm text-white/85 mt-1">
                  Fill in the form below and we&apos;ll get back to you as soon as possible.
                </p>
              </div>
              <form onSubmit={onSubmit} className="p-6 grid sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="c-name">Full Name *</Label>
                  <Input id="c-name" name="name" required placeholder="Your name" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="c-email">Email *</Label>
                  <Input id="c-email" name="email" type="email" required placeholder="you@example.com" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="c-phone">Phone</Label>
                  <Input id="c-phone" name="phone" placeholder="+251 9XX XXX XXX" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="c-category">Category</Label>
                  <select
                    id="c-category"
                    name="category"
                    defaultValue="general"
                    className="mt-1.5 w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus:border-[#6DBE45] focus:ring-2 focus:ring-[#6DBE45]/20 outline-none"
                  >
                    <option value="general">General Enquiry</option>
                    <option value="loans">Loans</option>
                    <option value="membership">Membership</option>
                    <option value="investment">Investment</option>
                    <option value="complaint">Complaint</option>
                    <option value="support">Support</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="c-subject">Subject</Label>
                  <Input id="c-subject" name="subject" placeholder="How can we help?" className="mt-1.5" />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="c-message">Message *</Label>
                  <Textarea id="c-message" name="message" required placeholder="Tell us more..." className="mt-1.5 min-h-[120px]" />
                </div>
                <div className="sm:col-span-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <p className="text-xs text-[#6B7785] flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#6DBE45]" /> Your information is safe and never shared.
                  </p>
                  <Button type="submit" disabled={loading} className="gradient-brand hover:opacity-90 h-11 px-6 font-semibold">
                    {loading ? "Sending..." : "Send Message"}
                    {!loading && <Send className="w-4 h-4 ml-1.5" />}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Quick support strip */}
        <div className="mt-8 grid sm:grid-cols-3 gap-4">
          {[
            { icon: Headset, t: "24/7 Hotline", v: "6671", c: "from-[#1F4E8C] to-[#2C5FA8]" },
            { icon: Mail, t: "Email Support", v: contactInfo.email, c: "from-[#6DBE45] to-[#2E7D32]" },
            { icon: Building, t: "Visit a Branch", v: "1 Branch in Addis Ababa", c: "from-amber-500 to-orange-600" },
          ].map((s) => (
            <div key={s.t} className={`bg-gradient-to-br ${s.c} text-white rounded-2xl p-5 flex items-center gap-3 shadow-lg`}>
              <s.icon className="w-9 h-9 shrink-0" />
              <div className="min-w-0">
                <div className="text-xs uppercase opacity-80">{s.t}</div>
                <div className="font-display font-bold truncate">{s.v}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
