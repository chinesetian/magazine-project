import React from 'react'
import moment from 'moment'
import {
    Form, DatePicker, Button, Select, Switch, TimePicker, message
  } from 'antd'
import './index.less'
import ScanService from '../../../../api/scan'
import { stringFormat } from '../../../../utils/format'
import { dayOption } from '../../../../dict'

const { Option } = Select;
// const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

class Timed extends React.Component{

    state = {
        checked: false,
        rrules: null,
        time: null,
    }

    originParam = null;

    componentDidMount(){
        this.initData();

    }

    componentWillUnmount(){
        this.originParam = null;
    }

    initData(){
        let { scanInfo } = this.props;
        ScanService.getScanConfig(scanInfo.id).then(res => {
            if(res.status == 200){
                this.originParam = res.data;
                let settingInfo = res.data.settings.basic;
                let enabled = settingInfo.groups.filter(v => v.title == 'Schedule')[0].enabled ? true : false;
                this.setFormValue(settingInfo, enabled);
            } else{
                message.error("获取扫描任务的配置信息失败！")
            }
        })
    }

    setFormValue(settingInfo, enabled) {
        let rrules = settingInfo.groups.filter(v => v.title == 'Schedule')[0].rrules;
        let temp = settingInfo.groups.filter(v => v.title == 'Schedule')[0].starttime;
        let time = temp && temp.length > 0 ? temp.split('T') : [];
        this.setState({
            checked: !!enabled,
            rrules,
            time,
        });
        setTimeout(() => {
            this.props.form && this.props.form.setFieldsValue({
                enabled: !!enabled,
                repeat: rrules && rrules.length > 0 ? stringFormat(rrules).FREQ : 'DAILY',
                cycle: rrules && rrules.length > 0 ? Number(stringFormat(rrules).INTERVAL) : 2,
                beginDate: time && time.length > 0 && time[0] ?  moment(time[0], 'YYYY.MM.DD') : '',
                beginTime: time && time.length > 0 && time[1] ? moment(time[1], 'HH:mm:ss') : '',
                
            })
        }, 60);
       
    }

    submit = (e) => {
        let { scanInfo } = this.props;
        let settingInfo = this.originParam.settings.basic;
        e.preventDefault();
        this.props.form && this.props.form.validateFields((err, values) => {
            if (!err) {
                let enabled = values.enabled ? true : false;
                let beginDate = values.beginDate ? moment(values.beginDate).format('YYYYMMDD') : '';
                let beginTime = values.beginTime ? moment(values.beginTime.valueOf()).format('HHmmss') : '';
                let repeat = values.repeat;
                let cycle = values.cycle;
                let rrules = repeat && cycle ? `FREQ=${repeat};INTERVAL=${cycle}` : '';
                let param = {
                    enabled: enabled,
                    starttime: beginDate && beginTime ? `${beginDate}T${beginTime}` : '',
                    timezone: "PRC",
                    rrules: rrules,
                }

                let obj = {
                    "uuid": this.originParam.uuid,
                    "settings": {
                        "emails": settingInfo.groups.filter(v => v.title == 'Notifications')[0].emails || "",
                        "filter_type": settingInfo.groups.filter(v => v.title == 'Notifications')[0].filter_type || "and",
                        "filters": settingInfo.groups.filter(v => v.title == 'Notifications')[0].filters || null,
                        "launch": repeat || "DAILY",
                        "launch_now": false,
                        "enabled": false,
                        "timezone": "PRC",
                        "starttime": "20190620T223000",
                        "rrules": "FREQ=DAILY;INTERVAL=2",
                        "file_targets": settingInfo.inputs.filter(v => v.id == 'file_targets')[0].default || "",
                        "text_targets": settingInfo.inputs.filter(v => v.id == 'text_targets')[0].default,
                        "policy_id": settingInfo.inputs.filter(v => v.id == 'policy_id')[0].default,
                        "scanner_id": settingInfo.inputs.filter(v => v.id == 'scanner_id')[0].default,
                        "folder_id": settingInfo.inputs.filter(v => v.id == 'folder_id')[0].default,
                        "description": settingInfo.inputs.filter(v => v.id == 'description')[0].default,
                        "name": settingInfo.inputs.filter(v => v.id == 'name')[0].default,
                    }
                };
                Object.assign(obj.settings, param);
                let option = obj;
                console.log('Received values of form: ', option);
                ScanService.editScanConfig(scanInfo.id, option).then(res => {
                    if(res.status === 200){
                        message.info("修改成功！")
                        this.initData();
                        this.props.updateStatus && this.props.updateStatus();
                    } else {
                        message.error("修改出错！")
                    }
                })
            }
        });
    }

