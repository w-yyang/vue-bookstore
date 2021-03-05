function getQueryRes(connection, queryStr, obj={}){
	return new Promise((resolve, reject) => {
		connection.query(queryStr, obj, function(err, data){
			if(err){
				console.log(err)
			}else{
				resolve(data)
			}
		})
	})
}

module.exports = getQueryRes