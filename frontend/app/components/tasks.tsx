'use client';

import { Add, SmsOutlined } from "@mui/icons-material";
import { Button, CardActionArea, Divider, Paper, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { Task, TaskStatus } from "../types";
import { memo, useContext, useMemo } from "react";
import { TasksContext } from "../context/tasks.provider";
import { useRouter } from "next/navigation";
import { TASK_STATUS_ICONS, TASK_STATUS_NAMES } from "../constants";

export const Tasks = () => {
  const tasksContext = useContext(TasksContext);

  return (
    <Stack my={3} mx={4} width="757px">
      <Stack spacing={1.5} mt={4}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="h5">Задачи</Typography>

          <Link passHref href={`/create`}>
            <Button variant="contained" color="info" size="small" endIcon={<Add />}>Создать</Button>
          </Link>
        </Stack>

        <Divider />

        <Stack direction="row" spacing={2}>
          {Object.values(TaskStatus).map((status: TaskStatus) => (
            <Stack key={status} flexBasis={0} flexGrow={1} spacing={2}>
              <Stack direction="row" alignItems="center" spacing={1}>
                {TASK_STATUS_ICONS[status]}
                <Typography variant="h6">{TASK_STATUS_NAMES[status]}</Typography>
                <Typography variant="h6" color="textDisabled">{tasksContext?.tasks?.filter(i => i.status === status).length || ""}</Typography>
              </Stack>

              <TasksByStatus status={status} tasks={tasksContext?.tasks} />
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Stack>
  )
}

export const TasksByStatus = memo(({ status, tasks }: { tasks?: Task[], status: TaskStatus }) => {
  const items = useMemo(() => tasks?.filter(i => i.status === status), [tasks, status]);

  if (!items || !items.length) {
    return (
      <Paper variant="elevation">
        <Typography color="textDisabled">Задачи отсутствуют</Typography>
      </Paper>
    )
  }
  
  return (
    <>
      {items.map(i => (
        <TaskItem key={i.id} task={i} />
      ))}
    </>
  )
})

export const TaskItem = memo(({ task }: { task: Task }) => (
  <Paper variant="outlined">
    <Link href={`/${task.id}`} passHref>
      <CardActionArea>
        <Stack spacing={1}>
          <Typography>{task.title}</Typography>

          {(!!task.comments?.length || !!task.commentsCount) && (
            <>
              <Divider />

              <Stack direction="row" spacing={0.5} alignItems="center">
                <SmsOutlined htmlColor="#85868FCC" />

                <Typography variant="body2" color="textDisabled">{(task.comments?.length || task.commentsCount)}</Typography>
              </Stack>
            </>
          )}
        </Stack>
      </CardActionArea>
    </Link>
  </Paper>
));
