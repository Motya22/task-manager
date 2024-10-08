import { useAppDispatch } from "common/hooks"
import { useSelector } from "react-redux"
import { authThunks, selectCaptchaUrl, selectIsLoggedIn } from "features/auth/model/authSlice"
import { FormikHelpers, useFormik } from "formik"
import { LoginParamsType } from "features/auth/api/authApi"
import { BaseResponse } from "common/types"

type FormikErrorType = {
  email?: string
  password?: string
  rememberMe?: boolean
  captcha?: string
}

export const useLogin = () => {
  const dispatch = useAppDispatch()

  const isLoggedIn = useSelector(selectIsLoggedIn)
  const captchaUrl = useSelector(selectCaptchaUrl)

  const formik = useFormik({
    validate: (values: LoginParamsType) => {
      const errors: FormikErrorType = {}
      if (!values.email) {
        errors.email = "Email is required"
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address"
      }

      if (!values.password) {
        errors.password = "Required"
      } else if (values.password.length < 3) {
        errors.password = "Must be 3 characters or more"
      }

      if (captchaUrl && !values.captcha) {
        errors.captcha = "Required"
      }

      return errors
    },
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
      captcha: ""
    },
    onSubmit: (values, formikHelpers: FormikHelpers<LoginParamsType>) => {
      dispatch(authThunks.login(values))
        .unwrap()
        .catch((reason: BaseResponse) => {
          reason.fieldsErrors?.forEach((fieldError) => {
            formikHelpers.setFieldError(fieldError.field, fieldError.error)
          })
        })
    }
  })

  return { formik, isLoggedIn, captchaUrl }
}
