import React, { Component } from 'react';

import {Button ,Icon,Row, Col,Input,Modal,Pagination,Card,Form,Carousel,Tabs} from 'antd';
import axios from 'axios';//这是模块的加载机制，直接写依赖库的名字，会到node_modules下去查找，因此不需要你指明前面的相对路径
import qs from 'qs';
import io from 'socket.io-client';
import moment from 'moment';
import Title from '../title'
import ReactWaterMark from 'react-watermark-component';

const { Meta } = Card;
class NoticeDetailInfo extends Component {
    constructor() {
        super();
        this.state = {
            item: [],
            fileList: [],
            position: 'left',
            result:[],
            view:'',
        }
    }

    componentWillMount() {
        this.getNotice()

    }

     getNotice(){
         var noticeId = sessionStorage.getItem("noticeId")
         axios.get('http://localhost:8080/notice/getNotice',{
             params:{
                 id:noticeId,
             }
         }).then(r=>{
             if(r.status==200){
                 this.setState({
                     result: r.data,

                 })

             }
         })
     }

    render() {
        const {message,item,fileList,position}=this.state;
        const {form,onCancel,visible} = this.props;
        // const { getFieldDecorator } = form;
        const { getFieldDecorator } = form;
        const TabPane = Tabs.TabPane;

        return (

<Title
    target="index"
>            <div>

                <Card className="app-item"
                      title={this.state.result.title}
                      style={{marginBottom:10,minHeight:470,marginLeft:50,marginRight:50}}
                >
                    <div style={{float:'right',marginLeft:20,marginRight:10}}> 浏览次数:{this.state.result.view}</div>     <div style={{float:'right'}}>创建时间:{this.state.result.createTime}</div>
                    <br/>
                    <hr/>
                    <div dangerouslySetInnerHTML={{ __html:this.state.result.content }}></div>
                </Card>
</div>
</Title>

        )
    }
}
export default Form.create({})(NoticeDetailInfo);