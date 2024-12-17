import React from "react";
import { Tasks } from "../components/tasks";
import { TaskDrawer } from "../components/task";

export default async function Page() {
  return (
    <>
      <Tasks />
      <TaskDrawer />
    </>
  );
}