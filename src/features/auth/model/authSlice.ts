import { createSlice, isFulfilled, PayloadAction } from "@reduxjs/toolkit"
import { clearTasksAndTodolists } from "common/actions"
import { ResultCode } from "common/enums"
import { createAppAsyncThunk } from "common/utils"
import { authAPI, LoginParamsType } from "features/auth/api/authApi"

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(isFulfilled(login, logout, initializeApp), (state, action: PayloadAction<{
        isLoggedIn: boolean
      }>) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
  },
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn
  }
})

const login = createAppAsyncThunk<{
  isLoggedIn: boolean
}, LoginParamsType>(`${slice.name}/login`, async (arg, { rejectWithValue }) => {
  const res = await authAPI.login(arg)
  if (res.data.resultCode === ResultCode.Success) {
    return { isLoggedIn: true }
  } else {
    return rejectWithValue(res.data)
  }
})

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(`${slice.name}/logout`, async (_, {
  dispatch,
  rejectWithValue
}) => {
  const res = await authAPI.logout()
  if (res.data.resultCode === ResultCode.Success) {
    dispatch(clearTasksAndTodolists())
    return { isLoggedIn: false }
  } else {
    return rejectWithValue(null)
  }
})

const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, void>(
  `${slice.name}/initializeApp`,
  async (_, { rejectWithValue }) => {
    const res = await authAPI.me()
    if (res.data.resultCode === ResultCode.Success) {
      return { isLoggedIn: true }
    } else {
      return rejectWithValue(res.data)
    }
  }
)

export const authReducer = slice.reducer
export const authThunks = { login, logout, initializeApp }
export const { selectIsLoggedIn } = slice.selectors
export const authPath = slice.reducerPath
