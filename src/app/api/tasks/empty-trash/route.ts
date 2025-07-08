import { db } from "@/db";
import { taskTable } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({
                success: false,
                message: "Unauthorized request"
            }, { status: 401 })
        }

        const [deletedFile] = await db.delete(taskTable).where(
            and(
                eq(taskTable.clerkUserId, userId),
                eq(taskTable.isTrash, true)
            )
        ).returning();

        return NextResponse.json({
            success: true,
            deletedFile,
            message: "Trash Cleared"
        }, { status: 200 })

    } catch (error) {
        console.error("Error getting tasks:", error);
        return NextResponse.json(
            { error: "Failed to get tasks" },
            { status: 500 }

        );
    }
}