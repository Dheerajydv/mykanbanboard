import { db } from "@/db";
import { taskTable } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {

  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({
        success: false,
        message: "Unauthorized request"
      }, { status: 401 })
    }

    const { taskTitle, status } = await request.json();

    if (!taskTitle || !status) {
      return NextResponse.json({
        success: false,
        message: "Please fill the form properly"
      }, { status: 400 })
    }

    const taskData = {
      taskTitle,
      clerkUserId: userId,
      status,
      isTrash: false,
    }

    const [newTask] = await db.insert(taskTable).values(taskData).returning();

    return NextResponse.json({
      success: true,
      task: newTask,
      message: "Task Added"
    }, { status: 201 })

  } catch (error) {
    console.error("Error getting tasks:", error);
    return NextResponse.json(
      { error: "Failed to get tasks" },
      { status: 500 }
    );
  }

}