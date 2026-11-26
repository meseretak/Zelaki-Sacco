"use client";

import { useEffect, useState, useCallback } from "react";
import {
  LayoutDashboard, Settings as SettingsIcon, Building2, Newspaper, Calendar,
  Menu as MenuIcon, Image as ImageIcon, FileText, Mail, Users, Star, UserPlus,
  Lock, LogOut, ArrowLeft, Plus, Pencil, Trash2, Save, X, Check, ExternalLink,
  RefreshCw, ShieldCheck, Eye, BookOpen, ChevronRight, Search, Download, Send, Briefcase,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { LanguageSwitcher } from "@/components/site/language-switcher";
import { MemberDetail } from "@/components/admin/member-detail";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import type { SiteContent } from "@/components/site/content-provider";
import { ethiopiaRegions } from "@/lib/sacco-data";

// ---------- types ----------
type Field = {
  name: string;
  label: string;
  type?: "text" | "number" | "textarea" | "select" | "checkbox";
  options?: string[];
  default?: unknown;
  full?: boolean;
};
type CrudConfig = {
  title: string;
  apiBase: string;
  fields: Field[];
  columns: { key: string; label: string }[];
  addLabel?: string;
};

// ---------- shared fetch hook ----------
function useFetch<T>(url: string, deps: unknown[] = []) {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);
  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const r = await fetch(url);
      const j = await r.json();
      setData(j.items ?? j.testimonials ?? []);
    } catch {
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [url]);
  useEffect(() => { reload(); }, [reload, ...deps]);
  return { data, loading, reload, setData };
}

