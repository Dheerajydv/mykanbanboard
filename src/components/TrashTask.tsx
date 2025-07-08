import { Task } from "@/types/types"
import axios from "axios"
import { Circle } from "lucide-react"

interface TrashTaskProps {
    trashTask: Task
    onActionSuccess: () => void
}

const TrashTask = ({ trashTask, onActionSuccess }: TrashTaskProps) => {

    const handleRestore = async () => {
        try {
            const response = await axios.post(`/api/tasks/${trashTask.id}/toTrash`);

            onActionSuccess();

        } catch (error: any) {
            console.log(error.response.data.message)
        }
    }

    return (
        <div className="flex justify-between items-center w-full mt-2">
            <p>{trashTask.taskTitle}</p>
            <button
                className="btn btn-secondary"
                onClick={handleRestore}
            >
                <Circle />
            </button>
        </div>
    )
}
export default TrashTask