import fs from "fs";
import path from "path";
import SideNav from "@/components/home/SideNav";
import HeroSection from "@/components/home/HeroSection";
import SkillsSection from "@/components/home/SkillsSection";
import EducationSection from "@/components/home/EducationSection";
import CertificationsSection from "@/components/home/CertificationsSection";
import ProjectsSection, { type ResolvedItem, type WorkProjectWithImages, type PinnedProjectWithImages, type OtherProjectWithImages } from "@/components/home/ProjectsSection";
import { feed } from "@/lib/home";
import { type Project } from "@/lib/common/project";

const IMG_BASE = path.join(process.cwd(), "public", "images", "projects");
const URL_BASE = "/images/projects";
const EXTS = new Set([".jpg", ".jpeg", ".png", ".webp"]);

function readImages(folder: string): string[] {
    const dir = path.join(IMG_BASE, folder);
    if (!fs.existsSync(dir)) return [];
    return fs
        .readdirSync(dir)
        .filter((f) => EXTS.has(path.extname(f).toLowerCase()))
        .sort()
        .map((f) => `${URL_BASE}/${folder}/${f}`);
}

function resolveImages(entry: Project) {
    return {
        images:       entry.imageFolder ? readImages(entry.imageFolder) : [],
        detailImages: entry.detailFolder ? readImages(entry.detailFolder) : undefined,
    };
}

function resolveItems(): ResolvedItem[] {
    return feed.map((entry): ResolvedItem => {
        const resolved = resolveImages(entry);
        if (entry.kind === "work")
            return { kind: "work",   data: { ...entry, ...resolved } as WorkProjectWithImages };
        if (entry.kind === "pinned")
            return { kind: "pinned", data: { ...entry, ...resolved } as PinnedProjectWithImages };
        return   { kind: "other",   data: { ...entry, ...resolved } as OtherProjectWithImages };
    });
}

export default function Home() {
    const items = resolveItems();

    return (
        <div className="flex min-h-screen">
            <SideNav/>
            <div className="flex-1">
                <HeroSection/>
                <SkillsSection/>
                <EducationSection/>
                <CertificationsSection/>
                <ProjectsSection items={items}/>
            </div>
        </div>
    );
}