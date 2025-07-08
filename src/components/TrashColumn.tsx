import { Task } from "@/types/types"
import { useCallback, useEffect, useState } from "react"
import TrashTask from "./TrashTask";
import axios from "axios";
import { Loader2 } from "lucide-react";

interface TrashColumnProps {
    onActionSuccess?: () => void
}

const TrashColumn = ({ }: TrashColumnProps) => {
    const [refreshToken, setRefreshToken] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [trashTasks, setTrashTasks] = useState<Task[]>([{
        id: "1",
        taskTitle: "",
        clerkUserId: "",
        status: "todo",
        isTrash: false
    }]);

    const onActionSuccess = useCallback(() => {
        setRefreshToken(prev => prev + 1);
    }, [])

    const fetchTrashTasks = async () => {
        setIsLoading(true);
        try {
            const response = await axios.get("/api/tasks/trash");
            setTrashTasks(response.data.trashTasks);
        } catch (error: any) {
            console.log(error.response.data.message);

        } finally {
            setIsLoading(false)
        }
    }

    const handleEmptyTrash = async () => {
        try {
            const response = await axios.delete("/api/tasks/empty-trash");
            console.log(response)

            onActionSuccess();

        } catch (error: any) {
            console.log(error.response.data.message)
        }
    }

    useEffect(() => {
        fetchTrashTasks()
    }, [refreshToken])


    return (
        <div className="card bg-base-100 w-96 shadow-sm p-4">
            <div className="flex justify-between items-center">
                <h1 className="text-xl font-bold">Trash</h1>
                <button className="btn btn-error" onClick={handleEmptyTrash}>Empy Trash</button>
            </div>
            <div>
                {isLoading ? <span className="loading loading-spinner text-primary"></span> :
                    <>
                        {trashTasks.length === 0 ?
                            <>
                                Trash is empty
                            </>
                            :
                            <div>
                                {trashTasks.map((trashTask) => (
                                    <TrashTask key={trashTask.id} trashTask={trashTask} onActionSuccess={onActionSuccess} />
                                ))}
                            </div>
                        }
                    </>
                }
            </div>
        </div>
    )
}
export default TrashColumn