import React from "react";
import { Tabs, message, Carousel } from 'antd';
import { withRouter, Switch, Route } from 'react-router-dom'
import Card from '../../components/card'

import './index.less'

const { Dict, Service, Store } = window
const TitleContentCard = Card.TitleContentCard
const imgData = [
  {url: "/resource/image/fw-p1-1.jpg", name: '1'},
  {url: "/resource/image/fw-p1-2.jpg", name: '2'},
  {url: "/resource/image/fw-p1-3.jpg", name: '3'},
]

class DetailIndex extends React.Component {
  constructor(props){
    super(props)
    const { location, history } = props;
    this.state = {
      bookList: [],
      total: 0,
    };
  }

  componentDidMount(){
    this.articleInfopageList();
  }

  /**
   * 查询新闻资讯列表
   * @param {*}  
   */
  articleInfopageList(){
    let searchData = {"offset":0,"limit":10,"periodicalArticleTypeInfo":"periodical_article_type_info_information"}
    Service.base.articleInfopageList(searchData).then(res => {
        if(res.code == 0){
            this.setState({bookList: res.data.list, total: res.data.total});
        } else {
            this.setState({bookList: [], total: 0});
        }
    }).catch(e => {
        this.setState({bookList: [], total: 0});
    })
  }

  clickBook = (v) =>{
    console.log(v)
    let page = Store.MenuStore.getMenuForName('essayDetail');
    let { history } = this.props
    let { location } = history
      if (page) {
        location.pathname = page.url
        location.state = {dataHtml: v.content}
        history.push(location);
        // window.open(location.pathname)
      } else {
          history.push('/home/404');
      }
  }

  showMore = (menu) => {
    debugger
    let page = Store.MenuStore.getMenuForName(menu);
    let { history } = this.props
    let { location } = history
      if (page) {
        location.pathname = page.url
        history.push(location);
      } else {
          history.push('/home/404');
      }
  }

  render(){
    let { bookList } = this.state
    return(
      <div className="detail-index">
        <div className="detail-index-left">
          <TitleContentCard
            title={"新闻咨询"}
            className="news"
            showMore={this.showMore.bind(this,'detailnews')} 
          >
            <div className="news-children">
              <div className="news-left-scrool">
                <div className="img-scroll">
                    <Carousel autoplay={imgData.length > 0 ? true : false} dots={true}>
                      {imgData.map(v =>{ 
                        return <div className="img-wrap" key={Math.random()}>
                          <img src={`${v.url}`} />
                        </div>
                      })}
                    </Carousel>
                </div>
              </div>
              <div className="news-right-list">
                {bookList.map((v,i) => {
                  return( 
                    <div onClick={this.clickBook.bind(this, v)} key={i} className='article-title'>{v.title}</div>
                  )
                })}
              </div>
            </div>
          </TitleContentCard>
          <div className="second-box left-box">

          </div>
          <div className="third-box">
            
          </div>
        </div>
        <div className="detail-index-right">
2
        </div>
      </div>
    )
  }
}

export default DetailIndex;