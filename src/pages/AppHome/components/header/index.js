import React from 'react'
import { Divider, Modal, message, Input } from 'antd'
import { withRouter } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import IconFont from '../../../../components/iconFont'
import './index.less'
import UserService from '../../../../api/user';
import { deleteCache } from '../../../../utils/cache'
import * as _ from 'lodash';

const { Search } = Input;
const logo = "/resource/image/logo.jpg";
const hottel = "/resource/image/hottel.png";

const { Service, Dict } = window

@withRouter
@inject('UserStore')
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
        message.warn("正在开发中...")
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
                            placeholder="杂志名称 / 主管主办 / 栏目 / 分类 / 级别 / 订阅"
                            enterButton="搜文章"
                            size="default"
                            onSearch={value => this.change(value)}
                        />
                    </div>
                    <div className="phone">
                        <span>咨询热线</span>
                        <span className="number">{tel || ''}</span>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;