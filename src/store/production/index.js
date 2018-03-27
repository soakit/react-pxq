import API from '@/api/api'
import Immutable from 'immutable'

const pro = {
	// 保存商品数据
	GETPRODUCTION: Symbol('GETPRODUCTION'),
	// 选择商品
	TOGGLESELECT: Symbol('TOGGLESELECT'),
	// 编辑商品
	EDITPRODUCTION: Symbol('EDITPRODUCTION'),
	// 清空选择
	CLEARSELECTED: Symbol('CLEARSELECTED')
}

export const actions = {
	// 初始化获取商品数据，保存至redux
	getProData: () => {
		// 返回函数，异步dispatch
		return async dispatch => {
			try {
				let result = await API.getProduction()
				result.map(item => {
					item.selectStatus = false
					item.selectNum = 0
					return item
				})
				dispatch({
					type: pro.GETPRODUCTION,
					dataList: result
				})
			} catch (err) {
				console.error(err)
			}
		}
	},

	// 选择商品
	togSelectPro: index => {
		return {
			type: pro.TOGGLESELECT,
			index
		}
	},

	// 编辑商品
	editPro: (index, selectNum) => {
		return {
			type: pro.EDITPRODUCTION,
			index,
			selectNum
		}
	},

	// 清空选择
	clearSelected: () => {
		return {
			type: pro.CLEARSELECTED
		}
	}
}

const defaultState = {
	/**
	 * 商品数据
	 * @type {Array}
	 * example: [{
	 *    product_id: 1, 商品ID
	 *    product_name: "PaiBot（2G/32G)", 商品名称
	 *    product_price: 2999, 商品价格
	 *    commission: 200, 佣金
	 *    selectStatus: false, 是否选择
	 *    selectNum: 0, 选择数量
	 * }]
	 */
	dataList: []
}

export const reducer = {
	proData: (state = defaultState, action) => {
		let imuDataList
		let imuItem
		switch (action.type) {
			case pro.GETPRODUCTION:
				return { ...state, ...action }
			case pro.TOGGLESELECT:
				//避免引用类型数据，使用immutable进行数据转换
				imuDataList = Immutable.List(state.dataList)
				imuItem = Immutable.Map(state.dataList[action.index])
				imuItem = imuItem.set('selectStatus', !imuItem.get('selectStatus'))
				imuDataList = imuDataList.set(action.index, imuItem)
				// redux必须返回一个新的state
				return { ...state, ...{ dataList: imuDataList.toJS() } }
			case pro.EDITPRODUCTION:
				//避免引用类型数据，使用immutable进行数据转换
				imuDataList = Immutable.List(state.dataList)
				imuItem = Immutable.Map(state.dataList[action.index])
				imuItem = imuItem.set('selectNum', action.selectNum)
				imuDataList = imuDataList.set(action.index, imuItem)
				// redux必须返回一个新的state
				return { ...state, ...{ dataList: imuDataList.toJS() } }
			// 清空数据
			case pro.CLEARSELECTED:
				imuDataList = Immutable.fromJS(state.dataList)
				for (let i = 0; i < state.dataList.length; i++) {
					imuDataList = imuDataList.update(i, item => {
						item = item.set('selectStatus', false)
						item = item.set('selectNum', 0)
						return item
					})
				}
				return { ...state, ...{ dataList: imuDataList.toJS() } }
			default:
				return state
		}
	}
}