    cancel =(e) =>{
        console.log('取消')
        this.props.goTab && this.props.goTab('1')
    }

    switchTime = (checked, e) => {
        this.setState({checked: checked});

        let settingInfo = this.originParam.settings.basic;
        let that = this;
        setTimeout(() => {
            checked && that.props.form && that.setFormValue(settingInfo, checked);
        },1000)
    }

    render(){
        let { checked, rrules, time  } = this.state;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 16 },
            colon: true
        }

        let obj = rrules ? stringFormat(rrules) : {};
        let date = time&& time.length > 0 &&time[0] ? moment(moment(time[0], 'YYYY.MM.DD').valueOf()).format('YYYY 年 MM 月 DD 日') : '';
        let hour = time&& time.length > 0 &&time[1] ? moment(moment(time[1], 'HH:mm:ss').valueOf()).format('HH:mm') : '';

        // let { data } = this.props;
        //2019 年 5 月 20 日开始，每天14:00自动扫描
        return(
            <div className="timed-layout">
                <div className="containter">
                <div className="common-header">
                    <div className="left">
                    <span className="title">定时扫描</span>
                    { checked && obj && obj.INTERVAL ? <span>{`${date} 每 ${obj.INTERVAL || ''} 天 ${hour} 自动扫描`}</span> : null}
                    </div>
                </div>
                <div className="timed-form-content">
                    <Form onSubmit={this.handleSubmit} className="timed-form">
                        <Form.Item label="定时扫描" {...formItemLayout}>
                            {getFieldDecorator('enabled', {
            
                            })(
                                 <Switch 
                                    checked={checked}
                                    onClick={this.switchTime}
                                    checkedChildren="开" unCheckedChildren="关"
                                 />
                            )}
                        </Form.Item>
                        { checked ?
                        <React.Fragment>
                                <Form.Item label="重复" {...formItemLayout}>
                            {getFieldDecorator('repeat', {
                                rules: [{ required: true, message: '重复时间必须选择' }],
                            })(
                                <Select placeholder="请选择重复时间">
                                    {/* <Option value="ONETIME">一次</Option> */}
                                    <Option value="DAILY">按天</Option>
                                    {/* <Option value="WEEKLY">每周</Option>
                                    <Option value="MONTHLY">每月</Option>
                                    <Option value="YEARLY">每年</Option> */}
                                </Select>,
                            )}
                        </Form.Item>
                        <Form.Item label="周期" {...formItemLayout}>
                            {getFieldDecorator('cycle', {
                                rules: [{ required: true, message: '执行周期必须选择' }],
                            })(
                                <Select placeholder="请选择执行周期">
                                    {dayOption.map((v,i) => {
                                        return (<Option key={v.value} value={v.value}>{v.label}</Option>)
                                    })}
                                </Select>,
                            )}
                        </Form.Item>
                        <Form.Item className='' label="开始日期" {...formItemLayout}>
                            {getFieldDecorator('beginDate', {
                                rules: [
                                    {
                                        required: true,
                                        message: '开始日期必须选择'
                                    }
                                ]
                            })(
                                <DatePicker 
                                    name="beginDate"
                                    format="YYYY.MM.DD"
                                    placeholder={'开始日期'}
                                />
                            )}
                        </Form.Item>
                        
                        <Form.Item className='' label="开始时间" {...formItemLayout}>
                            {getFieldDecorator('beginTime', {
                                rules: [
                                    {
                                        required: true,
                                        message: '开始时间必须选择'
                                    }
                                ]
                            })(
                                <TimePicker
                                    minuteStep={30}
                                    secondStep={60}
                                    name="beginTime"
                                    format="HH:mm"
                                    use12Hours={false}
                                    placeholder={'开始时间'}
                                    autoComplete="off"
                                />
                            )}
                        </Form.Item>

                        </React.Fragment>
                        : null
                        }
                        
                    </Form>
                </div>
                <div className="bottom-action">
                    <Button type={"primary"} onClick={this.submit}>确定</Button>
                    <Button onClick={this.cancel}>取消</Button>
                </div>
                </div>
            </div>
        )
    }
}

const TimedForm = Form.create({})(Timed);
export default TimedForm