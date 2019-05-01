import React, { Component } from 'react';
import tradingHall from '../css/tradingHall.css'
import {Button ,Icon,Row, Col, Tabs,Input,Divider,Span,Table,Modal,Pagination,Card,Form} from 'antd';
import axios from 'axios';//这是模块的加载机制，直接写依赖库的名字，会到node_modules下去查找，因此不需要你指明前面的相对路径
import qs from 'qs';
import io from 'socket.io-client';
import moment from 'moment'
var websocket;
const { TextArea } = Input;
//const socket = io.connect('ws://127.0.0.1:8080/client/ID=1');
class AuctionCenter extends Component {
    constructor() {
        super();
        this.state = {
            price: '',
            message: '<br/>'
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
         websocket.onmessage = (msg)=>{
            var message = JSON.parse(msg.data);
            var text=message.time+'<br/>'+message.id+'出价:'+'<em style="color:red;">'+message.message+'元</em>';
            this.setState({
                message: this.state.message +text + '<br/>',
            })
             var scrollDom = document.getElementById('content');
             scrollDom.scrollTop = scrollDom.scrollHeight;
        }
        //websocket.addEventListener('message', (msg)=>this.getMessage(msg)
        //);

    }

    getMessage(msg) {
        var message = JSON.parse(msg.data);
        var text=message.time+'<br/>'+message.id+'出价:'+message.message;
        this.setState({
            message: text + this.state.message +'<br/>',
        })
        var scrollDom = document.getElementById('content');
        alert(scrollDom.value)
        scrollDom.scrollTop = scrollDom.scrollHeight;
    }

    st() {
        alert(122);
    }

    //发送消息
    send() {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                var postValue = {};
                postValue.id = '1';
                ////postValue.text = '出价';
                //var myDate = new Date();
                //
                //postValue.text =moment().format('YYYY-MM-DD HH:MM:SS ');
                postValue.message = values.deposit;
                websocket.send(JSON.stringify(postValue));
            }
        })
    }

    //关闭连接
    closeWebSocket() {
        if (websocket != null) {
            websocket.close();
        }

    }

    render() {
        const {message}=this.state;
        const {form} = this.props;
        // const { getFieldDecorator } = form;
        const { getFieldDecorator } = form;
        return (
            <div>
                <div className="divcss5" style={{padding:50,paddingTop:20,height:200,overflow:'auto',scrollTop:'scrollHeight' }}
                     dangerouslySetInnerHTML={{__html:message}}  id="content"
                >

                </div>
                <Form>
                    <Form.Item
                        lable="出价"
                    >
                        {getFieldDecorator('deposit', {
                            rules: [{
                                pattern: /^\+?(?!0+(\.00?)?$)\d+(\.\d\d?)?$/, message: '格式错误!',
                            }, {required: true, message: '请输入出价!'}],

                        })(
                            <Input/>
                        )}

                    </Form.Item>
                    <Button type="primary" style={{marginLeft:20}}   onClick={(ev)=>{this.send(ev)}}>Send</Button>
                    <Button type="primary"   style={{marginLeft:20}} onClick={this.connectWebSocket}>open</Button>
                    <Button  type="primary"  style={{marginLeft:20}} onClick={this.closeWebSocket}>Close</Button>
                </Form>
            </div>


        )
    }
}
export default Form.create({})( AuctionCenter);