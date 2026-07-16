export default function ProjectSubSection({
                                              label,
                                              labelIcon,
                                              children,
                                              grid = false,
                                              topBorder = false,
                                              first = false,
                                          }: {
    label: string;
    labelIcon?: React.ReactNode;
    children: React.ReactNode;
    grid?: boolean;
    topBorder?: boolean;
    first?: boolean;
}) {
    const wrapperClass = first
        ? ""
        : topBorder
            ? "mt-12 pt-8 border-t border-dashed border-gray-200"
            : "mt-8 pt-8 border-t border-dashed border-gray-200";

    return (
        <div className={wrapperClass}>
            <div className="flex items-center gap-2 mb-6">
                {labelIcon}
                <span className="text-xs font-extrabold uppercase tracking-widest text-navy">
                    {label}
                </span>
            </div>
            <div className={grid ? "grid grid-cols-1 sm:grid-cols-3 gap-4" : "space-y-10"}>
                {children}
            </div>
        </div>
    );
}