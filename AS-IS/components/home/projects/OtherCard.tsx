import { type OtherProjectWithImages} from "./types";
import {Task} from "@/lib/common/project";

export default function OtherCard({ p, onDetail }: { p: OtherProjectWithImages; onDetail: () => void }) {
    const renderTask = (item: string | Task) => {
        if (typeof item === "string") {
            return (
                <div className="text-xs text-gray-600 flex gap-1.5">
                    <span className="text-navy shrink-0">•</span>
                    <span>{item}</span>
                </div>
            );
        }

        // Task 객체인 경우
        return (
            <div>
                <div className="text-xs text-gray-600 flex gap-1.5">
                    <span className="text-navy shrink-0"></span>
                    <span>{item.title}</span>
                </div>
                {item.subtasks && item.subtasks.length > 0 && (
                    <ul className="ml-4 space-y-0.5 mt-0.5">
                        {item.subtasks.map((subtask: string) => (
                            <li key={subtask} className="text-xs text-gray-500 flex gap-1.5">
                                <span className="text-gray-400 shrink-0">•</span>
                                <span>{subtask}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    };

    return (
        <div className="border border-gray-200 rounded-xl p-4">
            <div>
                <span className="text-xs text-gray-400">{p.period}</span>
                <div className="flex items-center gap-2 mt-0.5">
                    <h3 className="text-sm font-bold text-gray-900">{p.title}</h3>
                    {p.detailImages && (
                        <button
                            onClick={onDetail}
                            className="px-2 py-0.5 text-xs font-semibold border border-navy text-navy rounded hover:bg-navy-pale transition-colors"
                        >
                           Photos
                        </button>
                    )}
                </div>
            </div>
            {p.subtitle && <p className="text-xs text-gray-500 mt-1 leading-relaxed">{p.subtitle}</p>}
            {p.tasks.length > 0 && (
                <ul className="space-y-1 mt-2">
                    {p.tasks.map((task, i) => (
                        <li key={typeof task === "string" ? `${i}-${task}` : `${i}-${task.title}`}>
                            {renderTask(task)}
                        </li>
                    ))}
                </ul>
            )}
            {p.stack && p.stack.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                    {p.stack.map((s) => (
                        <span key={s} className="px-2 py-0.5 text-xs rounded-full font-medium bg-navy-pale text-navy border border-blue-100">
                            {s}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}