import { Input, NavBar } from "antd-mobile"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { updateUserProfile } from "@/store/action/profile"
import styles from "./index.module.scss"

// 为 EditInput 组件指定 props 类型
type props = {
  value: string
  onClose: (bool: boolean) => void
  onUpdateName: (value: string) => void
}

const EditInput = ({ onClose, value, onUpdateName }: props) => {
  // 维护父组件传递过来的状态
  // 注意：useState 的初始值只会在该函数组件第一次被创建时生效
  const [inputValue, setInputValue] = useState(value)
  const dispatch = useDispatch()
  // 提交事件
  const onSave = async () => {
    await dispatch(updateUserProfile({ name: inputValue }))
    onUpdateName(inputValue)
  }
  // useEffect(() => {
  //   // value 为 null 或 undefined 时，设置为默认值为空字符串
  //   setInputValue(value ?? "")
  // }, [value])
  return (
    <div className={styles.root}>
      <NavBar
        className="navbar"
        right={
          <span className="commit-btn" onClick={onSave}>
            提交
          </span>
        }
        onBack={() => {
          onClose(false)
        }}
      >
        编辑昵称
      </NavBar>

      <div className="edit-input-content">
        <h3>昵称</h3>

        <div className="input-wrap">
          <Input
            placeholder="请输入"
            value={inputValue}
            onChange={setInputValue}
          />
        </div>
      </div>
    </div>
  )
}

export default EditInput
