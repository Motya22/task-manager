import { createSlice, isFulfilled, PayloadAction } from "@reduxjs/toolkit"
import { clearTasksAndTodolists } from "common/actions"
import { ResultCode } from "common/enums"
import { createAppAsyncThunk } from "common/utils"
import { authAPI, LoginParamsType } from "features/auth/api/authApi"

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    captchaUrl: null as string | null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCaptchaUrl.fulfilled, (state, action) => {
        state.captchaUrl = action.payload
      })
      .addMatcher(isFulfilled(login, logout, initializeApp), (state, action: PayloadAction<{
        isLoggedIn: boolean
      }>) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
  },
  selectors: {
    selectIsLoggedIn: (state) => state.isLoggedIn,
    selectCaptchaUrl: (state) => state.captchaUrl
  }
})

const login = createAppAsyncThunk<{
  isLoggedIn: boolean
}, LoginParamsType>(`${slice.name}/login`, async (arg, { dispatch, rejectWithValue }) => {
  const res = await authAPI.login(arg)
  if (res.data.resultCode === ResultCode.Success) {
    return { isLoggedIn: true }
  } else {
    if (res.data.resultCode === ResultCode.Captcha) {
      dispatch(getCaptchaUrl())
    }

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

const getCaptchaUrl = createAppAsyncThunk<string, void>(
  `${slice.name}/getCaptchaUrl`,
  async () => {
    const res = await authAPI.getCaptchaUrl()

    return res.data.url
  }
)

export const authReducer = slice.reducer
export const authThunks = { login, logout, initializeApp, getCaptchaUrl }
export const { selectIsLoggedIn, selectCaptchaUrl } = slice.selectors
export const authPath = slice.reducerPath
