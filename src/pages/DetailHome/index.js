import React from 'react'
import { Tabs, message } from 'antd';
import { withRouter, Switch, Route } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { Footer } from '../../components/footer';
import MenuList from '../../components/menu'
import LayoutView from '../AppLayout'
import { setCache, getCache } from '../../utils/cache';
import DetailTopInfo from '../../components/detailTopInfo'
import * as _ from 'lodash';

import './index.less'
const menuList2 = [
    {menuName: '首页', name: 'detailindex'},
    {menuName: '期刊简介', name: 'detailview'},
    {menuName: '在线投稿', name: 'detailcontribute'},
    {menuName: '稿件查询', name: 'detailquery'},
    // {menuName: '投稿须知', name: 'contributenotice'},
    {menuName: '新闻咨询', name: 'detailnews'},
    // {menuName: '期刊范文', name: 'detailessay'},
    {menuName: '投稿须知', name: 'detailprocess'},
    {menuName: '关于我们', name: 'detailabout'},
]

const { Dict, Service, Store } = window

@withRouter
class DetailHomeComponent extends React.Component {
    constructor(props){
        super(props)
        const { location, history } = props;
        let query = {};
        try {  
          let arr = window.location.pathname.split("/");
          let searchId = arr[3];
          if(searchId){
            query = {id: searchId}
          } else {
            query = getCache("detailData", "session")
            location.pathname = `${location.pathname}/${query.id}`;
            history.replace(location);
          }
        } catch (error) {
          
        }
    
        query.id && this.qikanDetail(query)

        this.state = {
            data: {},
            isFooter: true,
            imgs: _.cloneDeep(Dict.getDict("periodical_image_type").find(v => v.dictValue == "periodical_image_type_child_page_top").url.split(",") || []),
        }
        // console.log("detailprops", this.props)
    }

    componentWillMount(){

    }

    componentDidMount(){

    }

    componentWillUnmount(){
     
    }

    qikanDetail(data){
        Service.base.qikanDetail(data).then(res => {
          if(res.code == 0){
            setCache('detailData', res.data, "session")
            this.setState({data: res.data,});
          } else {
              this.setState({data: {},});
          }
        }).catch(e => {
          this.setState({data: {},});
        })
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

        let { isFooter, imgs, data, } = this.state;
        return (
            <div className="detail-home-layout">
                
                <div className="top-info-box w1200">
                    {/* {imgs.map((v,i) => {
                        return(
                            <img key={i}  src={`/magazine${v}`} />
                        )
                    })} */}
                    <DetailTopInfo data={data}></DetailTopInfo>
                </div>
                <div className="menu-box">
                    <MenuList menuList={menuList2} {...this.props}/>
                </div>
                <div className="detail-layout-content">
                    <div className="detail-content w1200">
                        {/* <span className="back-home" onClick={this.backHome}>返回首页</span> */}
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
                </div>
                {isFooter ?  <Footer isLink={false}></Footer>: null}  
            </div>
        )
    }
}

export default DetailHomeComponent;
