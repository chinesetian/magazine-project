import React, {useEffect, useState} from 'react'
import { observer, inject } from 'mobx-react';
import { Menu } from 'antd';
import './index.less'

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;

@inject('MenuStore')
class MenuList extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            currentMenu: 'home'
        }
    }

    menuClick = ({item, key, domEvent }) => {
        console.log(key)
        let page = this.props.MenuStore.getMenuForName(key);
        if (page) {
            this.props.history.push(page.url);
        } else {
            this.props.history.push('/home/404');
        }
        this.setState({currentMenu: key})
    }
    render(){
        let { currentMenu} = this.state;
        let { menuList } = this.props
        return(
            <div className="menu-wrap">
                <Menu className='w1200' theme="light" mode="horizontal" selectedKeys={[currentMenu]} onClick={this.menuClick} forceSubMenuRender={true}>
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