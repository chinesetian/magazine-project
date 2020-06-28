import React from 'react'
import IconFont from '../iconFont';

import './index.less'
// 类型传数字 --- 0（404) 1 (无告警) 2 （无数据） 3(无网络) 4(以图搜图无图)
// const imgComponent = [ Page404, NoAlarm, NoData, NoNet, NoPeople ]
const NoDataComp = (props) => {
  const title = props.title ? props.title : '暂无数据'
  // const imgType = props.imgType ? imgComponent[props.imgType] : NoData
  return (
    <div className='has-not-data-box'>
      <IconFont type={'icon-icon_report'}></IconFont>
      <div className="has-not-titlt">{`${title}`}</div>
    </div>
	)
}
export default NoDataComp