// 默认首页的权限配置
export const MainMenus = [
  {
    icon: 'icon-dici',
    title: '快速报修',
    roles: ['inspector'],
    handler: 'repairs'
  },
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
    handler: 'scanQR',
    roles: ['inspector', 'maintain'],
  }
]


// 过滤身份
export function permisionFilter(role,callback){
  let arr = []
  MainMenus.forEach(item=>{
      if(item.roles.indexOf(role) >= 0){

        arr.push(item)
      }
  }) 
  console.log(role)
  if(callback){
    callback(arr)
  }
}
