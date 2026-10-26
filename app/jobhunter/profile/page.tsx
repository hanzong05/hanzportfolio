import Sidebar from "@/components/jobhunter/Sidebar";
import { ProfileForm } from "@/components/jobhunter/Forms";
import { viewCounts } from "@/lib/jobhunter/jobs";
import { getProfile } from "@/lib/jobhunter/profile";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const [profile, counts] = await Promise.all([getProfile(), viewCounts()]);
  return (
    <div className="page">
      <Sidebar current="profile" counts={counts} />
      <main className="center">
        <h1 style={{ marginBottom: 6 }}>My Info</h1>
        <p className="muted" style={{ marginBottom: 20 }}>
          Analysis and drafts use only what you enter here. Nothing is added beyond this profile.
        </p>
        <ProfileForm initial={profile} />
      </main>
    </div>
  );
}
