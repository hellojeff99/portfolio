import BadgeList from "@/components/resume/common/BadgeList";
import SectionTitle from "@/components/resume/common/SectionTitle";
import { skills } from "@/lib/common/skills";

export default function SkillsSection() {
  return (
    <section className="py-3 border-t border-gray-200">
      <SectionTitle>Technical Skills</SectionTitle>
      <div className="mt-1 space-y-1">
        {skills.map((group, i) => (
          <div key={i} className="flex items-center gap-4">
            <span className="w-28 shrink-0 text-xs font-semibold text-gray-800 uppercase tracking-wider text-right">
              {group.category}
            </span>
            <BadgeList items={group.items} />
          </div>
        ))}
      </div>
    </section>
  );
}
