import { Button } from "@mui/material"
import { AddItemForm } from "common/components"
import { useAppDispatch } from "common/hooks"
import React, { useEffect } from "react"
import { tasksThunks } from "features/todolistsList/model/tasksSlice"
import { FilterValuesType, TodolistDomainType, todolistsActions } from "features/todolistsList/model/todolistsSlice"
import { TaskType } from "features/todolistsList/api/tasksApi.types"
import { TodolistTitle } from "features/todolistsList/ui/Todolist/TodolistTitle/TodolistTitle"
import { Tasks } from "features/todolistsList/ui/Todolist/Tasks/Tasks"

type Props = {
  todolist: TodolistDomainType
  tasks: TaskType[]
}

export const Todolist = function({ todolist, tasks }: Props) {
  const { id, filter, title, entityStatus } = todolist
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(tasksThunks.fetchTasks(id))
  }, [])

  const addTask = (title: string) => {
    dispatch(tasksThunks.addTask({ title, todolistId: id }))
  }

  const changeTodolistFilterHandler = (filter: FilterValuesType) => dispatch(todolistsActions.changeTodolistFilter({
    id,
    filter
  }))

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTask} disabled={entityStatus === "loading"} />
      <div>
        <Tasks todolist={todolist} tasks={tasks} />
      </div>
      <div style={{ paddingTop: "10px" }}>
        <Button
          variant={filter === "all" ? "outlined" : "text"}
          onClick={() => changeTodolistFilterHandler("all")}
          color={"inherit"}
        >
          All
        </Button>
        <Button
          variant={filter === "active" ? "outlined" : "text"}
          onClick={() => changeTodolistFilterHandler("active")}
          color={"primary"}
        >
          Active
        </Button>
        <Button
          variant={filter === "completed" ? "outlined" : "text"}
          onClick={() => changeTodolistFilterHandler("completed")}
          color={"secondary"}
        >
          Completed
        </Button>
      </div>
    </div>
  )
}
