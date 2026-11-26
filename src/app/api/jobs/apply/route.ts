import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { writeFileSync, mkdirSync } from "fs";
import { join } from "path";

// POST — submit a job application with CV upload (standard format)
export async function POST(req: Request) {
  try {
    const b = await req.json();
    if (!b.fullName || !b.email || !b.jobId) {
      return NextResponse.json({ error: "fullName, email and jobId required", ok: false }, { status: 400 });
    }
    const job = await db.job.findUnique({ where: { id: String(b.jobId) } });
    if (!job) return NextResponse.json({ error: "Job not found", ok: false }, { status: 404 });

    // handle CV upload (base64 data URL → save to file)
    let cvUrl: string | null = null;
    let cvFileName: string | null = null;
    if (b.cvData && b.cvFileName) {
      try {
        const dir = join(process.cwd(), "public", "uploads", "cvs");
        mkdirSync(dir, { recursive: true });
        const ext = b.cvFileName.split(".").pop() || "pdf";
        cvFileName = `${Date.now()}-${b.fullName.replace(/\s+/g, "-").toLowerCase()}.${ext}`;
        const filePath = join(dir, cvFileName);
        // strip data URL prefix if present
        const base64 = String(b.cvData).replace(/^data:[^;]+;base64,/, "");
        writeFileSync(filePath, Buffer.from(base64, "base64"));
        cvUrl = `/uploads/cvs/${cvFileName}`;
      } catch (e) {
        console.error("CV save error:", e);
      }
    }

    const app = await db.jobApplication.create({
      data: {
        jobId: String(b.jobId),
        fullName: String(b.fullName),
        email: String(b.email).toLowerCase().trim(),
        phone: b.phone ? String(b.phone) : null,
        education: b.education ? String(b.education) : null,
        experience: b.experience ? String(b.experience) : null,
        coverLetter: b.coverLetter ? String(b.coverLetter) : null,
        cvFileName: cvFileName,
        cvUrl: cvUrl,
        status: "new",
      },
    });
    return NextResponse.json({ ok: true, id: app.id });
  } catch (e) {
    console.error("job apply error:", e);
    return NextResponse.json({ error: "Failed", ok: false }, { status: 500 });
  }
}
