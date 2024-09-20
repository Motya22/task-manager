import { Task } from "features/todolistsList/ui/Todolist/Tasks/Task/Task"
import React, { useEffect } from "react"
import { TodolistDomainType } from "features/todolistsList/model/todolistsSlice"
import { selectFilteredTasks, tasksThunks } from "features/todolistsList/model/tasksSlice"
import { useAppDispatch } from "common/hooks"
import { useAppSelector } from "app/store"

type Props = {
  todolist: TodolistDomainType
}

export const Tasks = function({ todolist }: Props) {
  const { filter, id } = todolist
  const tasks = useAppSelector((state) => selectFilteredTasks(state, id, filter))
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(tasksThunks.fetchTasks(id))
  }, [])

  return (
    <>
      {tasks.map((t) => (
        <Task
          key={t.id}
          task={t}
        />
      ))}
    </>
  )
}
