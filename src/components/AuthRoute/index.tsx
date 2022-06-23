// 路由鉴权组件
import { Route, Redirect, useLocation } from "react-router-dom"
import { getToken } from "@/utils/auth"
const AuthRoute = ({ children, ...rest }: any) => {
  const location = useLocation()
  return (
    <Route
      {...rest}
      render={() => {
        if (isAuth()) {
          return children
        }
        return (
          <Redirect
            to={{
              pathname: "/login",
              state: {
                from: location.pathname,
              },
            }}
          />
        )
      }}
    ></Route>
  )
}
const isAuth = () => {
  return !!getToken().token
}
export default AuthRoute
