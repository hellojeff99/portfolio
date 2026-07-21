import { type WorkProject, type PinnedProject, type OtherProject } from "@/lib/common/project";

export type WorkProjectWithImages   = WorkProject   & { images: string[]; detailImages?: string[] };
export type PinnedProjectWithImages = PinnedProject & { images: string[]; detailImages?: string[] };
export type OtherProjectWithImages  = OtherProject  & { images: string[]; detailImages?: string[] };

export type ProjectWithImages = PinnedProjectWithImages | OtherProjectWithImages;

export type ModalItem = (ProjectWithImages | WorkProjectWithImages) & { detailImages?: string[] };

export type ResolvedItem =
    | { kind: "work";   data: WorkProjectWithImages }
    | { kind: "pinned"; data: PinnedProjectWithImages }
    | { kind: "other";  data: OtherProjectWithImages };