import React from 'react'
import { StatisticalData } from '../../../../components/statisticalData'
import moment from 'moment'
import { getKeyValue } from '../../../../dict'
import { timeToDay } from '../../../../utils/time'

export class TopMessage extends React.Component {

    render(){

        let { statistical, scanInfo, historyInfo } = this.props;
        if(!historyInfo){
            return null;
        }
        let startTime = historyInfo.scan_start;
        let endTime = historyInfo.scan_end;
        let tempTime = startTime && endTime ? timeToDay(startTime*1000, endTime*1000) : '暂无';
        return (
            <React.Fragment>
                 <div className="header-left">
                    <StatisticalData
                        data={statistical}
                        // total={statistical.length}
                        center={['35%', '50%']}
                        top={-30}
                        padding={2}
                        isTitle={false}
                    ></StatisticalData>
                </div>
                <div className="header-right">
                    <div className="info-item">
                        <span className="label">状态：</span>
                        <span className="text">{getKeyValue('scanningStatus', historyInfo.status)}</span>
                    </div>
                    <div className="info-item" >
                        <span className="label">开始时间：</span>
                        <span className="text">{startTime ? moment(startTime*1000).format('YYYY 年 MM 月 DD 日 HH:mm') : '暂无'}</span>
                    </div>
                    <div className="info-item">
                        <span className="label">结束时间：</span>
                        <span className="text">{endTime ? moment(endTime*1000).format('YYYY 年 MM 月 DD 日 HH:mm') : '暂无'}</span>
                    </div>
                    <div className="info-item">
                        <span className="label">扫描时长：</span>
                        <span className="text">{tempTime}</span>
                    </div>
                </div>
            </React.Fragment>
        )
    }
} 