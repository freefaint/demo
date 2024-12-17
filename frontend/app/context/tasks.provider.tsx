'use client';

import { createContext, PropsWithChildren, useCallback, useDeferredValue, useEffect, useMemo, useState } from "react";
import { Comment, Task } from "../types";
import { useRouter } from "next/router";

const BASE_URL = 'http://localhost:3000';
const HEADERS = { "Content-Type": "application/json", "Accept": "application/json" };

type TasksContextBody = {
  loading: boolean;
  tasks?: Task[];
  createTask: (body: Pick<Task, 'title' | 'details'>) => Promise<Task>;
  updateTask: (id: string, body: Pick<Task, 'status'>) => Promise<void>;
  loadComments: (taskId: string) => Promise<void>;
  createComment: (id: string, body: Pick<Comment, 'text'>) => Promise<void>;
}

export const TasksContext = createContext<TasksContextBody | null>(null);

export const TasksProvider = ({ children }: PropsWithChildren) => {
  const [tasks, setTasks] = useState<Task[]>();
  const [loading, setLoading] = useState(false);

  const getTasks = useCallback(async () => {
    const items: Task[] = await fetch(`${BASE_URL}/task`).then(resp => resp.json());

    setTasks(items);

    items.map(i => loadCommentsCount(i.id));
  }, []);

  const loadCommentsCount = useCallback<TasksContextBody['loadComments']>(async id => {
    const data: { count: number } = await fetch(`${BASE_URL}/task/${id}/commentsCount`, { headers: HEADERS }).then(resp => resp.json());

    setTasks(old => old?.map(i => i.id === id ? { ...i, commentsCount: data.count } : i));
  }, []);

  const createTask = useCallback<TasksContextBody['createTask']>(async body => {
    const task = await fetch(`${BASE_URL}/task`, { method: 'POST', body: JSON.stringify(body), headers: HEADERS }).then(resp => resp.json());

    setTasks(old => [ ...(old ?? []), task ]);

    return task;
  }, []);

  const updateTask = useCallback<TasksContextBody['updateTask']>(async (id, body) => {
    const task = await fetch(`${BASE_URL}/task/${id}`, { method: 'PATCH', body: JSON.stringify(body), headers: HEADERS }).then(resp => resp.json());

    setTasks(old => old?.map(i => i.id === id ? { ...i, ...body } : i));
  }, []);

  const loadComments = useCallback<TasksContextBody['loadComments']>(async id => {
    const comments = await fetch(`${BASE_URL}/task/${id}/comments`).then(resp => resp.json());

    setTasks(old => old?.map(i => i.id === id ? { ...i, comments } : i));
  }, []);

  const createComment = useCallback<TasksContextBody['createComment']>(async (id, body) => {
    const comment = await fetch(`${BASE_URL}/task/${id}/comments`, { method: 'POST', body: JSON.stringify(body), headers: HEADERS }).then(resp => resp.json() as Promise<Comment>);

    setTasks(old => old?.map(i => i.id === id ? { ...i, comments: [ ...(i.comments ?? []), comment ] } : i));
  }, []);

  useEffect(() => {
    getTasks();
  }, []);

  const contextBody = useMemo(() => ({
    loading,
    tasks,
    getTasks,
    createTask,
    updateTask,
    loadComments,
    createComment
  }), [
    loading,
    tasks,
    getTasks,
    createTask,
    updateTask,
    loadComments,
    createComment
  ]);

  const context = useDeferredValue(contextBody);

  return (
    <TasksContext.Provider value={context}>
      {children}
    </TasksContext.Provider>
  )
}