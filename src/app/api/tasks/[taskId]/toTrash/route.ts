import { db } from "@/db";
import { taskTable } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, props: { params: Promise<{ taskId: string }> }) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized request"
            }, { status: 401 })
        }

        const { taskId } = await props.params;
        if (!taskId) {
            return NextResponse.json({
                success: false,
                message: "Provide a task Id"
            }, { status: 400 })
        }

        const task = await db.select().from(taskTable).where(
            and(
                eq(taskTable.clerkUserId, userId),
                eq(taskTable.id, taskId)
            )
        );

        if (!task) {
            return NextResponse.json({
                success: false,
                message: "Task not found"
            }, { status: 404 })
        }

        const isCurrentlyTrash = task[0].isTrash;
        const [toggledTrashedTask] = await db.update(taskTable).set({ isTrash: !isCurrentlyTrash }).where(
            and(
                eq(taskTable.clerkUserId, userId),
                eq(taskTable.id, taskId),
            )
        ).returning();

        const action = toggledTrashedTask.isTrash ? "moved to trash" : "restored";

        return NextResponse.json({
            success: true,
            toggledTrashedTask,
            message: `Task ${action} sucessfully`
        }, { status: 200 })

    } catch (error) {
        console.error("Failed to edit task status:", error);
        return NextResponse.json(
            { error: "Failed to edit task status" },
            { status: 500 }
        );
    }
}
