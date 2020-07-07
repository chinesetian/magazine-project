import React from "react";

import './index.less';

const { Dict, Service, Store } = window

class DetailView extends React.Component {

  constructor(props){
    super(props)
    const { location } = props;
    const data = location.state.data || {};
    debugger
    data.id && this.qikanDetail(data)
  }
  state = {
    qikanDetail: {},
  };
  componentDidMount() {

  }

  qikanDetail(data){
    Service.base.qikan(data).then(res => {
      if(res.code == 0){
        this.setState({qikanDetail: res.data,});
      } else {
          this.setState({qikanDetail: {},});
      }
    }).catch(e => {
      this.setState({qikanDetail: {},});
    })
  }

  render() {
    let { qikanDetail } = this.state;
    return (
      <div className='detail-view-page w1200'>
          <div className="left">
            <div className="img-box">
              <img src={`/magazine${qikanDetail.url}`} />
            </div>
          </div>
          <div className="right">
              
          </div>
      </div>
    )
    ;
  }
}

export default DetailView;
