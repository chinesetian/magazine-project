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

  
   /**
   * 期刊范文列表
   * @param {*} data 
   */
  articleThesis(data){
    return this.$httpRequest({
      method: "post",
      url: `${base.articleThesis}`,
      data:data
    });
  }
     /**
   * 流程须知、关于我们
   * @param {*} data 
   */
  articleOther(data){
    return this.$httpRequest({
      method: "post",
      url: `${base.articleOther}`,
      data:data
    });
  }
   /**
   * 期刊查询
   * @param {*} data 
   */
  qikan(data){
    return this.$httpRequest({
      method: "post",
      url: `${base.qikan}`,
      data:data
    });
  }

   /**
   * 问题和咨询
   * @param {*} data 
   */
  articleInfo(data){
    return this.$httpRequest({
      method: "post",
      url: `${base.articleInfo}`,
      data:data
    });
  }

    /**
   * 顶部、底部图片
   * @param {*} data 
   */
  image(data){
    return this.$httpRequest({
      method: "post",
      url: `${base.image}`,
      data:data
    });
  }
  
}

export default new BaseService()