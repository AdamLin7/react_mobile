import type { User, UserProfile } from "@/types/data"
import type { UserAction } from "@/types/store"
type profileState = {
  user: User //个人详情
  profile: UserProfile //个人资料
}

const initialState = { user: {}, profile: {} } as profileState

const profile = (state = initialState, action: UserAction): profileState => {
  switch (action.type) {
    case "user/getuser":
      return {
        ...state,
        user: action.payload, //覆盖用户信息
      }
    case "user/getprofile":
      return {
        ...state,
        profile: action.payload,
      }
    case "profile/update":
      return {
        ...state,
        profile: {
          ...state.profile,
          ...action.payload,
        },
      }
    default:
      return state
  }
}
export default profile
