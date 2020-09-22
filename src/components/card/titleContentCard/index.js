import React from 'react'

import LabelValue from '../../LabelValue'

import './index.less'


export default class TitleContentCard extends React.Component{

    render(){
      let {className, title ='title', eng, children, showMore,borderColor } = this.props
        return(
            <div className={`title-content-card ${className}`} style={{borderColor: `${borderColor ? borderColor : 'transparent'}`}}>
                <div className="title-content-title">
                    <span className="title">
                        {title}
                        {eng && <span className="eng">/ {eng}</span>}
                    </span>
                    {showMore && <span className="more" onClick={showMore}>+更多</span>}
                </div>
                <div className="content-card">
                    {children}
                </div>
            </div>
        )
    }
}