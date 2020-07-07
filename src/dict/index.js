import _ from "lodash";

//传参用的key值name{name: '张三'}
const transformPeriodical = {
  periodical_honor: "periodicalHonor",
  periodical_included: "periodicalIncluded",
  periodical_level: "periodicalLevel",
  periodical_major_natural_science: "periodicalMajorNaturalScience",
  periodical_major_social_science: "periodicalMajorSocialScience",
  periodical_period: "periodicalPeriod",
  periodical_publish: "periodicalPublish",
  periodical_region: "periodicalRegion",
  periodical_type: "periodicalType",
}

// const actionTitle = [
//   { value: "launch", label: "开始扫描" },
//   { value: "pause", label: "暂停扫描" },
//   { value: "resume", label: "继续扫描" },
//   { value: "stop", label: "停止扫描" }
// ];

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
  // actionTitle,
  transformPeriodical,
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

/**
 * 
 * @param {*} arr  所有字典
 * @param {*} typeCode 期刊大类
 * remarks: "期刊分类查询条件"，其他是另外的信息
 */
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

    // 大类
    typeCode[i].name = typeCode[i].dictType;
    typeCode[i].transformPeriodical = transformPeriodical[typeCode[i].dictType] ? transformPeriodical[typeCode[i].dictType] : undefined
    // 小类
    if (!map[typeCode[i].name]) {
      let list = arr.filter(v => v.dictType === typeCode[i].dictType).map(v => {

          return {
            ...v,
            code: v.dictCode,
            value: v.dictValue,
            label: v.dictLabel,
            typeCode: v.dictType,
            // typeName: typeCode[i].name
            transformPeriodical: transformPeriodical[v.dictType] ? transformPeriodical[v.dictType] : undefined
          };
        });
      map[typeCode[i].name] = _.orderBy(list, ["value"], "asc");
    }
  }
  map['periodical'] = typeCode; //大类存储
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
