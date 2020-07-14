import React from 'react'
import { message } from 'antd';
import { withRouter, Switch, Route } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import Header from './components/header';
import { Footer } from '../../components/footer';
import MenuList from '../../components/menu'
import LayoutView from '../AppLayout'

import './index.less'

const menuList1 = [
    {menuName: '首页', name: 'view'},
    {menuName: '学术期刊', name: 'journal'},
    {menuName: '期刊范文', name: 'essay'},
    {menuName: '流程须知', name: 'process'},
    {menuName: '常见问题', name: 'issue'},
    {menuName: '新闻资讯', name: 'news'},
    {menuName: '关于我们', name: 'about'},
]


@withRouter
// @inject('UserStore')
class HomeComponent extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isFooter: true,
        }

        let { UserStore, history } = this.props;
        let { pathname } = history.location;
        if(pathname == '/home'){
            history.replace('/home/view');
        }    
        console.log("homeprops", this.props)
    }

    componentWillMount(){
        
    }

    componentDidMount(){
    }

    componentWillUnmount(){
    }

    render(){

        let { isFooter, userInfo, } = this.state;
        return (
            <div className="home-layout">
                <Header  userInfo={userInfo} />
                <MenuList menuList={menuList1} {...this.props}/>
                <div className="home-layout-content">
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
