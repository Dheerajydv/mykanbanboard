"use client"

import { Task } from "@/types/types";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { COLUMNS } from "@/constants/index"
import StatusColumn from "./StatusColumn";
import { Loader2 } from "lucide-react";
import AddTaskForm from "./forms/AddTaskForm";
import TrashColumn from "./TrashColumn";

const KanbanBoard = () => {
    const [tasks, setTasks] = useState<Task[]>([{
        id: "1",
        taskTitle: "",
        clerkUserId: "",
        status: "todo",
        isTrash: false
    }]);
    const [refreshToken, setRefreshToken] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [showTrash, setShowTrash] = useState(false);

    const onActionSuccess = useCallback(() => {
        setRefreshToken(prev => prev + 1)
    }, [])

    const fetchTasks = async () => {
        setIsLoading(true)
        try {
            const response = await axios.get("/api/tasks");
            // console.log(response.data.tasks)
            setTasks(response.data.tasks);

        } catch (error: any) {
            console.log(error.response.data.message)

        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchTasks()
    }, [refreshToken])

    return (
        <div className="p-4">
            <div className="flex justify-between items-center">
                <div className="flex">
                    <AddTaskForm onActionSuccess={onActionSuccess} />
                </div>
                <div>
                    <button
                        className="btn btn-secondary ml-1"
                        onClick={() => setShowTrash(prev => !prev)}
                    >
                        {showTrash ? "Hide Trash" : "Show Trash"}
                    </button>
                </div>
            </div>
            <div className="flex flex-col md:flex-row lg:flex-row lg:justify-center mt-4">
                {isLoading ? <span className="loading loading-spinner text-primary"></span> :
                    showTrash ? <>
                        <TrashColumn />
                    </> :
                        <>
                            {COLUMNS.map((column) => (
                                <StatusColumn onActionSuccess={onActionSuccess} tasks={tasks.filter(task => task.status === column.id)} key={column.id} column={column} />
                            ))}
                        </>
                }
            </div>
        </div>
    )
}
export default KanbanBoard