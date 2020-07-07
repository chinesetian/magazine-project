import React from "react";
import { observer, inject } from 'mobx-react'
import { Carousel, Tabs, message } from 'antd';
import * as _ from 'lodash';
import Card from '../../components/card'
import IssueAndEssay from './components/issueAndEssay';

import './index.less';

const { Dict, Service, Store } = window

const MagazineType = Card.MagazineType
const Title = Card.Title
const MagazineIntroduction = Card.MagazineIntroduction

const MagazineImgWithName = Card.MagazineImgWithName;
const SortWithList = Card.SortWithList

const { TabPane } = Tabs;

const bookUrl = "/resource/image/book.jpg"

const data = [{
  title: '自然科学与工程技术',
  list: _.cloneDeep(Dict.getDict("periodical_major_natural_science")),
  },
  {
    title: '人文社会科学',
    list: _.cloneDeep(Dict.getDict("periodical_major_social_science")),
  },
]

const imgData = [
  {url: "/resource/image/fw-p1-1.jpg", name: '1'},
  {url: "/resource/image/fw-p1-2.jpg", name: '2'},
  {url: "/resource/image/fw-p1-3.jpg", name: '3'},
]

const bookData = [
  {id: 1,  name: '中国药房', url: bookUrl, description: "《中国药房》杂志是中华人民共和国国家卫生和计划生育委员会主管，中国医院协会;中国药房杂志社主办的国内外公开发中国药房杂志社主办的国内外公开发中国药房杂志社主办的国内外公开发",},
  {id: 2,  name: '当代医药论丛', url: bookUrl, description: "《中国药房》杂志是中华人民共和国国家卫生和计划生育委员会主管，中国医院协会;中国药房杂志社主办的国内外公开发中国药房杂志社主办的国内外公开发中国药房杂志社主办的国内外公开发",},
  {id: 3,  name: '吉林医学', url: bookUrl, description: "《中国药房》杂志是中华人民共和国国家卫生和计划生育委员会主管，中国医院协会;中国药房杂志社主办的国内外公开发中国药房杂志社主办的国内外公开发中国药房杂志社主办的国内外公开发中国药房杂志社主办的国内外公开发",},
  {id: 4,  name: '重庆医学', url: bookUrl, description: "《中国药房》杂志是中华人民共和国国家卫生和计划生育委员会主管，中国医院协会;中国药房杂志社主办的国内外公开发",},
]

const journal = {
  list: [
    {id: 1, title: '丘和明教授治疗特发性骨髓纤维丘和明教授治疗特发性骨髓纤维',name: 1, url: 1},
    {id: 2, title: '开启通往2020年奥运会体操',name: 1, url: 1},
    {id: 3, title: '开启通往2020年奥运会体操',name: 1, url: 1},
    {id: 4, title: '开启通往2020年奥运会体操',name: 1, url: 1},
    {id: 5, title: '开启通往2020年奥运会体操',name: 1, url: 1},
    {id: 6, title: '开启通往2020年奥运会体操',name: 1, url: 1},
    {id: 7, title: '开启通往2020年奥运会体操',name: 1, url: 1},
    {id: 8, title: '开启通往2020年奥运会体操',name: 1, url: 1},
    {id: 9, title: '开启通往2020年奥运会体操',name: 1, url: 1},
    {id: 10, title: '开启通往2020年奥运会体操',name: 1, url: 1},
  ]
}

const home2 = [
  {url: "/resource/image/fw-p1-1.jpg", name: '1'},
  {url: "/resource/image/fw-p1-2.jpg", name: '2'},
  {url: "/resource/image/fw-p1-3.jpg", name: '3'},
]
  
