import React from 'react'
import { Button, Collapse, Table, message } from 'antd'
import * as _ from 'lodash';
import moment from 'moment'
import IconFont from '../../../../components/iconFont'
import { TopMessage } from './topMessage'
import { getKeyValue } from '../../../../dict'
import ScanService from '../../../../api/scan'
import NoData from '../../../../components/noData'
import Papa from 'papaparse'
import { scan } from '../../../../api/url/url'
import Loading from '../../../../components/Loading'
import * as jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

import './index.less'

const { Panel } = Collapse;
// const csvurl = '/resource/aaa.csv';

export class Record extends React.Component{
    state = {
        activeKey: [], //['1'] 当前展开的Collapse
        recordList: [],  // 所有扫描记录的list
        activeRecoed: null, //选中的历史记录
        statistical: [], //右侧统计数据
        hosts: [], //所有服务器ip列表
        historyInfo: null, //单条扫描记录的info
        bugData: [],
        loading: true,
    }
    allkey = [];
    originArr = [];


    componentWillMount(){
        let { scanInfo } = this.props;
        this.initData(scanInfo);
        // this.csvToJson();
       
    }

    componentDidMount(){
    }

    componentWillReceiveProps(nextProps){
        if(this.props.scanInfo && nextProps.scanInfo && nextProps.scanInfo.status === 'completed' && nextProps.scanInfo.status != this.props.scanInfo.status){
            nextProps.scanInfo && this.initData(nextProps.scanInfo)
        }
    }

    componentWillUnmount(){
        this.allkey = null;
        this.originArr = null;
    }
    
    initData(scanInfo){
        scanInfo && scanInfo.id && this.getHistorylist(scanInfo);
        
    }
    
    clickRecord(v){
        let { scanInfo } = this.props;
        // console.log(v);
        this.setState({
            activeRecoed: v,
            loading: true,
        })
        this.getHistoryDetail(scanInfo, v);
    }

    /**
     * 展开、收起 所有
     */
    showAllDetail(){
        // console.log("this.allkey", this.allkey)
        this.setState({
            activeKey: this.allkey.length == this.state.activeKey.length ? [] : _.uniq(this.allkey),
            // activeKey: _.uniq(this.allkey),
        });
    }

    /**
     * 展开、收起
     */
    changeActive = (v) => {
        let cloneActiveKey = _.cloneDeep(this.state.activeKey);
        // cloneActiveKey.push(v.hostname);
        let activeKey = [];
		if(this.state.activeKey.includes(String(v.hostname))){
			// 存在--剔除
			activeKey = _.without(cloneActiveKey, String(v.hostname))
		}else{
			// 不存在--追加
			activeKey = cloneActiveKey.concat(String(v.hostname))
		}
		this.setState({
            activeKey,
		})
    }
    
    /**
     * 更具扫描任务id查询扫描的历史列表
     * @param {*} scanInfo 
     */
    getHistorylist(scanInfo){
        ScanService.getScanDetail(scanInfo.id).then(res => {
            if(res.status === 200 && res.data){
                let scanDetail = res.data;
                let recordList = scanDetail.history && scanDetail.history.length > 0 ? scanDetail.history.reverse() : []
                this.setState({
                    recordList: recordList,
                    activeRecoed: recordList[0],
                })

                this.getHistoryDetail(scanInfo, recordList[0])
            } else{
                message.error("查询扫描任务历史记录失败！")
            }
            
        })
    }

    /**
     * 任务id、历史id查询历史详情
     * @param {*} scanInfo 
     * @param {*} history 
     */
    getHistoryDetail(scanInfo, history){
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
        ScanService.getHistoryDetail(scanInfo.id, history.history_id).then(res => {
            if(res.status === 200 && res.data){
                let scanDetail = res.data;
                let historyInfo = scanDetail.info;
                let hosts = scanDetail.hosts && scanDetail.hosts.length > 0 ? scanDetail.hosts : [];
                this.allkey = []
                hosts.map((v,i) => {
                    this.allkey.push(v.hostname);
                })
                scanDetail.vulnerabilities.length > 0 && scanDetail.vulnerabilities.map((v,i) =>{
                    originalData[v.severity].value += v.count;
                })
                this.setState({
                    statistical: originalData.reverse(),
                    hosts: hosts,
                    historyInfo: historyInfo,
                })
                this.setDownFormatCsv(scanInfo.id, history.history_id);

            } else {
                message.error("查询扫描任务历史详情失败！")
            }
        })
    }

