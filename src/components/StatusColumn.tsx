import { Task } from "@/types/types";
import TaskComponent from "./TaskComponent";


interface StatusColumnProps {
    column: {
        id: "todo" | "doing" | "done";
        title: string;
    },
    tasks: Task[],
    onActionSuccess: () => void
}

const StatusColumn = ({ column, tasks, onActionSuccess }: StatusColumnProps) => {
    return (
        <div className="card bg-base-100 w-96 shadow-sm p-4">
            <h1 className="text-xl text-center font-bold">{column.title}</h1>
            <hr />
            <div>
                {tasks.length === 0 ?
                    <>
                        <div>{`No Tasks ${column.title}`}</div>
                    </> :
                    <>
                        {tasks.map((task) => (
                            <TaskComponent onActionSuccess={onActionSuccess} task={task} key={task.id} />
                        ))}
                    </>
                }
            </div>
        </div>
    )
}
export default StatusColumn