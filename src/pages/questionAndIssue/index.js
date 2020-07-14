import React from "react";
import { Pagination } from 'antd';
import Card from '../../components/card'

import './index.less';

const { Dict, Service, Store } = window
const TitleWithImgList = Card.TitleWithImgList

const defaultKey = '-1'
const bookUrl = "/resource/image/book.jpg"
const bookData = [
  {id: 1,  name: '中国药房', url: bookUrl, description: "《中国药房》",},
  {id: 2,  name: '当代医药论丛', url: bookUrl, description: "《中国药房》杂",},
  {id: 3,  name: '吉林医学', url: bookUrl, description: "《中国药房》杂志是中",},
  {id: 4,  name: '重庆医学', url: bookUrl, description: "国国家卫生和",},
]

class QuestionAndIssue extends React.Component {
  constructor(props){
    super(props)
    const { location } = props;
    let periodicalArticleTypeInfo = location.state.type == 'issue' ? 'periodical_article_type_info_question' : 'periodical_article_type_info_information';
    this.state = {
      bookList: [],
      searchData:{
        offset: 0,
        limit: 10,
        periodicalArticleTypeInfo: periodicalArticleTypeInfo,
      }
    };
    this.articleInfopageList(this.state.searchData)
  }

  componentDidMount() {

  }

  onChange = (options) => {
    let params = this.mergeSearchData({ ...options, offset: 0, limit: 10, });
    console.log(params)
    this.articleInfopageList(params)
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


  clickBook = (v) =>{
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

  onPaginationChange = (current, pageSize) => {
    let params = this.mergeSearchData({limit: pageSize, offset: (current - 1) * pageSize });
    this.articleInfopageList(params);
  };

  articleInfopageList(searchData){
    Service.base.articleInfopageList(searchData).then(res => {
        if(res.code == 0){
            this.setState({bookList: res.data.list, total: res.data.total});
        } else {
            this.setState({bookList: [], total: 0});
        }
    }).catch(e => {
        this.setState({bookList: [], total: 0});
    })
  }

  render() {
    let { searchData, bookList, total = 0 } = this.state;
    return (
      <div className='journal-wrap w1200'>
        <div className="journal-content">
          <div className="journal-left">
              <div className="journal-list">
                {bookList.map((v,i) => {
                  return( 
                    <div onClick={this.clickBook.bind(this, v)} key={i} className='article-title'>{v.title}</div>
                  )
                })}
              </div>
              <div className="content-pagination-box" style={{ display: 'flex', justifyContent: 'center' }}>
                <Pagination
                  total={total}
                  // showTotal={(total) => `共 ${total} 条记录`}
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
              <TitleWithImgList title={'热门期刊'} {...this.props}/>
            </div>
          </div>
      </div>
    )
    ;
  }
}

export default QuestionAndIssue;
