import React from 'react'
import { Tabs, message } from 'antd';
import { withRouter, Switch, Route } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { Footer } from '../../components/footer';
import MenuList from '../../components/menu'
import LayoutView from '../AppLayout'
import * as _ from 'lodash';

import './index.less'
const menuList2 = [
    {menuName: '首页', name: 'detailview'},
    {menuName: '期刊范文', name: 'detailessay'},
    {menuName: '在线投稿', name: 'detailcontribute'},
    {menuName: '稿件查询', name: 'detailquery'},
    {menuName: '流程须知', name: 'detailprocess'},
    {menuName: '关于我们', name: 'detailabout'},
]

const { Dict, Service, Store } = window

@withRouter
@inject('UserStore')
class DetailHomeComponent extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            isFooter: true,
            imgs: _.cloneDeep(Dict.getDict("periodical_image_type").find(v => v.dictValue == "periodical_image_type_child_page_top").url.split(",") || []),
        }

        let { UserStore, history } = this.props;
        let { pathname } = history.location;  
        debugger 
        console.log("detailprops", this.props)
    }

    componentWillMount(){

    }

    componentDidMount(){

    }

    componentWillUnmount(){
     
    }

    backHome = () => {
        let page = Store.MenuStore.getMenuForName('view');
        let { history } = this.props
        let { location } = history
        if (page) {
            location.pathname = page.url
            history.push(location);
        } else {
            history.push('/home/404');
        }
    }

    render(){

        let { isFooter, imgs, } = this.state;
        return (
            <div className="detail-home-layout">
                
                <div className="top-img w1200">
                    {imgs.map((v,i) => {
                        return(
                            <img key={i}  src={`/magazine${v}`} />
                        )
                    })}
                </div>
                <MenuList menuList={menuList2} {...this.props}/>
                <div className="detail-layout-content w1200">
                    <span className="back-home" onClick={this.backHome}>返回首页</span>
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
