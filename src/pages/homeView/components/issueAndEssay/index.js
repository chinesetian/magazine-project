import React from 'react'
import Card from '../../../../components/card'


const { Dict, Service, Store } = window
const TitleWithList = Card.TitleWithList

export default class IssueAndEssay extends React.Component{
    constructor(props){
      super(props)
      this.state = {
        searchData:{
          offset: 0,
          limit: 10,
        },
        issueList: [],
        essayList: [],
      }
    }

    componentDidMount(){
      let { searchData } = this.state
      this.queryIssue(searchData);
      this.queryEssay(searchData);
    }


    queryIssue(searchData){
      let param = Object.assign(searchData, {periodicalArticleTypeInfo: "periodical_article_type_info_question"})
      Service.base.articleInfo(searchData).then(res => {
          if(res.code == 0){
              this.setState({issueList: res.data.list});
          } else {
              this.setState({issueList: [], total: 0});
          }
      }).catch(e => {
          this.setState({issueList: [], total: 0});
      })
    }

    queryEssay(searchData){
      let param = Object.assign(searchData, {limit: 5})
      Service.base.articleThesis(param).then(res => {
          if(res.code == 0){
              this.setState({essayList: res.data.list});
          } else {
              this.setState({essayList: [], total: 0});
          }
      }).catch(e => {
          this.setState({essayList: [], total: 0});
      })
    }

    clickIssue = (v) =>{
      console.log(v);
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

    clickEssay = (v) =>{
      console.log(v);
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

    render(){
      let { essayList,issueList } = this.state
        return(
           <React.Fragment>
              <TitleWithList title={'常见问题'} data={issueList} clickArticle={this.clickIssue}/>
              <TitleWithList title={'期刊范文'}data={essayList} clickArticle={this.clickEssay}/>
           </React.Fragment>
        )
    }
}