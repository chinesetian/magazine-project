import React from "react";
import { Button, Carousel } from 'antd';
import LabelValue from '../../components/LabelValue'
import { isString, isNumber } from "util";
import * as _ from 'lodash';
import { setCache, getCache } from '../../utils/cache';
import Card from '../../components/card'
import ScrollBox from '../../components/scrollBox'
import QuerySearch from '../../components/querySearch'

import './index.less';

const QikanBaseInfo = Card.QikanBaseInfo
const TitleWithImgList = Card.TitleWithImgList
const { Dict, Service, Store } = window

class DetailView extends React.Component {

  constructor(props){
    super(props)
    const { location, history } = props;
    // const data = location.state.data;
    // data && data.id && setCache('detailData', data, "session")
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

    this.tel = _.cloneDeep(Dict.getDict("periodical_other_info").find(v => v.dictValue == "periodical_other_info_tel").label || '');
    
    this.state = {
      data: query, // 详情数据
      imgs: _.cloneDeep(Dict.getDict("periodical_image_type").find(v => v.dictValue == "periodical_image_type_child_page_button").url.split(",") || []), // 底部宣传图
      tougaoList: [], // 投稿列表
      flag: false
    };
  }

  componentDidMount() {
    document.getElementById("root").addEventListener("scroll", this.myScript, false)
    this.tougaoList();
  }

  componentWillUnmount(){
    document.getElementById("root").removeEventListener("scroll", this.myScript, false)
  }

  myScript = (e) => {
    let top = document.getElementById("root").scrollTop
    if(top > 270){
      this.setState({flag: true})
    } else {
      this.setState({flag: false})
    }

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

  getHtml(dataHtml) {
    let html = dataHtml && isString(dataHtml) ? dataHtml.replace('<!--HTML-->', '') : '暂无';
    return html
  }

  getShow = (parent, type) => {
    let content = '';
    if(type){
      let arr = []
      type.split(",").map(v => {
        arr.push(Dict.getLabel(parent, v))
      })
      content = (
        <div className="honor-box">
          {arr.map((item,i) => {
            return <span key={i} className="tag">{item}</span>
          })}
        </div>
      )
      return content;
    } else {
      return content
    }

  }

  tougaoList(){
    let param= {
      "limit":10,
      "offset":0,
      "platform": window.BSConfig.platform || "SJ"
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

  /**
   * 跳转到投稿
   */
  goContribute = () => {
    let page = Store.MenuStore.getMenuForName('detailcontribute');
    let { history } = this.props
    let { location } = history
      if (page) {
        location.pathname = page.url
        // location.state = {data: {[item.transformPeriodical]: item.dictValue}}
        history.push(location);
      } else {
          history.push('/home/404');
      }
  }

  render() {
    let { data, imgs, tougaoList, flag } = this.state;
    if(!data.id){
      return null
    }
    let searchData = {"periodicalType": data.periodicalType || 'all', limit: 5,};

    return (
      <div className='detail-view-page w1200'>
          <div className="detail-view-wrap">
            <div className="left">
              <div className="img-box">
                <img className={`img ${flag ? "fixed-img" :''}`} src={`/magazine${data.url}`} />
              </div>
              <div style={{padding: '20px  0'}}>
                {/* <TitleWithImgList searchData={searchData} title={'相关期刊'} {...this.props}/> */}
                <QuerySearch title = '稿件/期刊信息查询' {...this.props}/>
              </div>
            </div>
            <div className="right">
                <div className="top-info">
                    <div className="top-left">
                      <div className="title">{data.name}</div>
                      <div className="qikan-base">
                        <div className="left-info" ><QikanBaseInfo data={data}/></div>
                      </div>
                      <div className="qikan-base">
                        {/* <LabelValue  label='期刊收录' className="item" value={this.getShow("periodical_included", data.periodicalIncluded)} emptyValue="暂无" noWrap={true}/>
                        <LabelValue  label='期刊荣誉' className="item" value={this.getShow("periodical_honor", data.periodicalHonor)} emptyValue="暂无" noWrap={true}/> */}
                        <div className="online-contribute">
                          <Button onClick={this.goContribute} type={'primary'}>在线投稿</Button>
                          <div className="online-right">
                            <LabelValue  label='期刊级别' className="info" value={Dict.getLabel("periodical_level", data.periodicalLevel)} emptyValue="暂无"  noWrap={true}/>
                            <br />
                            <LabelValue  label='投稿要求' className="info" value={''} emptyValue=""  noWrap={true}/>
                          </div>
                        </div>
             
                      </div>
                      <div className="qikan-base scroll">
                          <ScrollBox
                            data={tougaoList}
                            title={"稿件/期刊订阅信息公告"}
                          />
                      </div>
                    </div>
                    <div className="right-phone">
                        <div className="one">在线咨询：</div>
                        <div className="one">电话：{this.tel} </div>
                        <div className="one">（周一至周六）</div>
                        <div className="one">早上 09:00-12:00</div>
                        <div className="one">下午 13:30-17:30</div>
                    </div>
                </div>

                <div className="qikan-other jian-jie">
                  <div className="other-title">{'期刊简介'}</div>
                  <div dangerouslySetInnerHTML = {{ __html: this.getHtml(data.description)}}></div>
                </div>
                <div className="qikan-other honor">
                  <div className="other-title">{'期刊荣誉'}</div>
                    {this.getShow("periodical_honor", data.periodicalHonor)}
                </div>
                <div className="qikan-other te-se">
                  <div className="other-title">{'期刊特色'}</div>
                  <div dangerouslySetInnerHTML = {{ __html: this.getHtml(data.characteristic)}}></div>
                </div>
               
                <div className="bottom-img">
                  {imgs.map((v,i) => {
                      return(
                          <img key={i} src={`/magazine${v}`} />
                      )
                  })}
                </div>
            </div>
          </div>
      </div>
    )
    ;
  }
}

export default DetailView;
