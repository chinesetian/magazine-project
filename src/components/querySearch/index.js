import React from 'react'
import {
    Icon, Input, Button,  message
  } from 'antd'

import './index.less'

const { Dict, Service, Store } = window

export default class QuerySearch extends React.Component{
    constructor(props){
        super(props)
    }

    searchData = () => {
        let target = document.getElementById("search-data");
        let page = Store.MenuStore.getMenuForName('detailquery');
        let { history } = this.props
        let { location } = history
          if (page) {
            location.pathname = page.url
            location.state = {data: target.value}
            history.push(location);
          } else {
              history.push('/home/404');
          }
    }

    render(){
      let { title } = this.props
        return(
            <div className="query-data-box">
                {title && <span className="title">{title}</span>}
                <div className="serach-wrap">
                    <Input id="search-data" placeholder="请输入文章编号" />
                    <Button type="primary" onClick={this.searchData} className="submit-button">
                        查 询
                    </Button>
                </div>
            </div>
        )
    }
}