const tabData = [
  {
    id: '1',
    title: '人文社会科学杂志',
    list: [
      {id: 1, title: '哲学与人文科学',name: "教育探索", url: bookUrl},
      {id: 2, title: '社会科学I',name: "教育探索", url: bookUrl},
      {id: 3, title: '社会科学II',name: "教育探索", url: bookUrl},
      {id: 4, title: '世界文学',name: "教育探索", url: bookUrl},
      {id: 5, title: '中国文学',name: "教育探索", url: bookUrl},
      {id: 6, title: '心里学',name: "教育探索", url: bookUrl},
      {id: 7, title: '社会科学II',name: "教育探索", url: bookUrl},
      {id: 8, title: '世界文学',name: "教育探索", url: bookUrl},
      {id: 9, title: '中国文学',name: "教育探索", url: bookUrl},
      {id: 10, title: '心里学',name: "教育探索", url: bookUrl},
    ]
  },
  {
    id: '2',
    title: '医学杂志',
    list: [
      {id: 1, title: '哲学与人文科学',name: "教育探索", url: bookUrl},
      {id: 2, title: '社会科学I',name: "教育探索", url: bookUrl},
      {id: 3, title: '社会科学II',name: "教育探索", url: bookUrl},
      {id: 4, title: '世界文学',name: "教育探索", url: bookUrl},
      {id: 5, title: '中国文学',name: "教育探索", url: bookUrl},
      {id: 6, title: '心里学',name: "教育探索", url: bookUrl},
      {id: 7, title: '社会科学II',name: "教育探索", url: bookUrl},
      {id: 8, title: '世界文学',name: "教育探索", url: bookUrl},
      {id: 9, title: '中国文学',name: "教育探索", url: bookUrl},
      {id: 10, title: '心里学',name: "教育探索", url: bookUrl},
    ]
  },
]

let tab1 = [];
let tab2 = [];

