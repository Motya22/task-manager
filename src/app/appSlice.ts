import { createSlice, isFulfilled, isPending, isRejected, PayloadAction } from "@reduxjs/toolkit"
import { todolistsThunks } from "features/todolistsList/model/todolistsSlice"
import { authThunks } from "features/auth/model/authSlice"
import { tasksThunks } from "features/todolistsList/model/tasksSlice"

const slice = createSlice({
  name: "app",
  initialState: {
    status: "idle" as RequestStatusType,
    error: null as string | null,
    isInitialized: false
  },
  reducers: {
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error
    },
    setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status
    }
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state) => {
        state.status = "loading"
      })
      .addMatcher(isFulfilled, (state) => {
        state.status = "succeeded"
      })
      .addMatcher(isRejected, (state, action: any) => {
        console.log("isRejected: ", action)
        state.status = "failed"

        if (action.payload) {
          if (action.type === todolistsThunks.addTodolist.rejected.type || action.type === tasksThunks.addTask.rejected.type || action.type === authThunks.initializeApp.rejected.type) return

          state.error = action.payload.messages[0]
        } else {
          state.error = action.error.message ? action.error.message : "Some error occurred"
        }
      })
      .addMatcher(authThunks.initializeApp.settled, (state) => {
        state.isInitialized = true
      })
  },
  selectors: {
    selectError: (state) => state.error,
    selectStatus: (state) => state.status,
    selectIsInitialized: (state) => state.isInitialized
  }
})

export const appReducer = slice.reducer
export const appActions = slice.actions
export const { selectError, selectStatus, selectIsInitialized } = slice.selectors
export const appPath = slice.reducerPath
export type AppInitialState = ReturnType<typeof slice.getInitialState>

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"
