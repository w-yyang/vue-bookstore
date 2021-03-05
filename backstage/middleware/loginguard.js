async function guard(ctx, next){
	let urlArr = ctx.url.split('/')
	if(urlArr[2] == "shop"){
		await next()
	}else{
		if(ctx.url == "/api/admin/user/login" || "/api/admin/user/adduser" || ctx.session.userinfo!= undefined || ctx.session.userinfo != null){
			await next()
		}else{
			console.log('拦截生效')
			ctx.body = {
				code: 200,
				msg: '用户未登录'
			}
		}
	}
}

module.exports = guard