const Router = require('koa-router')

const router = new Router()

const connection = require('../model/connect')
const getQueryRes = require('../utils/getquerymsg')

router.post('/', async (ctx) => {
	const {username, shopid} = ctx.request.body
	var findShop = 'SELECT * FROM shop WHERE shopid=' + shopid
	var result = await getQueryRes(connection, findShop)
	let shopMsg = result[0]
	ctx.body = {
		code: 200,
		shopmsg: shopmsg
	}
})

router.post('/confirmbuy', async (ctx) => {
	var buymsg = ctx.request.body
	console.log(buymsg)
	var date = new Date()
	let time = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
	var recordMsg = {
		time: time,
		shopid: buymsg.shopid,
		shopname: buymsg.shopname,
		price: buymsg.price,
		username: buymsg.username
	}
	var orderMsg = {
		username: buymsg.username,
		shopid: buymsg.shopid,
		shopname: buymsg.shopname,
		price: buymsg.price,
		imgurl: buymsg.imgurl
	}
	console.log('order', orderMsg)
	var addRecord = 'INSERT INTO bill SET ?'
	var addOrder = 'INSERT INTO orders SET ?'
	//注意表单名不可与系统表单名相同 例如order 此数据库表名不可用
	let reBack = await getQueryRes(connection, addRecord, recordMsg)
	let orBack = await getQueryRes(connection, addOrder, orderMsg)
	console.log(reBack, orBack)
	ctx.body = {
		code: 200,
		msg: '购买成功'
	}
})


module.exports = router