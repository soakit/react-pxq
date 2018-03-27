import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger' // 利用redux-logger打印日志
import { reducer as homeReducer } from './home/index.js'
import * as production from './production/reducer'
import thunk from 'redux-thunk'

// https://github.com/yellowfrogCN/reduxDevTools/blob/master/README.md
//引入redux-devtools-extension的可视化工具（有点吊）
import { composeWithDevTools } from 'redux-devtools-extension'

// 调用日志打印方法 collapsed是让action折叠，看着舒服点
const loggerMiddleware = createLogger({ collapsed: true })

// 创建一个中间件集合
let middleware = applyMiddleware(thunk)

if (process.env.NODE_ENV !== 'production') {
  middleware = [thunk, loggerMiddleware]
  middleware = composeWithDevTools(applyMiddleware(...middleware))
} else {
  middleware = applyMiddleware(thunk)
}

let store = createStore(
	combineReducers({ ...homeReducer, ...production }),
  middleware
)



export default store
