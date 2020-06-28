import React from 'react'
import IconFont from '../../../../components/iconFont';
import { Button } from 'antd'
import moment from 'moment'
import { timeToDay } from '../../../../utils/time'

export class ScanningTopInit extends React.Component{
    startScanning(){
        this.props.startScanning && this.props.startScanning(this, 'first')
    }
    render(){
        let { setTime } = this.props;
        return(
            <div className="header-top">
                <div className="scanning-header-left">
                    <IconFont type={"icon-icon_alert"} />
                    尚未进行过安全扫描，建议立即扫描
                </div>
                <div className="scanning-header-right">
                    <Button type="primary" onClick={this.startScanning.bind(this)}>一键扫描</Button>
                    <span className="set-time" onClick={setTime}>设置定时扫描</span>
                </div>
            </div>
        )
    }
}

export class ScanningTopSecond extends React.Component{
    startScanning(){
        this.props.startScanning && this.props.startScanning(this, 'second')
    }
    render(){
        let {  setTime, date, scanInfo } = this.props;
        let now = moment().format('X');
        let lastTime = scanInfo.creation_date;
        let time = timeToDay(lastTime*1000, now*1000);
        return(
            <div className="header-top">
                <div className="scanning-header-left">
                    <IconFont type={"icon-icon_information"} />
                    {`距离上次扫描已经：${time}`}
                </div>
                <div className="scanning-header-right">
                    <Button type="primary" onClick={this.startScanning.bind(this)}>一键扫描</Button>
                    <span className="set-time" onClick={setTime}>设置定时扫描</span>
                </div>
            </div>
        )
    }
}

export class ScanningToping extends React.Component{
    startScanning(){
        this.props.startScanning && this.props.startScanning(this, 'scanning')
    }
    render(){
        let {  stopScanning } = this.props;
        return(
            <div className="header-top">
                <div className="scanning-header-left">
                    <IconFont type={"icon-icon_information"} />
                    正在扫描服务器漏洞...
                </div>
                <div className="scanning-header-right">
                    <Button onClick={this.startScanning.bind(this)}>暂停扫描</Button>
                    <span className="stop-action" onClick={stopScanning}>停止扫描</span>
                </div>
            </div>
        )
    }
}

export class ScanningTopPause extends React.Component{
    startScanning(){
        this.props.startScanning && this.props.startScanning(this, 'pause')
    }
    render(){
        let {  stopScanning } = this.props;
        return(
            <div className="header-top">
                <div className="scanning-header-left">
                    <IconFont type={"icon-icon_information"} />
                    扫描已暂停...
                </div>
                <div className="scanning-header-right">
                    <Button onClick={this.startScanning.bind(this)}>继续扫描</Button>
                    <span className="stop-action" onClick={stopScanning}>停止扫描</span>
                </div>
            </div>
        )
    }
}

export class ScanningTopStop extends React.Component{
    startScanning(){
        this.props.startScanning && this.props.startScanning(this, 'stop')
    }
    render(){
        let {  stopScanning } = this.props;
        return(
            <div className="header-top">
                <div className="scanning-header-left">
                    <IconFont type={"icon-icon_information"} />
                    停止扫描中...
                </div>
                <div className="scanning-header-right">
                    <Button className="disabled" disabled={'disabled'} 
                        // onClick={this.startScanning.bind(this)}
                    >继续扫描</Button>
                    <span className="stop-action" onClick={stopScanning}>停止扫描</span>
                </div>
            </div>
        )
    }
}