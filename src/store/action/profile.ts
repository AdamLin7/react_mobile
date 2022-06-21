import { http } from '@/utils/http'
import type { UserResponse, UserProfileResponse } from '@/types/data'
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
        dispatch({type:'user/getprofile',payload:res.data})
    }
}