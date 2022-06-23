import { LoginAction } from "@/types/store"
import { Token } from "@/types/data"
// 默认值
const initialState: Token = {
  token: "",
  refresh_token: "",
}
export const Login = (state = initialState, action: LoginAction): Token => {
  switch (action.type) {
    case "login/token":
      return action.payload
    case "login/logout":
      return initialState
    default:
      return state
  }
}
