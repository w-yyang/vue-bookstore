const Router = require('koa-router')

const connection = require('../model/connect')
const getQueryRes = require('../utils/getquerymsg')

const router = new Router()

//全部订单
router.get('/', async (ctx) => {
	let {username} = ctx.query
	var queryStr = 'SELECT * FROM orders WHERE username=' + connection.escape(username)
	let result = await getQueryRes(connection, queryStr)
	ctx.body = {
		code: 200,
		allorder: result
	}
})

//退货
router.post('/salesret', async (ctx) => {
	ctx.body = {
		code: 200,
		msg: '退货成功'
	}
})

router.get('/delorder/:id', async (ctx) => {
	const {id} = ctx.params
	var queryStr = 'DELETE FROM orders WHERE id=' + id
	var result = await getQueryRes(connection, queryStr)
	ctx.body = {
		code: 200,
		msg: '删除成功'
	}
})

module.exports = router