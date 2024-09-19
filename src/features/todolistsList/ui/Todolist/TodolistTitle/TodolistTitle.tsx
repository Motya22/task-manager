import { EditableSpan } from "common/components"
import { IconButton } from "@mui/material"
import { Delete } from "@mui/icons-material"
import React from "react"
import { TodolistDomainType, todolistsThunks } from "features/todolistsList/model/todolistsSlice"
import { useAppDispatch } from "common/hooks"

type Props = {
  todolist: TodolistDomainType
}

export const TodolistTitle = function({ todolist }: Props) {
  const { id, title, entityStatus } = todolist
  const dispatch = useAppDispatch()

  const removeTodolistHandler = () => dispatch(todolistsThunks.removeTodolist(id))

  const changeTodolistTitleHandler = (title: string) => dispatch(todolistsThunks.changeTodolistTitle({
    id,
    title
  }))

  return (
    <h3>
      <EditableSpan value={title} onChange={changeTodolistTitleHandler} />
      <IconButton onClick={removeTodolistHandler} disabled={entityStatus === "loading"}>
        <Delete />
      </IconButton>
    </h3>
  )
}
