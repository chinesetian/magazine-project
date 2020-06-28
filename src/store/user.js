import { observable, computed, autorun, action, configure } from 'mobx';
import { getCache, deleteCache } from '../utils/cache'

class UserStore {
    constructor() {
        autorun(() => {
          const isLogin = getCache("Nessus.token", "local") ? true : false;
        //   const userInfo = getCache("userInfo", "session") || {};
          this.setLoginState(!!isLogin);
        //   this.setUserInfo(userInfo);
        });
      }

    @observable isLogin = false;

    @observable userInfo = {};

    @observable token = '';


    @action
    setLoginState(flag){
        this.isLogin = flag;
        
    }


    logout(){
        this.setLoginState(false);
        deleteCache("apiToken", 'local');
        deleteCache("Nessus.token", 'local');
        window.location.href = '/login';
    }


}

export default new UserStore();