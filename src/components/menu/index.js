import React, {useEffect, useState} from 'react'
import { observer, inject } from 'mobx-react';
import { Menu } from 'antd';
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

    componentDidMount(){
        let p = '';
        let a = '';
        Service.base.articleOther({}).then(res => {
            if(res.code == 0){
                let result = res.data;
                p = result.find(v => v.periodicalArticleTypeOther == 'periodical_article_type_other_process').content;
                a = result.find(v => v.periodicalArticleTypeOther == 'periodical_article_type_other_about').content;
                this.setState({process: p, about: a });
            } else {
                this.setState({process: p, about: a });
            }
        }).catch(e => {
            this.setState({process: p, about: a });
        })
    }

    /**
     * 菜单点击跳转
     */
    menuClick = ({item, key, domEvent }) => {
        console.log(key)
        let page = this.props.MenuStore.getMenuForName(key);
        let { history } = this.props;
        let { location } = history;
        let other = {}
        if (page) {
            location.pathname = page.url
            if(key == 'process' || key == 'about'){
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
    render(){
        let { currentMenu} = this.state;
        let { menuList } = this.props
        return(
            <div className="menu-wrap">
                <Menu className='w1200' theme="light" mode="horizontal" 
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