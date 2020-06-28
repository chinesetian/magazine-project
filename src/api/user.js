import {httpRequest} from './http'
import { Promise } from 'q';
import { user } from './url/url'

@httpRequest
class userService{

  /**
   * 查询服务状态
   */
  serverStatus(){
    return this.$httpRequest({
      method: "get",
      url: user.serverStatus
    });
  }

  /**
   * 登录
   * @param {*} options 
   */
  login(options){
    return this.$httpRequest({
      method: "post",
      data: options,
      url: user.login
    });
    // return Promise.resolve({
    //   code: 200,
    //   data: {}
    // })
  }

  /**
   * 退出
   */
  logout(){
    return this.$httpRequest({
      method: "delete",
      url: user.login
    });
  }

  /**
   * 获取用户信息
   */
  getUserInfo(){
    return this.$httpRequest({
      method: "get",
      url: user.login
    });
  }

  changePwd(options){
    return this.$httpRequest({
      method: "put",
      data: options,
      url: user.changePwd
    });
  }

  getUUID(time){
    return this.$httpRequest({
      method: "get",
      url: `${user.getJsFile}${time}`
    });
  }

}

export default new userService()