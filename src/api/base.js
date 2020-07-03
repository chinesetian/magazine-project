import {httpRequest} from './http'
import { Promise } from 'q';
import { base } from './url/url'

@httpRequest
class BaseService{

  // 数据字典类型
  dictType(){
    return this.$httpRequest({
      method: "post",
      url: `${base.dictType}`
    });
  }

  // 数据字典内容
  dictData(data){
    return this.$httpRequest({
      method: "post",
      url: `${base.dictData}`,
      data:data
    });
  }

  /**
   * 外部链接
   * @param {*} data 
   */
  getLinkData(data){
    return this.$httpRequest({
      method: "post",
      url: `${base.getLinkData}`,
      data:data
    });
  }

}

export default new BaseService()