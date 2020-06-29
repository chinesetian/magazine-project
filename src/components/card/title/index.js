import React from 'react'
import './index.less'


export default class TItle extends React.Component{

    render(){
      let { title } = this.props
        return(
            <div className="title-box">
                <span className="title">{title}</span>
            </div>
        )
    }
}