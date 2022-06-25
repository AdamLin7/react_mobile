import { HomeAction } from "@/types/store"
import { channel, Articles } from "@/types/data"
type HomeState = {
    Userchannels: channel[],
    channelArticles: {
        // key:value
        // key 是number 类型
        [key in number]: Articles
    }
}
const initialState: HomeState = {
    Userchannels: [],
    channelArticles: {}
}

export const Home = (state = initialState, action: HomeAction): HomeState => {
    switch (action.type) {
        case "home/getUserChannel":
            return {
                ...state,
                Userchannels: action.payload
            }
        case 'home/getChannelArticles':
            const { channel_id, data: { pre_timestamp, results } } = action.payload
            // 原来的数组
            const preArticles = state.channelArticles[channel_id] ? state.channelArticles[channel_id].results : []

            return {
                ...state,
                channelArticles: {
                    ...state.channelArticles,
                    [channel_id]: {
                        pre_timestamp,
                        results: action.payload.actionType === 'append' ? [...preArticles, ...results] : [...results]
                    }
                }
            }


        default:
            return state;
    }
}