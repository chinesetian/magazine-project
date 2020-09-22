import React from 'react'
import { Icon } from 'antd'
import './index.less'

const pageurl = "/resource/image/title-page.jpg"

export default class TitlePage extends React.Component{

    render(){
      let { title, pageName } = this.props
        return(
            <div className="title-page">
                <span className="title-page-name">
                    <img src={`${pageurl}`} />
                    {pageName}
                </span>
                <span className="title-page-right">
                    <Icon type="home" />当前位置：
                    首页-{pageName}
                </span>
            </div>
        )
    }
}