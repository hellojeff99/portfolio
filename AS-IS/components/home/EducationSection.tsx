import { educations } from "@/lib/home";

export default function EducationSection() {
    return (
        <section id="education" className="section-hidden px-16 py-10 border-gray-100">
            <div className="space-y-5">
                <div className="flex items-center gap-4">
                    <p className="text-sm font-extrabold uppercase tracking-widest text-navy">Education</p>
                    <div className="flex-1 h-px bg-gray-200" />
                </div>
                <div className="space-y-6">
                    {educations.map((edu) => (
                        <div key={edu.school} className="flex flex-col sm:flex-row gap-4">
                            <div className="sm:w-44 shrink-0 pt-0.5">
                                <span className="text-sm text-gray-400">{edu.period}</span>
                            </div>
                            <div className="flex-1 pl-4 border-l-2 border-gray-200 space-y-1">
                                <p className="text-lg font-bold text-gray-900">{edu.school}</p>
                                {edu.major && <p className="text-base text-gray-500">{edu.major}</p>}
                                {edu.sub   && <p className="text-base text-gray-500">{edu.sub}</p>}
                                {edu.gpa   && (
                                    <span className="inline-block mt-1 px-2.5 py-0.5 text-sm bg-navy-pale text-navy rounded-full font-medium">
                                        GPA {edu.gpa}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}