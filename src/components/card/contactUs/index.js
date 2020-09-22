import React from 'react'
import { Icon } from 'antd'
import TitleContentCard from '../titleContentCard'
import LabelValue from '../../LabelValue'
import * as _ from 'lodash';

import './index.less'


const { Dict } = window

export default class ContactUs extends React.Component{
  constructor(props){
    super(props)
    const { location, history } = props;
    this.tel = _.cloneDeep(Dict.getDict("periodical_other_info").find(v => v.dictValue == "periodical_other_info_tel").label || '');
    
  }
  

    render(){
      let {className, title ='', children, showMore,borderColor } = this.props

        return(
           <TitleContentCard
              title="联系我们"
              eng={"CONTACT"}
              borderColor={'#dddddd'}
              className={`contact-us ${className}`}
           >
             <div className="contact-us-content">
              <Icon type="phone" /><LabelValue  label='电话' className="info" value={this.tel} emptyValue="暂无" noWrap={true}/><br />
              <Icon type="mobile" /><LabelValue  label='手机' className="info" value={''} emptyValue="暂无" noWrap={true}/><br />
              <Icon type="mail" /><LabelValue  label='邮箱' className="info" value={''} emptyValue="暂无" noWrap={true}/><br />
              <Icon type="home" /><LabelValue  label='地址' className="info" value={''} emptyValue="暂无" noWrap={true}/><br />
             </div>
           </TitleContentCard>
        )
    }
}