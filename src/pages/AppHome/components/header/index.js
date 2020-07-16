import React from 'react'
import { message, Input, Icon} from 'antd'
import { withRouter } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import './index.less'
import * as _ from 'lodash';

const { Search } = Input;

const { Service, Dict, Store } = window

@withRouter
class Header extends React.Component{
    constructor(props){
        super(props)
        this.state = {
        }
    }

    componentDidMount(){
    }


    change = (value) => {
        console.log(value)
        if(value.length <= 0){
            message.warn("请输入查询内容")
            return false
        }
        let page = Store.MenuStore.getMenuForName('journal');
        let { history } = this.props
        let { location } = history
        if (page) {
        location.pathname = page.url
        location.state = {data: {keyword: value}}
        history.push(location);
        } else {
            history.push('/home/404');
        }
    }

    render(){
        let logo = []
        let tel = []
        try {
            logo = _.cloneDeep(Dict.getDict("periodical_image_type").find(v => v.dictValue == "periodical_image_type_logo").url.split(",") || []);
            tel = _.cloneDeep(Dict.getDict("periodical_other_info").find(v => v.dictValue == "periodical_other_info_tel").label || '');
        } catch (error) {
            
        }

        return(
            <div className="home-layout-header w1200">
                <div className="home-header-message">
                    <div className="logo">
                        <a href={'/'}>
                            {logo.map((v,i) => {
                                return(
                                    <img key={i}  src={`/magazine${v}`} />
                                )
                            })}
                        </a>
                    </div>
                    <div className="search">
                        <Search
                            placeholder="期刊名称"
                            enterButton="搜索"
                            size="default"
                            onSearch={value => this.change(value)}
                        />
                    </div>
                    <div className="phone">
                        
                        <span>咨询热线<Icon type="phone" /></span>
                        <span className="number">{tel || ''}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;