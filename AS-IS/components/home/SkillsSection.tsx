import { skills } from "@/lib/home";

export default function SkillsSection() {
    return (
        <section id="skills" className="section-hidden px-16 py-10 border-gray-100">
            <div className="space-y-5">
                <div className="flex items-center gap-4">
                    <p className="text-sm font-extrabold uppercase tracking-widest text-navy">Tech Skills</p>
                    <div className="flex-1 h-px bg-gray-200" />
                </div>
                <div className="space-y-3">
                    {skills.map(({ category, items }) => (
                        <div key={category} className="flex flex-wrap items-center gap-x-4 gap-y-2">
                            <span className="text-sm font-bold text-gray-900 w-28 shrink-0">{category}</span>
                            <div className="flex flex-wrap gap-2">
                                {items.map((skill) => (
                                    <span key={skill} className="px-3 py-0.5 text-sm rounded-full font-medium bg-navy-pale text-navy border border-blue-100 cursor-default">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}