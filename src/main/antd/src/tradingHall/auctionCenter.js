import React, { Component } from 'react';

import {Button ,Icon,Row, Col, Tabs,Input,Divider,Span,Table,Modal,Pagination,Card} from 'antd';
import axios from 'axios';//这是模块的加载机制，直接写依赖库的名字，会到node_modules下去查找，因此不需要你指明前面的相对路径
import qs from 'qs';
import io from 'socket.io-client';
var websocket;
//const socket = io.connect('ws://127.0.0.1:8080/client/ID=1');
class AuctionCenter extends Component {
    constructor() {
        super();
        this.state = {
            price: '',
            message:'<br/>'
        }
    }
    componentDidMount() {

        this.connectWebSocket();
    }

    connectWebSocket() {
        console.log("开始...");
        //建立webSocket连接
        var userID = "888";
        websocket = new WebSocket("ws://127.0.0.1:8080/client/ID=" + userID);
        //打开webSokcet连接时，回调该函数
        websocket.onopen = function () {
            console.log("onpen");
        }
        //关闭webSocket连接时，回调该函数
        websocket.onclose = function () {
            //关闭连接
            console.log("onclose");
        }

        //接收信息
        websocket.onmessage = function (msg) {
            console.log(msg.data);

        }
        websocket.addEventListener('message', (msg)=>this.getMessage(msg)
        );

    }
    getMessage(msg){
        var message=JSON.parse(msg.data).message;
        this.setState({
            message:this.state.message+message+'\n',
        })
    }
    st(){
        alert(122);
    }
    //发送消息
    send() {
        var postValue = {};
        postValue.id = '1';
        postValue.text = '测试';
        postValue.message = '消息';
        websocket.send(JSON.stringify(postValue));
    }

    //关闭连接
    closeWebSocket() {
        if (websocket != null) {
            websocket.close();
        }

    }

    render() {
        const {message}=this.state;
        return (
            <div>
                <Card key="1" style={{height:100}}>
                    { {__html:message}}
                </Card>
                <Input id="text" type="text"/>
                <Button onClick={(ev)=>{this.send(ev)}}>Send</Button>
                <Button onClick={this.connectWebSocket}>open</Button>
                <Button onClick={this.closeWebSocket}>Close</Button>
            </div>


        )
    }
}
export default AuctionCenter;