import React from "react";
import { Button, Carousel } from 'antd';
import LabelValue from '../../components/LabelValue'
import { isString } from "util";
import * as _ from 'lodash';
import { setCache, getCache } from '../../utils/cache';
import Card from '../../components/card'

import './index.less';

const QikanBaseInfo = Card.QikanBaseInfo
const TitleWithImgList = Card.TitleWithImgList
const { Dict, Service, Store } = window

class DetailView extends React.Component {

  constructor(props){
    super(props)
    const { location } = props;
    const data = location.state.data;
    data && data.id && setCache('detailData', data, "session")
    let query = getCache("detailData", "session") || {}
    query.id && this.qikanDetail(query)
    this.state = {
      data: query,
      imgs: _.cloneDeep(Dict.getDict("periodical_image_type").find(v => v.dictValue == "periodical_image_type_child_page_button").url.split(",") || []),
    };
  }

  componentDidMount() {

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
    if(type){
      let arr = []
      type.split(",").map(v => {
        arr.push(Dict.getLabel(parent, v))
      })
      return arr.join("   ")
    } else {
      return ''
    }

  }

  goContribute = () => {
    
  }

  render() {
    let { data, imgs } = this.state;
    if(!data.id){
      return null
    }
    let searchData = {"periodicalType": data.periodicalType || 'all', limit: 5,};

    return (
      <div className='detail-view-page w1200'>
          <div className="detail-view-wrap">
            <div className="left">
              <div className="img-box">
                <img src={`/magazine${data.url}`} />
              </div>
              <div><TitleWithImgList searchData={searchData} title={'相关期刊'} {...this.props}/></div>
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
                            <Carousel autoplay={true} dotPosition={'left'}>
                              <div>
                                  <h3>1</h3>
                                <h3>1</h3>
                                <h3>1</h3>
                              </div>
                              <div>
                                <h3>2</h3>
                                <h3>2</h3>
                                <h3>2</h3>
                              </div>
                              <div>
                                <h3>3</h3>
                                <h3>3</h3>
                                <h3>3</h3>
                              </div>
                              <div>
                                <h3>4</h3>
                                <h3>4</h3>
                                <h3>4</h3>
                              </div>
                            </Carousel>
                          </div>
                    </div>
                    <div className="right-phone">
                        <div className="one">在线咨询：</div>
                        <div className="one">电话：400-8715-468 </div>
                        <div className="one">（周一至周六）</div>
                        <div className="one">早上 09:00-12:00</div>
                        <div className="one">下午 13:30-17:30</div>
                    </div>
                </div>

                <div className="qikan-other jian-jie">
                  <div className="other-title">{'期刊简介'}</div>
                  <div dangerouslySetInnerHTML = {{ __html: this.getHtml(data.description)}}></div>
                </div>
                <div className="qikan-other te-se">
                  <div className="other-title">{'期刊特色'}</div>
                  <div dangerouslySetInnerHTML = {{ __html: this.getHtml(data.characteristic)}}></div>
                </div>
                <div className="qikan-other wen-xian">
                  <div className="other-title">{'参考文献分析'}</div>
                  <div dangerouslySetInnerHTML = {{ __html: this.getHtml(data.otherInfo)}}></div>
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
