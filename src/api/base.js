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

     /**
   * 范文列表、没total
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
   * 期刊查询、没total
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
   * 问题和咨询、没total
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
   * 范文列表、有total
   * @param {*} data 
   */
  articleThesispageList(data){
    return this.$httpRequest({
      method: "post",
      url: `${base.articleThesispageList}`,
      data:data
    });
  }

     /**
   * 期刊查询、有total
   * @param {*} data 
   */
  qikanpageList(data){
    return this.$httpRequest({
      method: "post",
      url: `${base.qikanpageList}`,
      data:data
    });
  }

   /**
   * 问题和咨询、有total
   * @param {*} data 
   */
  articleInfopageList(data){
    return this.$httpRequest({
      method: "post",
      url: `${base.articleInfopageList}`,
      data:data
    });
  }

  /**
   * 期刊查询详情
   * @param {*} data 
   */
  qikanDetail(data){
    return this.$httpRequest({
      method: "get",
      url: `${base.qikanDetail}/${data.id}`,
    });
  }

   /**
   * 稿件上传
   * @param {*} data 
   */
  uploadFile(data){
    return this.$httpRequest({
      method: "post",
      url: `${base.uploadFile}`,
      data:data
    });
  }

     /**
   * 投稿
   * @param {*} data 
   */
  tougaoAdd(data){
    return this.$httpRequest({
      method: "post",
      url: `${base.tougaoAdd}`,
      data:data
    });
  }

     /**
   * 投稿详情
   * @param {*} data 
   */
  tougaoDetail(data){
    return this.$httpRequest({
      method: "post",
      url: `${base.tougaoDetail}/${data.no}`,
      data:data
    });
  }

     /**
   * 投稿列表
   * @param {*} data 
   */
  tougaoList(data){
    return this.$httpRequest({
      method: "post",
      url: `${base.tougaoList}`,
      data:data
    });
  }
  
}

export default new BaseService()