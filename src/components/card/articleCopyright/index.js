import React from 'react'
import TitleContentCard from '../titleContentCard'
import LabelValue from '../../LabelValue'
import * as _ from 'lodash';

import './index.less'


const { Dict, Service, Store } = window

export default class ArticleCopyright extends React.Component{
  constructor(props){
    super(props)
  }
  

    render(){
      let {data, title ='title', children, showMore,borderColor } = this.props

        return(
           <TitleContentCard
              title="版权信息"
              borderColor={'#dddddd'}
              className="article-copyright active"
           >
             <div className="content">
              <LabelValue  label='主管单位' className="info" value={data.competentDepartment} emptyValue="暂无" labelColor={"#e91d25"} valueColor={"#e91d25"} noWrap={true}/>
              <LabelValue  label='主办单位' className="info" value={data.sponsoringDepartment} emptyValue="暂无" labelColor={"#e91d25"} valueColor={"#e91d25"} noWrap={true}/>
              <LabelValue  label='国际刊号' className="info" value={data.internationalNumber} emptyValue="暂无" labelColor={"#e91d25"} valueColor={"#e91d25"} noWrap={true}/>
              <LabelValue  label='国内刊号' className="info" value={data.domesticNumber} emptyValue="暂无" labelColor={"#e91d25"} valueColor={"#e91d25"} noWrap={true}/>
             </div>
           </TitleContentCard>
        )
    }
}