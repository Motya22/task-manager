import { AddItemForm } from "common/components"
import { useAppDispatch } from "common/hooks"
import React from "react"
import { tasksThunks } from "features/todolistsList/model/tasksSlice"
import { TodolistDomainType } from "features/todolistsList/model/todolistsSlice"
import { TodolistTitle } from "features/todolistsList/ui/Todolist/TodolistTitle/TodolistTitle"
import { Tasks } from "features/todolistsList/ui/Todolist/Tasks/Tasks"
import { TasksFilterButtons } from "features/todolistsList/ui/Todolist/TasksFilterButtons/TasksFilterButtons"

type Props = {
  todolist: TodolistDomainType
}

export const Todolist = function({ todolist }: Props) {
  const { id, entityStatus } = todolist
  const dispatch = useAppDispatch()

  const addTask = (title: string) => {
    return dispatch(tasksThunks.addTask({ title, todolistId: id }))
  }

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTask} disabled={entityStatus === "loading"} />
      <div>
        <Tasks todolist={todolist} />
      </div>
      <div style={{ paddingTop: "10px" }}>
        <TasksFilterButtons todolist={todolist} />
      </div>
    </div>
  )
}
