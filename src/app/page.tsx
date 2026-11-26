import { getContent } from "@/lib/content";
import { MarketingSite } from "@/components/site/marketing-site";
import { AdminApp } from "@/components/admin/admin-app";
import { MemberApp } from "@/components/member/member-app";
import { PageView } from "@/components/site/page-view";
import { CareersView } from "@/components/site/careers-view";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [k: string]: string | string[] | undefined }>;
}) {
  const sp = await searchParams;
  const view = typeof sp.view === "string" ? sp.view : undefined;
  const page = typeof sp.page === "string" ? sp.page : undefined;
  const content = await getContent();

  if (view === "admin") return <AdminApp content={content} />;
  if (view === "login" || view === "member") return <MemberApp view={view} content={content} />;
  if (page === "contact-careers") return <CareersView content={content} />;
  if (page) return <PageView slug={page} content={content} />;
  return <MarketingSite content={content} />;
}