// ---------- generic CRUD manager ----------
function CrudManager({ cfg }: { cfg: CrudConfig }) {
  const { toast } = useToast();
  const { data, loading, reload } = useFetch<Record<string, unknown>>(cfg.apiBase);
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [open, setOpen] = useState(false);

  const openNew = () => { setEditing({}); setOpen(true); };
  const openEdit = (item: Record<string, unknown>) => { setEditing({ ...item }); setOpen(true); };

  const save = async (form: Record<string, unknown>) => {
    const id = form.id as string | undefined;
    const body: Record<string, unknown> = {};
    for (const f of cfg.fields) {
      let v = form[f.name];
      if (f.type === "number") v = Number(v || 0);
      if (f.type === "checkbox") v = Boolean(v);
      if (f.name !== "id") body[f.name] = v;
    }
    const url = id ? `${cfg.apiBase}?id=${id}` : cfg.apiBase;
    const method = id ? "PUT" : "POST";
    const r = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const j = await r.json();
    if (!r.ok) { toast({ title: "Save failed", description: j.error, variant: "destructive" }); return; }
    toast({ title: id ? "Updated" : "Created", description: `${cfg.title} saved successfully` });
    setOpen(false);
    setEditing(null);
    reload();
  };

  const del = async (id: string) => {
    if (!confirm("Delete this item? This cannot be undone.")) return;
    const r = await fetch(`${cfg.apiBase}?id=${id}`, { method: "DELETE" });
    if (r.ok) { toast({ title: "Deleted" }); reload(); }
    else toast({ title: "Delete failed", variant: "destructive" });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-display font-bold text-xl text-[#2C3E50]">{cfg.title}</h2>
          <p className="text-sm text-[#6B7785]">{data ? `${data.length} items` : "Loading..."}</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={reload} variant="outline" size="sm"><RefreshCw className="w-4 h-4" /></Button>
          <Button onClick={openNew} size="sm" className="gradient-brand hover:opacity-90"><Plus className="w-4 h-4 mr-1" /> {cfg.addLabel || "Add New"}</Button>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-[#E5E9EE] overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-[#6B7785]">Loading...</div>
        ) : data && data.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#F8F9FA] border-b border-[#E5E9EE]">
                <tr>
                  {cfg.columns.map((c) => (
                    <th key={c.key} className="text-left px-4 py-2.5 font-semibold text-[#6B7785] text-xs uppercase tracking-wider">{c.label}</th>
                  ))}
                  <th className="text-right px-4 py-2.5 font-semibold text-[#6B7785] text-xs uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E9EE]">
                {data.map((item) => (
                  <tr key={item.id as string} className="hover:bg-[#F8F9FA]">
                    {cfg.columns.map((c) => (
                      <td key={c.key} className="px-4 py-2.5 text-[#2C3E50]">
                        {String(item[c.key] ?? "").slice(0, 60)}
                      </td>
                    ))}
                    <td className="px-4 py-2.5 text-right">
                      <button onClick={() => openEdit(item)} className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-[#1F4E8C] hover:bg-[#1F4E8C]/10 mr-1"><Pencil className="w-4 h-4" /></button>
                      <button onClick={() => del(item.id as string)} className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-[#E5484D] hover:bg-[#E5484D]/10"><Trash2 className="w-4 h-4" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-[#6B7785]">No items yet. Click "{cfg.addLabel || "Add New"}" to create one.</div>
        )}
      </div>
      <CrudFormDialog key={editing ? String((editing as Record<string, unknown>).id ?? "new") : "none"} cfg={cfg} open={open} onOpenChange={setOpen} initial={editing} onSave={save} />
    </div>
  );
}

function CrudFormDialog({
  cfg, open, onOpenChange, initial, onSave,
}: {
  cfg: CrudConfig;
  open: boolean;
  onOpenChange: (o: boolean) => void;
  initial: Record<string, unknown> | null;
  onSave: (form: Record<string, unknown>) => void;
}) {
  const [form, setForm] = useState<Record<string, unknown>>(() => {
    if (!initial) return {};
    const f: Record<string, unknown> = {};
    for (const field of cfg.fields) f[field.name] = initial[field.name] ?? field.default ?? (field.type === "checkbox" ? false : "");
    return f;
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{initial && initial.id ? `Edit ${cfg.title}` : `Add ${cfg.title}`}</DialogTitle>
        </DialogHeader>
        <div className="grid sm:grid-cols-2 gap-3 py-2">
          {cfg.fields.map((f) => (
            <div key={f.name} className={f.full ? "sm:col-span-2" : ""}>
              <Label className="text-xs">{f.label}</Label>
              {f.type === "textarea" ? (
                <Textarea
                  value={String(form[f.name] ?? "")}
                  onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                  className="mt-1 min-h-[70px]"
                />
              ) : f.type === "select" ? (
                <select
                  value={String(form[f.name] ?? "")}
                  onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                  className="mt-1 w-full h-9 rounded-md border border-input bg-background px-2 text-sm outline-none focus:border-[#6DBE45]"
                >
                  {f.options?.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              ) : f.type === "checkbox" ? (
                <label className="flex items-center gap-2 mt-2 text-sm">
                  <input type="checkbox" checked={Boolean(form[f.name])} onChange={(e) => setForm({ ...form, [f.name]: e.target.checked })} className="accent-[#6DBE45]" />
                  {f.label}
                </label>
              ) : (
                <Input
                  type={f.type === "number" ? "number" : "text"}
                  value={String(form[f.name] ?? "")}
                  onChange={(e) => setForm({ ...form, [f.name]: e.target.value })}
                  className="mt-1 h-9"
                />
              )}
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={() => onSave(form)} className="gradient-brand hover:opacity-90"><Save className="w-4 h-4 mr-1.5" /> Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ---------- Settings tab ----------
function SettingsTab({ settings }: { settings: Record<string, string> }) {
  const { toast } = useToast();
  const [vals, setVals] = useState<Record<string, string>>(settings);
  const fields: { key: string; label: string; group: string }[] = [
    { key: "siteName", label: "Site Name", group: "Branding" },
    { key: "siteShortName", label: "Short Name (logo)", group: "Branding" },
    { key: "fullEnglishName", label: "Full English Name", group: "Branding" },
    { key: "amharicName", label: "Amharic Name (አማርኛ)", group: "Branding" },
    { key: "tagline", label: "Tagline", group: "Branding" },
    { key: "heroBadge", label: "Hero Badge Text", group: "Branding" },
    { key: "phone", label: "Phone", group: "Contact" },
    { key: "hotline", label: "24/7 Hotline", group: "Contact" },
    { key: "email", label: "Public Email", group: "Contact" },
    { key: "supportEmail", label: "Support Email", group: "Contact" },
    { key: "address", label: "Address", group: "Contact" },
    { key: "hours", label: "Business Hours", group: "Contact" },
    { key: "foundedYear", label: "Founded Year", group: "General" },
    { key: "memberCount", label: "Member Count (display)", group: "General" },
    { key: "branchCount", label: "Branch Count (display)", group: "General" },
    { key: "proclamation", label: "Proclamation / Legal note", group: "General" },
    { key: "adminPasscode", label: "Admin Passcode", group: "Security" },
  ];
  const save = async () => {
    const entries = Object.entries(vals).map(([key, value]) => ({ key, value }));
    const r = await fetch("/api/settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ entries }) });
    if (r.ok) toast({ title: "Settings saved", description: "Changes are now live on the website." });
    else toast({ title: "Save failed", variant: "destructive" });
  };
  const groups = [...new Set(fields.map((f) => f.group))];
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-display font-bold text-xl text-[#2C3E50]">Site Settings</h2>
          <p className="text-sm text-[#6B7785]">Edit your brand name, contact details and content shown across the site.</p>
        </div>
        <Button onClick={save} className="gradient-brand hover:opacity-90"><Save className="w-4 h-4 mr-1.5" /> Save All</Button>
      </div>
      <div className="space-y-4">
        {groups.map((g) => (
          <div key={g} className="bg-white rounded-xl border border-[#E5E9EE] p-5">
            <h3 className="font-display font-bold text-sm text-[#1F4E8C] uppercase tracking-wider mb-3">{g}</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {fields.filter((f) => f.group === g).map((f) => (
                <div key={f.key} className={f.key === "address" || f.key === "proclamation" ? "sm:col-span-2" : ""}>
                  <Label className="text-xs">{f.label}</Label>
                  <Input
                    value={String(vals[f.key] ?? "")}
                    onChange={(e) => setVals({ ...vals, [f.key]: e.target.value })}
                    className="mt-1 h-9"
                    type={f.key === "adminPasscode" ? "password" : "text"}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- Applications tab ----------
function ApplicationsTab() {
  const { toast } = useToast();
  const { data, loading, reload } = useFetch<Record<string, unknown>>("/api/admin/applications");
  const [filter, setFilter] = useState("pending");
  const update = async (id: string, status: string) => {
    const r = await fetch(`/api/admin/applications?id=${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) });
    if (r.ok) { toast({ title: `Marked ${status}` }); reload(); }
  };
  const filtered = data?.filter((d) => filter === "all" || d.status === filter) ?? [];
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-display font-bold text-xl text-[#2C3E50]">Membership Applications</h2>
          <p className="text-sm text-[#6B7785]">{data?.length ?? 0} total applications</p>
        </div>
        <div className="flex gap-1">
          {["pending", "reviewing", "approved", "rejected", "all"].map((s) => (
            <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize ${filter === s ? "gradient-brand text-white" : "bg-white border border-[#E5E9EE] text-[#6B7785]"}`}>{s}</button>
          ))}
        </div>
      </div>
      <div className="space-y-3">
        {loading ? <div className="p-8 text-center text-[#6B7785]">Loading...</div> :
         filtered.length === 0 ? <div className="p-8 text-center text-[#6B7785] bg-white rounded-xl border">No applications in this filter.</div> :
         filtered.map((a) => (
          <div key={a.id as string} className="bg-white rounded-xl border border-[#E5E9EE] p-5">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex-1 min-w-[200px]">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-display font-bold text-[#2C3E50]">{a.fullName as string}</h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${
                    a.status === "approved" ? "bg-[#6DBE45]/10 text-[#2E7D32]" :
                    a.status === "rejected" ? "bg-[#E5484D]/10 text-[#E5484D]" :
                    "bg-amber-500/10 text-amber-700"}`}>{a.status as string}</span>
                </div>
                <div className="text-sm text-[#6B7785] grid sm:grid-cols-2 gap-1 mt-2">
                  <div>📧 {a.email as string}</div>
                  <div>📞 {a.phone as string}</div>
                  <div>🪪 ID: {a.idNumber as string}</div>
                  <div>📍 {a.city as string}</div>
                  <div>🏢 {a.branch as string}</div>
                  <div>💰 Shares: ETB {Number(a.shareAmount).toLocaleString()}</div>
                  {a.occupation ? <div>💼 {a.occupation as string}</div> : null}
                  <div>🏠 {a.address as string}</div>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <span className="text-xs text-[#6B7785]">{new Date(a.createdAt as string).toLocaleDateString()}</span>
                <div className="flex gap-1">
                  <Button size="sm" onClick={() => update(a.id as string, "approved")} className="bg-[#6DBE45] hover:opacity-90 h-7 text-xs"><Check className="w-3 h-3 mr-1" />Approve</Button>
                  <Button size="sm" variant="outline" onClick={() => update(a.id as string, "reviewing")} className="h-7 text-xs">Review</Button>
                  <Button size="sm" variant="outline" onClick={() => update(a.id as string, "rejected")} className="h-7 text-xs text-[#E5484D]">Reject</Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- Messages tab ----------
function MessagesTab() {
  const { toast } = useToast();
  const { data, loading, reload } = useFetch<Record<string, unknown>>("/api/admin/messages");
  const del = async (id: string) => { if (confirm("Delete message?")) { await fetch(`/api/admin/messages?id=${id}`, { method: "DELETE" }); reload(); } };
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-bold text-xl text-[#2C3E50]">Contact Messages</h2>
        <Button onClick={reload} variant="outline" size="sm"><RefreshCw className="w-4 h-4" /></Button>
      </div>
      <div className="space-y-3">
        {loading ? <div className="p-8 text-center text-[#6B7785]">Loading...</div> :
         data?.length === 0 ? <div className="p-8 text-center text-[#6B7785] bg-white rounded-xl border">No messages yet.</div> :
         data.map((m) => (
          <div key={m.id as string} className="bg-white rounded-xl border border-[#E5E9EE] p-4 flex justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-display font-bold text-[#2C3E50]">{m.name as string}</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1F4E8C]/10 text-[#1F4E8C]">{m.category as string}</span>
              </div>
              <div className="text-xs text-[#6B7785]">{m.email as string} · {m.phone as string || "no phone"}</div>
              {m.subject ? <div className="text-sm font-semibold text-[#2C3E50] mt-1">{m.subject as string}</div> : null}
              <p className="text-sm text-[#6B7785] mt-1">{m.message as string}</p>
              <div className="text-[11px] text-[#6B7785] mt-1">{new Date(m.createdAt as string).toLocaleString()}</div>
            </div>
            <button onClick={() => del(m.id as string)} className="text-[#E5484D] hover:bg-[#E5484D]/10 h-8 w-8 rounded-lg flex items-center justify-center shrink-0"><Trash2 className="w-4 h-4" /></button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------- Subscribers tab ----------
function SubscribersTab() {
  const { data, loading, reload } = useFetch<Record<string, unknown>>("/api/admin/subscribers");
  const del = async (id: string) => { if (confirm("Remove subscriber?")) { await fetch(`/api/admin/subscribers?id=${id}`, { method: "DELETE" }); reload(); } };
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-display font-bold text-xl text-[#2C3E50]">Newsletter Subscribers</h2>
        <Button onClick={reload} variant="outline" size="sm"><RefreshCw className="w-4 h-4" /></Button>
      </div>
      <div className="bg-white rounded-xl border border-[#E5E9EE] overflow-hidden">
        {loading ? <div className="p-8 text-center text-[#6B7785]">Loading...</div> :
         data?.length === 0 ? <div className="p-8 text-center text-[#6B7785]">No subscribers yet.</div> :
         <table className="w-full text-sm">
          <thead className="bg-[#F8F9FA] border-b"><tr><th className="text-left px-4 py-2.5 text-xs uppercase text-[#6B7785]">Email</th><th className="text-left px-4 py-2.5 text-xs uppercase text-[#6B7785]">Name</th><th className="text-left px-4 py-2.5 text-xs uppercase text-[#6B7785]">Subscribed</th><th className="px-4"></th></tr></thead>
          <tbody className="divide-y divide-[#E5E9EE]">
            {data.map((s) => (
              <tr key={s.id as string} className="hover:bg-[#F8F9FA]">
                <td className="px-4 py-2.5 text-[#2C3E50]">{s.email as string}</td>
                <td className="px-4 py-2.5 text-[#6B7785]">{(s.name as string) || "—"}</td>
                <td className="px-4 py-2.5 text-[#6B7785]">{new Date(s.createdAt as string).toLocaleDateString()}</td>
                <td className="px-4 py-2.5 text-right"><button onClick={() => del(s.id as string)} className="text-[#E5484D] hover:bg-[#E5484D]/10 h-8 w-8 rounded-lg inline-flex items-center justify-center"><Trash2 className="w-4 h-4" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>}
      </div>
    </div>
  );
}

// ---------- Members tab (list + create) ----------
function MembersTab() {
  const { toast } = useToast();
  const { data, loading, reload } = useFetch<Record<string, unknown>>("/api/admin/members");
  const [open, setOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [form, setForm] = useState({ fullName: "", email: "", password: "demo123", phone: "", city: "", branch: "Addis Ababa Branch (Head Office)", occupation: "", compulsorySavings: 0, voluntarySavings: 0, childSavings: 0, shareCount: 0 });
  const create = async () => {
    const r = await fetch("/api/admin/members", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    const j = await r.json();
    if (!r.ok) { toast({ title: "Create failed", description: j.error, variant: "destructive" }); return; }
    toast({ title: "Member created", description: `Number: ${j.memberNumber}` });
    setOpen(false);
    reload();
  };
  if (selectedId) return <MemberDetail memberId={selectedId} onBack={() => { setSelectedId(null); reload(); }} />;

  // filter logic
  const filtered = (data || []).filter((m) => {
    const matchesStatus = statusFilter === "all" || m.status === statusFilter;
    const q = query.toLowerCase().trim();
    if (!q) return matchesStatus;
    const blob = [m.fullName, m.email, m.phone, m.memberNumber, (m as Record<string, unknown>).idNumber, (m as Record<string, unknown>).occupation].filter(Boolean).join(" ").toLowerCase();
    return matchesStatus && blob.includes(q);
  });

  const exportCSV = () => {
    const headers = ["Member #", "Full Name", "Phone", "Email", "ID Type", "ID Number", "Sex", "Position", "Education", "Marital Status", "Address", "Shares", "Compulsory Savings", "Voluntary Savings", "Status", "Joined"];
    const rows = filtered.map((m) => [m.memberNumber, m.fullName, m.phone, m.email, (m as Record<string, unknown>).idType, (m as Record<string, unknown>).idNumber, (m as Record<string, unknown>).sex, (m as Record<string, unknown>).occupation, (m as Record<string, unknown>).education, (m as Record<string, unknown>).maritalStatus, m.city, m.shareCount, m.compulsorySavings, m.voluntarySavings, m.status, new Date(m.joinedAt as string).toLocaleDateString()]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${String(c ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `members-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click(); URL.revokeObjectURL(url);
    toast({ title: "Exported", description: `${filtered.length} members exported to CSV` });
  };

  const shareTelegram = () => {
    const text = `ዘላቂ የገንዘብ ቁጠባና ብድር ሕ/ሥ/ማ — Member List\n\nTotal members: ${filtered.length}\n\n${filtered.slice(0, 20).map((m) => `${m.memberNumber} | ${m.fullName} | ${m.phone || ""}`).join("\n")}${filtered.length > 20 ? `\n... and ${filtered.length - 20} more` : ""}`;
    const url = `https://t.me/share/url?url=${encodeURIComponent("https://sustainablesacco.com")}&text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <div>
          <h2 className="font-display font-bold text-xl text-[#2C3E50]">Members</h2>
          <p className="text-sm text-[#6B7785]">{data?.length ?? 0} total · {filtered.length} shown — click a row to manage details</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <Button onClick={() => setOpen(true)} size="sm" className="gradient-brand hover:opacity-90"><UserPlus className="w-4 h-4 mr-1" /> Add Member</Button>
          <Button onClick={exportCSV} size="sm" variant="outline"><Download className="w-4 h-4 mr-1" /> Export CSV</Button>
          <Button onClick={shareTelegram} size="sm" variant="outline" className="border-[#0088cc] text-[#0088cc] hover:bg-[#0088cc]/10"><Send className="w-4 h-4 mr-1" /> Telegram</Button>
        </div>
      </div>
      {/* search + filter */}
      <div className="flex gap-2 mb-3 flex-wrap">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6B7785]" />
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search by name, phone, email, member #, ID..." className="pl-9 h-9" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="h-9 rounded-md border border-input bg-background px-3 text-sm">
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
          <option value="closed">Closed</option>
        </select>
      </div>
      <div className="bg-white rounded-xl border border-[#E5E9EE] overflow-hidden">
        {loading ? <div className="p-8 text-center text-[#6B7785]">Loading...</div> : filtered.length === 0 ? <div className="p-8 text-center text-[#6B7785]">No members match your search.</div> :
          <div className="overflow-x-auto max-h-[70vh] overflow-y-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#F8F9FA] border-b sticky top-0 z-10"><tr>
              <th className="text-left px-3 py-2.5 text-xs uppercase text-[#6B7785] whitespace-nowrap">Member #</th>
              <th className="text-left px-3 py-2.5 text-xs uppercase text-[#6B7785] whitespace-nowrap">Full Name</th>
              <th className="text-left px-3 py-2.5 text-xs uppercase text-[#6B7785] whitespace-nowrap">Phone</th>
              <th className="text-left px-3 py-2.5 text-xs uppercase text-[#6B7785] whitespace-nowrap">Email</th>
              <th className="text-left px-3 py-2.5 text-xs uppercase text-[#6B7785] whitespace-nowrap">ID Number</th>
              <th className="text-left px-3 py-2.5 text-xs uppercase text-[#6B7785] whitespace-nowrap">Position</th>
              <th className="text-left px-3 py-2.5 text-xs uppercase text-[#6B7785] whitespace-nowrap">Sex</th>
              <th className="text-left px-3 py-2.5 text-xs uppercase text-[#6B7785] whitespace-nowrap">Savings</th>
              <th className="text-left px-3 py-2.5 text-xs uppercase text-[#6B7785] whitespace-nowrap">Status</th>
            </tr></thead>
            <tbody className="divide-y divide-[#E5E9EE]">
              {filtered.map((m) => (
                <tr key={m.id as string} className="hover:bg-[#6DBE45]/5 cursor-pointer transition-colors" onClick={() => setSelectedId(m.id as string)}>
                  <td className="px-3 py-2 font-mono text-[#1F4E8C] font-semibold whitespace-nowrap">{m.memberNumber as string}</td>
                  <td className="px-3 py-2 text-[#2C3E50] font-medium whitespace-nowrap">{m.fullName as string}</td>
                  <td className="px-3 py-2 text-[#6B7785] whitespace-nowrap">{m.phone as string || "—"}</td>
                  <td className="px-3 py-2 text-[#6B7785] whitespace-nowrap max-w-[200px] truncate">{m.email as string}</td>
                  <td className="px-3 py-2 text-[#6B7785] whitespace-nowrap font-mono text-xs">{(m as Record<string, unknown>).idNumber as string || "—"}</td>
                  <td className="px-3 py-2 text-[#6B7785] whitespace-nowrap max-w-[150px] truncate">{(m as Record<string, unknown>).occupation as string || "—"}</td>
                  <td className="px-3 py-2 text-[#6B7785] whitespace-nowrap">{(m as Record<string, unknown>).sex as string || "—"}</td>
                  <td className="px-3 py-2 text-[#6B7785] whitespace-nowrap">ETB {Number(m.compulsorySavings).toLocaleString()}</td>
                  <td className="px-3 py-2"><span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#6DBE45]/10 text-[#2E7D32]">{m.status as string}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Add New Member</DialogTitle></DialogHeader>
          <div className="grid sm:grid-cols-2 gap-3 py-2">
            <div className="sm:col-span-2"><Label className="text-xs">Full Name</Label><Input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="mt-1 h-9" /></div>
            <div><Label className="text-xs">Email</Label><Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-1 h-9" /></div>
            <div><Label className="text-xs">Password</Label><Input value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="mt-1 h-9" /></div>
            <div><Label className="text-xs">Phone</Label><Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="mt-1 h-9" /></div>
            <div><Label className="text-xs">City</Label><Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="mt-1 h-9" /></div>
            <div><Label className="text-xs">Branch</Label><Input value={form.branch} onChange={(e) => setForm({ ...form, branch: e.target.value })} className="mt-1 h-9" /></div>
            <div><Label className="text-xs">Occupation</Label><Input value={form.occupation} onChange={(e) => setForm({ ...form, occupation: e.target.value })} className="mt-1 h-9" /></div>
            <div><Label className="text-xs">Compulsory Savings (ETB)</Label><Input type="number" value={form.compulsorySavings} onChange={(e) => setForm({ ...form, compulsorySavings: Number(e.target.value) })} className="mt-1 h-9" /></div>
            <div><Label className="text-xs">Voluntary Savings (ETB)</Label><Input type="number" value={form.voluntarySavings} onChange={(e) => setForm({ ...form, voluntarySavings: Number(e.target.value) })} className="mt-1 h-9" /></div>
            <div><Label className="text-xs">Share Count</Label><Input type="number" value={form.shareCount} onChange={(e) => setForm({ ...form, shareCount: Number(e.target.value) })} className="mt-1 h-9" /></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={create} className="gradient-brand hover:opacity-90"><Save className="w-4 h-4 mr-1.5" /> Create Member</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ---------- Images tab ----------
function ImagesTab() {
  const { toast } = useToast();
  const { data, loading, reload } = useFetch<Record<string, unknown>>("/api/admin/images");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ section: "hero", key: "", url: "", alt: "" });
  const save = async () => {
    if (!form.key || !form.url) { toast({ title: "Key and URL required", variant: "destructive" }); return; }
    const r = await fetch("/api/admin/images", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    if (r.ok) { toast({ title: "Image saved" }); setOpen(false); setForm({ section: "hero", key: "", url: "", alt: "" }); reload(); }
    else toast({ title: "Save failed", variant: "destructive" });
  };
  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 1_500_000) { toast({ title: "Image too large", description: "Keep under 1.5MB for base64 storage.", variant: "destructive" }); return; }
    const reader = new FileReader();
    reader.onload = () => setForm((f) => ({ ...f, url: String(reader.result) }));
    reader.readAsDataURL(file);
  };
  const del = async (key: string) => { if (confirm("Delete image?")) { await fetch(`/api/admin/images?key=${key}`, { method: "DELETE" }); reload(); } };
  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div><h2 className="font-display font-bold text-xl text-[#2C3E50]">Images</h2><p className="text-sm text-[#6B7785]">Manage images used across the site.</p></div>
        <Button onClick={() => setOpen(true)} size="sm" className="gradient-brand hover:opacity-90"><Plus className="w-4 h-4 mr-1" /> Add Image</Button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? <div className="col-span-full p-8 text-center text-[#6B7785]">Loading...</div> :
         data?.length === 0 ? <div className="col-span-full p-8 text-center text-[#6B7785] bg-white rounded-xl border">No images uploaded yet.</div> :
         data.map((im) => (
          <div key={im.id as string} className="bg-white rounded-xl border border-[#E5E9EE] overflow-hidden">
            <img src={im.url as string} alt={(im.alt as string) || ""} className="w-full h-40 object-cover" />
            <div className="p-3">
              <div className="text-xs font-semibold text-[#1F4E8C]">{im.section as string} / {im.key as string}</div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-[10px] text-[#6B7785] truncate max-w-[140px]">{im.alt as string}</span>
                <button onClick={() => del(im.key as string)} className="text-[#E5484D] hover:bg-[#E5484D]/10 h-7 w-7 rounded-lg flex items-center justify-center"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Add Image</DialogTitle></DialogHeader>
          <div className="space-y-3 py-2">
            <div className="grid grid-cols-2 gap-3">
              <div><Label className="text-xs">Section</Label><Input value={form.section} onChange={(e) => setForm({ ...form, section: e.target.value })} className="mt-1 h-9" placeholder="hero / partners / gallery" /></div>
              <div><Label className="text-xs">Key (unique)</Label><Input value={form.key} onChange={(e) => setForm({ ...form, key: e.target.value })} className="mt-1 h-9" placeholder="heroBg, partner1..." /></div>
            </div>
            <div><Label className="text-xs">Image URL</Label><Input value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} className="mt-1 h-9" placeholder="https://..." /></div>
            <div><Label className="text-xs">Or upload a file (max 1.5MB)</Label><input type="file" accept="image/*" onChange={onFile} className="mt-1 block w-full text-xs text-[#6B7785] file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-[#6DBE45] file:text-white" /></div>
            {form.url && <img src={form.url} alt="preview" className="w-full h-40 object-cover rounded-lg border border-[#E5E9EE]" />}
            <div><Label className="text-xs">Alt text</Label><Input value={form.alt} onChange={(e) => setForm({ ...form, alt: e.target.value })} className="mt-1 h-9" /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={save} className="gradient-brand hover:opacity-90"><Save className="w-4 h-4 mr-1.5" /> Save</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ---------- Main AdminApp shell ----------
// ---------- Menu tab (hierarchical editor) ----------
const ICON_OPTIONS = ["Building2", "Target", "Flag", "ShieldCheck", "Users", "FileText", "BarChart3", "Quote", "Handshake", "Lock", "Wallet", "Baby", "TrendingUp", "Coins", "Award", "Lightbulb", "Smartphone", "Globe", "Briefcase", "Home", "Sofa", "Laptop", "Car", "Truck", "Calculator", "UserPlus", "Gift", "FileCheck", "Newspaper", "Calendar", "PenLine", "Download", "HelpCircle", "Sparkles", "MapPin", "Mail"];

function MenuTab() {
  const { toast } = useToast();
  const { data, loading, reload } = useFetch<Record<string, unknown>>("/api/admin/menu");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);
  const [parentId, setParentId] = useState<string>("");

  const tops = (data || []).filter((n) => !n.parentId).sort((a, b) => Number(a.order) - Number(b.order));
  const childrenOf: Record<string, Record<string, unknown>[]> = {};
  for (const c of (data || []).filter((n) => n.parentId)) {
    const p = c.parentId as string;
    if (!childrenOf[p]) childrenOf[p] = [];
    childrenOf[p].push(c);
  }

  const openNew = (pid: string = "") => {
    setParentId(pid);
    setEditing({ parentId: pid || null, visible: true, openInNew: false, order: 0, icon: "FileText" });
    setOpen(true);
  };
  const openEdit = (item: Record<string, unknown>) => { setParentId((item.parentId as string) || ""); setEditing({ ...item }); setOpen(true); };

  const save = async () => {
    const id = editing?.id as string | undefined;
    const body: Record<string, unknown> = {};
    for (const k of ["label", "href", "slug", "parentId", "group", "icon", "order", "visible", "openInNew"]) {
      if (editing && editing[k] !== undefined) body[k] = editing[k];
    }
    if (body.parentId === "") body.parentId = null;
    const url = id ? `/api/admin/menu?id=${id}` : "/api/admin/menu";
    const method = id ? "PUT" : "POST";
    const r = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const j = await r.json();
    if (!r.ok) { toast({ title: "Save failed", description: j.error, variant: "destructive" }); return; }
    toast({ title: id ? "Updated" : "Created" });
    setOpen(false); setEditing(null); reload();
  };
  const del = async (id: string) => { if (confirm("Delete this menu item? Children will be orphaned.")) { await fetch(`/api/admin/menu?id=${id}`, { method: "DELETE" }); reload(); } };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div><h2 className="font-display font-bold text-xl text-[#2C3E50]">Navigation Menu</h2><p className="text-sm text-[#6B7785]">Manage top-level items and their dropdown sub-menus. Items with a parent appear in that parent's dropdown.</p></div>
        <Button onClick={() => openNew("")} size="sm" className="gradient-brand hover:opacity-90"><Plus className="w-4 h-4 mr-1" /> Add Top-Level</Button>
      </div>
      {loading ? <div className="p-8 text-center text-[#6B7785]">Loading...</div> : (
        <div className="space-y-3">
          {tops.map((t) => {
            const kids = (childrenOf[t.id as string] || []).sort((a, b) => Number(a.order) - Number(b.order));
            const groups: { name: string | null; items: Record<string, unknown>[] }[] = [];
            for (const c of kids) {
              const g = (c.group as string) || null;
              let bucket = groups.find((b) => b.name === g);
              if (!bucket) { bucket = { name: g, items: [] }; groups.push(bucket); }
              bucket.items.push(c);
            }
            return (
              <div key={t.id as string} className="bg-white rounded-xl border border-[#E5E9EE] overflow-hidden">
                <div className="p-4 flex items-center justify-between bg-[#1F4E8C] text-white">
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-4 h-4" />
                    <span className="font-display font-bold">{t.label as string}</span>
                    <span className="text-xs opacity-70">→ {t.href as string}</span>
                    {kids.length > 0 && <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full">{kids.length} sub-items</span>}
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => openNew(t.id as string)} className="text-xs bg-white/15 hover:bg-white/25 px-2.5 py-1 rounded-full flex items-center gap-1"><Plus className="w-3 h-3" /> Add sub-item</button>
                    <button onClick={() => openEdit(t)} className="h-7 w-7 rounded-lg hover:bg-white/15 flex items-center justify-center"><Pencil className="w-3.5 h-3.5" /></button>
                    <button onClick={() => del(t.id as string)} className="h-7 w-7 rounded-lg hover:bg-white/15 flex items-center justify-center"><Trash2 className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
                {groups.length > 0 && (
                  <div className="p-4">
                    {groups.map((g, gi) => (
                      <div key={gi} className={gi > 0 ? "mt-3 pt-3 border-t border-[#F0F2F5]" : ""}>
                        {g.name && <div className="text-[10px] font-bold uppercase tracking-wider text-[#6DBE45] mb-1.5">Group: {g.name}</div>}
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
                          {g.items.map((c) => (
                            <div key={c.id as string} className="flex items-center gap-2 bg-[#F8F9FA] rounded-lg p-2 border border-[#E5E9EE]">
                              <span className="w-7 h-7 rounded bg-[#6DBE45]/10 text-[#6DBE45] flex items-center justify-center text-xs font-bold">{String(c.icon || "📄").charAt(0)}</span>
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-semibold text-[#2C3E50] truncate">{c.label as string}</div>
                                <div className="text-[10px] text-[#6B7785] truncate">{c.slug ? `/?page=${c.slug}` : c.href}</div>
                              </div>
                              <button onClick={() => openEdit(c)} className="text-[#1F4E8C] hover:bg-[#1F4E8C]/10 h-6 w-6 rounded flex items-center justify-center"><Pencil className="w-3 h-3" /></button>
                              <button onClick={() => del(c.id as string)} className="text-[#E5484D] hover:bg-[#E5484D]/10 h-6 w-6 rounded flex items-center justify-center"><Trash2 className="w-3 h-3" /></button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>{editing?.id ? "Edit Menu Item" : "Add Menu Item"}</DialogTitle></DialogHeader>
          {editing && (
            <div className="grid sm:grid-cols-2 gap-3 py-2">
              <div className="sm:col-span-2"><Label className="text-xs">Label</Label><Input value={String(editing.label ?? "")} onChange={(e) => setEditing({ ...editing, label: e.target.value })} className="mt-1 h-9" /></div>
              <div><Label className="text-xs">Parent (empty = top-level)</Label>
                <select value={parentId} onChange={(e) => { setParentId(e.target.value); setEditing({ ...editing, parentId: e.target.value || null }); }} className="mt-1 w-full h-9 rounded-md border border-input bg-background px-2 text-sm">
                  <option value="">— Top-level —</option>
                  {tops.map((t) => <option key={t.id as string} value={t.id as string}>{t.label as string}</option>)}
                </select>
              </div>
              <div><Label className="text-xs">Group (within dropdown)</Label><Input value={String(editing.group ?? "")} onChange={(e) => setEditing({ ...editing, group: e.target.value || null })} className="mt-1 h-9" placeholder="e.g. Our Organization" /></div>
              <div><Label className="text-xs">Page slug (creates /?page=slug)</Label><Input value={String(editing.slug ?? "")} onChange={(e) => setEditing({ ...editing, slug: e.target.value || null })} className="mt-1 h-9" placeholder="about-mission" /></div>
              <div><Label className="text-xs">Or direct link (#section or URL)</Label><Input value={String(editing.href ?? "#")} onChange={(e) => setEditing({ ...editing, href: e.target.value })} className="mt-1 h-9" placeholder="#membership" /></div>
              <div><Label className="text-xs">Icon</Label>
                <select value={String(editing.icon ?? "FileText")} onChange={(e) => setEditing({ ...editing, icon: e.target.value })} className="mt-1 w-full h-9 rounded-md border border-input bg-background px-2 text-sm">
                  {ICON_OPTIONS.map((i) => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
              <div><Label className="text-xs">Order</Label><Input type="number" value={Number(editing.order ?? 0)} onChange={(e) => setEditing({ ...editing, order: Number(e.target.value) })} className="mt-1 h-9" /></div>
              <div className="sm:col-span-2 flex gap-4">
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={Boolean(editing.visible)} onChange={(e) => setEditing({ ...editing, visible: e.target.checked })} className="accent-[#6DBE45]" /> Visible</label>
                <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={Boolean(editing.openInNew)} onChange={(e) => setEditing({ ...editing, openInNew: e.target.checked })} className="accent-[#6DBE45]" /> Open in new tab</label>
              </div>
            </div>
          )}
          <DialogFooter><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={save} className="gradient-brand hover:opacity-90"><Save className="w-4 h-4 mr-1.5" /> Save</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ---------- Pages tab (content CMS) ----------
function PagesTab() {
  const { toast } = useToast();
  const { data, loading, reload } = useFetch<Record<string, unknown>>("/api/admin/pages");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Record<string, unknown> | null>(null);

  const openNew = () => { setEditing({ section: "about", published: true, content: "<p>Write your page content here (HTML is supported).</p>" }); setOpen(true); };
  const openEdit = (item: Record<string, unknown>) => { setEditing({ ...item }); setOpen(true); };

  const save = async () => {
    const id = editing?.id as string | undefined;
    const body: Record<string, unknown> = { ...editing };
    if (body.slug) body.slug = String(body.slug).trim().toLowerCase().replace(/\s+/g, "-");
    if (body.parentId === "") body.parentId = null;
    const url = id ? `/api/admin/pages?id=${id}` : "/api/admin/pages";
    const method = id ? "PUT" : "POST";
    const r = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const j = await r.json();
    if (!r.ok) { toast({ title: "Save failed", description: j.error, variant: "destructive" }); return; }
    toast({ title: id ? "Page updated" : "Page created", description: "Changes are live." });
    setOpen(false); setEditing(null); reload();
  };
  const del = async (id: string) => { if (confirm("Delete this page?")) { await fetch(`/api/admin/pages?id=${id}`, { method: "DELETE" }); reload(); } };

  const grouped: Record<string, Record<string, unknown>[]> = {};
  for (const p of (data || [])) { const s = p.section as string; if (!grouped[s]) grouped[s] = []; grouped[s].push(p); }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div><h2 className="font-display font-bold text-xl text-[#2C3E50]">Content Pages</h2><p className="text-sm text-[#6B7785]">{data?.length ?? 0} pages. Edit the content shown on each sub-page (/?page=slug).</p></div>
        <Button onClick={openNew} size="sm" className="gradient-brand hover:opacity-90"><Plus className="w-4 h-4 mr-1" /> Add Page</Button>
      </div>
      {loading ? <div className="p-8 text-center text-[#6B7785]">Loading...</div> : (
        <div className="space-y-4">
          {Object.entries(grouped).map(([section, items]) => (
            <div key={section} className="bg-white rounded-xl border border-[#E5E9EE] overflow-hidden">
              <div className="px-4 py-2 bg-[#F8F9FA] border-b border-[#E5E9EE] text-xs font-bold uppercase tracking-wider text-[#1F4E8C]">{section} · {items.length} pages</div>
              <div className="divide-y divide-[#E5E9EE]">
                {items.map((p) => (
                  <div key={p.id as string} className="p-3 flex items-center justify-between hover:bg-[#F8F9FA]">
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-[#2C3E50] text-sm">{p.title as string}</div>
                      <div className="text-[11px] text-[#6B7785]">/?page={p.slug as string} {p.published ? "" : "· (hidden)"}{p.subtitle ? ` · ${p.subtitle}` : ""}</div>
                    </div>
                    <div className="flex items-center gap-1">
                      <a href={`/?page=${p.slug}`} target="_blank" className="text-[#1F4E8C] hover:bg-[#1F4E8C]/10 h-7 w-7 rounded flex items-center justify-center"><ExternalLink className="w-3.5 h-3.5" /></a>
                      <button onClick={() => openEdit(p)} className="text-[#1F4E8C] hover:bg-[#1F4E8C]/10 h-7 w-7 rounded flex items-center justify-center"><Pencil className="w-3.5 h-3.5" /></button>
                      <button onClick={() => del(p.id as string)} className="text-[#E5484D] hover:bg-[#E5484D]/10 h-7 w-7 rounded flex items-center justify-center"><Trash2 className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing?.id ? "Edit Page" : "Add Page"}</DialogTitle></DialogHeader>
          {editing && (
            <div className="grid gap-3 py-2">
              <div className="grid sm:grid-cols-2 gap-3">
                <div><Label className="text-xs">Title</Label><Input value={String(editing.title ?? "")} onChange={(e) => setEditing({ ...editing, title: e.target.value })} className="mt-1 h-9" /></div>
                <div><Label className="text-xs">Slug (URL)</Label><Input value={String(editing.slug ?? "")} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} className="mt-1 h-9" placeholder="about-mission" /></div>
              </div>
              <div><Label className="text-xs">Subtitle</Label><Input value={String(editing.subtitle ?? "")} onChange={(e) => setEditing({ ...editing, subtitle: e.target.value })} className="mt-1 h-9" /></div>
              <div className="grid sm:grid-cols-2 gap-3">
                <div><Label className="text-xs">Section</Label>
                  <select value={String(editing.section ?? "about")} onChange={(e) => setEditing({ ...editing, section: e.target.value })} className="mt-1 w-full h-9 rounded-md border border-input bg-background px-2 text-sm">
                    {["about", "services", "loans", "members", "resources", "contact"].map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div><Label className="text-xs">Icon</Label>
                  <select value={String(editing.icon ?? "FileText")} onChange={(e) => setEditing({ ...editing, icon: e.target.value })} className="mt-1 w-full h-9 rounded-md border border-input bg-background px-2 text-sm">
                    {ICON_OPTIONS.map((i) => <option key={i} value={i}>{i}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <Label className="text-xs">Content (HTML supported)</Label>
                <Textarea value={String(editing.content ?? "")} onChange={(e) => setEditing({ ...editing, content: e.target.value })} className="mt-1 min-h-[280px] font-mono text-xs" />
              </div>
              <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={Boolean(editing.published)} onChange={(e) => setEditing({ ...editing, published: e.target.checked })} className="accent-[#6DBE45]" /> Published</label>
            </div>
          )}
          <DialogFooter><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={save} className="gradient-brand hover:opacity-90"><Save className="w-4 h-4 mr-1.5" /> Save Page</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ---------- Jobs tab (postings + applications) ----------
function JobsTab() {
  const { toast } = useToast();
  const { data: jobs, loading, reload } = useFetch<Record<string, unknown>>("/api/admin/jobs");
  const [apps, setApps] = useState<Record<string, unknown>[] | null>(null);
  const [showApps, setShowApps] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", department: "Operations", type: "Full-time", location: "Addis Ababa", description: "", requirements: "", salary: "", closingDate: "", status: "open" });

  const create = async () => {
    const r = await fetch("/api/admin/jobs", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    if (r.ok) { toast({ title: "Job posted" }); setOpen(false); setForm({ title: "", department: "Operations", type: "Full-time", location: "Addis Ababa", description: "", requirements: "", salary: "", closingDate: "", status: "open" }); reload(); }
    else toast({ title: "Failed", variant: "destructive" });
  };
  const delJob = async (id: string) => { if (confirm("Delete this job posting?")) { await fetch(`/api/admin/jobs?id=${id}`, { method: "DELETE" }); reload(); } };
  const loadApps = async (jobId: string) => {
    setShowApps(showApps === jobId ? null : jobId);
    if (showApps !== jobId) { const r = await fetch(`/api/admin/jobs/applications?jobId=${jobId}`); const j = await r.json(); setApps(j.applications || []); }
  };
  const updateAppStatus = async (id: string, status: string) => { await fetch(`/api/admin/jobs/applications?id=${id}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ status }) }); if (showApps) loadApps(showApps); };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div><h2 className="font-display font-bold text-xl text-[#2C3E50]">Jobs & Applications</h2><p className="text-sm text-[#6B7785]">{jobs?.length ?? 0} postings — click a job to view applicants</p></div>
        <Button onClick={() => setOpen(true)} size="sm" className="gradient-brand hover:opacity-90"><Plus className="w-4 h-4 mr-1" /> Post Job</Button>
      </div>
      {loading ? <div className="p-8 text-center text-[#6B7785]">Loading...</div> : (
        <div className="space-y-3">
          {(jobs || []).map((j) => (
            <div key={j.id as string} className="bg-white rounded-xl border border-[#E5E9EE] overflow-hidden">
              <div className="p-4 flex items-center justify-between hover:bg-[#F8F9FA] cursor-pointer" onClick={() => loadApps(j.id as string)}>
                <div className="flex-1">
                  <div className="flex items-center gap-2"><h3 className="font-bold text-[#2C3E50]">{j.title as string}</h3><span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${j.status === "open" ? "bg-[#6DBE45]/10 text-[#2E7D32]" : "bg-gray-200 text-gray-600"}`}>{j.status as string}</span></div>
                  <div className="text-xs text-[#6B7785] mt-0.5">{j.department as string} · {j.type as string} · {j.location as string}{(j as Record<string, unknown>).closingDate ? ` · Closes: ${new Date((j as Record<string, unknown>).closingDate as string).toLocaleDateString()}` : ""}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold bg-[#1F4E8C]/10 text-[#1F4E8C] px-2.5 py-1 rounded-full">{(j as Record<string, unknown>).applicationCount as number || 0} applicants</span>
                  <button onClick={(e) => { e.stopPropagation(); delJob(j.id as string); }} className="text-[#E5484D] hover:bg-[#E5484D]/10 h-7 w-7 rounded flex items-center justify-center"><Trash2 className="w-3.5 h-3.5" /></button>
                </div>
              </div>
              {showApps === (j.id as string) && (
                <div className="border-t border-[#E5E9EE] p-3 bg-[#F8F9FA]">
                  <div className="text-xs font-bold uppercase text-[#6B7785] mb-2">Applicants</div>
                  {apps?.length === 0 || !apps ? <div className="text-sm text-[#6B7785] py-2">No applications yet.</div> : (
                    <div className="space-y-2">
                      {apps.map((a) => (
                        <div key={a.id as string} className="bg-white rounded-lg p-3 border border-[#E5E9EE] flex items-start justify-between">
                          <div className="flex-1">
                            <div className="font-semibold text-sm text-[#2C3E50]">{a.fullName as string}</div>
                            <div className="text-xs text-[#6B7785]">{a.email as string} · {a.phone as string || "no phone"}</div>
                            {(a as Record<string, unknown>).education && <div className="text-xs text-[#6B7785] mt-0.5">Education: {(a as Record<string, unknown>).education as string}</div>}
                            {(a as Record<string, unknown>).experience && <div className="text-xs text-[#6B7785]">Experience: {(a as Record<string, unknown>).experience as string}</div>}
                            {a.coverLetter && <p className="text-xs text-[#6B7785] mt-1 line-clamp-2">{a.coverLetter as string}</p>}
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-[10px] text-[#6B7785]">Applied: {new Date(a.createdAt as string).toLocaleDateString()}</span>
                              {(a as Record<string, unknown>).cvUrl && <a href={(a as Record<string, unknown>).cvUrl as string} target="_blank" className="text-[10px] font-bold text-[#1F4E8C] hover:underline flex items-center gap-1"><ExternalLink className="w-3 h-3" /> Download CV</a>}
                            </div>
                          </div>
                          <select value={a.status as string} onChange={(e) => updateAppStatus(a.id as string, e.target.value)} className="text-xs h-7 rounded border border-input bg-background px-2">
                            {["new", "reviewed", "interview", "offered", "rejected"].map((st) => <option key={st} value={st}>{st}</option>)}
                          </select>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Post a Job</DialogTitle></DialogHeader>
          <div className="grid gap-3 py-2">
            <div><Label className="text-xs">Job Title</Label><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="mt-1 h-9" placeholder="Loan Officer" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label className="text-xs">Department</Label><Input value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} className="mt-1 h-9" /></div>
              <div><Label className="text-xs">Type</Label><select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="mt-1 w-full h-9 rounded-md border border-input bg-background px-2 text-sm">{["Full-time", "Part-time", "Contract", "Internship"].map((t) => <option key={t} value={t}>{t}</option>)}</select></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label className="text-xs">Location</Label><Input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} className="mt-1 h-9" /></div>
              <div><Label className="text-xs">Salary</Label><Input value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })} className="mt-1 h-9" placeholder="Competitive" /></div>
            </div>
            <div><Label className="text-xs">Closing Date (Application Deadline)</Label><Input type="date" value={form.closingDate} onChange={(e) => setForm({ ...form, closingDate: e.target.value })} className="mt-1 h-9" /></div>
            <div><Label className="text-xs">Description</Label><Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="mt-1 min-h-[80px]" /></div>
            <div><Label className="text-xs">Requirements</Label><Textarea value={form.requirements} onChange={(e) => setForm({ ...form, requirements: e.target.value })} className="mt-1 min-h-[60px]" /></div>
          </div>
          <DialogFooter><Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button onClick={create} className="gradient-brand hover:opacity-90"><Save className="w-4 h-4 mr-1.5" /> Post Job</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

const TABS = [
  { id: "settings", label: "Settings", icon: SettingsIcon },
  { id: "saccos", label: "SACCOs", icon: Building2 },
  { id: "news", label: "News", icon: Newspaper },
  { id: "events", label: "Events", icon: Calendar },
  { id: "menu", label: "Menu", icon: MenuIcon },
  { id: "pages", label: "Pages", icon: BookOpen },
  { id: "images", label: "Images", icon: ImageIcon },
  { id: "testimonials", label: "Testimonials", icon: Star },
  { id: "applications", label: "Applications", icon: FileText },
  { id: "messages", label: "Messages", icon: Mail },
  { id: "subscribers", label: "Subscribers", icon: Users },
  { id: "members", label: "Members", icon: UserPlus },
  { id: "jobs", label: "Jobs", icon: Briefcase },
];

export function AdminApp({ content }: { content: SiteContent }) {
  const { toast } = useToast();
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [passcode, setPasscode] = useState("");
  const [tab, setTab] = useState("settings");

  useEffect(() => {
    fetch("/api/admin/login").then((r) => r.json()).then((j) => setAuthed(j.authed)).catch(() => setAuthed(false));
  }, []);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    const r = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ passcode }) });
    const j = await r.json();
    if (r.ok) { setAuthed(true); toast({ title: "Welcome, Admin!" }); }
    else toast({ title: "Invalid passcode", variant: "destructive" });
  };

  const logout = async () => { await fetch("/api/admin/login", { method: "DELETE" }); setAuthed(false); };

  if (authed === null) return <div className="min-h-screen flex items-center justify-center text-[#6B7785]">Loading admin...</div>;

  if (!authed) {
    return (
      <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
        <div className="bg-[#1F4E8C] text-white"><div className="container mx-auto px-4 h-12 flex items-center justify-between text-sm"><a href="/" className="flex items-center gap-1.5"><ArrowLeft className="w-4 h-4" /> Back to website</a><span className="font-display font-bold">Admin Panel</span></div></div>
        <div className="flex-1 flex items-center justify-center px-4 py-12">
          <form onSubmit={login} className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-[#E5E9EE] overflow-hidden">
            <div className="gradient-brand p-6 text-white text-center">
              <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur flex items-center justify-center mx-auto mb-3 overflow-hidden"><img src="/logo-official.png" alt="Logo" className="w-full h-full object-contain rounded-2xl" /></div>
              <h1 className="font-display font-bold text-xl">Admin Access</h1>
              <p className="text-sm text-white/85 mt-1">Enter the admin passcode to continue</p>
            </div>
            <div className="p-6 space-y-3">
              <Input type="password" value={passcode} onChange={(e) => setPasscode(e.target.value)} placeholder="Admin passcode" required className="h-11" />
              <Button type="submit" className="w-full gradient-brand hover:opacity-90 h-11"><Lock className="w-4 h-4 mr-1.5" /> Unlock Admin</Button>
              <div className="bg-[#6DBE45]/10 border border-[#6DBE45]/20 rounded-lg p-3 text-xs text-[#2E7D32]"><strong>Default passcode:</strong> admin123</div>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F9FA]">
      {/* top bar */}
      <div className="bg-[#1F4E8C] text-white">
        <div className="container mx-auto px-4 h-12 flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <img src="/logo-official.png" alt="Logo" className="w-8 h-8 rounded-lg object-contain bg-white" />
            <span className="font-display font-bold">Admin Dashboard · {content.settings.siteName}</span>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher variant="bar" />
            <a href="/" target="_blank" className="flex items-center gap-1 hover:text-[#6DBE45]"><ExternalLink className="w-4 h-4" /> View site</a>
            <button onClick={logout} className="flex items-center gap-1 hover:text-[#6DBE45]"><LogOut className="w-4 h-4" /> Logout</button>
          </div>
        </div>
      </div>

      <div className="flex-1 container mx-auto px-4 py-6 flex gap-6">
        {/* sidebar */}
        <aside className="hidden lg:block w-56 shrink-0">
          <nav className="bg-white rounded-xl border border-[#E5E9EE] p-2 sticky top-6">
            {TABS.map((t) => (
              <button key={t.id} onClick={() => setTab(t.id)} className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${tab === t.id ? "gradient-brand text-white" : "text-[#2C3E50] hover:bg-[#F8F9FA]"}`}>
                <t.icon className="w-4 h-4" /> {t.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* mobile tabs */}
        <div className="lg:hidden mb-4 flex flex-wrap gap-1">
          {TABS.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`flex items-center gap-1 px-2.5 py-1.5 rounded-full text-xs font-semibold ${tab === t.id ? "gradient-brand text-white" : "bg-white border border-[#E5E9EE] text-[#6B7785]"}`}>
              <t.icon className="w-3.5 h-3.5" /> {t.label}
            </button>
          ))}
        </div>

        {/* content */}
        <main className="flex-1 min-w-0">
          {tab === "settings" && <SettingsTab settings={content.settings} />}
          {tab === "saccos" && (
            <CrudManager cfg={{
              title: "SACCOs", apiBase: "/api/admin/saccos", addLabel: "Add SACCO",
              columns: [{ key: "name", label: "Name" }, { key: "region", label: "Region" }, { key: "type", label: "Type" }, { key: "members", label: "Members" }],
              fields: [
                { name: "name", label: "Name", full: true },
                { name: "region", label: "Region", type: "select", options: ethiopiaRegions.filter((r) => r !== "All Regions") },
                { name: "city", label: "City" },
                { name: "type", label: "Type", type: "select", options: ["Urban", "Rural", "Workplace", "Community"] },
                { name: "established", label: "Established", type: "number", default: 2024 },
                { name: "members", label: "Members", type: "number", default: 0 },
                { name: "assetsBirr", label: "Assets (ETB millions)", type: "number", default: 0 },
                { name: "phone", label: "Phone" },
                { name: "email", label: "Email" },
                { name: "services", label: "Services (comma-separated)", full: true },
                { name: "description", label: "Description", type: "textarea", full: true },
                { name: "featured", label: "Featured", type: "checkbox", default: false },
              ],
            }} />
          )}
          {tab === "news" && (
            <CrudManager cfg={{
              title: "News", apiBase: "/api/admin/news", addLabel: "Add News",
              columns: [{ key: "title", label: "Title" }, { key: "date", label: "Date" }, { key: "tag", label: "Tag" }],
              fields: [
                { name: "title", label: "Title", full: true },
                { name: "date", label: "Date", default: new Date().toISOString().slice(0, 10) },
                { name: "tag", label: "Tag", type: "select", options: ["Update", "Event", "Career", "Product", "News"], default: "Update" },
                { name: "icon", label: "Icon (lucide name)", type: "select", options: ["Globe", "Users", "Calendar", "GraduationCap"], default: "Globe" },
                { name: "excerpt", label: "Excerpt", type: "textarea", full: true },
                { name: "published", label: "Published", type: "checkbox", default: true },
              ],
            }} />
          )}
          {tab === "events" && (
            <CrudManager cfg={{
              title: "Events", apiBase: "/api/admin/events", addLabel: "Add Event",
              columns: [{ key: "title", label: "Title" }, { key: "day", label: "Day" }, { key: "month", label: "Month" }, { key: "location", label: "Location" }],
              fields: [
                { name: "title", label: "Title", full: true },
                { name: "day", label: "Day" },
                { name: "month", label: "Month" },
                { name: "dayName", label: "Day name" },
                { name: "time", label: "Time" },
                { name: "location", label: "Location" },
                { name: "type", label: "Type", type: "select", options: ["Free", "Important", "Event", "Workshop"], default: "Event" },
                { name: "description", label: "Description", type: "textarea", full: true },
              ],
            }} />
          )}
          {tab === "menu" && <MenuTab />}
          {tab === "pages" && <PagesTab />}
          {tab === "images" && <ImagesTab />}
          {tab === "testimonials" && (
            <CrudManager cfg={{
              title: "Testimonials", apiBase: "/api/admin/testimonials", addLabel: "Add Testimonial",
              columns: [{ key: "name", label: "Name" }, { key: "role", label: "Role" }],
              fields: [
                { name: "name", label: "Name" },
                { name: "role", label: "Role" },
                { name: "initials", label: "Initials (e.g. BA)" },
                { name: "quote", label: "Quote", type: "textarea", full: true },
                { name: "published", label: "Published", type: "checkbox", default: true },
              ],
            }} />
          )}
          {tab === "applications" && <ApplicationsTab />}
          {tab === "messages" && <MessagesTab />}
          {tab === "subscribers" && <SubscribersTab />}
          {tab === "members" && <MembersTab />}
          {tab === "jobs" && <JobsTab />}
        </main>
      </div>
    </div>
  );
}
