import React, { Component } from 'react';
import '../css/App.css';
import '../css/personal.css';
import {
    Alert,Pagination,Card, Modal,Table, message,Tabs,Menu,Layout,Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,
} from 'antd';
import {LocaleProvider} from 'antd';
import axios from 'axios'//这是模块的加载机制，直接写依赖库的名字，会到node_modules下去查找，因此不需要你指明前面的相对路径
import qs from 'qs';
import zhCN from 'antd/lib/locale-provider/zh_CN';
const { Meta } = Card;
class Confirm extends Component {

    state = {
        wallet: '1',
        userId: 0,
        result: {},
        pageIndex: 0,
        pageSize: 10,
        pay: '',
        myCar: [],

    }
//支付竞拍的汽车的交易金额
    payMoney = (record)=> {
        var wallet=parseFloat(sessionStorage.getItem("wallet" ));
        //判断是否已经付款
        if(record.state==5){
            message.config({
                top: 130,
                duration: 2,
                maxCount: 3,
            });
            message.info('转帐成功交易结束', 1);
        }
        else{
            wallet=wallet-record.price*10000;
            //改变汽车的交易状态
            axios.get('http://localhost:8080/carInfo/save', {
                    params: {
                        id:record.id,
                        state:5
                    }
                }
            ).then(
                r => {

                    if(r.status==200){
                        //this.changeWallet(record.id,userId,wallet)
                        axios.get('http://localhost:8080/transactionRecord/save', {
                                params: {
                                    id:record.trId,
                                    state:4
                                }
                            }
                        ).then(
                            r => {

                                if(r.status==200){
                                    //this.changeWallet(record.id,userId,wallet)
                                    this.show(0);
                                    this.changeWallet(record.ownerId,record.price*0.8,5)
                                    this.changeWallet(record.userId,record.deposit,3)
                                    this.changeUserWallet(record.ownerId,record.price*0.8)
                                    this.changeUserWallet(record.userId,record.deposit)

                                    message.config({
                                        top: 130,
                                        duration: 2,
                                        maxCount: 3,
                                    });
                                    message.info('操作成功', 1);
                                }
                            }


                        )

                    }
                }


            )
        }
    }
    //更新用户余额
    changeUserWallet=(userId,wallet)=>{
        axios.get('http://localhost:8080/user/saveMoney', {
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                params: {
                    id: userId,
                    wallet: wallet,
                }
            }
        )
    }

    //更新交易记录
    changeWallet=(userId,wallet,state)=>{
        axios.get('http://localhost:8080/wallet/save', {
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                params: {
                    userId: userId,
                    wallet: wallet,
                    state:state,
                }
            }
        )
    }

    //获取竞拍车辆展示的数据
    show = (page)=> {
        var userId = sessionStorage.getItem("userId");
        axios.get('http://localhost:8080/order/getPaySuccess', {
                params: {
                    userId: userId,
                    pageIndex: page,
                    pageSize: this.state.pageSize,

                }
            }
            //axios No 'Access-Control-Allow-Origin' header is present on the requested resource.   安装chrome 插件:Allow-Control-Allow-Origin

        ).then(
            r => {
                var data = r.data;
                sessionStorage.setItem("deposit", r.data.totalNumber);
                this.setState({
                    result: data,
                });
            }
        )

    }


    //竞拍的汽车的table展示列
    columns = [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id',

    }, {
        title: '序号',
        width: 80,
        render: (text, record, index) => `${index + 1}`
    }, {
        title: '品牌',
        dataIndex: 'brand',
        key: 'brand',
    }, {
        title: '卖家',
        dataIndex: 'ownerId',
        key: 'ownerId',
    }, {
        title: '买家',
        dataIndex: 'userId',
        key: 'userId',
    }, {
        title: '竞拍记录',
        dataIndex: 'trId',
        key: 'trId',
    }, {
        title: '款式',
        dataIndex: 'productDate',
        key: 'productDate',
    }, {
        title: '变速器',
        key: 'transmission',
        dataIndex: 'transmission',

    }, {
        title: '排放',
        key: 'discharge',
        dataIndex: 'discharge',

    }, {
        title: '型号',
        key: 'type',
        dataIndex: 'type',

    }, {
        title: '保证金',
        key: 'deposit',
        dataIndex: 'deposit',
        render: (text, record)=>(
            <span>{text}元</span>
        )

    }, {
        title: '成交价',
        key: 'price',
        dataIndex: 'price',
        render: (text, record)=>(
            <span>{text}万元</span>
        )
    }
        , {
            title: '状态',
            key: 'state',
            dataIndex: 'state',
            render: (text, record)=>(
                <span>{text == 3 ? '已支付' : '转帐成功交易结束'}</span>
            )
        }, {
            title: '操作',
            dataIndex: 'action',
            render: (text, record) => (
                <div>
                    <a className="render_a" onClick={() => this.payMoney(record)}>转帐</a>
                </div>
            )
        }];

    //自动加载信息
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

    render() {
        const TabPane = Tabs.TabPane;
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
export default Form.create({})(Confirm);
