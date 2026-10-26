import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin-auth";
import "./jobhunter.css";

export const dynamic = "force-dynamic";

// Job Hunter is private: only a signed-in admin can open it.
export default async function JobHunterLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAdmin())) redirect("/admin");
  return <div className="jh">{children}</div>;
}
