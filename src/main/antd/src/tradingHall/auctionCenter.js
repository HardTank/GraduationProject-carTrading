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
            message: '<br/>',
            highest: '',
            bidder: '无',
            bidderId: '',

        }
    }

    componentDidMount() {

        this.connectWebSocket();
        this.setState({
            highest: this.props.startPrice * 10000
        })
    }

//websocket连接
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
        websocket.onmessage = (msg)=> {
            var message = JSON.parse(msg.data);
            console.log(message)
            var userId = sessionStorage.getItem("userId");
            if (message.carId == this.props.carId) {
                if (message.price > this.state.highest) {
                    this.setState({
                        highest: message.price,
                        bidder: message.userName,
                        bidderId: message.id,
                    })
                }
                var price = this.formatCurrency(message.price)

                if (message.userId == userId)
                    var text = message.time + '<br/><em style="font-weight:bold;">' + '您出价:<div style=" color:red ;font-size:18px;display:inline-block">' + price + '</div>元</em><br/>';

                else
                    var text = message.time + '<br/>' + message.userName + '出价:<div style="color:red ;font-size:18px;display:inline-block">' + price + '</div>元<br/>';
                this.setState({
                    message: this.state.message + text,
                })
                var scrollDom = document.getElementById('content');
                scrollDom.scrollTop = scrollDom.scrollHeight;
            }
        }
        //websocket.addEventListener('message', (msg)=>this.getMessage(msg)
        //);

    }

//价格的格式转换
    formatCurrency = (num)=> {
        num = num.toString().replace(/\$|\,/g, '');
        if (isNaN(num))
            num = "0";
        var sign = (num == (num = Math.abs(num)));
        num = Math.floor(num * 100 + 0.50000000001);
        var cents = num % 100;
        num = Math.floor(num / 100).toString();
        if (cents < 10)
            cents = "0" + cents;
        for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
            num = num.substring(0, num.length - (4 * i + 3)) + ',' +
                num.substring(num.length - (4 * i + 3));
        return (((sign) ? '' : '-') + num + '.' + cents);
    }
//获取消息
    getMessage(msg) {
        var message = JSON.parse(msg.data);
        console.log(message)
        var userId = sessionStorage.getItem("userId");
        console.log(userId)
        alert(message.userId)
        if (message.carId == this.props.carId) {
            if (message.userId == userId)
                var text = message.time + '<br/><em>' + '您' + '出价:' + message.price + '</em>';
            else
                var text = message.time + '<br/>' + message.userName + '出价:' + message.price;
            this.setState({
                message: text + this.state.message + '<br/>',
            })
            var scrollDom = document.getElementById('content');
            scrollDom.scrollTop = scrollDom.scrollHeight;
        }
    }

    st() {
        alert(122);
    }

    //发送消息
    send() {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                var userId = sessionStorage.getItem("userId");
                axios.get('http://localhost:8080/user/getName', {
                    params: {
                        id: userId,
                    }
                }).then(r=> {
                    if (r.status == 200) {
                        var userName = r.data.name;
                        var postValue = {};
                        postValue.userId = userId;
                        postValue.userName = userName;
                        postValue.carId = this.props.carId;
                        postValue.price = values.deposit;
                        websocket.send(JSON.stringify(postValue));
                    }
                })

            }
        })
    }

    //关闭连接
    closeWebSocket() {
        if (websocket != null) {
            websocket.close();
        }

    }

    //判断出价
    judgePrice = (rule, value, callback)=> {
        const form = this.props.form;
        if (value <= this.state.highest + 1000) {

            callback('最低加价1000元!');
        } else {
            callback();
        }
    }

    render() {
        const {message,highest,bidder}=this.state;
        const {form,startPrice} = this.props;
        // const { getFieldDecorator } = form;
        const { getFieldDecorator } = form;
        return (
            <div>
                <div> 起拍价:
                    <div className="price">{startPrice}</div>
                    万元
                </div>
                <div>最高价:
                    <div className="price">{this.formatCurrency(highest)}</div>
                    元 出价人:
                    <div className="price">{bidder}</div>
                </div>
                <Card id="content" style={{paddingLeft:5,height:200,overflow:'auto',scrollTop:'scrollHeight' }}>
                    <div
                        dangerouslySetInnerHTML={{__html:message}}
                    >

                    </div>
                </Card>
                <Form>
                    <Form.Item
                        lable="出价"
                    >
                        {getFieldDecorator('deposit', {
                            rules: [{
                                pattern: /^\+?(?!0+(\.00?)?$)\d+(\.\d\d?)?$/, message: '格式错误!',
                            }, {required: true, message: '请输入出价!'},
                                {
                                    validator: this.judgePrice,
                                }],

                        })(
                            <Input placeholder="元"/>
                        )}

                    </Form.Item>
                    <Button type="primary" style={{marginLeft:20}} onClick={(ev)=>{this.send(ev)}}>Send</Button>
                    <Button type="primary" style={{marginLeft:20}} onClick={this.connectWebSocket}>open</Button>
                    <Button type="primary" style={{marginLeft:20}} onClick={this.closeWebSocket}>Close</Button>
                </Form>
            </div>


        )
    }
}
export default Form.create({})(AuctionCenter);