import _ from "lodash";

const actionTitle = [
  { value: "launch", label: "开始扫描" },
  { value: "pause", label: "暂停扫描" },
  { value: "resume", label: "继续扫描" },
  { value: "stop", label: "停止扫描" }
];

const scanningStatus = [
  { value: "running", label: "扫描中" },
  { value: "resuming", label: "已继续" },
  { value: "paused", label: "已暂停" },
  { value: "pausing", label: "已暂停" },
  { value: "completed", label: "已完成" },
  { value: "stopping", label: "已停止" },
  { value: "canceled", label: "已取消" },
  { value: "empty", label: "暂无" }
];

const bugLevel = [
  { value: "Info", label: "提示信息" },
  { value: "None", label: "提示信息" },
  { value: "Low", label: "低风险" },
  { value: "Medium", label: "中风险" },
  { value: "High", label: "高风险" },
  { value: "Critical", label: "严重" }
];

const tabList = [
  {
    title: "安全扫描",
    icon: "icon-icon_appicon",
    key: 1
  },
  {
    title: "扫描报告",
    icon: "icon-icon_report",
    key: 2
  },
  {
    title: "定时扫描",
    icon: "icon-icon_alarm",
    key: 3
  },
  {
    title: "账户设置",
    icon: "icon-icon_mine",
    key: 4
  }
];

const dayOption = [
  { value: 1, label: "1天" },
  { value: 2, label: "2天" },
  { value: 3, label: "3天" },
  { value: 4, label: "4天" },
  { value: 5, label: "5天" },
  { value: 6, label: "6天" },
  { value: 7, label: "7天" },
  { value: 8, label: "8天" },
  { value: 9, label: "9天" },
  { value: 10, label: "10天" },
  { value: 11, label: "11天" },
  { value: 12, label: "12天" },
  { value: 13, label: "13天" },
  { value: 14, label: "14天" },
  { value: 15, label: "15天" },
  { value: 16, label: "16天" },
  { value: 17, label: "17天" },
  { value: 18, label: "18天" },
  { value: 19, label: "19天" },
  { value: 20, label: "20天" }
];

const repeat = [
  { value: "ONETIME", label: "一次" },
  { value: "DAILY", label: "天" },
  { value: "WEEKLY", label: "周" },
  { value: "MONTHLY", label: "月" },
  { value: "YEARLY", label: "年" }
];

/*根据键值读取值*/
const getKeyValue = (code, key) => {
  let lable;
  try {
    let temp = eval(code).filter(v => v.value == key);
    lable = temp.length > 0 ? temp[0]["label"] : key;
  } catch (e) {
    console.error(e);
    lable = key;
  }
  return lable;
};

const findLableByValue = (arr, value) => {
  let result = arr.find(a => a.value === value.toString()) || {};
  return result.label || value;
};

const map = {
  actionTitle,
  repeat,
  dayOption,
  bugLevel,
  tabList,
  scanningStatus
};

function getDict(name) {
  return map[name];
}

function getLabel(name, code, getText = false) {
  let label;
  try {
    let temDict = getDict(name);
    if (Array.isArray(temDict)) {
      let item = temDict.find(v => {
        if (!v.value) {
          return false;
        }
        if (Array.isArray(v.value)) {
          return v.value.findIndex(c => c === code) > -1;
        } else {
          let arr = String(v.value).split(",");
          return arr.findIndex(v => v === code) > -1;
        }
      });
      if (getText) {
        label = item ? item.text || item.label : null;
      } else {
        label = item ? item.label : null;
      }
    } else {
      label = temDict.label;
    }
  } catch (e) {
    console.error(e);
    label = null;
  }
  return label;
}

const append = (arr = [], typeCode) => {
  for (let i in typeCode) {
    //   arr.forEach(item => {
    //     if (item.dictType === typeCode[i].dictType) {
    //       typeCode[i] = {
    //         ...typeCode[i],
    //         name: typeCode[i].dictName
    //       };
    //     }
    //   });
    typeCode[i].name = typeCode[i].dictType;
    if (!map[typeCode[i].name]) {
      let list = arr.filter(v => v.dictType === typeCode[i].dictType)
        .map(v => {
          return {
            ...v,
            code: v.dictCode,
            value: v.dictValue,
            label: v.dictLabel,
            typeCode: v.dictType,
            typeName: typeCode[i].name
          };
        });
      map[typeCode[i].name] = _.orderBy(list, ["value"], "asc");
    }
  }
  map['periodical'] = typeCode;
};

const Dict = {
  getKeyValue,
  findLableByValue,

  getLabel,
  getDict,
  append,
  map
};

window.Dict = Dict;
export default Dict;