    setDownFormatCsv(scanId, historyId){
        let param = {
            "format": "csv",
            "reportContents": {
                "csvColumns": {
                    "id": true,
                    "cve": true,
                    "cvss": true,
                    "risk": true,
                    "hostname": true,
                    "protocol": true,
                    "port": true,
                    "plugin_name": true,
                    "synopsis": true,
                    "description": true,
                    "solution": true,
                    "see_also": true,
                    "plugin_output": true,
                    "stig_severity": true,
                    "cvss3_base_score": true,
                    "cvss_temporal_score": true,
                    "cvss3_temporal_score": true,
                    "risk_factor": true,
                    "references": true,
                    "plugin_information": true,
                    "exploitable_with": true
                }
            }
        }
        ScanService.exportCsv(scanId, historyId, param).then(res => {
            if(res.status == 200 && res.data.token){
                // console.log("download-token :", res.data)
                setTimeout(() => {
                    this.getDownStatus(res.data.token);
                }, 1000)
            } else {
                message.error("获取当前扫描记录的数据失败！")
            }
        })
    }

    /**
     * TO 
     * csv转json,文件下载跨域,nginx代理
     * @param {*} tokens 
     */
    getDownStatus(tokens){
        ScanService.getDownloadStatus(tokens).then(json => {
            // console.log("download-message :", json.data.message)
            if(json.status == 200 && json.data.status == 'ready'){
                // ScanService.downCsv(tokens).then(r => {   
                // })
                let host =  process.env.NODE_ENV !== 'production'
                    ? `${window.location.origin}`
                    : `${window.location.origin}`
                let downLoadUrl = `${host}${scan.downloadStatus}${tokens}/download`;
                // let downLoadUrl = `${host}${scan.csvdownload}${tokens}/download`;
                // let downLoadUrl = `http://127.0.0.1:8890/nessus/tokens/${tokens}/download`;
                // console.log("download-csv-url:", downLoadUrl)
                this.csvToJson(downLoadUrl);
            } else {
                this.getDownStatus(tokens);
            }
        })
    }

    /**
     * csv转json
     * @param {*} csvurl 
     */
    csvToJson(csvurl){
        Papa.parse(csvurl, {
            header: true,
            download: true,
            worker: true,
            complete: (results) => {
                let originArr = results.data;
                this.originArr = originArr;
                // console.log('csv-originArr', originArr);
                let bugData = _.groupBy(originArr, 'Host');
                // console.log('csv-data', bugData);
                this.setState({
                    bugData,
                    loading: false,
                })
            },
            error: (e) => {
                this.originArr = [];
                message.error("当前扫描记录的数据解析失败！")
                this.setState({
                    bugData: [],
                    loading: false,
                })
            }
        });
    }

    exportContent(){
        message.info("正在导出文件，请稍后！")
        // this.exportPdf();
        this.exportCSV();
        // this.exportHtml();
    }

    // 获取生成的文件名
    getTitle(){
        let { historyInfo } = this.state; 
        let startTime = historyInfo.scan_start;
        let title = startTime && moment(startTime*1000).format('YYYYMMDDHHmmss');
        return title;
    }

