import React from 'react'
import { Button } from 'antd'
import './index.less'

const { Dict } = window
export default class MagazineImgWithName extends React.Component{

    render(){
      let { data, clickBook } = this.props
        return(
            <div className="magazine-img-with-name" onClick={(e) => clickBook(data)} title={data.name}>
                <div className='top' >
                    <img src={`/magazine${data.url}`} />
                </div>
                <div className="name" onClick={(e) => clickBook(data)}>{data.name}</div>
                <div className="origin">{Dict.getLabel("periodical_level", data.periodicalLevel)}</div>
            </div>
        )
    }
}