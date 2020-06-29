import React from 'react'
import { Button } from 'antd'
import './index.less'


export default class MagazineIntroduction extends React.Component{

    render(){
      let { data, clickBook } = this.props
        return(
            <div className="magazine-introduction">
                <div className='left' onClick={(e) => clickBook(data)}>
                    <img  src={data.url}/>
                </div>
                <div className='right'>
                    <div className="name" onClick={(e) => clickBook(data)}>{data.name}</div>
                    <div className="description">{data.description}</div>
                    <Button className="click-book" onClick={(e) => clickBook(data)}>马上阅读</Button>
                </div>
                
            </div>
        )
    }
}