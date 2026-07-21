import { workProjects } from "@/lib/common/project";
import SectionTitle from "@/components/resume/common/SectionTitle";
import TaskList from "@/components/resume/common/TaskList";

export default function WorkSection() {
    return (
        <section className="py-5 border-t border-gray-200">
            <SectionTitle>Work Experience</SectionTitle>
            {workProjects.map((exp, i) => (
                <div key={i} className="mt-3">
                    {exp.subtitle && <p className="text-sm font-semibold text-gray-700 mt-2">{exp.subtitle}</p>}
                    <div className="flex justify-between items-baseline">
                        <h3 className="font-bold text-gray-900">{exp.title}</h3>
                        <span className="text-xs text-gray-400">{exp.period}</span>
                    </div>
                    {exp.meta     && <p className="text-xs text-gray-400 mt-0.5 tracking-wide">{exp.meta}</p>}
                    <TaskList tasks={exp.tasks} />
                </div>
            ))}
        </section>
    );
}