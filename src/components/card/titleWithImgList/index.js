import React from 'react'
import './index.less'


const bookUrl = "/resource/image/book.jpg"
const bookData = [
    {id: 1,  name: '中国药房', url: bookUrl, description: "《中国药房》",},
    {id: 2,  name: '当代医药论丛', url: bookUrl, description: "《中国药房》杂",},
    {id: 3,  name: '吉林医学', url: bookUrl, description: "《中国药房》杂志是中",},
    {id: 4,  name: '重庆医学', url: bookUrl, description: "国国家卫生和",},
  ]


export default class TitleWithImgList extends React.Component{

    render(){
      let { title = '', data = bookData, clickArticle } = this.props
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