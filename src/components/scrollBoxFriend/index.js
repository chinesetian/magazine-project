import React from 'react'
import './index.less'

const { Service } = window

export default class ScrollBox extends React.Component{
    constructor(props){
        super(props)
        this.timer = null;
        this.state={
            linkData: [],
        }
    }
    

    componentDidMount(){
        // let timer = null;
        // clearTimeout(timer)

        this.getData()
        let box = document.getElementById("scroll-content-friend");
        let can = true;
        // box.innerHTML += box.innerHTML;
        box.onmouseover = function () { can = false };
        box.onmouseout = function () { can = true };
        this.action(box, can)
    }

    componentWillUnmount(){
        this.timer && clearTimeout(this.timer);
        this.timer = null;
    }


    action = (box, can) => {
        // console.log(1)
        // console.log('scrollTop', box.scrollTop)
        var stop = box.scrollTop % 2 == 0 && !can;
        if (!stop) {
            if(box.scrollTop == parseInt(box.scrollHeight / 2)){
                box.scrollTop = 0
            } else {
                box.scrollTop = box.scrollTop+1;
            }
        }
        let that = this;
        this.timer = setTimeout(() => {
            that.action(box, can)
            // console.log(2)
        }, 50);
    }

    getData = () => {
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
        let { linkData } = this.state
      let { title, data = [], clickArticle } = this.props
        return(
            <div className='scroll-box' >
                <div className="content-box">
                    {<div className="content" id="scroll-content-friend">
                        {linkData.map((v,i) => {
                            return(<span key={i} className="scroll-item">
                                    <a href={`${v.url}`} target={'_blank'} rel="noopener noreferrer">
                                    <img src={`/magazine${v.fileUrl}`} />
                                        {/* {v.name} */}
                                    </a>
                                </span>)
                        })}
                        {linkData.map((v,i) => {
                            return(<span key={i} className="scroll-item">
                                    <a href={`${v.url}`} target={'_blank'} rel="noopener noreferrer">
                                    <img src={`/magazine${v.fileUrl}`} />
                                        {/* {v.name} */}
                                    </a>
                                </span>)
                        })}
                    </div>}
                </div>
            </div>
        )
    }
}