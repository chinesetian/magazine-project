import React from 'react'
import { Button } from 'antd'
import './index.less'
import { isString } from "util";

export default class MagazineIntroduction extends React.Component{

    render(){
      let { data, clickBook } = this.props
      let dataHtml = data.description
      let html = dataHtml && isString(dataHtml) ? dataHtml.replace('<!--HTML-->', '') : '';
        return(
            <div className="magazine-introduction">
                <div className='left' onClick={(e) => clickBook(data)}>
                    <img src={`/magazine${data.url}`} />
                </div>
                <div className='right'>
                    <div className="name" onClick={(e) => clickBook(data)}>{data.name}</div>
                    <div className="description">
                        <div>创刊时间：{data.publicationYear}</div>
                        <div>主管单位：{data.competentDepartment}</div>
                    </div>
                    <Button className="click-book" onClick={(e) => clickBook(data)}>马上阅读</Button>
                </div>
                
            </div>
        )
    }
}