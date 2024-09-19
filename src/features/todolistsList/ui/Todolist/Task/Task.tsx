import React, { ChangeEvent } from "react"
import { Checkbox, IconButton } from "@mui/material"
import { Delete } from "@mui/icons-material"
import { EditableSpan } from "common/components"
import { TaskStatuses } from "common/enums"
import { TaskType } from "features/todolistsList/api/tasksApi.types"
import { tasksThunks } from "features/todolistsList/model/tasksSlice"
import { useAppDispatch } from "common/hooks"
import s from "./Task.module.css"

type Props = {
  task: TaskType
}

export const Task = ({ task }: Props) => {
  const { id, todoListId, title, status } = task
  const dispatch = useAppDispatch()

  const removeTaskHandler = () => dispatch(tasksThunks.removeTask({ taskId: id, todolistId: todoListId }))

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New

    dispatch(tasksThunks.updateTask({
      taskId: id,
      domainModel: { status },
      todolistId: todoListId
    }))
  }

  const changeTaskTitleHandler = (title: string) => {
    dispatch(tasksThunks.updateTask({
      taskId: id,
      domainModel: { title },
      todolistId: todoListId
    }))
  }

  const isTaskCompleted = status === TaskStatuses.Completed

  return (
    <div key={id} className={isTaskCompleted ? s.isDone : ""}>
      <Checkbox checked={isTaskCompleted} color="primary" onChange={changeTaskStatusHandler} />

      <EditableSpan value={title} onChange={changeTaskTitleHandler} />
      <IconButton onClick={removeTaskHandler}>
        <Delete />
      </IconButton>
    </div>
  )
}
