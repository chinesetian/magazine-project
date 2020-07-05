import React from "react";
import { Pagination } from "antd";
import Card from '../../components/card'

import './index.less'

const { Service, Store } = window
const TitleWithImgList = Card.TitleWithImgList
const EssayCard = Card.EssayCard

class Essay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchData:{
        "limit":10,
        "offset":0,
      },
      articleList: [],
      total: 0,
    }
  }

componentDidMount(){
  let { searchData } = this.state
  this.queryBookList(searchData)
}

onChange = (options) => {
  let params = this.mergeSearchData({ ...options, offset: 0 });
  console.log(params)
  this.queryBookList(params)
}

  /**
   * 更新参数
   * @param {*} options
   */
  mergeSearchData(options) {
    const searchDataNew = Object.assign({}, this.state.searchData, options);
    // console.log('newsearchData', searchDataNew)
    this.setState({ searchData: searchDataNew });
    return searchDataNew;
  }

  onPaginationChange = (current, pageSize) => {
    let params = this.mergeSearchData({limit: pageSize, offset: (current - 1) * pageSize });
    this.queryBookList(params);
  };

  queryBookList(searchData){
    Service.base.articleThesis(searchData).then(res => {
        if(res.code == 0){
            this.setState({articleList: res.data.list, total:  res.data.total});
        } else {
            this.setState({articleList: [], total : 0});
        }
    }).catch(e => {
        this.setState({articleList: [],  total : 0});
    })
  }

  clickEssay = (v) => {
    console.log(v)
    let page = Store.MenuStore.getMenuForName('essayDetail');
    let { history } = this.props
    let { location } = history
      if (page) {
        location.pathname = page.url
        location.state = {dataHtml: v.content}
        history.push(location);
      } else {
          history.push('/home/404');
      }
  }

  render() {
    let { articleList, searchData, total } = this.state;
    return (
      <div className="journal-wrap w1200">
        <div className="journal-content">
          <div className="journal-left">
            <div className="journal-list">
              {articleList.map((v,i) => {
                return(
                  <EssayCard 
                    key={i}
                    data={v}
                    clickEssay={this.clickEssay}
                  ></EssayCard>
                )
              })}
            </div>
            <div className="content-pagination-box" style={{ display: 'flex', justifyContent: 'center' }}>
                <Pagination
                  total={total}
                  showTotal={(total) => `共 ${total} 条记录`}
                  style={{ padding: '20px'}}
                  defaultCurrent={1}
                  // showSizeChanger={true}
                  pageSize={searchData.limit}
                  current={searchData.offset / searchData.limit + 1}
                  // pageSizeOptions={['10', '20', '50', '100', '200']}
                  onChange={this.onPaginationChange}
                  onShowSizeChange={this.onPaginationChange}
                />
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

export default Essay;
