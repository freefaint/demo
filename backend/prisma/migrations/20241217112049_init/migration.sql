-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('TODO', 'ACTIVE', 'DONE');

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "status" "TaskStatus" NOT NULL DEFAULT 'TODO';
