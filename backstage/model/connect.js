const mysql = require('mysql')

const sqlconfig = require('../config/sqlconfig')
//超过一个时间段会自动断开连接 createConnection
const connection = mysql.createPool(sqlconfig)

// connection.connect(function(err){
// 	if(err){
// 		console.error('error connection' + err.stack);
// 		return;
// 	}
// 	console.log('connected as id' + connection.threadId);
// });

module.exports = connection

