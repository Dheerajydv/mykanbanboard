import { Task } from "@/types/types"
import axios from "axios"
import { CircleCheckBig, LayoutList, LoaderCircle, Trash2 } from "lucide-react"
import React from "react"
import EditForm from "./forms/EditForm"

interface TaskComponentProps {
    task: Task,
    onActionSuccess: () => void
}

const TaskComponent = ({ task, onActionSuccess }: TaskComponentProps) => {

    const handleDelete = async () => {
        try {
            const response = await axios.post(`/api/tasks/${task.id}/toTrash`);
            // console.log(response);
            onActionSuccess();

        } catch (error: any) {
            console.log(error.response.message)
        }
    }

    const handleStatusChange = async (e: any) => {
        try {
            if (e.target.id === "mark-todo") {
                console.log(e.target.id)
                const response = await axios.post(`/api/tasks/${task.id}/change-status`, { newStatus: "todo" });

                if (response.data.success === true) {
                    onActionSuccess();
                }

            } else if (e.target.id === "mark-doing") {
                console.log(e.target.id)
                const response = await axios.post(`/api/tasks/${task.id}/change-status`, { newStatus: "doing" });

                if (response.data.success === true) {
                    onActionSuccess();
                }

            } else if (e.target.id === "mark-done") {
                console.log(e.target.id)
                const response = await axios.post(`/api/tasks/${task.id}/change-status`, { newStatus: "done" });

                if (response.data.success === true) {
                    onActionSuccess();
                }

            }


        } catch (error: any) {
            console.log(error.response.data.message)
        }
    }

    const onEditBtnClick = () => {
        const modal = document.getElementById('my_modal_4') as HTMLDialogElement | null;
        modal?.showModal();
    }

    return (
        <>

            <div className="card border-1 rounded-2xl border-primary bg-base-100 mt-2">
                <div className="card-body justify-around">
                    <h2 className="card-title">{task.taskTitle}</h2>
                    <div className="card-actions">
                        <button
                            id="mark-todo"
                            className="btn btn-primary"
                            onClick={handleStatusChange}
                            hidden={task.status === "todo"}
                        >
                            📋
                        </button>

                        <button
                            id="mark-doing"
                            className="btn btn-primary"
                            onClick={handleStatusChange}
                            hidden={task.status === "doing"}
                        >
                            📊
                        </button>
                        <button
                            id="mark-done"
                            className="btn btn-primary"
                            onClick={handleStatusChange}
                            hidden={task.status === "done"}
                        >
                            👍
                        </button>
                        {/* You can open the modal using document.getElementById('ID').showModal() method */}
                        <button className="btn btn-secondary" onClick={onEditBtnClick}>✏️</button>
                        <dialog id="my_modal_4" className="modal">
                            <div className="modal-box w-11/12 max-w-5xl">
                                <EditForm task={task} onActionSuccess={onActionSuccess} />
                                <div className="modal-action">
                                    <form method="dialog">
                                        <button className="btn">Cancel</button>
                                    </form>
                                </div>
                            </div>
                        </dialog>
                        <button
                            className="btn btn-error"
                            onClick={handleDelete}
                        >
                            🗑️
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}
export default TaskComponent