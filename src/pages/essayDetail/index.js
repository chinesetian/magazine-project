import React from "react";
import { Pagination } from "antd";
import Card from '../../components/card'
import { setCache, getCache } from '../../utils/cache';
import './index.less'
import { isString } from "util";
import NewDetailLeft from '../../components/newDetailLeft'

const { Service } = window
const TitleWithImgList = Card.TitleWithImgList
const EssayCard = Card.EssayCard
const TitlePage = Card.TitlePage

let query = getCache("detailData", "session") || {}

class EssayDetail extends React.Component {
  constructor(props){
    super(props)
    const { location } = props;
    this.state = {
      isChild: location.state ? location.state.isChild : "" ,
      dataHtml: location.state.dataHtml,
      dataContent: location.state.dataContent
      // "<p style=\"margin: 30px 0px; padding: 0px;\"><strong>【关键词】</strong>国学经典小学语文教学</p",
    }
  }

  componentDidMount(){
    let { searchData } = this.state
    // this.queryBookList(searchData)
  }

  render() {
    let { dataHtml, isChild } = this.state;
    let html = dataHtml && isString(dataHtml) ? dataHtml.replace('<!--HTML-->', '') : '';
    let pageName = isChild ? this.props.MenuStore.getMenuForName(isChild).title  : ""
    // console.log(html)
    return (
      <div className="journal-wrap w1200">
        <div className="journal-content">
          {isChild && <NewDetailLeft
                        data={query}
                    ></NewDetailLeft>
                    }
          <div className="journal-left">
              {pageName && <TitlePage 
                  pageName={pageName}
              ></TitlePage>}
            <div className="journal-list" dangerouslySetInnerHTML = {{ __html: html}}>
              {/* <React.Fragment>
              {data}
              </React.Fragment> */}
              {/* <div ></div>, */}
            </div>
          </div>
          {/* <div className="journal-right">
            <TitleWithImgList title={'热门期刊'} {...this.props}/>
          </div> */}
        </div>
      </div>
    );
  }
}

export default EssayDetail;
