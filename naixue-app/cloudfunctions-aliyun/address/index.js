'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	//如果用户行为是获取地址
  if(event.action == 'getList'){
	// 获取指定用户的所有地址
    const openId = event.openId
    const res = await db.collection('addresses').where({
      openId
    }).get()
	//该用户的地址
    const resData = res.data
    return {
      status:0,
      data: resData
    }
	// 如果行为是删除地址
  }else if(event.action == 'deleteAddress'){
    const _id = event.id
	// 获取这个地址的id
    const res = await db.collection('addresses').where({
      _id
    }).remove()
    
    if(res.deleted === 1){
      return{
        status: 0,
        msg:'删除成功'
      }
    } else {
	  return{
	    status: -1,
	    msg:'删除失败'
	  }
	}
	// 如果用户行为是添加地址
  } else if(event.action == 'addAddress'){
	  // 用户输入的表单数据
    const data = event.data
    const street = event.data.street
	//获取用户的地址
    const addressDB = await db.collection('addresses').where({
      street
    }).get()
    if(addressDB.data.length === 0){
      const res = await db.collection('addresses').add(data)
      return {
        status:0,
        msg:'添加成功'
      }
    }
    return {
      status:-1,
      msg:'地址已存在'
    }
	// 编辑地址
  }else if(event.action == 'editAddress'){
	  // 获取id
    let _id =event.data._id
 // 修改指定id的数据库实体类
    let fields ={
      accept_name:event.data.accept_name,
      gender:event.data.gender,
      mobile:event.data.mobile,
      area:event.data.area,
      street:event.data.street
    }
	// 根据id更新实体
    const res = await db.collection('addresses').where({
      _id
    }).update({
      ...fields
    })
    if(res.updated ===1){
      return{
        status:0,
        msg:'数据修改成功'
      }
    }else if (res.updated === 0){
      return{
        status:-1,
        msg:'地址未改变'
      }
    }
	// 根据id获取地址
  }else if (event.action =='getOne'){
    const _id = event.id
    const res = await db.collection('addresses').where({
      _id
    }).limit(1).get()
    const resData = res.data
    return {
      status:0,
      data: resData
    }
  }
};