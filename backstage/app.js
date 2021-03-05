const path = require('path')
const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session')
const mount = require('koa-mount')
const staticFiles = require('koa-static')

const app = new Koa()
const router = new Router()

const bill = require('./router/bill')
const collection = require('./router/collectshop')
const shop = require('./router/shopmsg')
const user = require('./router/user')
const order = require('./router/order')
const buy = require('./router/buy')
const sessionConfig = require('./config/sessionConfig')

app.keys = ['userinfo']
app.use(bodyParser())
app.use(session(sessionConfig, app))
app.use(staticFiles(path.join(__dirname + '/public/')))

app.use(require('./middleware/loginguard'))

//商品
app.use(mount('/api/shop', shop.routes()))

//用户
app.use(mount('/api/admin/user', user.routes()))

//收藏
app.use(mount('/api/admin/collection', collection.routes()))

//交易
app.use(mount('/api/admin/order', order.routes()))

//账单
app.use(mount('/api/admin/bill', bill.routes()))

//购买
app.use(mount('/api/admin/buy', buy.routes()))

app.use(router.routes())
	.use(router.allowedMethods())

app.listen(3000, () => {
	console.log('koa服务器启动成功')
})

//前后端分离项目 图片存于后端 前端导入图片路径