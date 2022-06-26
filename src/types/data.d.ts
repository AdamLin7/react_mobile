// 定义 登录/注册 接口返回的接口类型
export type Token = {
    token: string
    refresh_token: string
}

// 提交表单的类型
export type LoginForm = {
    mobile: string,
    code: string
}
type ApiResponse<T> = {
    message: string,
    data: T
}

// 登录接口的返回类型
export type LoginData = ApiResponse<Token>

export type User = {
    id: string;
    name: string;
    photo: string;
    art_count: number;
    follow_count: number;
    fans_count: number;
    like_count: number;
}

export type UserResponse = ApiResponse<User>

export type UserProfile = {
    id: string;
    photo: string;
    name: string;
    mobile: string;
    gender: number;
    birthday: string;
    intro?: string;
}

// 获取用户资料响应体返回的结构
export type UserProfileResponse = ApiResponse<UserProfile>

// 频道类型
export type channel = {
    id: number
    name: string
}

// 用户频道类型
export type Userchannels = {
    channels: Array<channel>
}

// 频道列表返回的数据
export type UserChannelResponse = ApiResponse<Userchannels>

export type Articles = {
    pre_timestamp: number
    results: Array<{
        art_id: string,
        title: string,
        aut_id: string,
        aut_name: string,
        comm_count: number,
        pubdate: string,
        cover: {
            type: number,
            images: string[]
        }
    }>
}

export type ArticleResponse = ApiResponse<Articles>

export type ArticleDetail = {
    art_id: string,
    title: string,
    pubdate: string,
    aut_id: string,
    aut_name: string,
    aut_photo: string,
    is_followed: boolean,
    attitude: number,
    content: string,
    is_collected: boolean,
    read_count: number,
    like_count: number,
    comm_count: number
}

export type ArticleDetailResponse = ApiResponse<ArticleDetail>