import _ from "lodash";

export function transformTreeData(list, id = "id", pid = "parent_id", isNoDeep, isNoFilter) {
  let treeData;
  if (!isNoDeep) {
    treeData = _.cloneDeep(list);
  } else {
    treeData = list;
  }
  let arr = [];
  treeData.forEach((item, index) => {
    let isParent = false;
    treeData.forEach(item2 => {
      if (item[pid] && item[pid] === item2[id]) {
        isParent = true;
        !Array.isArray(item2.children) && (item2.children = []);
        item2.children.push(item);
      }
    });
    !isParent && arr.push(index);
  });
  if (isNoFilter) {
    return treeData;
  }
  return treeData.filter((item, index) => arr.indexOf(index) > -1);
}
