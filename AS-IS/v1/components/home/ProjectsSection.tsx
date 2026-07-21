"use client";

import { useState } from "react";
import { Pin, Briefcase } from "lucide-react";
import ProjectCard from "@/components/home/projects/ProjectCard";
import OtherCard from "@/components/home/projects/OtherCard";
import ProjectSubSection from "@/components/home/projects/ProjectSubSection";
import DetailModal from "@/components/home/projects/DetailModal";
import {
    type ResolvedItem,
    type ModalItem,
    type WorkProjectWithImages,
    type PinnedProjectWithImages,
    type OtherProjectWithImages,
} from "@/components/home/projects/types";

export type { ResolvedItem, WorkProjectWithImages, PinnedProjectWithImages, OtherProjectWithImages };

export default function ProjectsSection({ items }: { items: ResolvedItem[] }) {
    const [selected, setSelected] = useState<ModalItem | null>(null);

    const workItems = items.filter((i) => i.kind === "work");
    const pinned    = items.filter((i) => i.kind === "pinned");
    const others    = items.filter((i) => i.kind === "other");

    return (
        <>
            <section id="projects" className="section-hidden px-16 py-10 border-gray-100 pb-20">
                <div className="space-y-5">
                    <div className="flex items-center gap-4">
                        <p className="text-sm font-extrabold uppercase tracking-widest text-navy">Projects</p>
                        <div className="flex-1 h-px bg-gray-200"/>
                    </div>
                    <ProjectSubSection label="Work Experience" labelIcon={<Briefcase size={13} className="text-navy"/>}
                                       first>
                        {workItems.map((item, i) => {
                            const workData = item.data as WorkProjectWithImages;
                            return (
                                <ProjectCard
                                    key={`work-${i}`}
                                    p={workData}
                                    index={i}
                                    onDetail={() => setSelected(workData)}
                                />
                            );
                        })}
                    </ProjectSubSection>

                    <ProjectSubSection label="Pinned" labelIcon={<Pin size={13} className="text-navy"/>}>
                        {pinned.map((item, idx) => {
                            const p = item.data as PinnedProjectWithImages;
                            return (
                                <ProjectCard key={p.title} p={p} index={idx} onDetail={() => setSelected(p)}/>
                            );
                        })}
                    </ProjectSubSection>

                    <ProjectSubSection label="Other" topBorder grid>
                        {others.map((item) => {
                            const p = item.data as OtherProjectWithImages;
                            return <OtherCard key={p.title} p={p} onDetail={() => setSelected(p)}/>;
                        })}
                    </ProjectSubSection>

                    {selected && <DetailModal item={selected} onClose={() => setSelected(null)}/>}
                </div>
            </section>
        </>
    );
}