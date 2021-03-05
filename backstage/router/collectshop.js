const router = require('koa-router')()

const connection = require('../model/connect')
const getQueryRes = require('../utils/getquerymsg')

//商品添加至收藏
router.get('/addtocol', async (ctx) => {
	//需要先查询是否已收藏 
	var collect = ctx.query
	console.log(collect.shopname)
	var findshop = 'SELECT shopname FROM collect WHERE shopid=' + collect.shopid + ' and user="' + collect.user + '"';
	let hasShop = await getQueryRes(connection, findshop)
	var msg = ''
	if(!hasShop[0]){
		let addCol = {
			shopid: collect.shopid,
			shopname: collect.shopname,
			user: collect.user,
			imgurl: collect.imgurl
		}
		var queryStr = 'INSERT INTO collect SET ?'
		let result = await getQueryRes(connection, queryStr, addCol)
		msg = '添加成功'
	}else{
		msg = '商品已收藏'
	}
	ctx.body = {
		code: 200,
		msg: msg
	}
})

//获取所有收藏商品
router.get('/', async (ctx) => {
	let username = ctx.session.userinfo
	console.log('collect', username)
	var queryStr = 'SELECT * FROM collect WHERE user=' + connection.escape(username)
	var result = await getQueryRes(connection, queryStr)
	console.log(result)
	ctx.body = {
		code: 200,
		allcol: {
			collist: result
		}
	}
})

//商品移出收藏
router.get('/cancelcol/:id', async (ctx) => {
	const {id} = ctx.params
	var queryStr = 'DELETE FROM collect WHERE col_id=' + id
	var result = await getQueryRes(connection, queryStr)
	ctx.body = {
		code: 200,
		msg: '移除成功'
	}
})


//查询收藏商品
router.get('/searchcol/:id', async (ctx) => {
	const {id} = ctx.params
})

module.exports = router