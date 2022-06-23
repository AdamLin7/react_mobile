import { Button, List, NavBar, Popup, Dialog, Toast } from "antd-mobile"
import { useState } from "react"
import classNames from "classnames"
import { useHistory } from "react-router-dom"
import { useDispatch } from "react-redux"
import styles from "./index.module.scss"
import { getUserPrifile } from "@/store/action/profile"
import { useInitialState } from "@/utils/use-initial-state"
import EditInput from "./components/EditInput"
import { logout } from "@/store/action/login"

const Item = List.Item

const ProfileEdit = () => {
  // 控制修改昵称组件的显示/隐藏
  const [inputVisible, setInputVisible] = useState(false)
  const dispatch = useDispatch()
  // useEffect(() => {
  //   dispatch(getUserPrifile())
  // }, [])
  // const userProfile = useSelector((state: RootState) => state.profile.profile)
  const history = useHistory()
  // 自定义 hook 实现
  const { profile } = useInitialState(getUserPrifile, "profile")
  const onInputHide = (bool: boolean) => {
    setInputVisible(bool)
  }
  const onUpdateName = (value: string) => {
    onInputHide(false)
  }

  // 退出登录
  const onLogout = async () => {
    const result = await Dialog.confirm({
      content: "确认退出登录吗？",
    })
    if (result) {
      dispatch(logout())
      history.push("/login")
      Toast.show({
        content: "已退出登录",
        duration: 1000,
      })
    } else {
      Toast.show({
        content: "已取消",
        duration: 1000,
      })
    }
  }
  return (
    <div className={styles.root}>
      <div className="content">
        {/* 标题 */}
        <NavBar
          onBack={() => {
            history.goBack()
          }}
          style={{
            "--border-bottom": "1px solid #F0F0F0",
          }}
        >
          个人信息
        </NavBar>

        <div className="wrapper">
          {/* 列表 */}
          <List className="profile-list">
            {/* 列表项 */}
            <Item
              extra={
                <span className="avatar-wrapper">
                  <img width={24} height={24} src={profile.photo} alt="" />
                </span>
              }
              arrow
            >
              头像
            </Item>
            <Item
              arrow
              extra={profile.name}
              onClick={() => {
                onInputHide(true)
              }}
            >
              昵称
            </Item>
            <Item
              arrow
              extra={
                <span className={classNames("intro", "normal")}>
                  {profile.intro || "未填写"}
                </span>
              }
            >
              简介
            </Item>
          </List>

          <List className="profile-list">
            <Item arrow extra={profile.gender === 0 ? "男" : "女"}>
              性别
            </Item>
            <Item arrow extra={profile.birthday}>
              生日
            </Item>
          </List>
        </div>

        <div className="logout">
          <Button className="btn" onClick={onLogout}>
            退出登录
          </Button>
        </div>
      </div>
      {/* destroyOnClose 关闭组件时，销毁 */}
      <Popup visible={inputVisible} position="right" destroyOnClose>
        <EditInput
          value={profile.name}
          onClose={onInputHide}
          onUpdateName={onUpdateName}
        />
      </Popup>
    </div>
  )
}

export default ProfileEdit
