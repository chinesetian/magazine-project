import React from "react";

import './index.less';

class TestPage extends React.Component {
  state = {
    isMove: false
  };
  componentDidMount() {
    setTimeout(() => {
      this.setState({ isMove: true });
      setTimeout(() => {
        this.setState({ isMove: true });
      }, 1000 * 2);
    }, 1000 * 2);
  }
  render() {
    return (
      <div className='home'>
        <div className="top">1 </div>
        <div className="mid"> 2</div>
        <div className="bottom">3 </div>
      </div>
    )
    ;
  }
}

export default TestPage;
