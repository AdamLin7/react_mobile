// 封装一个自定义的 history ，因为如果不是在组件里，useHistory 这个hook 是不可以使用的
import { createBrowserHistory } from 'history'
export const customHistory = createBrowserHistory()