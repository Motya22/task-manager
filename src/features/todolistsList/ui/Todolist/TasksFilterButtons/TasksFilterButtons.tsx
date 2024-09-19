import { Button } from "@mui/material"
import React from "react"
import { FilterValuesType, TodolistDomainType, todolistsActions } from "features/todolistsList/model/todolistsSlice"
import { useAppDispatch } from "common/hooks"

type Props = {
  todolist: TodolistDomainType
}

export const TasksFilterButtons = function({ todolist }: Props) {
  const { id, filter } = todolist
  const dispatch = useAppDispatch()

  const changeTodolistFilterHandler = (filter: FilterValuesType) => dispatch(todolistsActions.changeTodolistFilter({
    id,
    filter
  }))

  return (
    <>
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
    </>
  )
}
