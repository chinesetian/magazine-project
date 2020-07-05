import React from 'react'
import './index.less'

const { Service } = window

export class Footer extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            linkData: []
        }
    }

    componentDidMount(){
        Service.base.getLinkData().then(res => {
            if(res.code == 0){
                this.setState({linkData: res.data});
            } else {
                this.setState({linkData: []});
            }
        }).catch(e => {
            this.setState({linkData: []});
        })
    }

    render(){
        let { linkData } = this.state;
        return(
            <div className="home-layout-footer">
                <div className="link-data">
                    {linkData.map((v,i) => {
                        return(<span key={i} className="link-item"><a href={`https://${v.url}`} target={'_blank'} rel="noopener noreferrer">{v.name}</a></span>)
                    })}
                </div>
                <div className="copy-right"> Copyright ©2019期刊订阅发行部</div>
               
            </div>
        )
    }
}