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
      imgs: _.cloneDeep(Dict.getDict("periodical_image_type").find(v => v.dictValue == "periodical_image_type_child_page_button").url.split(",") || []),
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
     * 登录提交
     */
    handleSubmit(e) {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
          debugger
          if (!err) {
              let param = {
                  username: values.username,
                  password: values.password,
              }
              Service.base.qikanDetail(param).then(res => {
                  if(res.status === 200){
                      if(values.remember){
                          setCache("Nessus.remember-username", param.username, 'local');
                      } else {
                          setCache("Nessus.remember-username", '', 'local');
                      }
                      setCache("isRemember", values.remember, 'local');
                      setCache("Nessus.token", res.data.token, 'local');
                      // message.info("登录成功！")
                      // console.log("token", res.data.token);
                      this.props.UserStore.setLoginState(true);
                      this.props.history.replace('/home');
                      // window.location.href = '/home';
                  } else {
                      return message.error("登录失败！")
                  }
              })

              console.log('Received values of form: ', values);
          }
      });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      colon: true
    }

    let { data, imgs } = this.state;
    if(!data.id){
      return null
    }
    return (
      <div className='detail-view-page w1200'>
          <div className="top-info">
            <div className="title">{data.name}</div>
            <div className="qikan-base">
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
              <Form onSubmit={this.handleSubmit.bind(this)} className="submit-form">
                <Form.Item label="文章标题" {...formItemLayout}>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: '请填写您的文章题目' }],
                    })(
                        <Input   placeholder="请填写您的文章题目" />
                    )}
                </Form.Item>
                <Form.Item label="作者姓名" {...formItemLayout}>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '只写第一作者或通讯作者名称' }],
                    })(
                        <Input   type="password" placeholder="只写第一作者或通讯作者名称" />
                    )}
                </Form.Item>
                <Form.Item label="联系方式" {...formItemLayout}>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: '请正确填写您的手机联系方式' }],
                    })(
                        <Input   placeholder="请正确填写您的手机联系方式" />
                    )}
                </Form.Item>
                <Form.Item label="QQ号码" {...formItemLayout}>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请正确填写您的QQ号码' }],
                    })(
                        <Input   type="password" placeholder="请正确填写您的QQ号码" />
                    )}
                </Form.Item>
                <Form.Item label="电子邮箱" {...formItemLayout}>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: '请提供正确的通讯电子信箱' }],
                    })(
                        <Input   placeholder="请提供正确的通讯电子信箱" />
                    )}
                </Form.Item>
                <Form.Item label="上传稿件" {...formItemLayout}>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码' }],
                    })(
                        <Input   type="password" placeholder="密码" />
                    )}
                </Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                    投 稿
                </Button>

            </Form>
            </div>
          </div>
      </div>
    )
    ;
  }
}

const DetailContribute = Form.create({})(Contribute);
export default DetailContribute;
