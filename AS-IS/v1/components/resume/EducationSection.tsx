import { educations } from "@/lib/common/education";
import SectionTitle from "@/components/resume/common/SectionTitle";

export default function EducationSection() {
    return (
        <section className="py-5 border-t border-gray-200">
            <SectionTitle>Education</SectionTitle>
            <div className="mt-3 space-y-3">
                {educations.map((edu, i) => (
                    <div key={i} className="flex justify-between items-start">
                        <div>
                            <h3 className="font-bold text-gray-900">{edu.school}</h3>
                            {edu.major && <p className="text-sm text-gray-500 mt-0.5">{edu.major}</p>}
                            {edu.sub   && <p className="text-sm text-gray-500 mt-0.5">{edu.sub}</p>}
                            {edu.gpa   && <p className="text-sm text-gray-400 mt-0.5">GPA {edu.gpa}</p>}
                        </div>
                        <span className="text-xs text-gray-400 shrink-0 ml-4">{edu.period}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}