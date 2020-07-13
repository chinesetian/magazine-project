import { observable, action, computed, autorun, toJS, configure } from 'mobx'
import RouterList from '../router'
import * as _ from 'lodash'
// import { computTreeList, setCacheItem, getCacheItem } from '../../Utils/Tools'
configure({ enforceActions: 'observed' })

class MenuStore {
    constructor() {
    }

    RouterList = RouterList //前端所有的路由列表

    @observable authMenuList = [] //后端拉取用户菜单列表

    @observable activeMenuId = '105000' //默认选中的路由名称 getCacheItem('activeMenu', 'local') || 

    /**
     * 根据有权限的列表生成权限路由列表
     */
    @computed
    get authRouterList() {
        // let authList = this.authMenuListArray;
        //如果没有从后台取到菜单，直接返回空数组
        // if(!authList.length){ return []; }
        // let tempList = [];
        // console.log('前端的菜单、权限---', this.RouterList);
        // this.RouterList.forEach(router => {
        //     // 菜单和按钮权限
        //     let arrMenu = authList.filter(v => v && v.id * 1 === router.id * 1);
        //     if (arrMenu.length > 0) {
        //         tempList.push(router)
        //     }
        // });
        let tempList = this.RouterList
        // console.log('过滤后的菜单、权限---', tempList);
        return tempList
    }

    /**
     * 用户权限列表
     * 转换Array
     */
    @computed
    get authMenuListArray() {
        return this.authMenuList.map(v => v)
    }

    /**
     * 根据name获取路由对象
     * @param {string} name
     */
    getMenuForName(name) {
        return this.authRouterList.filter(v => v.name === name)[0]
    }

    /**
     * 根据ID获取路由对象
     * @param {string} id
     * create by Huangjingjing
     */
    getMenuForId(id) {
        return this.authRouterList.filter(v => (v.id === id) && !v.isAction)[0]
    }

    getResouceForId(id) {
        return this.authRouterList.filter(v => (v.id === id))[0]
    }

    /**
     * 根据url地址获取路由对象
     * @param {string} url
     */
    getMenuForUrl(url) {
        // 处理有些页面带参数如 abc/123
        url = url.replace(/\/\d+$/, '');
        return this.authRouterList.filter(v => v.url === url)[0]
    }

    /**
     * 根据url地址获取路由对象
     * @param {string} url
     */
    getMenuNameForUrl(url) {
        let module = this.getMenuForUrl(url)
        if (module && module.isAction) {
            return this.getMenuForId(module.parentId)
        } else {
            return module
        }
    }

    /**
     * 获取按钮权限
     * @param {string} actionName
     */
    getAuthAction(actionName) {
        return this.authRouterList.filter(
            v => v.name === actionName && v.isAction
        )[0]
    }

    /**
     * 获取按钮权限
     * @param {string} 
     */
    getPermissionById(id) {
        return this.authRouterList.filter(
            v => v.id === id
        )[0]
    }

    /**
     * 修改当前选中的路由
     * @param {string} name
     */
    @action
    setActiveMenuId(id) {
        this.activeMenuId = id
    }

    /**
     * 计算当前路由几何的树结构,过滤操作权限
     */
    // @computed
    // get menuRouterTree() {
    //     let temp = this.authRouterList.filter(v => v.isAction !== true);
    //     return computTreeList(temp)
    // }

    /**
     * 设置权限列表
     * @param {Array} menuList
     */
    @action
    setAuthMenuList(modules, privileges) {
        this.authMenuList = modules;
        console.log('后台用户的菜单---', modules);
    }
}

export default new MenuStore();
