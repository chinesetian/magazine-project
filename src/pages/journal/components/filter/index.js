import React from 'react'
import { Form, Button, Input, Checkbox, message, Icon } from 'antd'
import './index.less'

class Filter extends React.Component{

    state = {
      collapse: true,
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

    getHeight = (i) => {
      let target = document.getElementsByClassName("tag-item")[i];
      return target.style.height;
    }

    collapse = () => {
      let { collapse } = this.state;
      this.setState({collapse: !collapse})
    }

    render(){
        let { collapse } = this.state;
        let { data, searchData, onChange} = this.props;
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 },
            colon: false
        };

        return(
            <div className="filter-layout">
                
                    <Form className="tag-form" style={{height: collapse ? 130 : 'auto'}}>
                        {data.map((item,i) => {
                          // let flag = this.getHeight(i) == '36px' ? true : false;
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
                            {/* {item.children.length > 11 && <div className="right-slidr"onClick={(e) => this.isShowItem(i)}><span>{'展开'}</span></div>} */}
                          </div>
                          )
                        })}
                    </Form>
                <span className="bottom-slider" onClick={this.collapse}>{collapse ? "展开" : '收起'}</span>
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