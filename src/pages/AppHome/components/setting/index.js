import React from 'react'
import {
    Form, Button, Input, Checkbox, message
  } from 'antd'
import './index.less'
import UserService from '../../../../api/user'


class Setting extends React.Component{

    state = {
        checked: true,
        confirmDirty: false,
    }

    componentDidMount(){
    }

    submit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let param = {
                    current_password: values.oldPassword,
                    password: values.newPassword,
                }
                UserService.changePwd(param).then(res => {
                    if(res.status === 200){
                        message.info("修改成功！")
                    } else {
                        message.error("密码修改失败！")
                    }
                }).catch(e => {
                    if(e.status == 400){
                    }
                })

                // console.log('Received values of form: ', values);
            }
        });
    }

    cancel =(e) =>{
        console.log('取消')
        this.props.goTab && this.props.goTab('1')
    }

    compareToFirstPassword(rule, value, callback) {
        const form = this.props.form;
        if (value && value !== form.getFieldValue("newPassword")) {
          callback("密码不一致!");
        } else {
          callback();
        }
    }

    validateToNextPassword(rule, value, callback) {
        const form = this.props.form;
        // let reg = /^[a-zA-Z]\w{5,17}$/;
        // if (!reg.test(value)) {
        //   callback("密码为6~18位以字母开头的字母,数字,_组合)");
        // }
        if (value && this.state.confirmDirty 
            // && reg.test(value)
        ) {
          form.validateFields(["confirm"], { force: true });
        }
        callback();
    }

    handleConfirmBlur(e) {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    isShowPwd = (e) => {
        console.log(`checked = ${e.target.checked}`);
        if(e.target.checked){
            document.getElementById("oldPassword").setAttribute('type', 'text');
            document.getElementById("newPassword").setAttribute('type', 'text');
            document.getElementById("confirm").setAttribute('type', 'text');
        } else {
            document.getElementById("oldPassword").setAttribute('type', 'password');
            document.getElementById("newPassword").setAttribute('type', 'password');
            document.getElementById("confirm").setAttribute('type', 'password');
        }
    }


    render(){
        // let { checked } = this.state;

        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 16 },
            colon: true
        };
        const tailFormItemLayout = {
            wrapperCol: {
              xs: {
                span: 24,
                offset: 0,
              },
              sm: {
                span: 16,
                offset: 6,
              },
            }
        };
        // let { data } = this.props;
        return(
            <div className="setting-layout">
                <div className="containter">
                <div className="common-header">
                    <div className="left">
                        <span className="title">账户设置</span>
                    </div>
                    
                </div>
                <div className="timed-form-content">
                    <Form onSubmit={this.handleSubmit} className="timed-form">
                        <Form.Item label="当前密码" {...formItemLayout}>
                            {getFieldDecorator('oldPassword', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入当前密码'
                                    },
                                ]
                            })(<Input.Password
                                className='oldPassword'
                                visibilityToggle={false}
                                type="password"
                            />)}
                        </Form.Item>
                        <Form.Item label="新密码" {...formItemLayout}>
                            {getFieldDecorator('newPassword', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请输入新密码'
                                    },
                                    {
                                        validator: this.validateToNextPassword.bind(this)
                                    }
                                ]
                            })(<Input.Password
                                className='newPassword'
                                visibilityToggle={false}
                                type="password"
                            />)}
                        </Form.Item>
                        <Form.Item label="确认新密码" {...formItemLayout}>
                            {getFieldDecorator('confirm', {
                                rules: [
                                    {
                                        required: true,
                                        message: '请重复新密码'
                                    },
                                    {
                                        validator: this.compareToFirstPassword.bind(this)
                                      }
                                ]
                            })(<Input.Password
                                className='confirm'
                                visibilityToggle={false}
                                type="password"
                                onBlur={this.handleConfirmBlur.bind(this)}
                            />)}
                        </Form.Item>
                        <Form.Item {...tailFormItemLayout}>
                            {getFieldDecorator('show', {
                            })(
                                <Checkbox
                                    onChange={this.isShowPwd}
                                >
                                    显示密码
                                </Checkbox>
                            )}
                        </Form.Item>
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

const SettingForm = Form.create({})(Setting);
export default SettingForm