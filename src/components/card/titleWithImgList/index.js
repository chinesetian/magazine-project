import React from 'react'
import './index.less'


const bookUrl = "/resource/image/book.jpg"
const bookData = [
    {id: 1,  name: '中国药房', url: bookUrl, description: "《中国药房》",},
    {id: 2,  name: '当代医药论丛', url: bookUrl, description: "《中国药房》杂",},
    {id: 3,  name: '吉林医学', url: bookUrl, description: "《中国药房》杂志是中",},
    {id: 4,  name: '重庆医学', url: bookUrl, description: "国国家卫生和",},
  ]

  const { Dict, Service, Store } = window

export default class TitleWithImgList extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            bookList: [],
        }
        this.qikanpageList({
            offset: 0,
            limit: 4,
        })
    }

    /**
   * 查询期刊列表
   * @param {*} searchData 
    */
    qikanpageList(searchData){
        console.log('查询数据', searchData)
        Service.base.qikan(searchData).then(res => {
            if(res.code == 0){
                this.setState({bookList: res.data.list});
            } else {
                this.setState({bookList: [],});
            }
        }).catch(e => {
            this.setState({bookList: [], });
        })
    }

    clickArticle = (v) => {
        let page = Store.MenuStore.getMenuForName('detailview');
        let { history } = this.props
        let { location } = history
        if (page) {
            location.pathname = page.url
            location.state = {data: v}
            history.push(location);
        } else {
            history.push('/home/404');
        }
    }

    render(){
        let { bookList } = this.state;
      let { title = '', } = this.props
        return(
            <div className='title-with-img-list' >
                <div className="title">{title}</div>
                <div className="content">
                    {bookList.map(item => {
                        return(
                        <div key={item.id} className="item" onClick={() => this.clickArticle(item)}>
                             <img  src={`/magazine${item.url}`}/>
                            <div className="name" title={item.name}>{item.name}</div>
                        </div>
                    )
                    })}
                </div>
            </div>
        )
    }
}