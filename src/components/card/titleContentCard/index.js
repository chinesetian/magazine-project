import React from 'react'
import './index.less'


export default class TitleContentCard extends React.Component{

    render(){
      let {className, title, children, showMore } = this.props
        return(
            <div className={`title-content-card ${className}`}>
                <div className="title-content-title">
                    <span className="title">{title}</span>
                    <span className="more" onClick={showMore}>+更多</span>
                </div>
                <div className="content-card">
                    {children}
                </div>
            </div>
        )
    }
}