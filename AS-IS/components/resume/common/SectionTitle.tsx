export default function SectionTitle({ children }: { children: React.ReactNode }) {
    return (
        <h2 className="text-xs font-extrabold uppercase tracking-widest text-gray-900">
            {children}
        </h2>
    );
}