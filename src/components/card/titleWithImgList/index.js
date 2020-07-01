import React from 'react'
import './index.less'


export default class TitleWithImgList extends React.Component{

    render(){
      let { title = '', data = {}, clickArticle } = this.props
        return(
            <div className='title-with-img-list' >
                <div className="title">{title}</div>
                <div className="content">
                    {data.map(item => {
                        return(
                        <div key={item.id} className="item" onClick={() => clickArticle(item)}>
                            <img src={item.url}/>
                            <div className="name" title={item.description}>{item.description}</div>
                        </div>
                    )
                    })}
                </div>
            </div>
        )
    }
}