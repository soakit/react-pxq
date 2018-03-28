import React, { Component } from 'react'
import { HashRouter, Switch, Route, Redirect } from 'react-router-dom'
import asyncComponent from '@/utils/asyncComponent'

import home from '@/views/home/home'

// https://segmentfault.com/a/1190000010067597
// asyncComponent 异步加载组件，打包会分割
const record = asyncComponent(() => import('@/views/record/record')) // 记录
const helpcenter = asyncComponent(() => import('@/views/helpcenter/helpcenter')) // 帮助中心
const production = asyncComponent(() => import('@/views/production/production')) // 选择销售产品
const balance = asyncComponent(() => import('@/views/balance/balance')) // 提现

// react-router4 不再推荐将所有路由规则放在同一个地方集中式路由，子路由应该由父组件动态配置，组件在哪里匹配就在哪里渲染，更加灵活
export default class RouteConfig extends Component {
	render() {
		return (
			/* "/" 制定exact后，"/record" 等其它路由就不会再匹配到"/"了 */
			<HashRouter>
				<Switch>
					<Route path="/" exact component={home} />
					<Route path="/record" component={record} />
					<Route path="/helpcenter" component={helpcenter} />
					<Route path="/production" component={production} />
					<Route path="/balance" component={balance} />
					<Redirect to="/" />
				</Switch>
			</HashRouter>
		)
	}
}
