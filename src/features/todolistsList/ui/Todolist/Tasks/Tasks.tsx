import { Task } from "features/todolistsList/ui/Todolist/Tasks/Task/Task"
import React from "react"
import { TaskStatuses } from "common/enums"
import { TodolistDomainType } from "features/todolistsList/model/todolistsSlice"
import { TaskType } from "features/todolistsList/api/tasksApi.types"

type Props = {
  todolist: TodolistDomainType
  tasks: TaskType[]
}

export const Tasks = function({ todolist, tasks }: Props) {
  const { filter } = todolist

  let tasksForTodolist = tasks

  if (filter === "active") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.New)
  }
  if (filter === "completed") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.Completed)
  }

  return (
    <>
      {tasksForTodolist.map((t) => (
        <Task
          key={t.id}
          task={t}
        />
      ))}
    </>
  )
}
