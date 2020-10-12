import React from 'react'
import LabelValue from '../LabelValue'

import './index.less'

const { Dict } = window
export default class DetailTopInfo extends React.Component{

  getShow = (parent, type) => {
    let content = '';
    if(type){
      let arr = []
      type.split(",").map(v => {
        arr.push(Dict.getLabel(parent, v))
      })
      content = (
        <div className="honor-box">
          {arr.map((item,i) => {
            return <div key={i} className="tag">{item}</div>
          })}
        </div>
      )
      return content;
    } else {
      return content
    }

  }

    render(){
      let { data ={} } = this.props
      return(
        <div className="detail-top-info">
          {data.name && <div className="left">《{data.name}》杂志</div>}
          <div className="right">
            <div className="right1">
              <LabelValue  label='主管单位' className="info" value={data.competentDepartment} emptyValue="暂无" noWrap={true}/>
              <br />
              <LabelValue  label='主办单位' className="info" value={data.sponsoringDepartment} emptyValue="暂无"  noWrap={true}/>
              <br />
              <LabelValue  label='国际刊号' className="info" value={data.internationalNumber} emptyValue="暂无"  noWrap={true}/>
              <br />
              <LabelValue  label='国内刊号' className="info" value={data.domesticNumber} emptyValue="暂无"  noWrap={true}/>
             </div>
            <div className="right2">
            {this.getShow("periodical_honor", data.periodicalHonor)}
            </div>
        </div>
      </div>
      )
    }
}