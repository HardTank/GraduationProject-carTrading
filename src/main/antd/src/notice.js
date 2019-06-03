import React, { Component } from 'react';
import './css/tradingHall.css';
import {Input,message,Button ,Icon,Row, Col, Tabs,Affix, Layout,Menu,List,Card,Pagination,Modal,Popconfirm,Empty} from 'antd';
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
            pageSize: 5,
            content:[],
            noticeId:'',
            notice:'',
            title:'',



        };
    }

    componentDidMount() {
            sessionStorage.setItem('keyWord',"")
            this.showPage(0)
    }

    showPage(page) {
        axios.get('http://localhost:8080/notice/getList', {
            params: {
                title:sessionStorage.getItem('keyWord'),
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
    setTitle(value){
        this.setState({
            title : value.target.value,
        })

    }
    searchTitle=(e)=>{
        e.preventDefault();
        sessionStorage.setItem('keyWord',this.state.title)
        this.showPage(0);
    }
    render() {
        const { }=this.state;
        var content = [];
        this.state.content.map(function (item, index) { // map 返回的是一个新数组

            return content.push(<div className="catalog"><Card className="app-item"
                    key={item.id}
                    title={item.title}
                    style={{marginBottom:10}}
                    onClick={this.handleOk.bind(this,item.id)}
            >

                <div style={{minHeight:50}} dangerouslySetInnerHTML={{ __html:item.content.substring(0,200)+'......'}}></div>
            </Card></div>)
        }, this)
        return (
            <Card style={{marginLeft:50,marginRight:50}}>
                <Row  >
                    <Col span={16}></Col>
                    <Col span={6}>
                <Input onChange={(value)=>{this.setTitle(value)}} defaultValue={''} style={{marginBottom:30}} icon="search"/>
                    </Col>
                    <Col span={2}>
                <Button style={{width:'100%'}}type="primary" onClick={(ev)=>{this.searchTitle(ev)}}> 搜索</Button></Col>
                    </Row>
                {content.length==0?<Empty style={{minHeight:470}}/>:content}
                <Pagination showQuickJumper defaultCurrent={1}
                            total={this.state.result.totalElements} current={this.state.result.number+1}
                            defaultPageSize={this.state.pageSize}
                            onChange={(page)=>{this.showPage(page-1)}
                            }></Pagination>

            </Card>




        );
    }


}
export default Notice;
