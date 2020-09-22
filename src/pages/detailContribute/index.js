import React from "react";
import LabelValue from '../../components/LabelValue'
import { isString } from "util";
import * as _ from 'lodash';
import { setCache, getCache } from '../../utils/cache';
import Card from '../../components/card'
import {
  Form, Icon, Input, Button, Modal, message,
} from 'antd'

import AntFile from '../../components/AntFile'
import NewDetailLeft from '../../components/newDetailLeft'

import './index.less';

const { success } = Modal;
const QikanBaseInfo = Card.QikanBaseInfo
const TitleWithImgList = Card.TitleWithImgList
const TitlePage = Card.TitlePage

const { Dict, Service, Store } = window

class Contribute extends React.Component {

  constructor(props){
    super(props)
    const { location } = props;
    // const data = location.state.data;
    // data && data.id && setCache('detailId', {id: data.id }, "session")
    let query = getCache("detailData", "session") || {}
    // query.id && this.qikanDetail(query)
    this.state = {
      data: query || {},
      file: {},
      gaojian: {},
    };
  }
 
  componentDidMount() {

  }

  // qikanDetail(data){
  //   Service.base.qikanDetail(data).then(res => {
  //     if(res.code == 0){
  //       setCache('detailData', res.data, "session")
  //       this.setState({data: res.data,});
  //     } else {
  //         this.setState({data: {},});
  //     }
  //   }).catch(e => {
  //     this.setState({data: {},});
  //   })
  // }

      /**
     * 投稿提交
     */
        handleSubmit(e) {
        let target =  Dict.getDict("periodical_other_info") || []   
        let platform = target.find(v => v.value == "periodical_other_info_code") || {}
        
        e.preventDefault();
      let { file, data } = this.state;
      this.props.form.validateFields((err, values) => {
            // console.log('Received values of form: ', values);
          if(!file){
            message.warn("请上传文件")
          }
          if (!err) {
                let param ={
                    "qiKanId": data.id,
                    "platform": platform.label || "SJ",
                    "title": values.title,
                    "author": values.author,
                    "tel": values.tel,
                    "qq": values.qq,
                    "email": values.email,
                    "fileName": file.name || '',
                    "fileUrl": file.fileUrl || '',
                }
                Service.base.tougaoAdd(param).then(res => {
                    if(res.code == 0){
                        // message.info("投稿成功")
                        success({
                            title: "投稿成功",
                            content: <div>稿件编号为：<span className="red">{res.data.no}</span> </div>,
                            okText: '确定',
                            onOk() {
                                console.log('OK');
                            },
                            // onCancel() {
                            //     console.log('Cancel');
                            // },
                        })
                        this.setState({gaojian: res.data || {}})
                    } else {
                        message.error("投稿失败")
                        return  false
                    }
                }).catch(err => {
                    // console.error(err);
                    message.error('投稿失败');
                });
          }
      });
  }

  FormmemoizedUploadRemote = (file) => {
    //   console.log(file)
      const formData = new FormData();
      formData.append('file', file);
    //   console.log(formData)
      Service.base.uploadFile(formData).then(res => {
            // console.log(res)
            if(res.responseData.code == 0){
                const url = res.responseData.data.fileUrl;
                file.fileUrl = url
                if (!url) {
                    return message.error('图片上传失败');
                }
                this.setState({file});
            } else {
                message.error('图片上传失败');
            }
           
        }).catch(err => {
          console.error(err);
          message.error('图片上传失败');
        });
    }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      colon: true
    }

    let { data, file, gaojian } = this.state;
    if(!data.id){
      return null
    }
    return (
        <div className="detail-contribute">
            <div className='detail-view-page w1200'>
                {/* <div className="top-info">
                    <div className="title">{data.name}</div>
                    <div className="qikan-base top-base">
                        <QikanBaseInfo data={data}/>
                    </div>
                </div> */}
                <div className="detail-view-wrap">
                    {/* <div className="left">
                    <div className="img-box">
                        <img src={`/magazine${data.url}`} />
                    </div>
                    </div> */}
                    <NewDetailLeft
                        data={data}
                    ></NewDetailLeft>
                    <div className="right">
                        <TitlePage 
                            pageName={"在线投稿"}
                        ></TitlePage>
                        <div className="red">投稿关注：请详细咨询了解后自行在线正确规范投稿，稿件送审期间作者无需支付任何费用。</div>
                        <Form onSubmit={this.handleSubmit.bind(this)} className="submit-form">
                            <Form.Item label="文章标题" {...formItemLayout}>
                                {getFieldDecorator('title', {
                                    rules: [{ required: true, message: '请填写您的文章题目' }],
                                })(
                                    <Input   placeholder="请填写您的文章题目" />
                                )}
                            </Form.Item>
                            <Form.Item label="作者姓名" {...formItemLayout}>
                                {getFieldDecorator('author', {
                                    rules: [{ required: true, message: '只写第一作者或通讯作者名称' }],
                                })(
                                    <Input  placeholder="只写第一作者或通讯作者名称" />
                                )}
                            </Form.Item>
                            <Form.Item label="联系方式" {...formItemLayout}>
                                {getFieldDecorator('tel', {
                                    rules: [{ required: true, message: '请正确填写您的手机联系方式' }],
                                })(
                                    <Input   placeholder="请正确填写您的手机联系方式" />
                                )}
                            </Form.Item>
                            <Form.Item label="QQ号码" {...formItemLayout}>
                                {getFieldDecorator('qq', {
                                    rules: [{ required: true, message: '请正确填写您的QQ号码' }],
                                })(
                                    <Input  placeholder="请正确填写您的QQ号码" />
                                )}
                            </Form.Item>
                            <Form.Item label="电子邮箱" {...formItemLayout}>
                                {getFieldDecorator('email', {
                                    rules: [{ required: true, message: '请提供正确的通讯电子信箱' }],
                                })(
                                    <Input   placeholder="请提供正确的通讯电子信箱" />
                                )}
                            </Form.Item>
                            <Form.Item label="上传稿件" {...formItemLayout}>
                                {getFieldDecorator('fileName', {
                                    rules: [{ required: true, message: '请上传稿件' }],
                                })(
                                    <AntFile customUpload={this.FormmemoizedUploadRemote}>
                                        <Button >
                                            {<Icon type={<Icon type="arrow-up" />} />}{"上传文件"}
                                        </Button>
                                    </AntFile>
                                
                                )}<span style={{marginLeft: 10}}>{file.name || ''}</span>
                            </Form.Item>
                            <div >{gaojian.no ? 
                                <div >稿件编号为：
                                <span className="red">{gaojian.no}</span>
                                </div>
                                :
                                <span className="red">填写完整信息》选择文件》点击"完成投稿"按钮</span>
                            }</div>
                            <Button type="primary" htmlType="submit" className="submit-button">
                                投 稿
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

const DetailContribute = Form.create({})(Contribute);
export default DetailContribute;
