import { legacy_createStore as createStore, applyMiddleware } from "redux"
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"
import rootReducer from "@/store/reducer"
import { getToken } from "@/utils/auth"
const middlewares = composeWithDevTools(applyMiddleware(thunk))

// 注意：此处的 login 属性是根据合并reducer时，login 的名称而来的
const initialState = {
    Login: getToken()
}
// 第一个参数：reducer
// 第二个参数：初始状态
// 第三个参数：增强器，比如，中间件
const store = createStore(rootReducer, initialState, middlewares)

export default store
