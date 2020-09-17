import React from "react";
import { Tabs, message } from 'antd';
import { withRouter, Switch, Route } from 'react-router-dom'

class ContributeNotice extends React.Component {
  constructor(props){
    super(props)
    const { location, history } = props;
  }

  render(){
    return(
      <div>ContributeNotice</div>
    )
  }
}

export default ContributeNotice;