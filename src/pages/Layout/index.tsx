import { Route } from "react-router-dom"
import { TabBar } from "antd-mobile"
import { useHistory, useLocation } from "react-router-dom"
import styles from "./index.module.scss"
import Icon from "@/components/Icon"
import AuthRoute from "@/components/AuthRoute"

// 导入页面组件，配置路由
import Home from "../Home"
import Question from "../Question"
import Video from "../Video"
import Profile from "../Profile"

const tabs = [
  { path: "/home/index", icon: "iconbtn_home", text: "首页" },
  { path: "/home/question", icon: "iconbtn_qa", text: "问答" },
  { path: "/home/video", icon: "iconbtn_video", text: "视频" },
  { path: "/home/profile", icon: "iconbtn_mine", text: "我的" },
]

const Layout = () => {
  const history = useHistory()
  const location = useLocation()
  // tabs切换的回调
  const changeTab = (key: string) => {
    history.push(key)
  }
  return (
    <div className={styles.root}>
      <Route exact path="/home/index" component={Home} />

      <Route path="/home/question" component={Question} />

      <Route path="/home/video" component={Video} />

      <AuthRoute path="/home/profile">
        <Profile></Profile>
      </AuthRoute>

      <TabBar
        className="tab-bar"
        onChange={changeTab}
        activeKey={location.pathname}
      >
        {tabs.map((item) => (
          <TabBar.Item
            key={item.path}
            icon={(active) => (
              <Icon
                type={active ? `${item.icon}_sel` : item.icon}
                className="tab-bar-item-icon"
              />
            )}
            title={item.text}
          />
        ))}
      </TabBar>
    </div>
  )
}

export default Layout
