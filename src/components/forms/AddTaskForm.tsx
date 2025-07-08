import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import axios from "axios"

interface AddFormProps {
    onActionSuccess: () => void
}

const addFromSchema = z.object({
    taskTitle: z.string(),
    status: z.string()
})

const AddTaskForm = ({ onActionSuccess }: AddFormProps) => {

    const { register, handleSubmit } = useForm<z.infer<typeof addFromSchema>>({
        resolver: zodResolver(addFromSchema),
        defaultValues: {
            taskTitle: "",
            status: "todo"
        },
    })

    async function onSubmit(values: z.infer<typeof addFromSchema>) {
        try {
            const response = await axios.post("/api/tasks/add", { ...values });
            onActionSuccess();

        } catch (error: any) {
            console.log(error.response.data.message)
        }
    }

    return (

        <div className="flex-col justify-between items-center">
            {/* my main form */}
            <h1 className="text-xl font-bold">Add Tasks Here</h1>
            <div className="flex-col justify-center items-center" >
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input
                        type="text"
                        placeholder="Task Title"
                        className="input input-primary mb-2"
                        {...register("taskTitle")}
                    />
                    <select defaultValue="Pick a text editor" className="select select-primary mb-2" {...register("status")}>
                        <option disabled={true}>Choose Status</option>
                        <option value="todo">Todo</option>
                        <option value="doing">Doing</option>
                        <option value="done">Done</option>
                    </select>
                    <br />
                    <button className="btn btn-primary" type="submit">Add</button>
                </form>
            </div>

        </div>
    )
}
export default AddTaskForm