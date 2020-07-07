import React from 'react'
import { Divider, Modal, message, Input } from 'antd'
import { withRouter } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import IconFont from '../../../../components/iconFont'
import './index.less'
import UserService from '../../../../api/user';
import { deleteCache } from '../../../../utils/cache'

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
            visible: false,
            tel: '',
        }
        debugger
    }

    componentDidMount(){
        let target =  Dict.getDict("periodical_other_info") || []
        let tel = target.filter(v => v.value == "periodical_other_info_tel") || {}
        this.setState({ tel })
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
        let { tel } = this.state
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
                        {tel.label || ''}
                    </div>
                </div>
            </div>
        )
    }
}

export default Header;