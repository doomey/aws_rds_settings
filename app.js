var pool = require('./config/dbpool');

pool.getConnection(function(err, connection) {
	if (err) {
		console.log(err);
	} else {
		var sql = "SELECT date_format(now(), '%Y-%m-%d %H:%i:%s') AS 'UTC', " +
			      "       date_format(convert_tz(now(),'+00:00','+9:00'), '%Y-%m-%d %H:%i:%s') as 'GMT+9'";
		connection.query(sql, function(err, results) {
			console.log("AWS RDS 기준시각(UTC+0): " + results[0]['UTC']);
			console.log("대한민국 표준시각(GMT+9): " + results[0]['GMT+9']);
			connection.release();
			pool.end(function(err) {
				if (err) {
					console.log(err);
				} else {
					console.log("커넥션 풀을 종료합니다.");
				}
			});
		});
	}
});
