'use strict';
const crypto = require('crypto');
const jwt = require('jwt-simple');
const db = uniCloud.database();
const loginConfig = {
	appId: 'wx76a191a38565bf62',
	appSecret: '194f42462134c933df070f197448bd69'
};
exports.main = async (event, context) => {
	//event为客户端上传的参数
	//拼接参数，请求openid
	console.log("event.userInfo" + event.userInfo);
	uniCloud.logger.log("event.userInfoUni" + event.userInfo)
	uniCloud.logger.log("uniCloud.logger.log方式打印")
	console.log("console.log方式打印")
	console.log("event.code" + event.code);
	let data = {
		appid: loginConfig.appId,
		secret: loginConfig.appSecret,
		js_code: event.code,
		grant_type: 'authorization_code'
	};
	//向微信服务器提交code并接收openId和session_key
	const res = await uniCloud.httpclient.request('https://api.weixin.qq.com/sns/jscode2session', {
		method: 'GET',
		data,
		dataType: 'json'
	});
	console.log("res.status" + res.status);
	console.log("res.data" + res.data);
	console.log("res.data.openid" + res.data.openid);
	//符合以下三个条件才认为成功登录  status为200 有数据返回 返回数据有openid
	const success = res.status === 200 && res.data && res.data.openid;

	if (!success) {
		return {
			status: -1,
			msg: '微信登录失败'
		}
	}

	const openId = res.data.openid
	// token失效时间
	const tonkenExp = 7200000;
	// 当前时间
	let time = new Date().toUTCString();
	//加密生成token
	let tokenSecret = crypto.randomBytes(16).toString('hex'),
		token = jwt.encode(openId, tokenSecret);
	//向客户端返回userInfo
	let userInfo = {
		openId: res.data.openid,
		nickName: event.userInfo.nickName,
		avatarUrl: event.userInfo.avatarUrl,
		gender: event.userInfo.gender,
		city: event.userInfo.city,
		balance: '',
		couponNum: '',
		currentValue: '',
		giftBalance: '',
		needValue: '',
		level: '',
		pointNum: '',
		createTime: time,
		lastLoginTime: time
	}

	//用户信息更新
	let userUpdate = {
		openId: res.data.openid,
		nickName: event.userInfo.nickName,
		avatarUrl: event.userInfo.avatarUrl,
		gender: event.userInfo.gender,
		city: event.userInfo.city,
		lastLoginTime: time
	}
	//返回结果
	let userResult
	//根据openid去user表查数据
	const userInDB = await db.collection('users').where({
		openId
	}).limit(1).get();
	//如果是新用户 直接添加用户 并返回用户信息和token过期时间
	if (userInDB.data && userInDB.data.length === 0) {
		userResult = await db.collection('users').add({
			...userInfo,
			tokenSecret,
			exp: Date.now() + tonkenExp
		});
	} else {
		//如果是老用户，查询信息并返回userinfo和token过期时间
		userResult = await db.collection('users').where({
			openId
		}).update({
			...userUpdate,
			tokenSecret,
			exp: Date.now() + tonkenExp
		});
	}
	// 需要查询的列
	const fields = {
		nickName: 1,
		avatarUrl: 1,
		balance: 1,
		couponNum: 1,
		currentValue: 1,
		needValue: 1,
		giftBalance: 1,
		level: 1,
		pointNum: 1,
		gender: 1
	}


	// 获取指定field,完整用户数据
	let ResultOK = await db.collection('users').where({
		openId
	}).field(fields).get();
	console.log("ResultOK" + ResultOK)


	let ResultData = ResultOK.data[0];
	// 返回数据给客户端
	if (userResult.id || userResult.updated === 1) {
		return {
			'status': 0,
			'data': ResultData,
			'token': token,
			'msg': '登录成功'
		}
	}

	//返回数据给客户端
	return {
		'status': -1,
		'msg': '微信登录失败'
	}
};
