import { AppBar, Button, IconButton, LinearProgress, Toolbar, Typography } from "@mui/material"
import { Menu } from "@mui/icons-material"
import React from "react"
import { useSelector } from "react-redux"
import { selectStatus } from "app/appSlice"
import { authThunks, selectIsLoggedIn } from "features/auth/model/authSlice"
import { useAppDispatch } from "common/hooks"

export const Header = function() {
  const status = useSelector(selectStatus)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const dispatch = useAppDispatch()

  const logoutHandler = () => {
    dispatch(authThunks.logout())
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <Menu />
        </IconButton>
        <Typography variant="h6">News</Typography>
        {isLoggedIn && (
          <Button color="inherit" onClick={logoutHandler}>
            Log out
          </Button>
        )}
      </Toolbar>
      {status === "loading" && <LinearProgress />}
    </AppBar>
  )
}