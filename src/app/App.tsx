import { useAppDispatch } from "common/hooks"
import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { CircularProgress, Container } from "@mui/material"
import { ErrorSnackbar } from "common/components"
import { authThunks } from "../features/auth/model/authSlice"
import { Login } from "../features/auth/ui/login/Login"
import { TodolistsList } from "features/todolistsList/ui/TodolistsList"
import { selectIsInitialized } from "./appSlice"
import { Header } from "common/components"

function App() {
  const isInitialized = useSelector(selectIsInitialized)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(authThunks.initializeApp())
  }, [])

  if (!isInitialized) {
    return (
      <div style={{ position: "fixed", top: "30%", textAlign: "center", width: "100%" }}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <BrowserRouter>
      <div className="App">
        <ErrorSnackbar />
        <Header />
        <Container fixed>
          <Routes>
            <Route path={"/"} element={<TodolistsList />} />
            <Route path={"/login"} element={<Login />} />
          </Routes>
        </Container>
      </div>
    </BrowserRouter>
  )
}

export default App
