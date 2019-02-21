// 默认首页的
export const MainMenus = [
 
  {
    icon: 'icon-gaojing',
    title: '备件查询',
    handler: 'accessoryList',
    roles: ['inspector', 'maintain'],
  },
  {
    icon: 'icon-jichuguanli',
    title: '设备查询',
    handler: 'facilityList',
    roles: ['inspector', 'maintain'],
  },
  {
    icon: 'icon-saoma',
    title: '扫码识别',
    handler: 'scanCode',
    roles: ['inspector', 'maintain'],
  }
]
//默认首页的权限配置
export const PermissionMenus = [
  {
    icon: 'icon-dici',
    title: '快速报修',
    badge: 0,
    roles: ['inspector'],
    handler: 'repairs'
  },
  {
    icon: 'icon-ceshishenqing',
    title: '待维修',
    badge: 0,
    roles: [ 'maintain'],
    handler: 'order1'
  },
  {
    icon: 'icon-renjijiaohu',
    title: '维修中',
    badge: 1,
    roles: [ 'maintain'],
    handler: 'order2'
  },
  {
    icon: 'icon-changjingguanli',
    title: '历史记录',
    roles: [ 'maintain'],
    handler: 'record'
  }
]


// 过滤身份
export function permisionFilter(role,callback){
  let arr = []
  PermissionMenus.forEach(item=>{
      if(item.roles.indexOf(role) >= 0){
        // console.log(item)
        arr.push(item)
      }
  }) 
  // console.log(role)
  if(callback){
    callback(arr)
  }
}
