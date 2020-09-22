import React from "react";
import { message, Carousel } from 'antd';
import Card from '../../components/card'
import ScrollBoxWithLabel from '../../components/scrollBoxWithLabel'
import QuerySearch from '../../components/querySearch'
import { setCache, getCache } from '../../utils/cache';
import ScrollBoxFriend from '../../components/scrollBoxFriend'

import './index.less'

const { Dict, Service, Store } = window
const TitleContentCard = Card.TitleContentCard
const ContactUs = Card.ContactUs
const ArticleCopyright = Card.ArticleCopyright

const imgData = [
  {url: "/resource/image/new1.jpg", name: '1'},
  {url: "/resource/image/new2.jpg", name: '2'},
  {url: "/resource/image/new3.jpg", name: '3'},
  {url: "/resource/image/new4.jpg", name: '4'},
  {url: "/resource/image/new5.jpg", name: '5'},
]

const liucheng = "/resource/image/heng.jpg"
const ju = "/resource/image/ju.jpg"

class DetailIndex extends React.Component {
  constructor(props){
    super(props)
    const { location, history } = props;
    let query = {};
    try {  
      let arr = window.location.pathname.split("/");
      let searchId = arr[3];
      if(searchId){
        query = {id: searchId}
      } else {
        query = getCache("detailData", "session")
        location.pathname = `${location.pathname}/${query.id}`;
        history.replace(location);
      }
    } catch (error) {
      
    }

    query.id && this.qikanDetail(query)


    this.state = {
      data: query, // 详情数据
      bookList: [], //新闻
      total: 0,
      articleList: [], // 范文
      tougaoList: [], //稿件公告
    };
  }

  componentDidMount(){
    this.articleInfopageList();
    this.articleThesispageList();
    this.tougaoList();
  }

  qikanDetail(data){
    Service.base.qikanDetail(data).then(res => {
      if(res.code == 0){
        setCache('detailData', res.data, "session")
        this.setState({data: res.data,});
      } else {
          this.setState({data: {},});
      }
    }).catch(e => {
      this.setState({data: {},});
    })
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

  /**
   * 范文
   */
  articleThesispageList(){
    let searchData = {"offset":0,"limit":6,}
    Service.base.articleThesispageList(searchData).then(res => {
        if(res.code == 0){
            this.setState({articleList: res.data.list});
        } else {
            this.setState({articleList: []});
        }
    }).catch(e => {
        this.setState({articleList: []});
    })
  }

  /**
   * 稿件公告
   */
  tougaoList(){
    let target =  Dict.getDict("periodical_other_info") || []   
    let platform = target.find(v => v.value == "periodical_other_info_code") || {}
    
    let param= {
      "limit":10,
      "offset":0,
      "platform": platform.label || "SJ"
    }
    Service.base.tougaoList(param).then(res => {
      if(res.code == 0){
        this.setState({tougaoList: res.data.list,});
      } else {
          this.setState({tougaoList: [],});
      }
    }).catch(e => {
      this.setState({tougaoList: [],});
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

  /**
   * 详情
   */
  clickArticle = (v) => {
    console.log(v)
    let page = Store.MenuStore.getMenuForName('essayDetail');
    let { history } = this.props
    let { location } = history
      if (page) {
        location.pathname = page.url
        location.state = {dataHtml: v.content}
        history.push(location);
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
    let {data, bookList = [], articleList = [], tougaoList = []} = this.state
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
              <a href="http://www.gapp.gov.cn/govservice/108.shtml" target={'_blank'} rel="noopener noreferrer"><img src={ju} /></a>
            </TitleContentCard>
            <TitleContentCard
              title="投稿须知"
              borderColor={'#dddddd'}
              className="xuzhi"
            >
              <div className="xuzhi-content">&nbsp;&nbsp;&nbsp; 请各位投稿作者注意，凡是投稿《新课程教学》正在审核期的文章，请勿一稿多投，审稿期一般二个工作日以内，作者可以随时在本站上输入文章编号查询稿件审核情况。稿件录用后，《新课程教学》编辑部在通知作者的情况下有权适当修改文章，以便适应期刊的定位要求。</div>
            </TitleContentCard>
          </div>
          <img className="liucheng" src={liucheng} />
          <div className="third-box">
            <ContactUs className="active"></ContactUs>
            <TitleContentCard
              title={"期刊范文"}
              className="article"
              borderColor={'#dddddd'}
              // showMore={this.showMore.bind(this,'detailnews')} 
            >
              <div className="article-list">
                {articleList.map((v,i) => {
                  return( 
                    <div onClick={this.clickArticle.bind(this, v)} key={i} className='article-title'>{v.title}</div>
                  )
                })}
              </div>
            </TitleContentCard>
          </div>
        </div>
        <div className="detail-index-right">
          <TitleContentCard
            title={"稿件录用公告"}
            className="gaojian-post active"
            borderColor={'#dddddd'}
            showMore={this.showMore.bind(this,'tougaoStatus')} 
          >
            <div className="gaojian-scroll">
              <ScrollBoxWithLabel
                data={tougaoList}
              />
            </div>
          </TitleContentCard>
          <TitleContentCard
            title={"稿件录用查询"}
            className="gaojian-query active"
            borderColor={'#dddddd'}
            // showMore={this.showMore.bind(this,'detailnews')} 
          >
            <div className="query">
            <QuerySearch title = '请输入稿件编号：' {...this.props}/>
            </div>
          </TitleContentCard>
          <ArticleCopyright data={data}></ArticleCopyright>
          <TitleContentCard
            title={"友情链接"}
            className="scroll-box-friend active"
            borderColor={'#dddddd'}
            // showMore={this.showMore.bind(this,'detailnews')} 
          >
            <div className="query">
              <ScrollBoxFriend></ScrollBoxFriend>
            </div>
          </TitleContentCard>

        </div>
      </div>
    )
  }
}

export default DetailIndex;