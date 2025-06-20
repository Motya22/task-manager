import { createAsyncThunk } from "@reduxjs/toolkit"
import { BaseResponse } from "common/types"
import { AppDispatch, AppRootStateType } from "app/store"

/**
Эта функция предназначена для того, чтобы избавиться от дублирования кода по созданию типов в санке
 */
export const createAppAsyncThunk = createAsyncThunk.withTypes<{
  state: AppRootStateType
  dispatch: AppDispatch
  rejectValue: null | BaseResponse
}>()
