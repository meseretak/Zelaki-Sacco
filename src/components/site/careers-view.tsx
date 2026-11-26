"use client";

import { useEffect, useState } from "react";
import { ArrowLeft, Briefcase, MapPin, Clock, Check, Send, ChevronRight } from "lucide-react";
import { ContentProvider, useSettings } from "@/components/site/content-provider";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import type { SiteContent } from "@/components/site/content-provider";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Job = { id: string; title: string; department: string; type: string; location: string; description: string; requirements: string | null; salary: string | null; closingDate: string | null; status: string };

export function CareersView({ content }: { content: SiteContent }) {
  return (
    <ContentProvider content={content}>
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <main className="flex-1 pt-[112px] md:pt-[148px]">
          <CareersContent />
        </main>
        <Footer />
      </div>
    </ContentProvider>
  );
}

function CareersContent() {
  const { toast } = useToast();
  const s = useSettings();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [applyJob, setApplyJob] = useState<Job | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch("/api/jobs").then((r) => r.json()).then((j) => setJobs(j.jobs || [])).finally(() => setLoading(false));
  }, []);

  const [cvFile, setCvFile] = useState<{ name: string; data: string } | null>(null);

  const submitApplication = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!applyJob) return;
    const data = new FormData(e.currentTarget);
    if (!cvFile) { toast({ title: "CV required", description: "Please upload your CV/resume (PDF or DOC).", variant: "destructive" }); return; }
    setSubmitting(true);
    try {
      const r = await fetch("/api/jobs/apply", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId: applyJob.id,
          fullName: String(data.get("fullName") || ""),
          email: String(data.get("email") || ""),
          phone: String(data.get("phone") || ""),
          education: String(data.get("education") || ""),
          experience: String(data.get("experience") || ""),
          coverLetter: String(data.get("coverLetter") || ""),
          cvFileName: cvFile.name,
          cvData: cvFile.data,
        }),
      });
      const j = await r.json();
      if (j.ok) { toast({ title: "Application submitted!", description: `We'll contact you about the ${applyJob.title} position.` }); setApplyJob(null); setCvFile(null); }
      else toast({ title: "Failed", description: j.error, variant: "destructive" });
    } catch { toast({ title: "Failed", variant: "destructive" }); }
    finally { setSubmitting(false); }
  };

  const onCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 3_000_000) { toast({ title: "File too large", description: "Keep under 3MB.", variant: "destructive" }); return; }
    const reader = new FileReader();
    reader.onload = () => setCvFile({ name: file.name, data: String(reader.result) });
    reader.readAsDataURL(file);
  };

  return (
    <div className="container mx-auto px-4 py-10 max-w-4xl">
      {/* hero */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-[#6DBE45]/10 text-[#2E7D32] px-4 py-1.5 rounded-full text-xs font-semibold mb-3">
          <Briefcase className="w-3.5 h-3.5" /> Careers
        </div>
        <h1 className="font-display font-extrabold text-3xl md:text-4xl text-[#2C3E50] mb-2">Join Our Team</h1>
        <p className="text-[#6B7785] max-w-xl mx-auto">Be part of {s.siteName || "ዘላቂ የገንዘብ ቁጠባና ብድር ሕ/ሥ/ማ"} — a member-owned cooperative building the future of finance in Ethiopia. Apply for open positions below.</p>
      </div>

      {loading ? (
        <div className="text-center py-12 text-[#6B7785]">Loading job openings...</div>
      ) : jobs.length === 0 ? (
        <div className="text-center py-12 bg-[#F8F9FA] rounded-2xl border border-[#E5E9EE]">
          <Briefcase className="w-12 h-12 mx-auto text-[#6B7785]/30 mb-3" />
          <p className="text-[#6B7785]">No open positions at the moment. Check back soon!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div key={job.id} className="bg-white rounded-2xl border border-[#E5E9EE] p-5 card-hover">
              <div className="flex items-start justify-between flex-wrap gap-3">
                <div className="flex-1 min-w-[200px]">
                  <h3 className="font-display font-bold text-lg text-[#2C3E50]">{job.title}</h3>
                  <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-[#6B7785]">
                    <span className="flex items-center gap-1"><Briefcase className="w-3 h-3" /> {job.department}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {job.type}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</span>
                    {job.salary && <span className="text-[#6DBE45] font-semibold">{job.salary}</span>}
                    {job.closingDate && (
                      <span className={`flex items-center gap-1 font-semibold ${new Date(job.closingDate) < new Date() ? "text-[#E5484D]" : "text-[#B8860B]"}`}>
                        <Clock className="w-3 h-3" /> Apply by: {new Date(job.closingDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                      </span>
                    )}
                  </div>
                </div>
                <Button onClick={() => setApplyJob(job)} size="sm" className="gradient-brand hover:opacity-90">
                  Apply Now <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-sm text-[#6B7785] mt-3 leading-relaxed">{job.description}</p>
              {job.requirements && (
                <div className="mt-3 pt-3 border-t border-[#F0F2F5]">
                  <div className="text-xs font-bold uppercase text-[#6DBE45] mb-1">Requirements</div>
                  <p className="text-sm text-[#6B7785]">{job.requirements}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Apply form modal */}
      {applyJob && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setApplyJob(null)}>
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="gradient-brand p-5 text-white">
              <button onClick={() => setApplyJob(null)} className="text-white/80 hover:text-white mb-2 flex items-center gap-1 text-sm"><ArrowLeft className="w-4 h-4" /> Back</button>
              <h2 className="font-display font-bold text-xl">Apply: {applyJob.title}</h2>
              <p className="text-sm text-white/85">{applyJob.department} · {applyJob.location}</p>
            </div>
            <form onSubmit={submitApplication} className="p-5 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div><Label htmlFor="fullName">Full Name *</Label><Input id="fullName" name="fullName" required className="mt-1 h-9" /></div>
                <div><Label htmlFor="phone">Phone</Label><Input id="phone" name="phone" className="mt-1 h-9" placeholder="+251 9XX XXX XXX" /></div>
              </div>
              <div><Label htmlFor="email">Email *</Label><Input id="email" name="email" type="email" required className="mt-1 h-9" /></div>
              <div className="grid grid-cols-2 gap-3">
                <div><Label htmlFor="education">Education</Label><Input id="education" name="education" className="mt-1 h-9" placeholder="BSc Finance, Addis Ababa University" /></div>
                <div><Label htmlFor="experience">Years of Experience</Label><Input id="experience" name="experience" className="mt-1 h-9" placeholder="3 years" /></div>
              </div>
              <div><Label htmlFor="coverLetter">Cover Letter / Message</Label><Textarea id="coverLetter" name="coverLetter" className="mt-1 min-h-[80px]" placeholder="Tell us why you're a great fit for this position..." /></div>
              <div>
                <Label htmlFor="cv">Upload CV / Resume * (PDF or DOC, max 3MB)</Label>
                <input type="file" id="cv" accept=".pdf,.doc,.docx" onChange={onCvChange} className="mt-1 block w-full text-xs text-[#6B7785] file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-[#6DBE45] file:text-white file:font-semibold hover:file:bg-[#2E7D32] cursor-pointer" />
                {cvFile && <div className="mt-1 text-xs text-[#2E7D32] flex items-center gap-1"><Check className="w-3 h-3" /> {cvFile.name} uploaded</div>}
              </div>
              <Button type="submit" disabled={submitting} className="w-full gradient-brand hover:opacity-90">
                {submitting ? "Submitting..." : <>Submit Application <Send className="w-4 h-4 ml-1.5" /></>}
              </Button>
              <p className="text-xs text-[#6B7785] text-center flex items-center justify-center gap-1"><Check className="w-3 h-3 text-[#6DBE45]" /> Your application + CV will be reviewed by our team</p>
            </form>
          </div>
        </div>
      )}

      <div className="mt-8 text-center">
        <a href="/" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1F4E8C] hover:text-[#6DBE45]"><ArrowLeft className="w-4 h-4" /> Back to Home</a>
      </div>
    </div>
  );
}
