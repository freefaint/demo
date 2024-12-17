'use client';

import { Add, ArrowForwardIos, KeyboardDoubleArrowLeft, Sms } from "@mui/icons-material";
import { Button, ButtonBase, Collapse, DialogActions, Divider, Drawer, IconButton, InputBase, Paper, Stack, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { Task, TaskStatus } from "../types";
import { FormEvent, memo, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { TasksContext } from "../context/tasks.provider";
import { useParams, useRouter } from "next/navigation";
import { Breadcrumbs } from "./breadcrumbs";
import { CheckIcon, InputIcon } from "./icons";
import { TASK_STATUS_BUTTON_COLORS, TASK_STATUS_ICON_COLORS, TASK_STATUS_ICONS, TASK_STATUS_NAMES } from "../constants";

export const TaskDrawer = () => {
  const tasksContext = useContext(TasksContext);
  const { page } = useParams();

  const router = useRouter();

  const [openedTask, setOpenedTask] = useState<Pick<Task, 'title' | 'details'> & Partial<Task>>({ title: '', details: '' });

  const existingTask = useMemo(() => tasksContext?.tasks?.find(i => i.id === page), [tasksContext, page]);

  useEffect(() => {
    if (!!existingTask) {
      setOpenedTask(existingTask)
    }
  }, [existingTask]);

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();

    tasksContext?.createTask(openedTask).then(resp => router.push(`/${resp.id}`));
  }, [openedTask]);

  const handleClose = useCallback(() => {
    router.push('/')
  }, []);

  const breadcrumbs = useMemo(() => {
    let items = [
      {
        node: <IconButton sx={{ margin: "-.5rem 0" }} size="small" onClick={handleClose}><KeyboardDoubleArrowLeft /></IconButton>
      },
      {
        node: <Stack direction="row" spacing={1} alignItems="center"><CheckIcon sx={{ w: "1.25rem", h: "1.25rem" }} /><Typography>Задачи</Typography></Stack>
      }
    ];

    if (openedTask.status) {
      items = [
        ...items,

        {
          node: <Typography>{TASK_STATUS_NAMES[openedTask.status]}</Typography>
        },

        {
          node: <Typography color="textDisabled">{openedTask.title}</Typography>
        }
      ]
    } else {
      items = [
        ...items,

        {
          node: <Typography color="textDisabled">Создание задачи</Typography>
        }
      ]
    }

    return items; 
  }, [openedTask]);

  const nextStatus = useMemo(() => {
    const index = existingTask?.status && Object.values(TaskStatus).indexOf(existingTask?.status);

    return Object.values(TaskStatus)[(index ?? -1) + 1];
  }, [existingTask]);

  return (
    <Drawer onClose={handleClose} anchor="right" open={!!page}>
      <Stack flexGrow={1}>
        <Stack p={1}>
          <Breadcrumbs items={breadcrumbs} />
        </Stack>

        <Divider />
        
        {!existingTask?.id && (
          <Stack component="form" onSubmit={handleSubmit} flexGrow={1} width="581px">
            <Stack p={2} spacing={1} flexGrow={1}>
              <InputBase
                placeholder="Название задачи"
                sx={{ fontSize: "24px", fontWeight: "600 "}}
                autoFocus value={existingTask?.title}
                onChange={e => setOpenedTask(old => ({ ...old, title: e.target.value }))}
              />

              <Stack spacing={1}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <InputIcon />

                  <Typography>Описание</Typography>
                </Stack>

                <TextField multiline variant="outlined" value={existingTask?.details} onChange={e => setOpenedTask(old => ({ ...old, details: e.target.value }))} />
              </Stack>
            </Stack>

            <Stack direction="row" justifyContent="space-between" p={2} sx={{ boxShadow: "0px -2px 16px 0px #61616114" }}>
              <Button variant="outlined" color="primary" type="button" onClick={handleClose}>Отменить</Button>
              <Button variant="contained" type="submit" disabled={!openedTask.title}>Создать задачу</Button>
            </Stack>
          </Stack>
        )}
        
        {existingTask?.id && (
          <Stack direction="row" flexGrow={1}>
            <Stack flexGrow={1} p={2} spacing={1}>
              <Stack direction="row" spacing={1}>
                <TaskStatusButton status={existingTask.status} />

                {nextStatus && (
                  <TaskStatusButton status={nextStatus} onClick={() => tasksContext?.updateTask(existingTask.id, { status: nextStatus })} />
                )}
              </Stack>
              
              <Stack spacing={1}>
                <InputBase
                  placeholder="Название задачи"
                  readOnly
                  sx={{ fontSize: "24px", fontWeight: "600 "}}
                  autoFocus value={existingTask?.title}
                />

                <Stack direction="row" spacing={1} alignItems="center">
                  <InputIcon />

                  <Typography>Описание</Typography>
                </Stack>

                <Typography component="code">{existingTask?.details}</Typography>
              </Stack>
            </Stack>

            {existingTask && (
              <>
                <Divider orientation="vertical" />

                <CommentsBlock task={existingTask} />
              </>
            )}
          </Stack>
        )}
      </Stack>
    </Drawer>
  )
}

export const CommentsBlock = ({ task }: { task?: Task }) => {
  const tasksContext = useContext(TasksContext);

  useEffect(() => {
    if (task && !task.comments) {
      tasksContext?.loadComments(task.id);
    }
  }, [task]);

  const [comment, setComment] = useState('');

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();

    tasksContext?.createComment(task!.id, { text: comment }).then(() => {
      setComment('');
    });
  }, [task, comment]);

  const comments = useMemo(() => task?.comments?.sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf()), [task]);

  return (
    <Stack spacing={4} p={2} width="400px">
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Sms />

            <Typography variant="h6">Комментарии и солгасования</Typography>
          </Stack>

          <TextField autoFocus multiline value={comment} onChange={e => setComment(e.target.value)} />

          <Stack direction="row">
            <Button variant="outlined" type="submit" disabled={!comment}>Добавить</Button>
          </Stack>
        </Stack>
      </form>

      {comments?.map(item => (
        <Stack key={item.id} spacing={1}>
          <Typography variant="body2" color="textDisabled">{`${new Date(item.createdAt).toLocaleDateString('ru-RU').slice(0, 5)} в ${new Date(item.createdAt).toLocaleTimeString('ru-RU').slice(0, 5)}`}</Typography>

          <Typography variant="body2">{item.text}</Typography>
        </Stack>
      ))}
    </Stack>
  )
}

const TaskStatusButton = ({ onClick, status }: { onClick?: () => void, status: TaskStatus }) => (
  <Button
    disableRipple={!onClick}
    onClick={onClick}
    variant="contained"
    sx={{ height: "26px", cursor: onClick ? "pointer" : "default", pointerEvents: onClick ? "all" : "none" }}
    color={TASK_STATUS_BUTTON_COLORS[status]}
    startIcon={onClick ? <ArrowForwardIos htmlColor={TASK_STATUS_ICON_COLORS[status]} /> : TASK_STATUS_ICONS[status]}
  >
    {TASK_STATUS_NAMES[status]}
  </Button>
)
