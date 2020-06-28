import React from 'react'
import { Divider, Modal, message, Input } from 'antd'
import { withRouter } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import IconFont from '../../../../components/iconFont'
import './index.less'
import UserService from '../../../../api/user';
import { deleteCache } from '../../../../utils/cache'

const { Search } = Input;
const logo = "/resource/image/logo.png";
const hottel = "/resource/image/hottel.png";

@withRouter
@inject('UserStore')
class Header extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            visible: false,
        }
    }

    logout = (e) => {
        let that = this;
        Modal.confirm({
            title: '确定退出登录？',
            content: '',
            onOk:() => {
                UserService.logout().then(res => {
                    if(res.status === 200){
                        this.props.UserStore.logout();
                        // that.props.history.replace('/login');
                        console.log("确认退出")
                    } else {
                        return message.error("登出失败！")
                    }
                    
                })
            },
            onCancel: ()=> {
                console.log("取消退出")
            },
        })
        
    }

    change = (value) => {
        console.log(value)
    }

    render(){
        let { userInfo } = this.props;
        return(
            <div className="home-layout-header w1200">
                <div className="home-header-message">
                    <div className="logo">
                        <a href={'/'}>
                            <img src={logo}/>
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
                        <img src={hottel}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;