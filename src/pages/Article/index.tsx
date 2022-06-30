import { NavBar, InfiniteScroll } from "antd-mobile"
import { useHistory } from "react-router-dom"
import classNames from "classnames"
import styles from "./index.module.scss"
import Icon from "@/components/Icon"
import CommentItem from "./components/CommentItem"
import CommentFooter from "./components/CommentFooter"
import {
  getArticleDetailAction,
  getArticleCommentAction,
} from "@/store/action/article"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { useInitialState } from "@/utils/use-initial-state"
// 高亮
import highlight from "highlight.js"
import "highlight.js/styles/dark.css"

// 消毒富文本内容
import domPurify from "dompurify"

// 骨架屏
import ContentLoader from "react-content-loader"

// 格式化日期
import dayjs from "dayjs"
import localizedFormat from "dayjs/plugin/localizedFormat"
dayjs.extend(localizedFormat)

enum CommentType {
  Article = "a",
  comment = "c",
}
const Article = () => {
  const { detail } = useInitialState(
    () => getArticleDetailAction(artID),
    "article"
  )

  const MyLoader = () => (
    <ContentLoader
      speed={2}
      width={476}
      height={124}
      viewBox="0 0 476 124"
      backgroundColor="#311985"
      foregroundColor="#ecebeb"
    >
      <rect x="48" y="8" rx="3" ry="3" width="88" height="6" />
      <rect x="48" y="26" rx="3" ry="3" width="52" height="6" />
      <rect x="-168" y="56" rx="3" ry="3" width="410" height="6" />
      <rect x="-142" y="71" rx="3" ry="3" width="380" height="6" />
      <rect x="0" y="88" rx="3" ry="3" width="178" height="6" />
      <circle cx="20" cy="20" r="20" />
    </ContentLoader>
  )

  useEffect(() => {
    const dghemlDOM = document.querySelector(".dg-html")
    const codes = dghemlDOM?.querySelectorAll<HTMLElement>("pre code")
    if (codes && codes.length > 0) {
      codes.forEach((el) => {
        highlight.highlightElement(el)
        // 让每个 code 内容实现代码高亮
      })
      return
    }
    highlight.configure({
      // 忽略警告
      ignoreUnescapedHTML: true,
    })
  }, [detail])
  const history = useHistory()
  const { artID } = useParams<{ artID: string }>()
  const loadMoreComments = async () => {
    console.log("加载更多评论")
  }
  const { comment } = useInitialState(
    () => getArticleCommentAction(CommentType.Article, artID, null, "replace"),
    "article"
  )
  console.log("comment", comment)
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
            {/* 完成富文本内容的消毒 */}
            <div
              className="content-html dg-html"
              dangerouslySetInnerHTML={{
                __html: domPurify.sanitize(detail.content),
              }}
            />
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

  if (!detail.art_id) {
    return MyLoader()
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
