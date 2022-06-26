import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import type { RootState } from '@/types/store'
import { useRef } from 'react'

// 创建 useInitialState 函数（自定义 hook）
const useInitialState = <keyName extends keyof RootState>(action: () => void, stateName: keyName) => {
    const actionRef = useRef(action)

    const dispatch = useDispatch()
    const state = useSelector((state: RootState) => state[stateName])

    useEffect(() => {
        dispatch(actionRef.current())
    }, [dispatch]);

    return state
}
export { useInitialState }