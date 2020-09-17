import React from 'react'
import TitleContentCard from '../titleContentCard'
import LabelValue from '../../LabelValue'
import * as _ from 'lodash';

import './index.less'


const { Dict, Service, Store } = window

export default class ContactUs extends React.Component{
  constructor(props){
    super(props)
    const { location, history } = props;
    this.tel = _.cloneDeep(Dict.getDict("periodical_other_info").find(v => v.dictValue == "periodical_other_info_tel").label || '');
    
  }
  

    render(){
      let {className, title ='title', children, showMore,borderColor } = this.props

        return(
           <TitleContentCard
              title="联系我们"
              borderColor={'#dddddd'}
              className="contact-us"
           >
             <div className="contact-us-content">
              <LabelValue  label='电话' className="info" value={this.tel} emptyValue="暂无" noWrap={true}/><br />
              <LabelValue  label='手机' className="info" value={''} emptyValue="暂无" noWrap={true}/><br />
              <LabelValue  label='邮箱' className="info" value={''} emptyValue="暂无" noWrap={true}/><br />
              <LabelValue  label='地址' className="info" value={''} emptyValue="暂无" noWrap={true}/><br />
             </div>
           </TitleContentCard>
        )
    }
}