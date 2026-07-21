export default function CardHeader({
                                       period,
                                       title,
                                       label,
                                       labelIcon,
                                       onDetail,
                                   }: {
    period: string;
    title: string;
    label?: string;
    labelIcon?: React.ReactNode;
    onDetail?: () => void;
}) {
    return (
        <div>
            {label && (
                <div className="flex items-center gap-1.5 mb-1">
                    {labelIcon}
                    <span className="text-xs font-extrabold uppercase tracking-widest text-navy">{label}</span>
                </div>
            )}
            <span className="text-xs text-gray-400">{period}</span>
            <div className="flex items-center gap-3 mt-0.5">
                <h3 className="text-xl font-bold text-gray-900">{title}</h3>
                {onDetail && (
                    <button
                        onClick={onDetail}
                        className="px-3 py-0.5 text-xs font-semibold border border-navy text-navy rounded hover:bg-navy-pale transition-colors"
                    >
                        Detail
                    </button>
                )}
            </div>
        </div>
    );
}