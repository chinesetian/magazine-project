import React from 'react'
import { Button } from 'antd'

import LabelValue from '../../LabelValue'

import './index.less'


export default class MagazineIntroductionDetail extends React.Component{

    render(){
      let { data, clickBook } = this.props
        return(
            <div className="magazine-introduction-detail"  onClick={(e) => clickBook(data)}>
                <div className='left' onClick={(e) => clickBook(data)}>
                    <img  src={data.url}/>
                </div>
                <div className='right'>
                    <div className="title">{data.name}</div>
                    <LabelValue  label='主管单位' className="info" value={data.description} emptyValue="暂无" fontSize={12} valueColor={"#35a"}/>
                    <LabelValue  label='主办单位' className="info" value={data.description} emptyValue="暂无" fontSize={12} />
                    <LabelValue  label='快捷分类' className="info" value={data.description} emptyValue="暂无" fontSize={12} />
                    <LabelValue  label='出版地区' className="info" value={data.description} emptyValue="暂无" fontSize={12} />
                    <LabelValue  label='国际刊号' className="info" value={data.description} emptyValue="暂无" fontSize={12} />
                    <LabelValue  label='国内刊号' className="info" value={data.description} emptyValue="暂无" fontSize={12} />
                    <LabelValue  label='创刊时间' className="info" value={data.description} emptyValue="暂无" fontSize={12} />
                    <LabelValue  label='发行周期' className="info" value={data.description} emptyValue="暂无" fontSize={12} />
                    <LabelValue  label='期刊定价' className="info" value={data.description} emptyValue="暂无" fontSize={12} />
                    <LabelValue  label='见刊时间' className="info" value={data.description} emptyValue="暂无" fontSize={12} />
                    <LabelValue  label='所在栏目' className="info" value={data.description} emptyValue="暂无" fontSize={12} />
                    <LabelValue  label='综合因子' className="info" value={data.description} emptyValue="暂无" fontSize={12} />
                    <LabelValue  label='期刊级别' className="info" value={data.description} emptyValue="暂无" fontSize={12} />
                </div>
            </div>
        )
    }
}