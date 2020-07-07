import React from 'react'
import './index.less'


export default class SortWithList extends React.Component{

    render(){
      let { title = '', data = [], clickArticle, clickMore } = this.props
        return(
            <div className='sort-with-list' >
                <div className="title">{title}</div>
                {data.length > 0 && <div className="content">
                    {data.map((item,index) => {
                        return(
                        <div key={item.id} className="item" onClick={() => clickArticle(item)}>
                            <span className={`index ${index < 3 ? 'red': ''}`}>{index + 1}</span>
                            <span className="name">{item.name}</span>
                        </div>
                        )
                    })}
                    {/* <div className="more"onClick={() => clickMore(data)} >查看完整版榜单 》</div> */}
                </div>
                }
            </div>
        )
    }
}