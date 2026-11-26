"use client";

import { useState } from "react";
import { CheckCircle2, UserPlus, ShieldCheck, Gift, Vote, Clock, BadgePercent, FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { SectionLabel, SectionTitle } from "./section-utils";

const memberBenefits = [
  { icon: BadgePercent, t: "Annual Dividends (up to 30%)" },
  { icon: ShieldCheck, t: "Free Loan Protection Insurance" },
  { icon: Gift, t: "Financial Education Workshops" },
  { icon: Vote, t: "Voting Rights in AGM" },
  { icon: BadgePercent, t: "Discounted Service Charges" },
  { icon: Clock, t: "Priority Loan Processing (24-48 hrs)" },
];

const requirements = [
  { label: "Valid National ID (Kebele or Passport)", icon: "🪪" },
  { label: "Renewed Digital ID", icon: "🆔" },
  { label: "2 passport size photos", icon: "📷" },
  { label: "Proof of residence (utility bill or letter)", icon: "🏠" },
];

const financials = [
  { label: "One-time registration fee", value: "ETB 3,000" },
  { label: "Minimum share purchase", value: "ETB 5,000" },
  { label: "Initial compulsory saving", value: "ETB 2,000" },
  { label: "Minimum age", value: "18 years" },
];

export function Membership() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      fullName: String(data.get("fullName") || ""),
      email: String(data.get("email") || ""),
      phone: String(data.get("phone") || ""),
      idNumber: String(data.get("idNumber") || ""),
      address: String(data.get("address") || ""),
      city: String(data.get("city") || ""),
      branch: String(data.get("branch") || "Addis Ababa Branch (Head Office)"),
      shareAmount: Number(data.get("shareAmount") || 5000),
      occupation: String(data.get("occupation") || ""),
    };

    if (payload.fullName.length < 3 || !payload.email.includes("@") || payload.phone.length < 7) {
      toast({
        title: "Please check your details",
        description: "Name, email and phone are required.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/membership", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Failed to submit");
      toast({
        title: "Application received! 🎉",
        description: "Our team will contact you within 24 hours to complete your membership.",
      });
      form.reset();
    } catch {
      toast({
        title: "Submission failed",
        description: "Please try again or visit any branch in person.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="membership" className="py-16 md:py-24 bg-gradient-to-b from-[#F8F9FA] to-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#6DBE45]/5 rounded-full blur-3xl" />
      <div className="container mx-auto px-4 relative">
        <div className="text-center mb-12">
          <SectionLabel center>Become a Member</SectionLabel>
          <SectionTitle center className="mt-3">
            Join Our <span className="text-[#6DBE45]">Growing Family</span>
          </SectionTitle>
          <p className="text-[#6B7785] mt-4 max-w-2xl mx-auto">
            Become a member-owner of ዘላቂ የገንዘብ ቁጠባና ብድር ሕ/ሥ/ማ and enjoy exclusive benefits. Registration
            takes about 30 minutes — start your journey today.
          </p>
        </div>

        {/* 3 steps */}
        <div className="grid md:grid-cols-3 gap-5 mb-12">
          {[
            { n: "1", t: "Visit any branch", d: "Bring your National ID, Digital ID and 2 passport photos" },
            { n: "2", t: "Fill the application", d: "Complete the membership application form (downloadable below)" },
            { n: "3", t: "Pay & get shares", d: "Pay ETB 3,000 registration + ETB 5,000 minimum shares" },
          ].map((s) => (
            <div key={s.n} className="relative bg-white rounded-2xl p-6 border border-[#E5E9EE] card-hover">
              <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full gradient-brand flex items-center justify-center text-white font-display font-bold text-xl shadow-lg border-4 border-white">
                {s.n}
              </div>
              <h3 className="font-display font-bold text-lg text-[#2C3E50] mt-3 mb-1">{s.t}</h3>
              <p className="text-sm text-[#6B7785] leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Benefits + Requirements */}
          <div className="lg:col-span-5 space-y-6">
            {/* Benefits */}
            <div className="bg-white rounded-2xl p-6 border border-[#E5E9EE]">
              <h3 className="font-display font-bold text-xl text-[#2C3E50] mb-4 flex items-center gap-2">
                <Gift className="w-5 h-5 text-[#6DBE45]" /> Member Benefits
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {memberBenefits.map(({ icon: I, t }) => (
                  <li key={t} className="flex items-center gap-2 text-sm text-[#2C3E50]">
                    <span className="w-7 h-7 rounded-lg bg-[#6DBE45]/10 text-[#6DBE45] flex items-center justify-center shrink-0">
                      <I className="w-3.5 h-3.5" />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-2xl p-6 border border-[#E5E9EE]">
              <h3 className="font-display font-bold text-xl text-[#2C3E50] mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#1F4E8C]" /> What You Need
              </h3>
              <ul className="space-y-2 mb-5">
                {requirements.map((r) => (
                  <li key={r.label} className="flex items-center gap-2.5 text-sm text-[#2C3E50]">
                    <span className="w-7 text-center">{r.icon}</span>
                    {r.label}
                  </li>
                ))}
              </ul>
              <div className="grid grid-cols-2 gap-2">
                {financials.map((f) => (
                  <div key={f.label} className="bg-[#F8F9FA] rounded-lg p-2.5">
                    <div className="text-[10px] text-[#6B7785] uppercase">{f.label}</div>
                    <div className="font-display font-bold text-sm text-[#2E7D32]">{f.value}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 bg-gradient-to-r from-[#6DBE45] to-[#2E7D32] text-white rounded-xl p-4 flex items-center justify-between">
                <div>
                  <div className="text-xs opacity-80 uppercase">Total Upfront Payment</div>
                  <div className="font-display text-2xl font-extrabold">ETB 10,000</div>
                  <div className="text-[10px] opacity-80">Registration + Share + Compulsory Saving</div>
                </div>
                <CheckCircle2 className="w-8 h-8 text-[#FFD700]" />
              </div>
            </div>
          </div>

          {/* Registration form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl shadow-xl border border-[#E5E9EE] overflow-hidden">
              <div className="gradient-brand p-6 text-white">
                <h3 className="font-display font-bold text-xl flex items-center gap-2">
                  <UserPlus className="w-5 h-5" /> Online Registration
                </h3>
                <p className="text-sm text-white/85 mt-1">
                  Start your journey with ዘላቂ የገንዘብ ቁጠባና ብድር ሕ/ሥ/ማ today. We&apos;ll contact you to finalize
                  your membership.
                </p>
              </div>
              <form onSubmit={onSubmit} className="p-6 grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input id="fullName" name="fullName" required placeholder="Abebe Kebede" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input id="email" name="email" type="email" required placeholder="you@example.com" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input id="phone" name="phone" required placeholder="+251 9XX XXX XXX" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="idNumber">ID Number *</Label>
                  <Input id="idNumber" name="idNumber" required placeholder="Kebele / Digital ID" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="occupation">Occupation</Label>
                  <Input id="occupation" name="occupation" placeholder="e.g. Teacher" className="mt-1.5" />
                </div>
                <div className="sm:col-span-2">
                  <Label htmlFor="address">Address *</Label>
                  <Input id="address" name="address" required placeholder="Street, sub-city" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="city">City *</Label>
                  <Input id="city" name="city" required placeholder="Addis Ababa" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="branch">Preferred Branch</Label>
                  <select
                    id="branch"
                    name="branch"
                    className="mt-1.5 w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus:border-[#6DBE45] focus:ring-2 focus:ring-[#6DBE45]/20 outline-none"
                    defaultValue="Addis Ababa Branch (Head Office)"
                  >
                    <option>Addis Ababa Branch (Head Office)</option>
                  </select>
                </div>
                <div>
                  <Label htmlFor="shareAmount">Share Amount (ETB)</Label>
                  <Input id="shareAmount" name="shareAmount" type="number" min={5000} step={500} defaultValue={5000} className="mt-1.5" />
                </div>
                <div className="sm:col-span-2">
                  <Textarea
                    id="notes"
                    name="notes"
                    placeholder="Optional message / notes"
                    className="mt-1.5 min-h-[70px]"
                  />
                </div>
                <div className="sm:col-span-2 flex items-center gap-2 text-xs text-[#6B7785]">
                  <input id="agree" type="checkbox" required className="accent-[#6DBE45]" />
                  <label htmlFor="agree">
                    I agree to the <a href="#" className="text-[#1F4E8C] font-semibold hover:underline">Terms</a> and{" "}
                    <a href="#" className="text-[#1F4E8C] font-semibold hover:underline">Privacy Policy</a>.
                  </label>
                </div>
                <div className="sm:col-span-2">
                  <Button type="submit" disabled={loading} className="w-full gradient-brand hover:opacity-90 h-12 font-semibold">
                    {loading ? "Submitting..." : "Register Now"}
                    {!loading && <ArrowRight className="w-4 h-4 ml-1.5" />}
                  </Button>
                  <p className="text-center text-xs text-[#6B7785] mt-2 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#6DBE45]" /> Your information is secure and encrypted
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
