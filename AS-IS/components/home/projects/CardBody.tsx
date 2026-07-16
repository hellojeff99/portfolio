import {Task} from "@/lib/common/project";

export default function CardBody({
                                     subtitle,
                                     tasks,
                                     stack,
                                 }: {
    subtitle?: string;
    tasks: (string | Task)[];
    stack?: string[];
}) {
    const renderTask = (item: string | Task) => {
        if (typeof item === "string") {
            return (
                <div className="text-sm text-gray-600 flex gap-2">
                    <span className="text-navy shrink-0">•</span>
                    <span>{item}</span>
                </div>
            );
        }

        // Task 객체인 경우
        return (
            <div>
                <div className="text-sm text-gray-600 flex gap-2">
                    <span className="text-navy shrink-0">•</span>
                    <span>{item.title}</span>
                </div>
                {item.subtasks && item.subtasks.length > 0 && (
                    <ul className="ml-6 space-y-1 mt-1">
                        {item.subtasks.map((subtask) => (
                            <li key={subtask} className="text-xs text-gray-500 flex gap-2">
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
        <>
            {subtitle && <p className="text-sm text-gray-500 mt-1 leading-relaxed">{subtitle}</p>}
            <ul className="space-y-2 mt-3">
                {tasks.map((task, idx) => (
                    <li key={typeof task === "string" ? task : `${task.title}-${idx}`}>
                        {renderTask(task)}
                    </li>
                ))}
            </ul>
            {stack && stack.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                    {stack.map((s) => (
                        <span key={s} className="px-2.5 py-0.5 text-xs rounded-full font-medium bg-navy-pale text-navy border border-blue-100">
              {s}
            </span>
                    ))}
                </div>
            )}
        </>
    );
}