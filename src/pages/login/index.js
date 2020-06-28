import React from 'react';
import {
    Form, Icon, Input, Button, Checkbox, message
  } from 'antd'
import { withRouter } from 'react-router-dom'
import { observer, inject } from 'mobx-react'

import './index.less'

import UserService from '../../api/user';
import { Footer } from '../../components/footer';
import { setCache, getCache, deleteCache } from '../../utils/cache'

@withRouter
@inject('UserStore')
class Login extends React.Component{

    state = {
        checked: false,
    }

    componentWillMount(){
        // 获取UUID
        let date = new Date().getTime();
        deleteCache("apiToken", 'local');
        deleteCache("Nessus.token", 'local');
        
        UserService.getUUID(date).then(res => {
            if(res.status == 200){
                let t = res.data;
                let r = new RegExp('"getApiToken",value:function[\(][\)]{return"(.{36})"')
                let uuid = r.exec(t)[1];
                console.log(uuid);
                setCache("apiToken", uuid, 'local');

                this.init();
            }
        })
    }

    init(){
        // 判断服务是否正常
        UserService.serverStatus().then(res => {
            if(res.status == 200){
                console.log("server-status-is", res.data.status);
            } else {
                message.error("服务异常！")
                console.log("server-status-is-error");
            }
        })
    }

    componentDidMount(){
        let temp = getCache("Nessus.remember-username");
        let username = temp && temp == 'undefined' ? '' : temp;
        let remember = getCache("isRemember") === true ? true : false;
        this.props.form.setFieldsValue({
            username: username || '',
            remember: remember,
        })

        this.setState({checked: remember})
    }

    /**
     * 登录提交
     */
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let param = {
                    username: values.username,
                    password: values.password,
                }
                UserService.login(param).then(res => {
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

    onChange = e => {
        console.log('checked = ', e.target.checked);
        this.setState({
          checked: e.target.checked,
        });
    };

    render(){
        const { getFieldDecorator } = this.props.form;
        let { checked } = this.state;

        return(
            <div className="user-login-layout">
                <div className="user-login-content">
                    <div className="login-content-title">
                        <div className="title-text">
                            安全服务器扫描工具 v8.0
                            <span>专业版</span>
                        </div>
                    </div>
                    <div className="login-content-form">
                        <div className="login-form-title">登录</div>
                        <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                            <Form.Item>
                                {getFieldDecorator('username', {
                                    rules: [{ required: true, message: '请输入用户名' }],
                                })(
                                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="账户" />
                                )}
                            </Form.Item>
                            <Form.Item>
                                {getFieldDecorator('password', {
                                    rules: [{ required: true, message: '请输入密码' }],
                                })(
                                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                                )}
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    登录
                                </Button>
                                {getFieldDecorator('remember', {
                                    
                                })(<Checkbox 
                                    checked={checked}
                                    onChange={this.onChange}
                                >记住用户名</Checkbox>)}
                            </Form.Item>
                        </Form>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        )
    }
}

const LoginForm = Form.create({})(Login);
export default LoginForm
