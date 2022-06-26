import { NavBar, InfiniteScroll } from "antd-mobile"
import { useHistory } from "react-router-dom"
import classNames from "classnames"
import styles from "./index.module.scss"
import Icon from "@/components/Icon"
import CommentItem from "./components/CommentItem"
import CommentFooter from "./components/CommentFooter"
import { getArticleDetailAction } from "@/store/action/article"
import { useParams } from "react-router-dom"
import { useInitialState } from "@/utils/use-initial-state"

// 格式化日期
import dayjs from "dayjs"
import localizedFormat from "dayjs/plugin/localizedFormat"
dayjs.extend(localizedFormat)

const Article = () => {
  const history = useHistory()
  const params = useParams<{ artID: string }>()
  const loadMoreComments = async () => {
    console.log("加载更多评论")
  }

  const { detail } = useInitialState(
    () => getArticleDetailAction(params.artID),
    "article"
  )
  console.log(detail)
  const renderArticle = () => {
    // 文章详情
    return (
      <div className="wrapper">
        <div className="article-wrapper">
          <div className="header">
            <h1 className="title">{detail.title}</h1>

            <div className="info">
              <span>{dayjs(detail.pubdate).format("LL")}</span>
              <span>{detail.read_count} 阅读</span>
              <span>{detail.comm_count} 评论</span>
            </div>

            <div className="author">
              <img src={detail.aut_photo} alt="" />
              <span className="name">{detail.aut_name}</span>
              <span
                className={classNames(
                  "follow",
                  detail.is_followed ? "followed" : ""
                )}
              >
                {detail.is_followed ? "已关注" : "关注"}
              </span>
            </div>
          </div>

          <div className="content">
            <div className="content-html dg-html" />
            <div className="date">{dayjs(detail.pubdate).format("LL")}</div>
          </div>
        </div>

        <div className="comment">
          <div className="comment-header">
            <span>全部评论（{detail.comm_count}）</span>
            <span>{detail.like_count} 点赞</span>
          </div>

          <div className="comment-list">
            <CommentItem />

            <InfiniteScroll hasMore={false} loadMore={loadMoreComments} />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.root}>
      <div className="root-wrapper">
        <NavBar
          onBack={() => history.go(-1)}
          right={
            <span>
              <Icon type="icongengduo" />
            </span>
          }
        >
          {true && (
            <div className="nav-author">
              <img src="http://geek.itheima.net/images/user_head.jpg" alt="" />
              <span className="name">黑马先锋</span>
              <span className={classNames("follow", true ? "followed" : "")}>
                {true ? "已关注" : "关注"}
              </span>
            </div>
          )}
        </NavBar>
        {/* 文章详情和评论 */}
        {renderArticle()}

        {/* 底部评论栏 */}
        <CommentFooter />
      </div>
    </div>
  )
}

export default Article
