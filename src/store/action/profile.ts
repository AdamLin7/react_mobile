import { http } from '@/utils/http'
import { Toast } from 'antd-mobile'
import type { UserResponse, UserProfileResponse, UserProfile } from '@/types/data'
import type { RootThunkAction } from '@/types/store'

export const getUser = (): RootThunkAction => {
    return async (dispatch) => {
        const res = await http.get('/user') as UserResponse
        dispatch({ type: 'user/getuser', payload: res.data })
    }
}

export const getUserPrifile = (): RootThunkAction => {
    return async (dispatch) => {
        const res = await http.get('/user/profile') as UserProfileResponse
        dispatch({ type: 'user/getprofile', payload: res.data })
    }
}

// 编辑用户资料的action
export const updateUserProfile = (userProfile: Partial<UserProfile>): RootThunkAction => {
    return async dispatch => {
        await http.patch('/user/profile', userProfile)
        dispatch({type:'profile/update',payload:userProfile})
        Toast.show({
            content:'更新状态成功',
            duration: 1000
          })
    }
}