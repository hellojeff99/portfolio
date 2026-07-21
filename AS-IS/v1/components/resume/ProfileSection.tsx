import { profile } from "@/lib/common/profile";

export default function ProfileSection() {
    return (
        <section className="flex items-start gap-7 pb-6">
            <div className="shrink-0 w-36 h-44 rounded-md border border-gray-200 bg-gray-50 overflow-hidden">
                {profile.photo ? (
                    <img src={profile.photo} alt={profile.name} className="w-full h-full object-cover" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">Photo</div>
                )}
            </div>
            <div className="flex-1">
                <div className="flex items-baseline gap-3">
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{profile.name}</h1>
                    <p className="text-base font-medium text-gray-400 tracking-wide">{profile.role}</p>
                </div>
                <div className="mt-2 flex flex-wrap gap-3 text-xs text-gray-600 tracking-wide">
                    <span>{profile.email}</span>
                    <span>·</span>
                    <span>{profile.phone}</span>
                    <span>·</span>
                    <span>{profile.location}</span>
                </div>
                <div className="mt-1 flex flex-col gap-0.5 text-xs text-gray-600">
                    <span>LinkedIn: <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-900">{profile.linkedin}</a></span>
                    <span>GitHub: <a href={profile.github} target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-900">{profile.github}</a></span>
                    <span>Portfolio: <a href={profile.portfolio} target="_blank" rel="noopener noreferrer" className="underline hover:text-gray-900">{profile.portfolio}</a></span>
                </div>
            </div>
        </section>
    );
}
