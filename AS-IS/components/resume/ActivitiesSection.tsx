import { otherProjects } from "@/lib/common/project";
import SectionTitle from "@/components/resume/common/SectionTitle";
import TaskList from "@/components/resume/common/TaskList";
import BadgeList from "@/components/resume/common/BadgeList";

const activityProjects = otherProjects.filter(p => p.kind === "activity");

export default function ActivitiesSection() {
    return (
        <section className="py-5 border-t border-gray-200">
            <SectionTitle>Activities</SectionTitle>
            <div className="mt-3 space-y-4">
                {activityProjects.map((proj, i) => (
                    <div key={i}>
                        <div className="flex justify-between items-baseline">
                            <h3 className="font-bold text-gray-900">{proj.title}</h3>
                            <span className="text-xs text-gray-400">{proj.period}</span>
                        </div>
                        {proj.subtitle && <p className="text-xs text-gray-400 mt-0.5">{proj.subtitle}</p>}
                        {/*{proj.stack    && <BadgeList items={proj.stack} />}*/}
                        <TaskList tasks={proj.tasks} />
                    </div>
                ))}
            </div>
        </section>
    );
}