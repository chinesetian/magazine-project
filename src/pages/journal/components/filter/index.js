import React from 'react'
import { Form, Button, Input, Checkbox, message, Icon } from 'antd'
import './index.less'

class Filter extends React.Component{

    state = {
        checked: true,
    }

    componentDidMount(){
    }

    // submit = (e) => {
    //     e.preventDefault();
    //     this.props.form.validateFields((err, values) => {
    //         if (!err) {
    //             let param = {
    //                 current_password: values.oldPassword,
    //                 password: values.newPassword,
    //             }
    //         }
    //     });
    // }

    isShowItem = (i) => {
        let target = document.getElementsByClassName("tag-item")[i];
        if(target.style.height == '36px'){
          target.style.height = 'auto'
        } else {
          target.style.height = "36px"
        }

    }

    render(){
        // let { checked } = this.state;

        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 },
            colon: false
        };
        let { data, searchData, onChange} = this.props;
        console.log(data)
        return(
            <div className="filter-layout">
                
                    <Form className="tag-form">
                        {data.map((item,i) => {
                          return(
                            <div key={i} className={`tag-item ${i}`}>
                              <Form.Item label={item.dictName} {...formItemLayout}>
                                {getFieldDecorator(item.transformPeriodical, {
                                })(
                                  <Tag 
                                    list={item.children} 
                                    activeKey={searchData[item.transformPeriodical]}
                                    onChange={onChange}
                                  />
                                )}
            
                            </Form.Item>
                            {/* {item.children.length > 11 && <div className="right-slidr"onClick={(e) => this.isShowItem(i)}><span>展开<Icon type="down" /></span></div>} */}
                          </div>
                          )
                        })}
                    </Form>

                {/* <span className="slider" onClick={this.submit}>{'收起'}</span> */}
            </div>
        )
    }
}
class Tag extends React.Component{
  render(){
    let { list = [], activeKey, onChange } = this.props
    return(
      <div className="tag-item-content">
        {list.map((v,i) => {
          return (<span title={v.label} data-value={v.value}
            className={`tag ${activeKey === v.value ? 'active' : ''}`} key={i} 
            onClick={(e) => onChange({[v.transformPeriodical]: v.value})}>
            {v.label}
          </span>)
        })}
      </div>
    )
  }
}

const FilterForm = Form.create({})(Filter);
export default FilterForm