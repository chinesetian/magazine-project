import React from 'react'
import './index.less'


export default class TitleWithList extends React.Component{

    render(){
      let { title = '', data = [], clickArticle } = this.props
        return(
            <div className='title-with-list' >
                <div className="title">{title}</div>
                <div className="content">
                    {data.map(item => {
                        return(<div key={item.id} className="item" onClick={() => clickArticle(item)}>{item.title}</div>)
                    })}
                </div>
            </div>
        )
    }
}