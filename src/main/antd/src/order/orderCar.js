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
        visible:'',
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
//获取我卖的车的展示数据
    showMyCar = (page)=> {
        var userId = sessionStorage.getItem("userId");
        axios.get('http://localhost:8080/order/getAllList', {
                params: {
                    userId: userId,
                    pageIndex: 0,
                    pageSize: 9,

                }


            }
            //axios No 'Access-Control-Allow-Origin' header is present on the requested resource.   安装chrome 插件:Allow-Control-Allow-Origin

        ).then(
            r => {
                var data = r.data;

                this.setState({
                    myCar: data,
                });
            }
        )
    }
    showModal = ()=> {
        this.setState({
            visible: true,
        })
    }
    cancelModal = ()=> {
        this.setState({
            visible: false,
        })
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
        width: 150,
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
            key: 'auctionTime',
            dataIndex: 'auctionTime',
        render:(text, record, index) =>{
            return(
            <div style={{fontSize:20}}><CountDown
                endTime={record.auctionTime}
            >

            </CountDown></div>)

        }

        }, {
        title: '操作',
        key: 'action',

        render: (text, record)=>(
            <div>
            <Button

                style={{marginTop:20}}
                type={'primary'}
                onClick={this.showModal }
            >
                竞拍
            </Button>
                <Button  type={'primary'}  onClick={(ev)=>{this.handleOk(ev,record)} }
                >详情</Button>
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
    //我卖的车的数据展示列
    carColumns = [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        className: 'hidden',
    }, {
        title: '序号',
        width: 80,
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
        title: '变速器',
        key: 'transmission',
        dataIndex: 'transmission',

    },{
        title: '排放',
        key: 'discharge',
        dataIndex: 'discharge',

    },{
        title: '型号',
        key: 'type',
        dataIndex: 'type',

    },{
        title: '说明',
        key: 'remark',
        dataIndex: 'remark',
        render: (text, record)=>(
            <div dangerouslySetInnerHTML={{ __html: text}}></div>
        )
    }
        ,{
            title: '状态',
            key: 'state',
            dataIndex: 'state',
            render: (text, record)=>(
                <span>{text==0?'待审核':text==1?'待交易':text==2?'竞拍成功':text==3?'支付成功':'未通过审核'}</span>
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
        this.showMyCar(0);
    }

    render() {


        const TabPane = Tabs.TabPane;
        return (
            <div >
                <Tabs defaultActiveKey="editBaseInfo">
                    <TabPane tab="竞拍车辆" key="editBaseInfo">

                        <Table rowKey="id" columns={this.columns} dataSource={this.state.result.items}
                               pagination={false}></Table>
                        <Pagination showQuickJumper defaultCurrent={1}
                                    total={this.state.result.totalNumber} current={this.state.result.currentIndex+1}
                                    defaultPageSize={this.state.pageSize}
                                    onChange={(page)=>{this.show(page-1)}
                            }></Pagination>
                    </TabPane>
                    <TabPane tab="我的汽车" key="editPwd">

                        <Table rowKey="id" columns={this.carColumns} dataSource={this.state.myCar.items}
                               pagination={false}></Table>
                        <Pagination showQuickJumper defaultCurrent={1}
                                    total={this.state.myCar.totalNumber} current={this.state.myCar.currentIndex+1}
                                    defaultPageSize={this.state.pageSize}
                                    onChange={(page)=>{this.showMyCar(page-1)}
                            }></Pagination>
                    </TabPane>
                </Tabs>

            </div>


        )
            ;

    }
}
export default Form.create({})(OrderCar);
