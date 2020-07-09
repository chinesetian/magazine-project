import React from 'react'
import LabelValue from '../../components/LabelValue'

const { Dict } = window
export default class QikanBaseInfo extends React.Component{

    render(){
      let { data ={} } = this.props
      return(
        <React.Fragment>
          <LabelValue  label='主管单位' className="info" value={data.competentDepartment} emptyValue="暂无" fontSize={12} valueColor={"#35a"} noWrap={true}/>
          <LabelValue  label='主办单位' className="info" value={data.sponsoringDepartment} emptyValue="暂无" fontSize={12} noWrap={true}/>
          
          <LabelValue  label='出版地区' className="info" value={Dict.getLabel("periodical_region", data.periodicalRegion)} emptyValue="暂无" fontSize={12} noWrap={true}/>
          <LabelValue  label='国际刊号' className="info" value={data.internationalNumber} emptyValue="暂无" fontSize={12} noWrap={true}/>
          <LabelValue  label='国内刊号' className="info" value={data.domesticNumber} emptyValue="暂无" fontSize={12} noWrap={true}/>
          <LabelValue  label='创刊时间' className="info" value={data.publicationYear} emptyValue="暂无" fontSize={12} noWrap={true}/>
          <LabelValue  label='发行周期' className="info" value={Dict.getLabel("periodical_period", data.periodicalPeriod)} emptyValue="暂无" fontSize={12} noWrap={true}/>
          <LabelValue  label='见刊时间' className="info" value={Dict.getLabel("periodical_publish", data.periodicalPublish)} emptyValue="暂无" fontSize={12} noWrap={true}/>
      </React.Fragment>
      )
    }
}