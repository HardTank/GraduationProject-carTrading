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
class ResultConfirm extends Component {

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
        if(record.state==3){
           message.config({
               top: 130,
               duration: 2,
               maxCount: 3,
           });
           message.info('已支付', 1);
       }
      else  if(record.price >wallet){
           message.config({
               top: 130,
               duration: 2,
               maxCount: 3,
           });
           message.info('余额不足,请充值', 1);
       }else{
           wallet=wallet-record.price ;
           //更新余额
           sessionStorage.setItem("wallet",wallet);
           var userId = sessionStorage.getItem("userId");
           axios.get('http://localhost:8080/wallet/save', {
                   params: {
                       userId: userId,
                       amount: record.price ,
                       type: 4,
                   }
               }
           ).then(
               r => {

                   if(r.status==200){
                       this.changeWallet(record.id,userId,wallet)
                   }
               }


           )
       }
    }
    //更新用户余额
    changeWallet=(id,userId,wallet)=>{
        axios.get('http://localhost:8080/user/save', {
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                params: {
                    id: userId,
                    wallet: wallet,
                    state:3,
                }
            }
        ).then(
            r => {

                if(r.status==200){
                    axios.get('http://localhost:8080/carInfo/save', {
                            xhrFields: {
                                withCredentials: true
                            },
                            crossDomain: true,
                            params: {
                                id: id,
                                state:3,
                            }
                        }
                    ).then(
                        r =>{

                        if(r.status==200){
                            message.config({
                                top: 130,
                                duration: 2,
                                maxCount: 3,
                            });
                            message.info('支付成功', 1);
                            this.show(0);
                        }
                    })

                }
            }
        );
    }

    //获取竞拍车辆展示的数据
    show = (page)=> {
        var userId = sessionStorage.getItem("userId");
        axios.get('http://localhost:8080/order/getListResult', {
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
               // sessionStorage.setItem("deposit", r.data.totalNumber);
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
        className: 'hidden',
    }, {
        title: '序号',
        width: 80,
        render: (text, record, index) => `${index + 1}`
    }, {
        title: '品牌',
        dataIndex: 'brand',
        key: 'brand',
        width: 100,
    }, {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: '起拍价',
        key: 'startPrice',
        dataIndex: 'startPrice',
        render: (index, record)=>(
            <span>{index == null ? '暂无' : index}万元</span>
        )

    }, {
        title: '成交价',
        key: 'price',
        dataIndex: 'price',
        render: (index, record)=>(
            <span>{index == null ? '暂无' : index}元</span>
        )

    }, {
            title: '状态',
            key: 'state',
            dataIndex: 'state',
            render: (text, record)=>(
                <span>{text == 3 ? '已支付' : '等待支付'}</span>
            )
        }, {
            title: '操作',
            dataIndex: 'action',
            render: (text, record) => (
                <div>

                    <Button type="primary" onClick={() => this.payMoney(record)}>付款</Button>
                    <Button type={'primary'} style={{ marginLeft:10}} onClick={(ev)=>{this.handleOk(ev,record)} }
                    >详情</Button>
                </div>
            )
        }];
    handleOk(e, item) {
        e.preventDefault();
        sessionStorage.setItem("carInfo", JSON.stringify(item))
        window.open("http://localhost:3000/#/info")

    }
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
export default Form.create({})(ResultConfirm);
