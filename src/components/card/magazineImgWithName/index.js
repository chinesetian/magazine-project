import React from 'react'
import { Button } from 'antd'
import './index.less'


export default class MagazineImgWithName extends React.Component{

    render(){
      let { data, clickBook } = this.props
        return(
            <div className="magazine-img-with-name" onClick={(e) => clickBook(data)} title={data.name}>
                <div className='top' >
                    <img  src={data.url}/>
                </div>
                <div className="name" onClick={(e) => clickBook(data)}>{data.name}</div>
                <div className="origin">{data.name}</div>
            </div>
        )
    }
}