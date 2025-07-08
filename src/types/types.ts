export interface Task {
    id: string;
    taskTitle: string;
    clerkUserId?: string;
    status?: "todo" | "doing" | "done";
    isTrash?: boolean;
}
