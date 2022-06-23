import { Router, Route, Switch, Redirect } from "react-router-dom"
import { customHistory } from "@/utils/history"
import Login from "@/pages/Login"
import Layout from "@/pages/Layout"
import ProfileEdit from "@/pages/Profile/Edit"
import AuthRoute from "@/components/AuthRoute"

import "@/App.scss"

function App() {
  return (
    <Router history={customHistory}>
      <div className="app">
        <Switch>
          <Route path="/home" component={Layout}></Route>
          <Route path="/login" component={Login}></Route>
          {/* <Route path="/profile/edit" component={ProfileEdit}></Route>
           */}
          {/* 此处，通过 children 来指定要渲染的组件 */}
          <AuthRoute path="/profile/edit">
            <ProfileEdit />
          </AuthRoute>
          <Route exact path="/" render={() => <Redirect to="/home" />}></Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
