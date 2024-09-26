import { useAppDispatch } from "common/hooks"
import React, { useEffect } from "react"
import { useSelector } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { CircularProgress } from "@mui/material"
import { ErrorSnackbar, Header, Routing } from "common/components"
import { authThunks } from "../features/auth/model/authSlice"
import { selectIsInitialized } from "./appSlice"

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
        <Routing />
      </div>
    </BrowserRouter>
  )
}

export default App
