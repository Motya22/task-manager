import { Delete } from "@mui/icons-material"
import { Button, IconButton } from "@mui/material"
import { AddItemForm, EditableSpan } from "common/components"
import { TaskStatuses } from "common/enums"
import { useAppDispatch } from "common/hooks"
import React, { useEffect } from "react"
import { tasksThunks } from "features/todolistsList/model/tasksSlice"
import {
  FilterValuesType,
  TodolistDomainType,
  todolistsActions,
  todolistsThunks
} from "features/todolistsList/model/todolistsSlice"
import { Task } from "features/todolistsList/ui/Todolist/Task/Task"
import { TaskType } from "features/todolistsList/api/tasksApi.types"

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

  const removeTodolistHandler = () => dispatch(todolistsThunks.removeTodolist(id))

  const changeTodolistTitleHandler = (title: string) => dispatch(todolistsThunks.changeTodolistTitle({
    id,
    title
  }))

  const changeTodolistFilterHandler = (filter: FilterValuesType) => dispatch(todolistsActions.changeTodolistFilter({
    id,
    filter
  }))

  let tasksForTodolist = tasks

  if (filter === "active") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.New)
  }
  if (filter === "completed") {
    tasksForTodolist = tasks.filter((t) => t.status === TaskStatuses.Completed)
  }

  return (
    <div>
      <h3>
        <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
        <IconButton onClick={removeTodolistHandler} disabled={entityStatus === "loading"}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask} disabled={entityStatus === "loading"} />
      <div>
        {tasksForTodolist.map((t) => (
          <Task
            key={t.id}
            task={t}
          />
        ))}
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
