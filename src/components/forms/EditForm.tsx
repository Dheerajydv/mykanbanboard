import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"
import { Task } from "@/types/types";

interface EditFormProps {
    onActionSuccess: () => void;
    task: Task
}

const editFromSchema = z.object({
    newTaskTitle: z.string(),
    newTaskStatus: z.string()
})

const EditForm = ({ task, onActionSuccess }: EditFormProps) => {

    const { register, handleSubmit } = useForm<z.infer<typeof editFromSchema>>({
        resolver: zodResolver(editFromSchema),
        defaultValues: {
            newTaskTitle: task.taskTitle,
            newTaskStatus: task.status
        }
    })

    async function onSubmit(values: z.infer<typeof editFromSchema>) {
        try {
            const response = await axios.post(`/api/tasks/${task.id}/edit-task`, { ...values });
            onActionSuccess();

        } catch (error: any) {
            console.log(error.response.data.message)
        }
    }

    return (
        <div className="flex-col justify-between items-center">
            {/* my main form */}
            <h1 className="text-xl font-bold">Edit Your Task</h1>
            <div className="flex-col justify-center items-center" >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="text"
                        placeholder="Task Title"
                        className="input input-primary mb-2"
                        {...register("newTaskTitle")}
                    />
                    <select
                        defaultValue="Pick a text editor"
                        className="select select-primary mb-2"
                        {...register("newTaskStatus")}
                    >
                        <option disabled={true}>Choose Status</option>
                        <option value="todo">Todo</option>
                        <option value="doing">Doing</option>
                        <option value="done">Done</option>
                    </select>
                    <br />
                    <button className="btn btn-primary" type="submit">Save</button>
                </form>
            </div>

        </div>
    )
}
export default EditForm