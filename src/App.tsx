import { BrowserRouter as Router, Route, Switch,Redirect  } from "react-router-dom"
import Login from "@/pages/Login"
import Layout from "@/pages/Layout"
import "@/App.scss"

function App() {
  return (
    <Router>
      <div className="app">
        <Switch>
          <Route path="/home" component={Layout}></Route>
          <Route path="/login" component={Login}></Route>
          <Route exact path='/' render={() => <Redirect to='/home'/>}></Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
