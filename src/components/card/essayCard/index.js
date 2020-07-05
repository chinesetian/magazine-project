import React from 'react'
import './index.less'


export default class EssayCard extends React.Component{

    render(){
      let { data ={}, clickEssay } = this.props
        return(
            <div className="essay-card">
                <span className="title" onClick={(e) => clickEssay(data)}>{data.title}</span>
                <div className="summary">{data.summary}</div>
            </div>
        )
    }
}