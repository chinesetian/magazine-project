import React from 'react'
import { Tabs, message } from 'antd';
import { withRouter, Switch, Route } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { Footer } from '../../components/footer';
import MenuList from '../../components/menu'
import LayoutView from '../AppLayout'


import './index.less'
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
class DetailHomeComponent extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isFooter: true,
        }

        let { UserStore, history } = this.props;
        let { pathname } = history.location;   
    }

    componentWillMount(){
        
    }

    componentDidMount(){

    }

    componentWillUnmount(){
     
    }


    render(){

        let { isFooter, activeTab, userInfo, scanInfo } = this.state;
        return (
            <div className="home-layout">
                <div className="w1200" style={{height: 220}}>图片</div>
                <MenuList menuList={menuList2} {...this.props}/>
                <div className="home-layout-content w1200">
                    <Switch>
                        <Route
                            exact
                            path="/home/404"
                            render={() => <div>404</div>}
                        />
                        <Route
                            path="/detail/:module"
                            render={() => <LayoutView {...this.props}/>}
                        />
                    </Switch>
                </div>
                {isFooter ?  <Footer></Footer>: null}  
            </div>
        )
    }
}

export default DetailHomeComponent;
