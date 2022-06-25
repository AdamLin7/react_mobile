import { InfiniteScroll, PullToRefresh } from "antd-mobile"
import ArticleItem from "@/components/ArticleItem"
import styles from "./index.module.scss"
import { useDispatch, useSelector } from "react-redux"
import { getArticleList } from "@/store/action/home"
import { RootState } from "@/types/store"
type Props = {
  channelID: number
}
const ArticleList = ({ channelID }: Props) => {
  const dispatch = useDispatch()

  const articles = useSelector((state: RootState) => state.Home.channelArticles)
  // 注意：此处的 频道对应的 文章列表数据，可能是不存在的，所以，此处设置默认值
  const currentChannelArticle = articles[channelID] ?? {
    pre_timestamp: Date.now(), //如果是第一次请求，就认为默认取当前时间戳
    results: [],
  }
  const { pre_timestamp, results } = currentChannelArticle
  const loadMore = async () => {
    await dispatch(getArticleList(channelID, pre_timestamp, "append"))
  }
  // 是否加载更多数据的条件：
  // 如果 pre_timestamp 值为 null 说明没有更多数据了
  // 此时， hasMore 值为 false，那么，InfiniteScroll 组件就不会再次获取数据了
  const hasMore = !!pre_timestamp

  // 下拉刷新
  const onRefresh = async () => {
    // 上来加载时追加，下拉刷新是替换
    await dispatch(getArticleList(channelID, Date.now(), "replace"))
  }
  return (
    <div className={styles.root}>
      <PullToRefresh onRefresh={onRefresh}>
        {/* 文章列表中的每一项 */}
        {results.map((item) => (
          <ArticleItem {...item} key={item.art_id} />
        ))}

        {/*
        loadMore 加载数据的函数
        hasMore 布尔值，true 表示还有更多数据；false 表示没有更多数据了
      */}
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
      </PullToRefresh>
    </div>
  )
}

export default ArticleList
