import React from "react";
import { Pagination } from "antd";
import Card from '../../components/card'

import './index.less'
import { isString } from "util";

const { Service } = window
const TitleWithImgList = Card.TitleWithImgList
const EssayCard = Card.EssayCard

class MagazineDetail extends React.Component {
  constructor(props){
    super(props)
    const { location } = props;
    this.state = {
      data: location.state.data,
    }
  }

  getHtml(dataHtml) {
    let html = dataHtml && isString(dataHtml) ? dataHtml.replace('<!--HTML-->', '') : '';
    return html
  }

  render() {
    let { data } = this.state;

    // console.log(html)
    return (
      <div className="journal-wrap w1200">
        <div className="journal-content">
          <div className="journal-left">
            <div className="journal-list" >
                <div dangerouslySetInnerHTML = {{ __html: this.getHtml(data.description)}}></div>
                <div dangerouslySetInnerHTML = {{ __html: this.getHtml(data.characteristic)}}></div>
                <div dangerouslySetInnerHTML = {{ __html: this.getHtml(data.otherInfo)}}></div>
            </div>
          </div>
          <div className="journal-right">
            <TitleWithImgList title={'热门期刊'} />
          </div>
        </div>
      </div>
    );
  }
}

export default MagazineDetail;
