CREATE TYPE "public"."status" AS ENUM('todo', 'doing', 'done');--> statement-breakpoint
CREATE TABLE "task_table" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"task_title" text NOT NULL,
	"clerk_user_id" text NOT NULL,
	"status" "status" NOT NULL,
	"is_trash" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
