import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '@/types/store'

// 创建 useInitialState 函数（自定义 hook）
const useInitialState = <keyName extends keyof RootState>(action: () => void, stateName: keyName) => {
    const dispatch = useDispatch()
    const state = useSelector((state: RootState) => state[stateName])

    useEffect(() => {
        dispatch(action())
    }, []);

    return state
}
export { useInitialState }