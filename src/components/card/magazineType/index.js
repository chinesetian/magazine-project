import React from "react";
import { observer, inject } from 'mobx-react'
import './index.less';

class MagazineType extends React.Component {
  constructor(props){
    super(props)
    this.state = {

    };
  }

  componentDidMount() {

  }

  clickMagazineType = (e, item) => {
    e.stopPropagation();
    this.props.clickMagazineType &&  this.props.clickMagazineType(item)
  }

  render() {
    let { data ={}, clickDetail } = this.props;
    return (
      <div className='magazine-type-warp' >
        <div className="title">{data.title}</div>
        <div className="content">
          {data.list.map(item => {
            return(<span key={item.title} className="item" onClick={(e) => this.clickMagazineType(e,item)}>{item.title}</span>)
          })}
        </div>
      </div>
    )
  }
}

export default MagazineType;
