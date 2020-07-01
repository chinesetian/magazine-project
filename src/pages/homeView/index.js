import React from "react";
import { observer, inject } from 'mobx-react'
import { Carousel, Tabs, message } from 'antd';
import Card from '../../components/card'

import './index.less';

const { Dict, Service, Store } = window

const MagazineType = Card.MagazineType
const Title = Card.Title
const MagazineIntroduction = Card.MagazineIntroduction
const TitleWithList = Card.TitleWithList
const MagazineImgWithName = Card.MagazineImgWithName;
const SortWithList = Card.SortWithList

const { TabPane } = Tabs;

const bookUrl = "/resource/image/book.jpg"

const data = [{
  title: '自然科学与工程技术',
  list: [
    {title: '基础科学',name: 1, url: 1},
    {title: '农业科技',name: 1, url: 1},
    {title: '信息科技',name: 1, url: 1},
    {title: '工程科技I',name: 1, url: 1},
    {title: '工程科技II',name: 1, url: 1},
    {title: '医药卫生科技',name: 1, url: 1},
  ]
},
{
  title: '人文社会科学',
  list: [
    {title: '哲学与人文科学',name: 1, url: 1},
    {title: '社会科学I',name: 1, url: 1},
    {title: '社会科学II',name: 1, url: 1},
    {title: '世界文学',name: 1, url: 1},
    {title: '中国文学',name: 1, url: 1},
    {title: '心里学',name: 1, url: 1},
  ]
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

@inject('UserStore')
class HomeView extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      activeTab: '1'
    };
  }

  clickMagazineType = (item) => {
    let page = Store.MenuStore.getMenuForName('main');
      if (page) {
          this.props.history.push(page.url);
      } else {
          this.props.history.push('/home/404');
      }
  }

  clickImg = (v) => {
    console.log(v)
  }

  clickBook = (v) =>{
    console.log(v)
  }

  clickArticle = (v) =>{
    console.log(v)
  }

  changeTab = (key) =>{
    this.setState({activeTab: key})
  }

  clickMore = (v) =>{
    console.log(v)
  }

  render() {
    let { activeTab } = this.props;
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
                  <Carousel autoplay={true} dots={true}>
                    {imgData.map(v =>{ 
                      return <div className="img-wrap" onClick={this.clickImg.bind(this,v)} key={Math.random()}><img  src={v.url} /></div>
                    })}
                  </Carousel>
                </div>
                <div className='heavy-magazine-recommend'>
                  <Title title={"重磅杂志推荐"}/>
                  <div className="heavy-magazine-list">
                      {bookData.map(v => {
                        return( <MagazineIntroduction data={v} clickBook={this.clickBook} key={v.id}/>)
                      })}
                  </div>
                </div>
            </div>
          </div>
          <div className="home-view-right">
            <TitleWithList title={'常见问题'} data={journal} clickArticle={this.clickArticle}/>
            <TitleWithList title={'期刊范文'}data={journal} clickArticle={this.clickArticle}/>
          </div>
        </div>
        <div className='home-view2'>
          {home2.map(v =>{ 
            return <div onClick={this.clickImg.bind(this,v)} className="img-wrap" key={v.url}><img src={v.url}/></div>
          })}
        </div>
        <div className="home-left-right-box">
          <div className="left">
            <Tabs defaultActiveKey="1" type={'line'} onChange={this.changeTab}>
              {tabData.map((v,i) => {
                return (
                  <TabPane tab={v.title} key={v.id}>
                    <div className="book-list">
                      {v.list.map((item,i) => {
                        return( <MagazineImgWithName data={item} clickBook={this.clickBook} key={i}/>)
                      })}
                    </div>
                  </TabPane>
                )
              })}
            </Tabs>
          </div>
          <div className="right">
            <SortWithList title={'自然科学杂志推荐排行榜'} data={journal} clickArticle={this.clickArticle} clickMore={this.clickMore}/>
          </div>
        </div>
        <div className="home-left-right-box">
          <div className="left">
            <Tabs defaultActiveKey="1" type={'line'} onChange={this.changeTab}>
              {tabData.map((v,i) => {
                return (
                  <TabPane tab={v.title} key={v.id}>
                    <div className="book-list">
                      {v.list.map((item,i) => {
                        return( <MagazineImgWithName data={item} clickBook={this.clickBook} key={i}/>)
                      })}
                    </div>
                  </TabPane>
                )
              })}
            </Tabs>
          </div>
          <div className="right">
            <SortWithList title={'社会科学杂志推荐排行榜'} data={journal} clickArticle={this.clickArticle} clickMore={this.clickMore}/>
          </div>
        </div>
      </div>
    )
  }
}

export default HomeView;
