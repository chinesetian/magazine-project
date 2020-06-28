import React from "react";
import { observer, inject } from 'mobx-react'
import './index.less';

@inject('UserStore')
class HomeView extends React.Component {
  constructor(props){
    super(props)
    this.state = {

    };
  }

  componentDidMount() {

  }

  clickDetail = () => {
    let page = this.props.MenuStore.getMenuForName('main');
      if (page) {
          this.props.history.push(page.url);
      } else {
          this.props.history.push('/home/404');
      }
  }

  render() {
    return (
      <div className='home-page' onClick={this.clickDetail}>
        home
      </div>
    )
  }
}

export default HomeView;
