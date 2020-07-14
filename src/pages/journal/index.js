import React from "react";
import { Pagination } from 'antd';
import Filter from './components/filter';
import Card from '../../components/card'
import * as _ from 'lodash';
import { setCache, getCache } from '../../utils/cache';

import './index.less';

const { Dict, Service, Store } = window
const MagazineIntroductionDetail = Card.MagazineIntroductionDetail
const TitleWithImgList = Card.TitleWithImgList

const defaultKey = '-1'; // 不限

const bookUrl = "/resource/image/book.jpg"
const bookData = [
  {id: 1,  name: '中国药房', url: bookUrl, description: "《中国药房》",},
  {id: 2,  name: '当代医药论丛', url: bookUrl, description: "《中国药房》杂",},
  {id: 3,  name: '吉林医学', url: bookUrl, description: "《中国药房》杂志是中",},
  {id: 4,  name: '重庆医学', url: bookUrl, description: "国国家卫生和",},
]
let defaultData = []
let defaultType = {}


class JournalPage extends React.Component {
  constructor(props){
    super(props)

    let { history } = this.props
    let { location } = history
    // 外部传进来的tag
    let param = location.state.data;

    defaultData = []
    defaultType = {}
    let target = _.cloneDeep(Dict.getDict("periodical") || [])
    let parentTag = target.filter(v => v.remarks == "期刊分类查询条件") || []
    parentTag.forEach(element => {
      defaultType[element.transformPeriodical] = defaultKey;
      let target = _.cloneDeep(Dict.getDict(element.dictType));
      target.unshift(
        { label: '不限', value: defaultKey, 
        transformPeriodical: element.transformPeriodical,
      }) 
      defaultData.push({
        ...element,
        children:target,
      })
    });
    // 合并选中的tag标签
    defaultType = Object.assign(defaultType, param);

    this.state = {
      bookList: [],
      filterData: defaultData,
      searchData:{
        offset: 0,
        limit: 10,
        ...defaultType,
      }
    };

    this.onChange(defaultType) 
  }

  componentDidMount() {
    
  }

  onChange = (options) => {
    let params = this.mergeSearchData({ ...options, offset: 0, limit: 10, });
    console.log(params)
    this.qikanpageList(params)
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


  /**
   * 期刊详情
   */
  clickBook = (v) =>{
    console.log(v)
    let page = Store.MenuStore.getMenuForName('detailview');
    let { history } = this.props
    let { location } = history
      if (page) {
        location.pathname = `${page.url}/${v.id}`
        location.state = {data: v}
        setCache('detailData', v, "session")
        //新开页签
        window.open(location.pathname)
        // history.push(location);
      } else {
          history.push('/home/404');
      }
  }

  onPaginationChange = (current, pageSize) => {
    let params = this.mergeSearchData({limit: pageSize, offset: (current - 1) * pageSize });
    this.qikanpageList(params);
  };

  /**
   * 查询期刊列表
   * @param {*} searchData 
   */
  qikanpageList(searchData){
    console.log('查询数据', searchData)
    Service.base.qikanpageList(searchData).then(res => {
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
    let { searchData, bookList, total = 0, filterData } = this.state;
    return (
      <div className='journal-wrap w1200'>
        <Filter searchData={searchData} data={filterData} onChange={this.onChange}/>
        <div className="journal-content">
          <div className="journal-left">
              <div className="journal-list">
                {bookList.map((v,i) => {
                  return( <MagazineIntroductionDetail key={i} data={v} clickBook={this.clickBook}/>)
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

export default JournalPage;
