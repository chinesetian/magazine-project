import React from 'react'
import { Button } from 'antd'

import LabelValue from '../../LabelValue'
import QikanBaseInfo from '../qikanBaseInfo';

import './index.less'
const { Dict } = window

export default class MagazineIntroductionDetail extends React.Component{

    render(){
      let { data = {}, clickBook } = this.props
        return(
            <div className="magazine-introduction-detail"  onClick={(e) => clickBook(data)}>
                <div className='left' onClick={(e) => clickBook(data)}>
                    <img  src={`/magazine${data.url}`}/>
                    {/* <img src={'http://47.114.188.175:8980/js/userfiles/fileupload/20200704/1279117208455147522.png'} /> */}
                </div>
                <div className='right'>
                    <div className="title" title={data.name}>{data.name}</div>
                    <QikanBaseInfo data={data}/>
                </div>
            </div>
        )
    }
}