export const props = {
	breads: {
		type: Array
	},
	title: {
		type: String,
		required: true
	},
	primaryType: {
		type: String,
		default: 'input'
	},
	labelWidth: {
		type: Number,
		default: 145
	},
	forms: {
		type: Array
	},
	defaultparams: {
		type: Object
	},
	searchBtns: {
		type: Array
	},
	globalBtns: {
		type: Array
	},
	cols: {
		type: Array
	},
	list: {
		type: Array
	},
	total: {
		type: Number
	},
	pageSizeKey: {
		type: String,
		default: 'limit'
	},
	pageStartKey: {
		type: String,
		default: 'start'
	},
	tableBtns: {
		type: Array
	}
}