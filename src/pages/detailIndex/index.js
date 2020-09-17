import React from "react";
import { Tabs, message, Carousel } from 'antd';
import { withRouter, Switch, Route } from 'react-router-dom'
import Card from '../../components/card'

import './index.less'

const { Dict, Service, Store } = window
const TitleContentCard = Card.TitleContentCard
const ContactUs = Card.ContactUs

const imgData = [
  {url: "/resource/image/fw-p1-1.jpg", name: '1'},
  {url: "/resource/image/fw-p1-2.jpg", name: '2'},
  {url: "/resource/image/fw-p1-3.jpg", name: '3'},
]

const liucheng = "/resource/image/heng.jpg"
const ju = "/resource/image/ju.jpg"

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
          <div className="second-box">
            <TitleContentCard
              title="国家新闻出版广电总局备案信息"
              borderColor={'#dddddd'}
              className="ju"
            >
              <a href="http://www.gapp.gov.cn/govservice/108.shtml" ><img src={ju} /></a>
            </TitleContentCard>
            <TitleContentCard
              title="投稿须知"
              borderColor={'#dddddd'}
              className="xuzhi"
            >
              <div>请各位投稿作者注意，凡是投稿《新课程教学》正在审核期的文章，请勿一稿多投，审稿期一般二个工作日以内，作者可以随时在本站上输入文章编号查询稿件审核情况。稿件录用后，《新课程教学》编辑部在通知作者的情况下有权适当修改文章，以便适应期刊的定位要求。</div>
            </TitleContentCard>
          </div>
          <img className="liucheng" src={liucheng} />
          <div className="third-box">
            <ContactUs></ContactUs>
            
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