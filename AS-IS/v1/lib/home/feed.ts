import { workProjects, pinnedProjects, otherProjects, type Project } from "@/lib/common/project";

function startYear(period: string): number {
    return parseInt(period.replace(/\s/g, "").slice(0, 4));
}

export const feed: Project[] = [
    ...workProjects,
    ...pinnedProjects,
    ...otherProjects,
].sort((a, b) => startYear(b.period) - startYear(a.period));