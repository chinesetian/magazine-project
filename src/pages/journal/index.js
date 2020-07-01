import React from "react";
import { Pagination } from 'antd';
import Filter from './components/filter';
import Card from '../../components/card'

import './index.less';

const { Dict, Service, Store } = window
const MagazineIntroductionDetail = Card.MagazineIntroductionDetail
const TitleWithImgList = Card.TitleWithImgList

const defaultKey = '-1'
const bookUrl = "/resource/image/book.jpg"
const bookData = [
  {id: 1,  name: '中国药房', url: bookUrl, description: "《中国药房》",},
  {id: 2,  name: '当代医药论丛', url: bookUrl, description: "《中国药房》杂",},
  {id: 3,  name: '吉林医学', url: bookUrl, description: "《中国药房》杂志是中",},
  {id: 4,  name: '重庆医学', url: bookUrl, description: "国国家卫生和",},
]
const defaultData = []
let defaultType = {}
Dict.getDict("periodical").forEach(element => {
  defaultType[element.dictType] = defaultKey;
  let target = Dict.getDict(element.dictType);
  target.unshift({label: '不限', value: defaultKey, dictType: element.dictType}) 
  defaultData.push({
    ...element,
    children:target,
  })
});

class JournalPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      bookList: bookData,
      searchData:{
        offset: 0,
        limit: 10,
        ...defaultType,
      }
    };

    this.data = defaultData;

  }

  componentDidMount() {

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


  clickBook = (v) =>{
    console.log(v)
  }

  onPaginationChange = (current, pageSize) => {
    let params = this.mergeSearchData({limit: pageSize, offset: (current - 1) * pageSize });
    this.queryBookList(params);
  };

  queryBookList(searchData){
    console.log('查询数据', searchData)
  }

  render() {
    let { searchData, bookList, total = 500 } = this.state;
    return (
      <div className='journal-wrap w1200'>
        <Filter searchData={searchData} data={this.data} onChange={this.onChange}/>
        <div className="journal-content">
          <div className="journal-left">
              <div className="journal-list">
                {bookData.map((v,i) => {
                  return( <MagazineIntroductionDetail key={i} data={v} clickBook={this.clickBook}/>)
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
              <TitleWithImgList title={'热门期刊'} data={bookData}/>
            </div>
          </div>
      </div>
    )
    ;
  }
}

export default JournalPage;
