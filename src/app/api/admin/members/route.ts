import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { verifyAdmin, hashPassword } from "@/lib/auth";

// GET — list members (no id) OR single member detail (with transactions + loans) if ?id=
export async function GET(req: Request) {
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Unauthorized", ok: false }, { status: 401 });
  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  if (id) {
    const member = await db.member.findUnique({
      where: { id },
      include: {
        transactions: { orderBy: { date: "desc" }, take: 100 },
        loans: { orderBy: { startDate: "desc" } },
        loanApplications: { orderBy: { createdAt: "desc" }, take: 10 },
      },
    });
    if (!member) return NextResponse.json({ error: "Not found", ok: false }, { status: 404 });
    const { passwordHash, ...safe } = member as { passwordHash?: string };
    return NextResponse.json({ ok: true, member: safe });
  }

  const items = await db.member.findMany({
    select: {
      id: true, memberNumber: true, fullName: true, email: true, phone: true,
      city: true, branch: true, occupation: true, idType: true, idNumber: true,
      sex: true, education: true, maritalStatus: true,
      shareCount: true, compulsorySavings: true, voluntarySavings: true, childSavings: true, timeDeposit: true,
      status: true, joinedAt: true,
    },
    orderBy: { fullName: "asc" },
  });
  return NextResponse.json({ ok: true, items });
}

// POST — create member
export async function POST(req: Request) {
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Unauthorized", ok: false }, { status: 401 });
  const b = await req.json();
  const email = String(b.email ?? "").toLowerCase().trim();
  if (!email || !b.password) return NextResponse.json({ error: "email and password required", ok: false }, { status: 400 });
  const existing = await db.member.findUnique({ where: { email } });
  if (existing) return NextResponse.json({ error: "Email already exists", ok: false }, { status: 409 });
  const count = await db.member.count();
  const memberNumber = `HDS-${String(count + 1).padStart(4, "0")}`;
  const member = await db.member.create({
    data: {
      memberNumber,
      fullName: String(b.fullName ?? ""),
      email,
      passwordHash: hashPassword(String(b.password)),
      phone: String(b.phone ?? ""),
      city: String(b.city ?? ""),
      branch: String(b.branch ?? "Addis Ababa Branch (Head Office)"),
      occupation: String(b.occupation ?? ""),
      compulsorySavings: Number(b.compulsorySavings ?? 0),
      voluntarySavings: Number(b.voluntarySavings ?? 0),
      childSavings: Number(b.childSavings ?? 0),
      timeDeposit: Number(b.timeDeposit ?? 0),
      shareCount: Number(b.shareCount ?? 0),
    },
  });
  return NextResponse.json({ ok: true, id: member.id, memberNumber });
}

// PUT — update member details / balances (?id=)
export async function PUT(req: Request) {
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Unauthorized", ok: false }, { status: 401 });
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required", ok: false }, { status: 400 });
  const b = await req.json();
  const data: Record<string, unknown> = {};
  for (const k of ["fullName", "phone", "city", "branch", "occupation", "status"]) {
    if (b[k] !== undefined) data[k] = String(b[k]);
  }
  for (const k of ["compulsorySavings", "voluntarySavings", "childSavings", "timeDeposit", "shareCount"]) {
    if (b[k] !== undefined) data[k] = Number(b[k]);
  }
  if (b.password) data.passwordHash = hashPassword(String(b.password));
  await db.member.update({ where: { id }, data });
  return NextResponse.json({ ok: true });
}

// DELETE — remove member
export async function DELETE(req: Request) {
  if (!(await verifyAdmin())) return NextResponse.json({ error: "Unauthorized", ok: false }, { status: 401 });
  const url = new URL(req.url);
  const id = url.searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id required", ok: false }, { status: 400 });
  await db.member.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
