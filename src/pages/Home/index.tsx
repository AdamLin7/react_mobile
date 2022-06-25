import Icon from "@/components/Icon"
import { Tabs } from "antd-mobile"
import styles from "./index.module.scss"
import { useInitialState } from "@/utils/use-initial-state"
import { getUserChannel } from "@/store/action/home"
import ArticleList from "./components/ArticleList"
const Home = () => {
  const { Userchannels } = useInitialState(getUserChannel, "Home")
  return (
    <div className={styles.root}>
      {/* 频道 Tabs 列表 */}
      {Userchannels.length > 0 && (
        <Tabs className="tabs" activeLineMode="fixed">
          {Userchannels.map((item) => {
            return (
              <Tabs.Tab title={item.name} key={item.id}>
                <ArticleList channelID={item.id} />
              </Tabs.Tab>
            )
          })}
        </Tabs>
      )}
      <div className="tabs-opration">
        <Icon type="iconbtn_search" />
        <Icon type="iconbtn_channel" />
      </div>
    </div>
  )
}

export default Home
