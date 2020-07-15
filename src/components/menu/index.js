import React, {useEffect, useState} from 'react'
import { observer, inject } from 'mobx-react';
import { Menu, message } from 'antd';
import './index.less'

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

const { Service } = window

@inject('MenuStore')
class MenuList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            currentMenu: 'view',
            process: '',
            about: '',
        }
    }

    UNSAFE_componentWillMount(){
        this.setCurrentMenu(this.props);
    }

    UNSAFE_componentWillReceiveProps(nextProps,){
        // if(nextProps.location.pathname !== this.props.location.pathname){
            this.setCurrentMenu(nextProps);
        // }
    }

    componentDidMount(){
        let p = '';
        let a = '';
        Service.base.articleOther({}).then(res => {
            if(res.code == 0){
                let result = res.data;
                p = result.find(v => v.periodicalArticleTypeOther == 'periodical_article_type_other_process').content;
                a = result.find(v => v.periodicalArticleTypeOther == 'periodical_article_type_other_about').content;
                this.setState({process: p, detailprocess: p, about: a, detailabout: a});
            } else {
                this.setState({process: p, detailprocess: p, about: a, detailabout: a});
            }
        }).catch(e => {
            this.setState({process: p, detailprocess: p, about: a, detailabout: a});
        })
    }

    /**
     * 菜单点击跳转
     */
    menuClick = ({item, key, domEvent }) => {
        // console.log(key)
        let page = this.props.MenuStore.getMenuForName(key);
        let { history } = this.props;
        let { location } = history;
        let other = {}
        // if(key == 'detailcontribute' || key == 'detailquery'){
        //     message.warn("正在开发中...")
        //     return false
        // }
        if (page) {
            location.pathname = page.url
            if(key == 'process' || key == 'about' || key == 'detailprocess' || key == 'detailabout'){
                other = {
                    dataHtml: this.state[key] || ''
                }
            }
            if(key == 'issue' || key == 'news'){
                other = {
                    type: key
                }
            }

            location.state = {
                ...other
            }
            history.push(location);
        } else {
            this.props.history.push('/home/404');
        }
        this.setState({currentMenu: key})
    }

    setCurrentMenu(props){
        let { location } =props;
        let { currentMenu } = this.state;
        let temp = location.pathname.split("/")[2]
        if(temp && currentMenu != temp){
            this.setState({currentMenu: temp});
        }

    }

    render(){
        let { currentMenu} = this.state;
        let { menuList } = this.props
        return(
            <div className="menu-wrap w1200">
                <Menu className='menu-box' theme="light" mode="horizontal" 
                    selectedKeys={[currentMenu]} 
                    onClick={this.menuClick} forceSubMenuRender={true}
                >
                    {menuList.map((menu) => {
                        return(
                            <MenuItem key={menu.name}>
                            <span className="menu-item-content">
                            <span className="menu-item-layout">
                                <span>{menu.menuName}</span>
                            </span>
                            </span>
                        </MenuItem>
                        )
                    })}
                </Menu>
            </div>
        )
    }
}

export default MenuList;