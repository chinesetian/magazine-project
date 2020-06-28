import React from 'react'
import moment from 'moment'
import { getKeyValue } from '../../../../dict'
import { timeToDay } from '../../../../utils/time'
import { stringFormat } from '../../../../utils/format'

export class ScanningDetail extends React.Component {
    isShowTime = false; //扫描完成，才显示开始、结束时间，耗时等

    render(){

        let { scanInfo } = this.props;
        if(scanInfo.status === 'canceled' || scanInfo.status === 'completed' || scanInfo.status === 'stopping'){
            this.isShowTime = true;
        } else {
            this.isShowTime = false;
        }

        let startTime = scanInfo.creation_date;
        let endTime = scanInfo.last_modification_date;
        let tempTime = this.isShowTime && startTime && endTime ? timeToDay(startTime*1000, endTime*1000) : '暂无';
        let time = scanInfo.starttime && scanInfo.starttime.length > 0 ? scanInfo.starttime.split('T') : [];
        let obj = scanInfo.rrules && scanInfo.rrules.length > 0 ? stringFormat(scanInfo.rrules) : {};
        let hour = time && time.length > 0 ? moment(moment(time[1], 'HH:mm:ss').valueOf()).format('HH:mm') : '';
        return (
            <React.Fragment>

            {/* <div className="flaw-info-box">
                    <div className="title">漏洞信息</div>
                    <div className="flaw-info">
                        <div className="info-item serious">
                            <span className="label">严重</span>
                            <span className="text">1</span>
                        </div>
                        <div className="info-item high-risk" >
                            <span className="label">高风险</span>
                            <span className="text">1</span>
                        </div>
                        <div className="info-item medium-risk">
                            <span className="label">中风险</span>
                            <span className="text">1</span>
                        </div>
                        <div className="info-item low-risk">
                            <span className="label">低风险</span>
                            <span className="text">1</span>
                        </div>
                        <div className="info-item prompt-message">
                            <span className="label">提示信息</span>
                            <span className="text">1</span>
                        </div>
                    </div>
                </div> */}
                <div className="scaning-info-box">
                    <div className="title" title={scanInfo.name}>扫描信息</div>
                    <div className="flaw-info">
                        <div className="info-item">
                            <span className="label">定时扫描：</span>
                            <span className="text">{obj && hour ? `每 ${obj.INTERVAL} 天 ${hour} 自动扫描` : '暂无'}</span>
                        </div>
                        <div className="info-item" >
                            <span className="label">上次扫描：</span>
                            <span className="text">{this.isShowTime && startTime ? moment(startTime*1000).format('YYYY 年 MM 月 DD 日 HH:mm') : '暂无'}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">结束扫描：</span>
                            <span className="text">{this.isShowTime && endTime ? moment(endTime*1000).format('YYYY 年 MM 月 DD 日 HH:mm') : '暂无'}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">扫描时长：</span>
                            <span className="text">{tempTime}</span>
                        </div>
                        <div className="info-item">
                            <span className="label">扫描状态：</span>
                            <span className="text">{getKeyValue('scanningStatus', scanInfo.status)}</span>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}