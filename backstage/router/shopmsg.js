const router = require('koa-router')()

const connection = require('../model/connect')
const getQueryRes = require('../utils/getquerymsg')

//主页陈列的商品
router.get('/display', async (ctx) => {
	let sqlStr = 'SELECT shopid, name, imgurl FROM shop LIMIT 8'
	var result = await getQueryRes(connection, sqlStr)
	ctx.body = {
		code: 200,
		shops: {
			shoplist: result
		}
	}
})

//按商品类别获取
router.get('/shopclassify/:id', async (ctx) => {
	const category = ctx.params
	let sqlStr = 'SELECT * FROM shop WHERE classify=' + category.id
	var result = await getQueryRes(connection, sqlStr)
	ctx.body = {
		code: 200,
		shops: {
			shoplist: result
		}
	}
})

//依据id查找商品
router.get('/searchshop/:id', async (ctx) => {
	const {id} = ctx.params
	var queryStr = 'SELECT * FROM shop WHERE shopid=' + id
	var result = await getQueryRes(connection, queryStr)
	let shopMsg = result[0]
	ctx.body = {
		code: 200,
		shopmsg: shopMsg
	}
})

module.exports = router