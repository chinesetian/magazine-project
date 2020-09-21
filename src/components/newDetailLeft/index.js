import React from 'react'
import Card from '../../components/card'

import './index.less'


const { Dict } = window
const ContactUs = Card.ContactUs
const ArticleCopyright = Card.ArticleCopyright


export default class NewDetailLeft extends React.Component{
    constructor(props){
        super(props)
    }
    

    componentDidMount(){
    }

    componentWillUnmount(){

    }



    render(){
      let { title, data = {}, clickArticle } = this.props
        return(
          <div className='New-Detail-Left' >
               <div className="img-box">
                <img className={`img ${flag ? "fixed-img" :''}`} src={`/magazine${data.url}`} />
              </div>
              <ArticleCopyright data={data}></ArticleCopyright>
              <ContactUs></ContactUs>
          </div>
        )
    }
}