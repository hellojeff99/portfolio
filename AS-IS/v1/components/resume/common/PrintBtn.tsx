export default function PrintBtn() {
    return (
        <>
            <div className="max-w-3xl mx-auto m-2 flex justify-end print:hidden">
                <button
                    onClick={() => window.print()}
                    className="text-sm text-gray-600 border border-gray-200 px-4 py-1.5 rounded hover:bg-gray-50"
                >
                    Print / Save PDF
                </button>
            </div>
        </>
    );
}