@inject('UserStore')
class HomeView extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      activeTab1: '', // tab1
      activeTab2: '', // tab2
      bookList1: [], // tab1的数据
      bookList2: [], // tab2的数据
      scrollImg: [], // 滚动图
      listImg: [], // 静态宣传图
      naturalList: [], //自然科学排行榜
      socialList: [], // 人文科学排行榜
      heavyList: [], //重磅杂志

    };
    this.tab1 = [];
    this.tab2 = [];
  }

  componentDidMount(){
    this.getTabList();
    this.getImg();
  }
  componentWillUnmount(){
    this.tab1 = null;
    this.tab2 = null;
  }

  getTabList(){
    this.tab1 = _.cloneDeep(Dict.getDict("periodical_major_natural_science") || []);
    this.tab2 = _.cloneDeep(Dict.getDict("periodical_major_social_science") || []);
    let activeTab1 = this.tab1[0].dictValue;
    let activeTab2 = this.tab2[0].dictValue;
    this.setState({
      activeTab1,
      activeTab2,
    })
    // 第一个tab
    this.queryData(activeTab1, 'bookList1', 'periodical_major_natural_science');
    // 第二个tab
    this.queryData(activeTab2, 'bookList2', 'periodical_major_social_science');
    // 自然科学
    this.queryData('periodical_major_natural_science', 'naturalList', 'periodical_major_natural_science');
    // 人文科学
    this.queryData('periodical_major_social_science', 'socialList', 'periodical_major_social_science');
    // 重磅杂志
    this.queryData('', 'heavyList', '');
  }

  getImg(){
    Service.base.image({}).then(res => {
      if(res.code == 0){
          let result = res.data;
          let scrollImg = result.find(v => v.periodicalImageType == "periodical_image_type_home_page_top").url.split(",");
          let listImg = result.find(v => v.periodicalImageType == "periodical_image_type_home_page_button").url.split(",");
          this.setState({scrollImg, listImg });
      } else {
        this.setState({scrollImg: [], listImg: [] });
      }
  }).catch(e => {
    this.setState({scrollImg: [], listImg: [] });
  })
  }

  clickMagazineType = (item) => {
    let page = Store.MenuStore.getMenuForName('journal');
    let { history } = this.props
    let { location } = history
      if (page) {
        location.pathname = page.url
        location.state = {data: {[item.dictType]: item.dictValue}}
        history.push(location);
      } else {
          history.push('/home/404');
      }
  }

  // clickImg = (v) => {
  //   console.log(v)
  // }

  clickBook = (v) =>{
    let page = Store.MenuStore.getMenuForName('magazineDetail');
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

  clickArticle = (v) =>{
    console.log(v);
  }

  changeTab1 = (key) =>{
    this.setState({activeTab1: key});
    this.queryData(key, 'bookList1', 'periodical_major_natural_science');
  }

  changeTab2 = (key) =>{
    this.setState({activeTab2: key});
    this.queryData(key, 'bookList2', 'periodical_major_social_science');
  }

  queryData(key, name, type){
    this.setState({[name]: [],});
    let searchData = {};
    if(key){
      searchData = {
        offset: 0,
        limit: 10,
        [type]: key
      }
    } else {
      searchData = {
        offset: 0,
        limit: 4,
      }
    }
    Service.base.qikan(searchData).then(res => {
      if(res.code == 0){
          this.setState({[name]: res.data.list});
      } else {
          this.setState({[name]: [],});
      }
    }).catch(e => {
        this.setState({[name]: [],});
    })
  }

  // clickMore = (v) =>{
  //   console.log(v)
  // }

  render() {
    debugger
    let { scrollImg, listImg, bookList1, activeTab1, bookList2, activeTab2, naturalList, socialList, heavyList, } = this.state;
    return (
      <div className="home-wrap w1200">
        <div className='home-view1'>
          <div className='home-view-left'>
            {data.map(v => {return (
                <MagazineType key={v.title} data={v} clickMagazineType={this.clickMagazineType}/>
            )})}
          </div>
          <div className="home-view-mid">
            <div className="home-view-mid-box">
                <div className="img-scroll">
                  <Carousel autoplay={scrollImg.length > 0 ? true : false} dots={true}>
                    {scrollImg.map(v =>{ 
                      return <div className="img-wrap" 
                        key={Math.random()}
                        // onClick={this.clickImg.bind(this,v)} 
                      >
                        <img src={`/magazine${v}`} />
                      </div>
                    })}
                  </Carousel>
                </div>
                <div className='heavy-magazine-recommend'>
                  <Title title={"重磅杂志推荐"}/>
                  <div className="heavy-magazine-list">
                      {heavyList.map(v => {
                        return( <MagazineIntroduction data={v} clickBook={this.clickBook} key={v.id}/>)
                      })}
                  </div>
                </div>
            </div>
          </div>
          <div className="home-view-right">
            <IssueAndEssay {...this.props}/>
          </div>
        </div>
        <div className='home-view2'>
          {listImg.map(v =>{ 
            return <div 
            // onClick={this.clickImg.bind(this,v)} 
            className="img-wrap" key={v}><img src={`/magazine${v}`} /></div>
          })}
        </div>
        <div className="home-left-right-box">
          <div className="left">
            <Tabs defaultActiveKey={activeTab1} type={'line'} onChange={this.changeTab1}>
              {this.tab1.map((v,i) => {
                return (
                  <TabPane tab={v.dictLabel} key={v.dictValue}>
                    <div className="book-list">
                      {bookList1.map((item,i) => {
                        return( <MagazineImgWithName data={item} clickBook={this.clickBook} key={i}/>)
                      })}
                    </div>
                  </TabPane>
                )
              })}
            </Tabs>
          </div>
          <div className="right">
            <SortWithList title={'自然科学杂志推荐排行榜'} data={naturalList} clickArticle={this.clickBook} clickMore={this.clickMore}/>
          </div>
        </div>
        <div className="home-left-right-box">
          <div className="left">
          <Tabs defaultActiveKey={activeTab2} type={'line'} onChange={this.changeTab2}>
              {this.tab2.map((v,i) => {
                return (
                  <TabPane tab={v.dictLabel} key={v.dictValue}>
                    <div className="book-list">
                      {bookList2.map((item,i) => {
                        return( <MagazineImgWithName data={item} clickBook={this.clickBook} key={i}/>)
                      })}
                    </div>
                  </TabPane>
                )
              })}
            </Tabs>
          </div>
          <div className="right">
            <SortWithList title={'社会科学杂志推荐排行榜'} data={socialList} clickArticle={this.clickBook} clickMore={this.clickMore}/>
          </div>
        </div>
      </div>
    )
  }
}

export default HomeView;
