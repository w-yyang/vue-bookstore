const router = require('koa-router')()

const connection = require('../model/connect')
const getQueryRes = require('../utils/getquerymsg')

//登录
router.post('/login', async (ctx) => {
	const {username, password} = ctx.request.body
	console.log(username, password)
	var result = null
	var msg = ''
	var state = 1
	var queryStr = 'SELECT * FROM user WHERE username=' + connection.escape(username)
	result = await getQueryRes(connection, queryStr)
	if(result[0]){
		if(result[0].password == password){
			msg = '登录成功'
			ctx.session.userinfo = username
			state = 0
		}else{
			msg = '登录失败'
		}
	}else{
		msg = '无此用户'
	}
	//设置session
	ctx.body = {
		code: 200,
		msg: msg,
		state: state
	}
})

//用户注册
router.post('/adduser', async (ctx) => {
	const {username, password} = ctx.request.body
	var findUserStr = 'SELECT * FROM user WHERE username=' + connection.escape(username)
	var hasUser = await getQueryRes(connection, findUserStr)
	if(!hasUser[0]){
		let addUser = {
			username: username,
			password: password,
			level: 1,
			address: '',
			phone: ''
		}
		var msg = ''
		var queryStr = 'INSERT INTO user SET ?'
		let result = await getQueryRes(connection, queryStr, addUser)
		console.log(result)
		msg = '注册成功'
		console.log(msg)
	}else{
		msg = '用户名已注册'
	}
	ctx.body = {
		code: 200,
		msg: msg
	}
})

router.get('/usermsg', async (ctx) => {
	var {username} = ctx.query
	var queryStr = 'SELECT * FROM user WHERE username=' + connection.escape(username)
	let result = await getQueryRes(connection, queryStr)
	result[0].password = ''
	console.log(result)
	ctx.body = {
		code: 200,
		usermsg: result[0]
	}
})

router.post('/altermsg', async (ctx) => {
	console.log(ctx.body)
	var {address, phone, username} = ctx.request.body
	var queryStr = `UPDATE user SET phone='${phone}', address='${address}' WHERE username=` + connection.escape(username)
	let result = await getQueryRes(connection, queryStr)
	ctx.body = {
		code: 200,
		msg: '修改成功'
	}
})

//退出登录
router.get('/logout', async (ctx) => {
	//销毁session
	ctx.session.userinfo = null
	ctx.body = {
		code: 200,
		msg: '退出成功'
	}
})

module.exports = router