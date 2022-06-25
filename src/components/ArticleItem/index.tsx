import classnames from "classnames"
import Icon from "@/components/Icon"
import styles from "./index.module.scss"
import { useHistory } from "react-router-dom"
import dayjs from "dayjs"
// 相对时间插件
import relativeTime from "dayjs/plugin/relativeTime"
// 国际化 - 中文
import "dayjs/locale/zh-cn"
// 启用相对时间
dayjs.extend(relativeTime)
// 启用中文
dayjs.locale("zh-cn")
type Props = {
  /**
   * 0 表示无图
   * 1 表示单图
   * 3 表示三图
   */
  art_id: string
  title: string
  aut_id: string
  aut_name: string
  comm_count: number
  pubdate: string
  cover: {
    type: number
    images: string[]
  }
}

const ArticleItem = ({
  cover,
  title,
  aut_name,
  comm_count,
  pubdate,
  art_id,
}: Props) => {
  const history = useHistory()
  const leadToItem = () => {
    history.push(`/article/${art_id}`)
  }
  return (
    <div className={styles.root} onClick={leadToItem}>
      <div
        className={classnames(
          "article-content",
          cover.type === 3 && "t3",
          cover.type === 0 && "none-mt"
        )}
      >
        <h3>{title}</h3>
        {cover.type !== 0 && (
          <div className="article-imgs">
            {cover.images.map((item, index) => {
              return (
                <div className="article-img-wrapper" key={index}>
                  <img src={item} alt="" />
                </div>
              )
            })}
          </div>
        )}
      </div>
      <div
        className={classnames("article-info", cover.type === 0 && "none-mt")}
      >
        <span>{aut_name}</span>
        <span>{comm_count}条评论</span>
        <span>{dayjs().from(dayjs(pubdate))}</span>
        <span className="close">
          <Icon type="iconbtn_essay_close" />
        </span>
      </div>
    </div>
  )
}

export default ArticleItem
