import React from "react";

import './index.less';

class DetailMain extends React.Component {

  constructor(props){
    super(props)
    const { location } = props;
    debugger
    const searchId = location.pathname.split('/').reverse()[0];
  }
  state = {

  };
  componentDidMount() {

  }
  render() {
    return (
      <div className='detail-home-page'>
        DetailMain
      </div>
    )
    ;
  }
}

export default DetailMain;