    // TODO---导出pdf
    exportPdf(){
        this.setState({
            activeKey: _.uniq(this.allkey),
        });
        setTimeout(() => {
            var target = document.getElementsByClassName("content-right")[0];
            target.style.background = "#FFFFFF";
            html2canvas(target, {scale: 1,}).then((canvas) => {
                var contentWidth = canvas.width;
      var contentHeight = canvas.height;

      //一页pdf显示html页面生成的canvas高度;
      var pageHeight = contentWidth / 592.28 * 841.89;
      //未生成pdf的html页面高度
      var leftHeight = contentHeight;
      //页面偏移
      var position = 0;
      //a4纸的尺寸[595.28,841.89]，html页面生成的canvas在pdf中图片的宽高
      var imgWidth = 595.28;
      var imgHeight = 592.28/contentWidth * contentHeight;

      var pageData = canvas.toDataURL('image/jpeg', 1.0);

      var pdf = new jsPDF('', 'pt', 'a4');

      //有两个高度需要区分，一个是html页面的实际高度，和生成pdf的页面高度(841.89)
      //当内容未超过pdf一页显示的范围，无需分页
      if (leftHeight < pageHeight) {
	  pdf.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight );
      } else {
	      while(leftHeight > 0) {
	          pdf.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight)
	          leftHeight -= pageHeight;
	          position -= 841.89;
	          //避免添加空白页
	          if(leftHeight > 0) {
		        pdf.addPage();
	          }
	      }
      }

      pdf.save('content.pdf');
                // pdf.save(`${this.getTitle()}.pdf`);
            })
        },3000);
    }

    // TODO---导出csv
    exportCSV(){
        var str = Papa.unparse(this.originArr);
        // for(let i = 0 ; i < jsonData.length ; i++ ){
        //     for(let item in jsonData[i]){
        //         str+=`${jsonData[i][item] + '\t'},`;     
        //     }
        //     str+='\n';
        //   }
        //encodeURIComponent解决中文乱码
        let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
        //通过创建a标签实现
        let link = document.createElement("a");
        link.href = uri;
        //对下载的文件命名
        link.download =  `${this.getTitle()}.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }   

    // TODO---导出html
    exportHtml(){
        let { scanInfo } = this.props;
        let { activeRecoed } = this.state;
        let param = {
            "format": "html",
            "chapters": "vuln_hosts_summary",
            "reportContents": {
                "csvColumns": {},
                "vulnerabilitySections": {},
                "hostSections": {},
                "formattingOptions": {}
            }
        }

        ScanService.exportCsv(scanInfo.id, activeRecoed.history_id, param).then(res => {
            if(res.status == 200 && res.data.token){
                // console.log("download-token :", res.data)
                setTimeout(() => {
                    this.checkDownStatus(res.data.token);
                }, 1000)
            } else {
                message.error("获取当前扫描记录的数据失败！")
            }
        })
    }

    /**
     * 检测下载是否准备好
     * @param {*} tokens 
     */
    checkDownStatus(tokens){
        ScanService.getDownloadStatus(tokens).then(json => {
            if(json.status == 200 && json.data.status == 'ready'){
                let host =  process.env.NODE_ENV !== 'production'
                    ? `${window.location.origin}`
                    : `${window.location.origin}`
                let downLoadUrl = `${host}${scan.downloadStatus}${tokens}/download`;
                let link = document.createElement("a");
                link.href = downLoadUrl;
                
                //对下载的文件命名
                link.download = `${this.getTitle()}.html`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                this.checkDownStatus(tokens);
            }
        })
    }

    collapseHeader = (v) =>{
        return (
            <div className='colla-header'>
                <div className="top-ip">
                    <span className="ip">{v.hostname}</span>
                    <span className="button" onClick={this.changeActive.bind(this, v)}>
                        {/* {this.state.activeKey.includes(String(v.hostname)) ? '收起' : '展开'} */}
                    </span>
                </div>
                <div className="bottom-message">
                    <div className="info serious"><div className="num">{v.critical}</div><div className="name">严重</div></div>
                    <div className="info high-risk"><div className="num">{v.high}</div><div className="name">高风险</div></div>
                    <div className="info medium-risk"><div className="num">{v.medium}</div><div className="name">中风险</div></div>
                    <div className="info low-risk"><div className="num">{v.low}</div><div className="name">低风险</div></div>
                    <div className="info prompt-message"><div className="num">{v.info}</div><div className="name">提示信息</div></div>
                </div>
                <div className="action-button">
                    <span className="button" onClick={this.changeActive.bind(this, v)}>
                        {this.state.activeKey.includes(String(v.hostname)) ? '收起' : '展开'}
                    </span>
                </div>
            </div>
        )
    }

    renderRowKey = (record) => {
        return record.Name+Math.random();
    }

    render(){
        let { recordList, activeRecoed, statistical, activeKey, 
            hosts, historyInfo, bugData, loading } = this.state;
        let { scanInfo } = this.props;
        const columns = [
            {
                title: '级别',
                dataIndex: 'Risk',
                width: '15%',
                render: (text, info, index) => {
                    return (<span className={`bug-level ${text}`}>{getKeyValue('bugLevel', text)}</span>);
                }
            }, {
                title: '详情',
                dataIndex: 'Name',
                width: '85%',
            },   
        ];
        return(
            <div className="record-layout">
                <div className="containter">
                <div className="common-header">
                    <div className="left">
                        <span className="title">扫描报告</span>
                        <span className='count'>{recordList && recordList.length > 0 ? recordList.length : 0}</span>
                    </div> 
                    <Button type={"primary"} onClick={this.exportContent.bind(this)}><IconFont type={"icon-icon_export"} />导出报告</Button>
                </div>
                <div className="record-content">
                    {recordList && recordList.length > 0 ?
                    <div className="content-box">
                        <div className="content-left">
                            {/* <div className='left-box'> */}
                                <div className="title">扫描历史</div>
                                <div className="list">
                                    {recordList.map((v,i) => {
                                        return (<div key={v.history_id} className={`item ${activeRecoed.history_id == v.history_id ? 'active' : ''}`} onClick={this.clickRecord.bind(this, v)}>
                                            {moment(v.creation_date*1000).format('YYYY年MM月DD日 HH:mm')}
                                        </div>)
                                    })}
                                </div>
                            {/* </div>     */}
                        </div>
                        <div className="content-right">
                        {loading ? <Loading /> :
                        <div className="content-right-box">
                            <div className="title">
                                <span className="title-text">扫描信息</span>
                            </div>
                            <div className="content-right-header">
                               <TopMessage
                                    statistical={statistical}
                                    scanInfo={scanInfo}
                                    historyInfo={historyInfo}
                               ></TopMessage>
                            </div>
                            <div className="title">
                                <span className="title-text" >主机扫描结果</span>
                                <span className="show-all-detail" onClick={this.showAllDetail.bind(this)}>
                                    {activeKey.length != 0 && this.allkey.length == activeKey.length ? '全部收起' : '全部展开'}
                                    {/* {'全部展开'} */}
                                </span>
                            </div>
                            <div className="content-right-detail">
                                {hosts && hosts.length > 0 ?
                                <Collapse
                                
                                    bordered={false}
                                    // defaultActiveKey={['1']}
                                    activeKey={activeKey}
                                >
                                    {hosts.map((v,index) => {
                                        var arr = bugData[v.hostname];
                                        // bug 去重
                                        var dataSource=arr;
                                        // for (var i = 0; i < arr.length; i++) {
                                        //     for (var j = i+1; j < arr.length; j++) {
                                        //       if(arr[i].Name===arr[j].Name){
                                        //         ++i;
                                        //       }
                                        //     }
                                        //     dataSource.push(arr[i]);
                                        // }
                                        return (
                                            <Panel 
                                                key={index}
                                                className="data-table"
                                                showArrow={false}
                                                header={this.collapseHeader(v)} key={v.hostname} >
                                                <Table
                                                    // loading={loading}
                                                    rowKey={this.renderRowKey}
                                                    className="center auto-scroll-y"
                                                    bordered={true}
                                                    columns={columns}
                                                    dataSource={dataSource}
                                                    pagination={false} 
                                                />
                                            </Panel>
                                        )
                                    })}
                                    
                                </Collapse>
                                :
                                <NoData title={'暂无扫描报告'}></NoData>
                                }
                            </div>                  
                            </div>
                            }  
                        </div>
                    </div>
                    : <NoData title={'暂无扫描报告'}></NoData>
                    }
                </div>
                </div>
            </div>
        )
    }
}