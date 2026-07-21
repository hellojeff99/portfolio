import {Task} from "@/lib/common/project";

type Props = { tasks: (string | Task)[] };

export default function TaskList({ tasks }: Props) {
    const renderTask = (item: string | Task) => {
        if (typeof item === "string") {
            return (
                <div className="text-sm text-gray-500 flex gap-2">
                    <span className="text-gray-300 mt-0.5">•</span>
                    <span>{item}</span>
                </div>
            );
        }

        // Task 객체인 경우
        return (
            <div>
                <div className="text-sm text-gray-500 flex gap-2">
                    <span className="text-gray-300 mt-0.5">•</span>
                    <span>{item.title}</span>
                </div>
                {item.subtasks && item.subtasks.length > 0 && (
                    <ul className="ml-6 space-y-1 mt-1">
                        {item.subtasks.map((subtask: string) => (
                            <li key={subtask} className="text-xs text-gray-400 flex gap-2">
                                <span className="text-gray-300 shrink-0">•</span>
                                <span>{subtask}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        );
    };

    return (
        <ul className="mt-1 space-y-1">
            {tasks.map((task, i) => (
                <li key={typeof task === "string" ? i : `${i}-${task.title}`}>
                    {renderTask(task)}
                </li>
            ))}
        </ul>
    );
}