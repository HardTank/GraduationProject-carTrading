import React, { Component } from 'react';
import tradingHall from '../css/tradingHall.css'
import {Empty,Button ,Icon,Row, Col,Input,Modal,Pagination,Card,Form,Carousel,Tabs,Popconfirm, message} from 'antd';
import axios from 'axios';//这是模块的加载机制，直接写依赖库的名字，会到node_modules下去查找，因此不需要你指明前面的相对路径
import qs from 'qs';
import io from 'socket.io-client';
import moment from 'moment'
import BasicDemo from '../editor'
const { Meta } = Card;
class Comment extends Component {
    constructor() {
        super();
        this.state = {
            item: [],
            fileList: [],
            userId: '',
            pageSize: 8,
            pageIndex: 0,
            r: [],

        }
    }

    componentDidMount() {
        var carInfo = sessionStorage.getItem("carInfo")
        var userId = sessionStorage.getItem("userId")
        carInfo = JSON.parse(carInfo);
        this.setState({
            item: carInfo,
            userId: userId,
        })
        this.showPage(0)
    }

    showPage(index) {
        var carInfo = sessionStorage.getItem("carInfo")
        var userId = sessionStorage.getItem("userId")
        carInfo = JSON.parse(carInfo);
        axios.get('http://localhost:8080/comment/getList', {
            params: {
                carId: carInfo.id,
                pageIndex: index,
                pageSize: this.state.pageSize,
            }
        }).then(r=> {
            if (r.status == 200) {
                console.log(r)
                this.setState({
                    fileList: r.data.content,
                    r: r.data,
                })

            }
        })
    }

    confirm(id) {
        axios.get('http://localhost:8080/comment/delComment', {
            params: {
                id: id,
            }
        }).then(r=> {
            if (r.status == 200) {
                message.config({
                    top: 130,
                    duration: 2,
                    maxCount: 3,
                });
                message.info('删除成功', 1);
                this.showPage(0);
            }

        })
    }

    getUserName(userId) {

    }

    sendComment=(comment)=> {
        var carInfo = sessionStorage.getItem("carInfo")
        var userId = sessionStorage.getItem("userId")
        carInfo = JSON.parse(carInfo);
        axios.get('http://localhost:8080/user/getName', {
            params:{
                id:userId,
            }
        }).then(r=>{
            if(r.status==200){
                var userName= r.data.name;
                axios.get('http://localhost:8080/comment/save', {
                    params: {
                        carId: carInfo.id,
                        userId: userId,
                        comm: comment,
                        userName: userName,
                    }
                }).then(r=> {
                    if (r.status == 200) {
                        message.config({
                            top: 130,
                            duration: 2,
                            maxCount: 3,

                        });
                        message.info('评论成功', 1);
                       this.showPage(0)

                    }
                })
            }
        })

    }
    show(){
        console.log('get')
    }
    render() {
        const {message,item,fileList,userId}=this.state;
        const {form} = this.props;
        const { getFieldDecorator } = form;
        var content = [];
        fileList.map(function (item, index) {
            return content.push(
                <div key={index}>
                    <Card>
                        <div dangerouslySetInnerHTML={{__html:item.comment}}></div>
                        <div> by {item.userName}  {moment(item.createDate).format("YYYY-MM-DD HH:mm:ss")}
                            <Popconfirm title="你确定要删除这条评论吗?" onConfirm={this.confirm.bind(this,item.id)}
                                        okText="确定" cancelText="取消">
                                <a hidden={item.userId!=userId} href="#">  删除</a>
                            </Popconfirm>
                        </div>
                    </Card>
                </div>
            )
        }, this)
        return (
            <div  >
                <div>

                    {content.length==0?<Empty/>:content}
                </div>
                <Pagination showQuickJumper defaultCurrent={1}
                            total={this.state.r.totalElements} current={this.state.r.number+1}
                            defaultPageSize={this.state.pageSize}
                            onChange={(page)=>{this.showPage(page-1)}
                            }
                            style={{marginTop:10}}></Pagination>
                <BasicDemo
                    onOk={this.sendComment}
                ></BasicDemo>
            </div>
        )
    }
}
export default Form.create({})(Comment);