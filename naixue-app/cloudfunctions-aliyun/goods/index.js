'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	/**
lookup只是一个方法，是被用于aggregate聚合函数当中去的，
因为是类似左连接查询，所以肯定要确定哪个是左表，哪个是右表，以及用哪个字段来进行表连接
参数说明:
     from:  需要去连接的collection，也就是右表的表名
     localField：需要去进行连接的左表的字段名
     foreignField: 右表(from参数后的那个collection)的字段名，可以与左表的字段名(localField)不一样,但是数据类型必须一致
     as: 形成的新的数组的名称
	 */
	const res = await db.collection('category').aggregate().lookup({
		from: 'goods',
		localField: 'goods_type',
		foreignField: 'goods_type',
		as: 'goods_list'
	}).end()
	//返回数据给客户端
	return res
};
