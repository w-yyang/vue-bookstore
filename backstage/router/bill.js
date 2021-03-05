const router = require('koa-router')()

const connection = require('../model/connect')
const getQueryRes = require('../utils/getquerymsg')

//历史账单
router.get('/', async (ctx) => {
	let {username} = ctx.query
	var queryStr = 'SELECT * FROM bill WHERE username=' + connection.escape(username)
	var result = await getQueryRes(connection, queryStr)
	ctx.body = {
		code: 200,
		billlist: result
	}
})

//清除账单
router.get('/removeall', async (ctx) => {
	ctx.body = {
		code: 200,
		msg: '清除成功'
	}
})

//删除单个订单
router.get('/removeone/:id', async (ctx) => {
	let {id} = ctx.params
	var queryStr = 'DELETE FROM bill WHERE bill_id=' + id
	var result = await getQueryRes(connection, queryStr)
	ctx.body = {
		code: 200,
		msg: '删除成功'
	}
})

module.exports = router