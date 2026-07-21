type Props = {
    title: string;
    description?: string;
};

export default function UnderConstruction({ title, description }: Props) {
    return (
        <div className="flex flex-col items-center text-center pt-20">
            <p className="text-xs font-extrabold uppercase tracking-widest text-gray-400 mb-3">
                {title}
            </p>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Coming soon.
            </h1>
            <p className="text-sm text-gray-400">
                {description ?? "현재 준비 중인 페이지입니다."}
            </p>
        </div>
    );
}