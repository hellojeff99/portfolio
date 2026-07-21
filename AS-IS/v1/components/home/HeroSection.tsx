import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Github, Linkedin } from "lucide-react"; // 1. Linkedin 아이콘 추가
import { profile } from "@/lib/home";

// 2. type에 'linkedin' 추가
function ContactIcon({ type }: { type: "mail" | "location" | "github" | "linkedin" }) {
    const cls = "text-navy shrink-0";
    if (type === "mail")     return <Mail     size={16} className={cls} />;
    if (type === "github")   return <Github   size={16} className={cls} />;
    if (type === "linkedin") return <Linkedin size={16} className={cls} />; // LinkedIn 아이콘 조건 추가
    return                          <MapPin   size={16} className={cls} />;
}

const contacts = [
    { type: "mail"     as const, label: profile.email,            href: `mailto:${profile.email}` },
    { type: "location" as const, label: profile.location },
    { type: "github"   as const, label: "github.com/hellojeff99", href: profile.github },
    { type: "linkedin" as const, label: "LinkedIn",       href: profile.linkedin },
];

export default function HeroSection() {
    return (
        <section id="hero" className="hero-bg relative overflow-hidden min-h-[85vh] flex items-center px-16 py-16">
            <div className="hero-grid absolute inset-0 pointer-events-none" />
            <div className="absolute -top-24 -right-24 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-blue-100 to-navy-pale opacity-60 blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 -left-16 w-96 h-96 rounded-full bg-gradient-to-tr from-navy-pale to-blue-50 opacity-50 blur-2xl pointer-events-none" />

            <div className="relative z-10 flex flex-col-reverse sm:flex-row items-center gap-16 w-full">
                <div className="flex-1 space-y-6">
                    <div className="space-y-2">
                        <span className="inline-block px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-navy bg-navy-pale rounded-full">
                            {profile.role}
                        </span>
                        <h1 className="text-7xl font-bold text-gray-900 leading-tight tracking-tight">
                            {profile.name}
                        </h1>
                    </div>
                    <p className="text-base text-gray-500 leading-relaxed w-full whitespace-pre-line">
                        {profile.bio}
                    </p>
                    <ul className="space-y-2 text-base text-gray-500">
                        {contacts.map((c) => (
                            <li key={c.label} className="flex items-center gap-2.5">
                                <ContactIcon type={c.type} />
                                {c.href ? (
                                    <a
                                        href={c.href}
                                        target={c.href.startsWith("http") ? "_blank" : undefined}
                                        rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                        className="hover:text-navy transition-colors"
                                    >
                                        {c.label}
                                    </a>
                                ) : (
                                    <span>{c.label}</span>
                                )}
                            </li>
                        ))}
                    </ul>
                    <div className="pt-2"> {/* 버튼 위에 약간의 여백 추가 */}
                        <Link
                            href="/resume"
                            className="px-7 py-3 text-base font-semibold text-white bg-navy rounded-lg hover:bg-navy-light shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                        >
                            Resume
                        </Link>
                    </div>
                </div>

                {/* 4. 이미지 크기 확대 섹션 */}
                <div className="shrink-0">
                    <div className="relative">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br  to-blue-400 blur-xl opacity-30 scale-110" />
                        <div className="relative rounded-full p-2 bg-gradient-to-br  to-blue-400">
                            <Image
                                src={profile.heroPhoto}
                                alt={`${profile.name} 프로필`}
                                width={400}
                                height={400}
                                className="rounded-full object-cover w-[300px] h-[300px] lg:w-[400px] lg:h-[500px]"
                                priority
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}