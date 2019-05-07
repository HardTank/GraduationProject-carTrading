import React, { Component } from 'react';
import '../css/App.css';
import '../css/personal.css';
import {
    Pagination,Card, Modal,Table, message,Tabs,Menu,Layout,Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,
} from 'antd';
import {LocaleProvider} from 'antd';
import axios from 'axios'//这是模块的加载机制，直接写依赖库的名字，会到node_modules下去查找，因此不需要你指明前面的相对路径
import qs from 'qs';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import CountDown from '../tradingHall/countDown'
import AuctionCenter from '../tradingHall/auctionCenter'
const { Meta } = Card;
class OrderCar extends Component {

    state = {
        wallet: '1',
        userId: 0,
        result: {},
        pageIndex: 0,
        pageSize: 10,
        pay: '',
        myCar:[],
        visible:false,
        userId:0,
    }

    handleOk(e,item) {
        e.preventDefault();
        sessionStorage.setItem("carInfo", JSON.stringify(item))
        window.open("http://localhost:3000/#/info")

    }
    //获取用户订阅的汽车展示的数据
    show = (page)=> {
        var userId = sessionStorage.getItem("userId");
        axios.get('http://localhost:8080/order/getList', {
                params: {
                    userId: userId,
                    pageIndex: page,
                    pageSize: this.state.pageSize,
                    state: 0,
                }


            }
            //axios No 'Access-Control-Allow-Origin' header is present on the requested resource.   安装chrome 插件:Allow-Control-Allow-Origin

        ).then(
            r => {
                console.log(r)
                var data = r.data;
             //   sessionStorage.setItem("deposit", r.data.totalNumber);
               // alert(r.data.totalNumber)
                this.setState({
                    result: data,
                });
            }
        )
    }

    showModal = (e,start,end)=> {
        e.preventDefault();
        if(this.judgeBeforeTime(start,end)){
            message.config({
                top: 130,
                duration: 2,
                maxCount: 3,
            });
            message.info('竞拍未开始', 1);
        }
       else if(this.judgeOutTime(start,end)){
            message.config({
                top: 130,
                duration: 2,
                maxCount: 3,
            });
            message.info('竞拍已结束', 1);
        }
        else{
            this.setState({
                visible: true,
            })
        }

    }
    cancelModal = ()=> {
        this.setState({
            visible: false,
        })
    }
    //判断是否在竞拍时间之前
    judgeBeforeTime(startTime,endTime){
        var start=new Date(startTime);
        var end=new Date(endTime)

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

        if(start.getTime()+600000<end.getTime()){
            return true;
        }
        else{
            return false;
        }
    }
    //table展示列
    columns = [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: 10,
        className: 'hidden',
    }, {
        title: '序号',
        width: 100,
        render: (text, record, index) => `${index + 1}`
    }, {
        title: '品牌',
        dataIndex: 'brand',
        key: 'brand',
    }, {
        title: '款式',
        dataIndex: 'productDate',
        key: 'productDate',
    },{
        title: '保证金',
        key: 'deposit',
        dataIndex: 'deposit',
        render: (text, record)=>(
            <span>{text}元</span>
        )

    }, {
        title: '起拍价',
        key: 'startPrice',
        dataIndex: 'startPrice',
        render: (text, record)=>(
            <span>{text}万元</span>
        )
    }, {
        title: '开始时间',
        key: 'auctionTime',
        dataIndex: 'auctionTime',

    },{
            title: '倒计时',
            key: 'countDown',
            dataIndex: 'countDown',
        render:(text, record) =>{
            return(
            <div style={{fontSize:20,color:'orange'}}>
                {this.judgeBeforeTime(record.auctionTime,new Date())?<CountDown
                    endTime={record.auctionTime}
                >
                </CountDown>:this.judgeInTime(record.auctionTime,new Date())?'竞拍中':'竞拍已结束'}

            </div>)

        }

        }, {
        title: '操作',
        key: 'action',

        render: (text, record)=>(
            <div>
            <Button
                style={{ marginRight:10}}
                type={'primary'}
                onClick={(ev)=>this.showModal(ev,record.auctionTime,new Date()) }
              //disabled={!this.judgeInTime(record.auctionTime,new Date())}
            >
                竞拍
            </Button>
                <Button type={'primary'}  style={{ marginRight:10}}  onClick={(ev)=>{this.handleOk(ev,record)} }
                >详情</Button>
                <Button type={'primary'} disabled={this.judgeInTime(record.auctionTime,new Date())}  onClick={(ev)=>{this.cancelOrder(ev,record)} }
                >{this.judgeBeforeTime(record.auctionTime,new Date())?'退订':'退还保证金'}</Button>
                <Modal
                    visible={this.state.visible}
                    onCancel={this.cancelModal}
                    footer={null}
                >
                    <AuctionCenter
                        carId={record.id}
                        startPrice={record.startPrice}
                        endTime={record.auctionTime}

                    ></AuctionCenter>
                </Modal>
            </div>
        )
    }];

    //自动加载
    componentDidMount() {

        var userId = sessionStorage.getItem("userId");
        var user = sessionStorage.getItem("user");
        user = JSON.parse(user);
        this.setState(
            {
                //  wallet: user.wallet,
                userId: userId,
            })
        this.show(0);

    }
    //获取出价最高的人
    getHigh(carId){
        axios.get('http://localhost:8080/transactionRecord/getHigh', {
            params: {
                carId:carId,
            }
        }).then(r=> {
            if (r.status == 200) {
                 this.setState({
                     userId: r.data.userId,
                 })
            }
        })
    }
