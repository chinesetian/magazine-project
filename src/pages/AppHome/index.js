import React from 'react'
import IconFont from '../../components/iconFont'
import { Tabs, message } from 'antd';
import { withRouter, Switch, Route } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import Header from './components/header';
import { Footer } from '../../components/footer';
import MenuList from '../../components/menu'
import LayoutView from '../AppLayout'

import moment from 'moment'

import UserService from '../../api/user';
import ScanService from '../../api/scan'

import './index.less'
const { TabPane } = Tabs;

const menuList1 = [
    {menuName: '首页', name: 'view'},
    {menuName: '学术期刊', name: 'journal'},
    {menuName: '期刊范文', name: 'essay'},
    {menuName: '流程须知', name: 'process'},
    {menuName: '常见问题', name: 'issue'},
    {menuName: '新闻资讯', name: 'news'},
    {menuName: '关于我们', name: 'about'},
]
const menuList2 = [
    {menuName: '首页', name: 'detailview'},
    {menuName: '期刊范文', name: 'detailessay'},
    {menuName: '在线投稿', name: 'detailcontribute'},
    {menuName: '稿件查询', name: 'detailquery'},
    {menuName: '流程须知', name: 'detailprocess'},
    {menuName: '关于我们', name: 'detailabout'},
]

@withRouter
@inject('UserStore')
class HomeComponent extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isFooter: true,
        }

        let { UserStore, history } = this.props;
        debugger
        let { pathname } = history.location;
        if(pathname == '/home'){
            history.replace('/home/view');
        }    
    }

    componentWillMount(){
        
    }

    componentDidMount(){
        let { UserStore, history } = this.props;
        let { isLogin } = UserStore;
    }

    componentWillUnmount(){
     
    }

    // 查询某个floder分类的任务
    getScans(floderId){
        ScanService.getScans(floderId).then(res => {
            if(res.status === 200){
                let scanInfo = res.data.scans ? res.data.scans[0] : null;
                scanInfo && this.setState({scanInfo: scanInfo});
                this.loopQuery();
            }
        })
    }

    render(){

        let { isFooter, activeTab, userInfo, scanInfo } = this.state;
        debugger
        return (
            <div className="home-layout">
                <Header  userInfo={userInfo} />
                <MenuList menuList={menuList1} {...this.props}/>
                <div className="home-layout-content w1200">
                    <Switch>
                        <Route
                            exact
                            path="/home/404"
                            render={() => <div>404</div>}
                        />
                        <Route
                            path="/home/:module"
                            render={() => <LayoutView {...this.props}/>}
                        />
                    </Switch>
                </div>
                {isFooter ?  <Footer></Footer>: null}  
            </div>
        )
    }
}

export default HomeComponent;
