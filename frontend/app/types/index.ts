export type Task = {
  id: string;
  status: TaskStatus;
  title: string;
  details: string;
  createdAt: string;
  comments?: Comment[];
  commentsCount?: number;
}

export enum TaskStatus {
  TODO = "TODO",
  ACTIVE = "ACTIVE",
  DONE = "DONE"
}

export type Comment = {
  id: string;
  taskId: string;
  text: string;
  createdAt: string;
}