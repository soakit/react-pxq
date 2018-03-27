const home = {
	// 保存表单数据
	SAVEFORMDATA: Symbol('SAVEFORMDATA'),
	// 保存图片
	SAVEIMG: Symbol('SAVEIMG'),
	// 清空数据
	CLEARDATA: Symbol('CLEARDATA')
}

export const actions = {
	// 保存表单数据
	saveFormData: (value, datatype) => {
		return {
			type: home.SAVEFORMDATA,
			value,
			datatype
		}
	},
	// 保存图片地址
	saveImg: path => {
		return {
			type: home.SAVEIMG,
			path
		}
	},
	// 保存图片地址
	clearData: () => {
		return {
			type: home.CLEARDATA
		}
	}
}

let defaultState = {
	orderSum: '', //金额
	name: '', //姓名
	phoneNo: '', //手机号
	imgpath: '' //图片地址
}
export const reducer = {
	// 首页表单数据
	formData: (state = defaultState, action = {}) => {
		switch (action.type) {
			case home.SAVEFORMDATA:
				return { ...state, ...{ [action.datatype]: action.value } }
			case home.SAVEIMG:
				return { ...state, ...{ imgpath: action.path } }
			case home.CLEARDATA:
				return { ...state, ...defaultState }
			default:
				return state
		}
	}
}
