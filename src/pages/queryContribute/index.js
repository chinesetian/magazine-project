import React from "react";
import LabelValue from '../../components/LabelValue'
import { isString } from "util";
import * as _ from 'lodash';
import { setCache, getCache } from '../../utils/cache';
import Card from '../../components/card'
import {
  Form, Icon, Input, Button, Checkbox, message
} from 'antd'


import './index.less';

const QikanBaseInfo = Card.QikanBaseInfo
const TitleWithImgList = Card.TitleWithImgList
const { Dict, Service, Store } = window

class QueryContributeForm extends React.Component {

  constructor(props){
    super(props)
    const { location } = props;
    this.value = location.state.data || '';
    // data && data.id && setCache('detailId', {id: data.id }, "session")
    let query = getCache("detailData", "session") || {}
    this.state = {
      data: query || {},
      gaojian: {},

    };
  }
 
  componentDidMount() {
    if(this.value){
         this.props.form.setFieldsValue({
            no: this.value,
        });
        this.queryData({"no": this.value,})
    }
  }

      /**
     * 登录提交
     */
    handleSubmit(e) {
      e.preventDefault();
      this.setState({gaojian: {}})
      this.props.form.validateFields((err, values) => {
            // console.log('Received values of form: ', values);
          if (!err) {
                let param ={
                    "no": values.no,
                }
             
             this.queryData(param)
          }
      });
  }

  queryData = (param) => {
    Service.base.tougaoDetail(param).then(res => {
        if(res.code == 0){
            this.setState({gaojian: res.data || {}})
            // message.info("查询成功")
        } else {
            message.error("查询失败")
            return  false
        }
    }).catch(err => {
        // console.error(err);
        message.error("查询失败")
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      colon: true
    }

    let { data, gaojian } = this.state;
    if(!data.id){
      return null
    }
    return (
        <div className="detail-contribute">
            <div className='detail-view-page w1200'>
                <div className="top-info">
                    <div className="title">{data.name}</div>
                    <div className="qikan-base top-base">
                        <QikanBaseInfo data={data}/>
                    </div>
                </div>
                <div className="detail-view-wrap">
                    <div className="left">
                    <div className="img-box">
                        <img src={`/magazine${data.url}`} />
                    </div>
                    </div>
                    <div className="right">
                        <div className="tip" style={{paddingLeft: 30}}>
                            <span>{`查询告知：请直接输入投稿《${data.name}》杂志时订阅平台系统生成的文章编号`}</span>
                            <span className="red">(稿件录用通知里亦有告知文章编号)</span>
                            <div style={{paddingLeft: 60}}>查询。非订阅平台专用文章编号，无法查询</div>
                        </div>
                        <Form onSubmit={this.handleSubmit.bind(this)} className="submit-form">
                            <Form.Item label="文章编号" {...formItemLayout}>
                                {getFieldDecorator('no', {
                                    rules: [{ required: true, message: '请输入文章编号' }],
                                    initialValue: '',
                                })(
                                    <Input   placeholder="请输入文章编号" />
                                )}
                            </Form.Item>
                            <div className="tip">{gaojian.no ? 
                                <div>
                                    <div style={{marginBottom: 15}}><b>以下为查询结果：</b>（为了隐私信息，这里只显示部分作者信息）</div>
                                    <div>姓名：{gaojian.author}</div>
                                    <div>刊物名称：{gaojian.title}</div>
                                    <div>状态：<span className="red">{Dict.getLabel("periodical_audit_status", gaojian.status)}</span></div>
                                </div>
                                : '未查到相关数据'}
                            </div>
                            <Button type="primary" htmlType="submit" className="submit-button">
                                查 询
                            </Button>
                        </Form>
                    </div>
                </div>
            </div>
      </div>
    )
    ;
  }
}

const QueryContribute = Form.create({})(QueryContributeForm);
export default QueryContribute;
