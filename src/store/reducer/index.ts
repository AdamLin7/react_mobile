import { combineReducers } from 'redux'
import { Login } from './Login'
import profile from './profile'
const rootReducer = combineReducers({
    Login,
    profile
})
export default rootReducer