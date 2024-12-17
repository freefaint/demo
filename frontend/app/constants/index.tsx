import { ReactNode } from "react";
import { TaskStatus } from "../types";
import { Archive, CheckBoxRounded, CheckCircle, Description, Inventory } from "@mui/icons-material";
import { ButtonProps } from "@mui/material";

export const TASK_STATUS_NAMES: Record<TaskStatus, string> = {
  [TaskStatus.TODO]: 'К выполнению',
  [TaskStatus.ACTIVE]: 'В работе',
  [TaskStatus.DONE]: 'Выполнено',
}

export const TASK_STATUS_ICON_COLORS: Record<TaskStatus, string> = {
  [TaskStatus.TODO]: '#9FA0A8',
  [TaskStatus.ACTIVE]: '#F9C03E',
  [TaskStatus.DONE]: '#24C016',
}

export const TASK_STATUS_BG_COLORS: Record<TaskStatus, string> = {
  [TaskStatus.TODO]: '#9FA0A833',
  [TaskStatus.ACTIVE]: '#F9C03E26',
  [TaskStatus.DONE]: '#24C01626',
}

export const TASK_STATUS_FONT_COLORS: Record<TaskStatus, string> = {
  [TaskStatus.TODO]: '#000',
  [TaskStatus.ACTIVE]: '#F9C03E',
  [TaskStatus.DONE]: '#24C016',
}

export const TASK_STATUS_BUTTON_COLORS: Record<TaskStatus, ButtonProps['color']> = {
  [TaskStatus.TODO]: "secondary",
  [TaskStatus.ACTIVE]: "warning",
  [TaskStatus.DONE]: "success",
}

export const TASK_STATUS_ICONS: Record<TaskStatus, ReactNode> = {
  [TaskStatus.TODO]: <Inventory htmlColor={TASK_STATUS_ICON_COLORS[TaskStatus.TODO]} />,
  [TaskStatus.ACTIVE]: <Description htmlColor={TASK_STATUS_ICON_COLORS[TaskStatus.ACTIVE]} />,
  [TaskStatus.DONE]: <CheckCircle htmlColor={TASK_STATUS_ICON_COLORS[TaskStatus.DONE]} />,
}