//退订操作
    cancelOrder= (e,record)=> {
        e.preventDefault();
        var userId=sessionStorage.getItem('userId')
        this.getHigh(record.id)
        if(this.judgeBeforeTime(record.auctionTime,new Date())){
            this.backDeposit(userId,record)
        }
       else if(this.judgeInTime(record.auctionTime,new Date())){
            message.config({
                top: 130,
                duration: 2,
                maxCount: 3,
            });
            message.info('竞拍中不能进行此操作', 1);
        }

        else {
            axios.get('http://localhost:8080/transactionRecord/getHigh', {
                params: {
                    carId: record.id,
                }
            }).then(r=> {
                if (r.status == 200) {
                    //判断出价最高的人有没有转帐
                    if (r.data.userId == userId) {
                        axios.get('http://localhost:8080/carInfo/getCar', {
                            params: {
                                id: record.id,
                            }
                        }).then(r=> {
                            if (r.status == 200) {
                                 if(r.data.state==1){
                                     message.config({
                                         top: 130,
                                         duration: 2,
                                         maxCount: 3,
                                     });
                                     message.info('竞拍下的二手车支付成功后才能进行此操作!请到成交确认里去支付。', 2);
                                 }
                                else{
                                    this.backDeposit(userId,record)
                                 }
                            }
                            })

                    }
                   else {
                        this.backDeposit(userId,record)
                    }
                }
            })
        }


    }

    //退押金操作
    backDeposit(userId,record){
        //退押金的操作
        axios.get('http://localhost:8080/transactionRecord/delRecord', {
            params: {
                userId:userId,
                state:0,
                carId:record.id,
                wallet:record.deposit,
            }
        }).then(r=> {
            if (r.status == 200) {
                message.config({
                    top: 130,
                    duration: 2,
                    maxCount: 3,
                });
                message.info('操作成功', 1);
                this.show(0);
            }
        })
    }
    render() {



        return (
            <div >


                        <Table rowKey="id" columns={this.columns} dataSource={this.state.result.items}
                               pagination={false}></Table>
                        <Pagination showQuickJumper defaultCurrent={1}
                                    total={this.state.result.totalNumber} current={this.state.result.currentIndex+1}
                                    defaultPageSize={this.state.pageSize}
                                    onChange={(page)=>{this.show(page-1)}
                            }></Pagination>


            </div>


        )
            ;

    }
}
export default Form.create({})(OrderCar);
