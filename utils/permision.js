

// 默认首页的无条件菜单
export const MainMenus = ['accessoryCheck', 'facilityCheck','scanCode']

// 预设值的身份
export const ROLE_INSPECTOR = 'inspector'
export const ROLE_MAINTAIN = 'maintain'


//首页的功能显示 inspector是巡检员身份  maintain是维修工身份
 const inspectorRight_index = {
  "repair":{
    name: 'repair',
    describe:'快速报修'
  },
   "repairHistory": {
     name: 'repairHistory',
     describe: '维修历史'
   }
}
 const maintainRight_index  = {
  "waitingRepair": {
    name:'waitingRepair',
    describe: '待维修'
  },
  "inRepair": {
    name: 'inRepair',
    describe: '维修中'
  },
  "Repaired": {
    name: 'Repaired',
    describe: '维修完成'
  }
}

// 过滤身份
export function permisionFilter(role, callback) {
 
  let obj = {}
  let roleArr = []
  switch(role){
    case "inspector":
      roleArr = inspectorRight_index
    break;
    case "maintain":
      roleArr = maintainRight_index
    break; 
  }

  if (callback) {
    callback(roleArr)
  }
}