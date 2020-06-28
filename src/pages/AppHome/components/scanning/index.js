import React from 'react'
import SCanView from "../../../../components/scan";
import { Modal, message } from 'antd';
import { StatisticalData } from '../../../../components/statisticalData'
import { ScanningTopInit, ScanningTopSecond, ScanningToping, ScanningTopPause, ScanningTopStop } from './scanningTop'
import ScanService from '../../../../api/scan'
import moment from 'moment'
import { ScanningDetail } from './scanningDetail'
import { getKeyValue } from '../../../../dict'
import { Footer } from '../../../../components/footer';
import Scroll from '../../../../components/scroll'
import './index.less'

export class Scanning extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            isStart: false,
            statistical: [
                // {
                //     name: '严重',
                //     value: 2,
                // },
                // {
                //     name: '高风险',
                //     value: 2,
                // },
                // {
                //     name: '中风险',
                //     value: 2,
                // },
                // {
                //     name: '低风险',
                //     value: 2,
                // },
                // {
                //     name: '提示信息',
                //     value: 2,
                // },
            ],
            scanDetail: null,

        };
    }
    
    status = 'second'; // first第一次扫描，second已经扫描过，pause暂停扫描，stop停止扫描,scanning正在扫描

    componentWillMount(){
        let { scanInfo } = this.props;
        this.initData(scanInfo);
    }

    componentDidMount(){   
    }

    componentWillReceiveProps(nextProps){
        let { scanInfo } = nextProps;
        
        //当是完成态， 并且上一次不是完成态，则更新数据
        if(scanInfo.status != this.props.scanInfo.status){
            if(scanInfo.status === 'completed'){
                message.info("扫描已完成！");
                setTimeout(() =>{
                    this.initData(scanInfo);
                },1000)
            } else if(scanInfo.status === 'canceled'){
                message.info("扫描已取消！")
                this.initData(scanInfo);
            }
        }
    }

    initData(scanInfo){
        // 不是第一次扫描
        if(scanInfo && scanInfo.creation_date && scanInfo.last_modification_date){
            let currentStatus = scanInfo.status;
            this.judgeStatus(currentStatus);
            this.initDetail(scanInfo);
        } else {
        // 第一次扫描    
            this.status = 'first';
        }
        this.setState({isStart: false})
    }

    initDetail(scanInfo){
        let originalData = [
            {
                name: '提示信息',
                severity: 0,
                title: 'info',
                value: 0,
            },
            {
                name: '低风险',
                severity: 1,
                title: 'low',
                value: 0,
            },
            {
                name: '中风险',
                severity: 2,
                title: 'medium',
                value: 0,
            },
            {
                name: '高风险',
                severity: 3,
                title: 'high',
                value: 0,
            },
           
            {
                name: '严重',
                severity: 4,
                title: 'critical',
                value: 0,
            },
        ];
        ScanService.getScanDetail(scanInfo.id).then(res => {
            if(res.status === 200 && res.data){
                let scanDetail = res.data;
                scanDetail.vulnerabilities.length > 0 && scanDetail.vulnerabilities.map((v,i) =>{
                    originalData[v.severity].value += v.count;
                })
                this.setState({statistical: originalData.reverse()})
            } else{
                message.error("查询扫描任务详情失败！")
            }
            
        })
    }

    /**
     * 判断状态
     * @param {*} status 
     */
    judgeStatus(status){
        switch(status){
            case 'paused': 
                this.status = 'pause'
            break;
            case 'pausing': 
                this.status = 'pause'
            break;
            case 'running': 
                this.status = 'scanning';
            break;
            case 'resuming': 
                this.status = 'scanning';
            break;
            case 'completed': 
                this.status = 'second'
            break;
            case 'canceled': 
                this.status = 'second'
            break;
            case 'stopping': 
                this.status = 'stop'
            break;
            case 'empty': 
                this.status = 'first'
            break;
            default: 
                this.status = 'first'
                this.setState({isStart: false})
        }
    }

    setTime = (e) => {
        console.log("跳转")
        this.props.setTime && this.props.setTime(3);
    }

    /**
     * 开始、暂停、继续扫描
     * @param {*} e 
     * @param {*} status 
     */
    startScanning (e, status) {
        console.log("status", status);
        console.log("this.status", this.status);
        switch(status){
            case 'first': 
                // this.status = 'scanning'
                // this.setState({isStart: true})
                this.changeScanStatus(true, 'scanning', 'launch');
            break;
            case 'second': 
                // this.status = 'scanning';
                // this.setState({isStart: true})
                this.changeScanStatus(true, 'scanning', 'launch');
            break;
            case 'scanning': 
                // this.status = 'pause'
                // this.setState({isStart: false});
                this.changeScanStatus(false, 'pause', 'pause');
            break;
            case 'pause': 
                // this.status = 'scanning'
                // this.setState({isStart: true})
                this.changeScanStatus(true, 'scanning', 'resume');
            break;
            case 'stop': 
                // this.status = 'scanning'
                // this.setState({isStart: true})
                // this.changeScanStatus(true, 'stop');
            break;
            default: 
                this.status = 'first'
                this.setState({isStart: false})
        }
        console.log("this.status", this.status);
    }

    /**
     * 停止扫描
     */
    stopScanning = () => {
        // this.status = 'stop'
        // this.setState({isStart: false})
        let { scanInfo } = this.props;
        Modal.confirm({
            title: '确定停止扫描？',
            content: '',
            onOk:() => {
                this.changeScanStatus(false, 'stop', 'stop');
                setTimeout(() =>{
                    this.props.updateStatus && this.props.updateStatus();
                }, 2000)
            },
            onCancel: ()=> {
                console.log("取消")
            },
        })
       
    }

    /**
     * 改变状态
     * 开始、暂停、结束扫描
     * @param {*} flag 
     * @param {*} status 
     * @param {*} aciton 
     */
    changeScanStatus(flag, status, aciton){
        let { scanInfo } = this.props;
        ScanService.changeScanStatus(scanInfo.id, aciton).then(res => {
            if(res.status === 200){
                this.status = status;
                this.setState({isStart: flag});
            } else {
                message.error(`${getKeyValue('actionTitle', aciton)}失败！`);
            }
        })
    }

    render(){
        let { scanInfo } = this.props;
        let { isStart, statistical } = this.state;
        let size = {
            width: 460,
            height: 460
        };

        return(
            <div className="scanning-layout">
                <div className="containter">
                <div className="scanning-header">
                    {this.status === 'first' && 
                        <ScanningTopInit
                            startScanning={this.startScanning.bind(this)}
                            setTime={this.setTime}
                        ></ScanningTopInit>
                    }
                    {this.status === 'second' && 
                         <ScanningTopSecond
                            date={20}
                            scanInfo={scanInfo}
                            startScanning={this.startScanning.bind(this)}
                            setTime={this.setTime}
                        ></ScanningTopSecond>
                    }
                    {this.status === 'scanning' && 
                        <ScanningToping
                            startScanning={this.startScanning.bind(this)}
                            stopScanning={this.stopScanning}
                        ></ScanningToping>
                    }
                    {this.status === 'pause' && 
                        <ScanningTopPause
                            startScanning={this.startScanning.bind(this)}
                            stopScanning={this.stopScanning}
                        ></ScanningTopPause>
                    }
                    {this.status === 'stop' && 
                        <ScanningTopStop
                            startScanning={this.startScanning.bind(this)}
                            stopScanning={this.stopScanning}
                        ></ScanningTopStop>
                    }
                   
                    <div className="header-bottom">
                        {this.status === 'second' ? null : <Scroll isStart={isStart}></Scroll>}
                        
                    </div>
                </div>
                <div className="scanning-content">
                    <div className="scanning-content-left">
                        {this.status === 'second' ? 
                            <StatisticalData
                                data={statistical}
                                // total={statistical.length}
                                center={['30%', '35%']}
                                top={40}
                                padding={5}
                                isTitle={true}
                            ></StatisticalData>
                            :
                            <div className="radar">
                                <SCanView 
                                    isMove={isStart} 
                                    size={size}
                                />
                            </div>  
                        }   
                    </div>
                    <div className="scanning-content-right">
                       <ScanningDetail
                            scanInfo={scanInfo}
                       ></ScanningDetail>
                    </div>
                </div>
                </div>
                <Footer></Footer>
            </div>
        )
    }
}