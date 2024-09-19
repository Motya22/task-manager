import { AddItemForm } from "common/components"
import { useAppDispatch } from "common/hooks"
import React, { useEffect } from "react"
import { tasksThunks } from "features/todolistsList/model/tasksSlice"
import { TodolistDomainType } from "features/todolistsList/model/todolistsSlice"
import { TaskType } from "features/todolistsList/api/tasksApi.types"
import { TodolistTitle } from "features/todolistsList/ui/Todolist/TodolistTitle/TodolistTitle"
import { Tasks } from "features/todolistsList/ui/Todolist/Tasks/Tasks"
import { TasksFilterButtons } from "features/todolistsList/ui/Todolist/TasksFilterButtons/TasksFilterButtons"

type Props = {
  todolist: TodolistDomainType
  tasks: TaskType[]
}

export const Todolist = function({ todolist, tasks }: Props) {
  const { id, filter, entityStatus } = todolist
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(tasksThunks.fetchTasks(id))
  }, [])

  const addTask = (title: string) => {
    dispatch(tasksThunks.addTask({ title, todolistId: id }))
  }

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTask} disabled={entityStatus === "loading"} />
      <div>
        <Tasks todolist={todolist} tasks={tasks} />
      </div>
      <div style={{ paddingTop: "10px" }}>
        <TasksFilterButtons todolist={todolist} />
      </div>
    </div>
  )
}
