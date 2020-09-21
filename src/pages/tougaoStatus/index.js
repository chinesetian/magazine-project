import React from 'react'
import { Pagination } from 'antd';
import NewDetailLeft from '../../components/newDetailLeft'
import { setCache, getCache } from '../../utils/cache';
import './index.less'


const { Dict, Service, Store } = window
let data = getCache("detailData", "session") || {}

export default class TougaoStatus extends React.Component{
    constructor(props){
        super(props)
        this.timer = null;
        let target =  Dict.getDict("periodical_other_info") || []   
        let platform = target.find(v => v.value == "periodical_other_info_code") || {}
    
        this.state={
          tougaoList: [],
          searchData:{
            "limit":10,
            "offset":0,
            "platform": platform.label || "SJ"
          }
        }
    }
    

    componentDidMount(){
      this.tougaoList(this.state.searchData)
    }

    componentWillUnmount(){
    }

    tougaoList(param){

      Service.base.tougaoList(param).then(res => {
        if(res.code == 0){
          this.setState({tougaoList: res.data.list,});
        } else {
            this.setState({tougaoList: [],});
        }
      }).catch(e => {
        this.setState({tougaoList: [],});
      })
    }

    onChange = (options) => {
      let params = this.mergeSearchData({ ...options, offset: 0, limit: 10, });
      console.log(params)
      this.tougaoList(params)
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
      this.tougaoList(params);
    };


    render(){
      let { searchData, total = 0, tougaoList = []} = this.state;
        return(
            <div className='tougao-status' >
              <NewDetailLeft
            data={data}
        ></NewDetailLeft>
              <div className="tougao-status-right">
                {<div className="tougao-title">{"稿件录用公告"}</div>}
                <div className="content-box">
                    {<div className="content" id="scroll-content">
                        {tougaoList.map((item,index) => {
                            return(
                            <div key={item.id} className="scroll-item">
                                <span className="index" title={item.no}>编号：{item.no}</span>
                                <span className="name" title={item.title}>标题：{item.title}</span>
                                <span className="auther" >作者：{item.author}</span>
                                <span className="status">状态：{Dict.getLabel("periodical_audit_status", item.status)}</span>
                            </div>
                            )
                        })}
                    </div>}
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
          </div>
        )
    }
}