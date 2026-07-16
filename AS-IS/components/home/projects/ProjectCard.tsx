import CardHeader from "@/components/home/projects/CardHeader";
import CardBody from "@/components/home/projects/CardBody";
import ImageSlider from "@/components/home/projects/ImageSlider";
import {PinnedProjectWithImages, WorkProjectWithImages} from "@/components/home/projects/types";

export default function ProjectCard({
                                       p,
                                       index,
                                       onDetail,
                                   }: {
    p: PinnedProjectWithImages | WorkProjectWithImages;
    index?: number;
    onDetail: () => void;
}) {
    const isEven = index !== undefined ? index % 2 === 0 : true;
    const hasImages = "images" in p && p.images && p.images.length > 0;

    return (
        <div className={`flex flex-col lg:flex-row gap-10 items-start ${
            hasImages && !isEven ? "lg:flex-row-reverse" : ""
        }`}>
            <div className="flex-1">
                <CardHeader
                    period={p.period}
                    title={p.title}
                    onDetail={p.detailImages ? onDetail : undefined}
                />
                <CardBody subtitle={p.subtitle} tasks={p.tasks} stack={p.stack} />
            </div>
            {hasImages && (
                <div className="w-full flex justify-center lg:w-1/2 shrink-0">
                    <div className="w-2/3">
                        <ImageSlider images={p.images} title={p.title} />
                    </div>
                </div>
            )}
        </div>
    );
}