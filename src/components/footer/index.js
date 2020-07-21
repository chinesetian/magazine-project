import React from 'react'
import './index.less'

const { Service, Dict } = window

export class Footer extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            linkData: [],
            copyright: {},
            announce:{},
        }
    }

    componentDidMount(){
        // copyright
        let target =  Dict.getDict("periodical_other_info") || []
        
        let announce = target.find(v => v.value == "periodical_other_info_announce") || {}
        let copyright = target.find(v => v.value == "periodical_other_info_copyright") || {}
        this.setState({copyright, announce})
        // 链接
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
        let { linkData, copyright, announce } = this.state;
        return(
            <div className="home-layout-footer">
                <div className="link-data">
                    {linkData.map((v,i) => {
                        return(<span key={i} className="link-item">
                                <a href={`${v.url}`} target={'_blank'} rel="noopener noreferrer">
                                <img src={`/magazine${v.fileUrl}`} />
                                    {/* {v.name} */}
                                </a>
                            </span>)
                    })}
                </div>
                <div className="announce">{announce.label || ''}</div>
                <div className="copy-right">{window.BSConfig[window.BSConfig.platform] || ''}</div>
               
            </div>
        )
    }
}