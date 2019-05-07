import React, { Component } from 'react';
import tradingHall from '../css/tradingHall.css'
import {message,Button ,Icon,Row, Col, Tabs,Input,Divider,Span,Table,Modal,Pagination,Card,Form} from 'antd';
import axios from 'axios';//这是模块的加载机制，直接写依赖库的名字，会到node_modules下去查找，因此不需要你指明前面的相对路径
import qs from 'qs';
import io from 'socket.io-client';
import moment from 'moment'
import CountDown from './countDown'
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
            end:false,

        }
    }
    componentDidMount() {
        this.connectWebSocket();
        this.getHighestPrice();
    }

    //获取最高价
    getHighestPrice() {
        axios.get('http://localhost:8080/transactionRecord/getHigh', {
            params: {
                carId: this.props.carId,
            }
        }).then(r=> {
            if (r.status == 200) {
                var record = r.data
                console.log('data'+record)
                if (record!='') {
                    axios.get('http://localhost:8080/user/getName', {
                        params: {
                            id: record.userId,
                        }
                    }).then(r=> {
                        if (r.status == 200) {
                            var userId = sessionStorage.getItem("userId")
                            console.log(userId)
                            console.log(r.data.userId)
                            if (userId == r.data.id)
                                var userName = r.data.name + '(您)';
                            else
                                var userName = r.data.name;
                            this.setState({
                                highest: record.price,
                                bidder: userName,
                            })
                        }
                    })

                }
                else {
                    this.setState({
                        highest: this.props.startPrice * 10000,
                    })

                }
            }
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
                this.saveRecord(message.userId, message.price, message.time);
                var price = this.formatCurrency(message.price)

                if (message.userId == userId) {
                    this.setState({

                        bidder: message.userName + '(您)',

                    })
                    var text = message.time + '<br/><em style="font-weight:bold;">' + '您出价:<div style=" color:red ;font-size:18px;display:inline-block">' + price + '</div>元</em><br/>';

                }

                else
                    var text = message.time + '<br/><em style="color:orange;">' + message.userName + '</em> 出价:<div style="color:red ;font-size:18px;display:inline-block">' + price + '</div>元<br/>';
                this.setState({
                    message: this.state.message + text,
                })
                var scrollDom = document.getElementById(this.props.carId);
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

    st() {
        alert(122);
    }

    //发送消息
    send() {
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if(this.judgeOutTime(this.props.endTime,new Date())){
                    message.config({
                        top: 130,
                        duration: 2,
                        maxCount: 3,
                    });
                    message.info('竞拍已结束', 1);
                }
                else{
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
                            postValue.carId = JSON.stringify(this.props.carId);
                            postValue.price = values.price;
                            this.props.form.resetFields();
                            websocket.send(JSON.stringify(postValue));
                        }
                    })
                }


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
        console.log(this.state.highest + 1000)
        console.log(value)
        if (value <= (parseFloat(this.state.highest) + 1000)) {

            callback('最低加价1000元!');
        } else {
            callback();
        }
    }
    //存储交易记录
    saveRecord = (userId, price, time)=> {
        console.log(time)
        axios.get('http://localhost:8080/transactionRecord/save', {
            params: {
                carId: this.props.carId,
                userId: userId,
                price: price,
                time: time,
                state: 1,

            }
        })
    }
    //快速加价
    add=(e,money)=>{
        e.preventDefault();
        if(this.judgeOutTime(this.props.endTime,new Date())){
            message.config({
                top: 130,
                duration: 2,
                maxCount: 3,
            });
            message.info('竞拍已结束', 1);
        }
        else{
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
                    postValue.carId = JSON.stringify(this.props.carId);
                    postValue.price =JSON.stringify(parseFloat(this.state.highest)+money);
                    this.props.form.resetFields();
                    websocket.send(JSON.stringify(postValue));
                }
            })
        }

    }
    //判断是否在竞拍时间之前
    judgeBeforeTime(startTime,endTime){
        var start=new Date(startTime);
        var end=new Date(endTime)
        console.log(start.getTime())
        console.log(end.getTime())
        if(start.getTime()>end.getTime()){
            return true;
        }

        else{
            return false;
        }
    }
    //判断是否正在竞拍
    judgeInTime(startTime,endTime){
        var start=new Date(startTime);
        var end=new Date(endTime)
        console.log(start.getTime())
        console.log(end.getTime())
        if(start.getTime()<end.getTime()&&start.getTime()+600000>end.getTime()){
            return true;
        }

        else{
            return false;
        }
    }
    //是否过期
    judgeOutTime(startTime,endTime){
        var start=new Date(startTime);
        var end=new Date(endTime)
        console.log(start.getTime())
        console.log(end.getTime())
        if(start.getTime()+600000<end.getTime()){
            return true;
        }
        else{
            return false;
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
                    剩余时间:<div className="price">
                        {this.judgeBeforeTime(this.props.endTime,new Date())?<CountDown
                            endTime={this.props.endTime}
                        >
                        </CountDown>:this.judgeInTime(this.props.endTime,new Date())?<CountDown
                            endTime={this.props.endTime}
                            auction={true}
                        >
                        </CountDown>:'竞拍已结束'}</div>
                </div>
                <div>最高价:
                    <div className="price">{this.formatCurrency(highest)}</div>
                    元 出价人:
                    <div className="price">{bidder}</div>
                </div>
                <Card id={this.props.carId} style={{paddingLeft:5,height:200,overflow:'auto',scrollTop:'scrollHeight' }}>
                    <div
                        dangerouslySetInnerHTML={{__html:message}}
                    >

                    </div>
                </Card>
                <Form>
                    <Form.Item
                        label="出价"
                    >
                        {getFieldDecorator('price', {
                            rules: [{
                                pattern: /^\+?(?!0+(\.00?)?$)\d+(\.\d\d?)?$/, message: '格式错误!',
                            }, {required: true, message: '请输入出价!'},
                                {
                                    validator: this.judgePrice,
                                }],

                        })(
                            <Input placeholder="请输入您的出价,单位:元"/>
                        )}

                    </Form.Item>
                    <Button type="primary" style={{marginLeft:20}} onClick={(ev)=>{this.send(ev)}}>提交</Button>
                    <Button type="primary" style={{marginLeft:20}} onClick={(ev)=>{this.add(ev,1000)}}>+1,000元</Button>
                    <Button type="primary" style={{marginLeft:20}} onClick={(ev)=>{this.add(ev,10000)}}>+10,000元</Button>
                </Form>
            </div>


        )
    }
}
export default Form.create({})(AuctionCenter);