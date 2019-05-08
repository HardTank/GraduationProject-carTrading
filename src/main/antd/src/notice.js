import React, { Component } from 'react';
import './css/tradingHall.css';
import {message,Button ,Icon,Row, Col, Tabs,Affix, Layout,Menu,List,Card,Pagination,Modal,Popconfirm,Empty} from 'antd';
import axios from 'axios'//这是模块的加载机制，直接写依赖库的名字，会到node_modules下去查找，因此不需要你指明前面的相对路径
import qs from 'qs';
import Title from './title'
import AuctionCenter from './tradingHall/auctionCenter'
import CountDown from './tradingHall/countDown'
import NoticeDetailInfo from './homePage/noticeDetailInfo'
class Notice extends Component {
    constructor() {
        super();
        this.state = {
            size: 'large',
            result: [],
            name: '',
            visible: false,
            pageIndex: 0,
            pageSize: 10,
            content:[],
            noticeId:'',
            notice:'',



        };
    }

    componentDidMount() {
        var userId = sessionStorage.getItem("userId");
        if (userId == null || userId == 0) {
            window.location.href = "#/index";
        }
        else {

            this.showPage(0)
        }

    }


    showPage(page) {
        axios.get('http://localhost:8080/notice/getList', {
            params: {

                pageIndex: page,
                pageSize: this.state.pageSize,
                deleted:0,
            }
        }).then(r=> {
            if (r.status == 200) {
                this.setState({
                    result: r.data,
                    content: r.data.content,
                    r: r.data,
                })
            }
        })

    }

handleOk=(noticeId)=>{
        this.getNotice(noticeId)
        sessionStorage.setItem("noticeId", noticeId)
        window.open("http://localhost:3000/#/noticeInfo")

    //this.setState({
    //    visible:true,
    //    noticeId:noticeId,
    //
    //})


}
    addView(noticeId,view){

        axios.get('http://localhost:8080/notice/save',{
            params:{
                id:noticeId,
                view:view+1,
            }
        })
    }
    getNotice(noticeId){
        axios.get('http://localhost:8080/notice/getNotice',{
            params:{
                id:noticeId,
            }
        }).then(r=>{
            if(r.status==200){

                this.addView(noticeId,r.data.view)
            }
        })
    }
    handleCancel(){
        this.setState({
            visible:false,
        })
    }

    render() {
        const { }=this.state;
        var content = [];
        this.state.content.map(function (item, index) { // map 返回的是一个新数组

            return content.push(<div className="catalog"><Card className="app-item" key={index}
                    title={item.title}
                    style={{marginBottom:10}}
                    onClick={this.handleOk.bind(this,item.id)}
            >

                <div dangerouslySetInnerHTML={{ __html:item.content.substring(0,150).replace(/<p>/,"").replace(/<\/p>/,"")+'......'}}></div>
            </Card></div>)
        }, this)
        return (
            <div style={{marginLeft:50,marginRight:50}}>
                {content.length==0?<Empty style={{minHeight:470}}/>:content}
                <Pagination showQuickJumper defaultCurrent={1}
                            total={this.state.result.totalElements} current={this.state.result.number+1}
                            defaultPageSize={this.state.pageSize}
                            onChange={(page)=>{this.showPage(page-1)}
                            }></Pagination>

            </div>




        );
    }


}
export default Notice;
