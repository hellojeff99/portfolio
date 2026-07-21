type Props = { items: string[] };

export default function BadgeList({ items }: Props) {
    if (!items.length) return null;
    return (
        <div className="flex flex-wrap gap-1.5 mt-2">
            {items.map((item, i) => (
                <span key={i} className="text-xs font-medium bg-gray-100 text-gray-700 px-2.5 py-0.5 rounded-full">
                    {item}
                </span>
            ))}
        </div>
    );
}