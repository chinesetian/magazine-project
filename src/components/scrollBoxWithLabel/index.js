import React from 'react'
import './index.less'

const { Dict } = window

export default class  ScrollBox extends React.Component{
    constructor(props){
        super(props)
        this.timer = null;
    }
    

    componentDidMount(){
        // let timer = null;
        // clearTimeout(timer)
        let box = document.getElementById("scroll-content-with-label");
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


    render(){
      let { title, data = [], clickArticle } = this.props
        return(
            <div className='scroll-box-with-label' >
                {title && <div className="title">{title}</div>}
                <div className="content-box">
                    {<div className="content" id="scroll-content-with-label">
                        {data.map((item,index) => {
                            return(
                            <div key={item.id} className="scroll-item">
                                <div className="index" title={item.no}>编号：{item.no}</div>
                                {/* <span className="name" title={item.title}>{item.title}</span> */}
                                <span className="auther" >作者：{item.author}</span>
                                <span className="status">状态：{Dict.getLabel("periodical_audit_status", item.status)}</span>
                            </div>
                            )
                        })}
                        {data.map((item,index) => {
                            return(
                            <div key={item.id} className="scroll-item">
                                <div className="index" title={item.no}>编号：{item.no}</div>
                                {/* <span className="name" title={item.title}>{item.title}</span> */}
                                <span className="auther" title={item.author}>作者：{item.author}</span>
                                <span className="status">状态：{Dict.getLabel("periodical_audit_status", item.status)}</span>
                            </div>
                            )
                        })}
                    </div>}
                </div>
            </div>
        )
    }
}