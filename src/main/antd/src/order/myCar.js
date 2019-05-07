import React, { Component } from 'react';
import '../css/App.css';
import '../css/personal.css';
import {
    Popconfirm,Pagination,Card, Modal,Table, message,Tabs,Menu,Layout,Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,
} from 'antd';
import {LocaleProvider} from 'antd';
import axios from 'axios'//这是模块的加载机制，直接写依赖库的名字，会到node_modules下去查找，因此不需要你指明前面的相对路径
import qs from 'qs';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import CountDown from '../tradingHall/countDown'
import AuctionCenter from '../tradingHall/auctionCenter'
const { Meta } = Card;
class MyCar extends Component {

    state = {
        wallet: '1',
        userId: 0,
        result: {},
        pageIndex: 0,
        pageSize: 10,
        pay: '',
        myCar: [],
        visible: '',
    }

    handleOk(e, item) {
        e.preventDefault();
        sessionStorage.setItem("carInfo", JSON.stringify(item))
        window.open("http://localhost:3000/#/info")

    }

//删除数据
    delCar = (e, record)=> {
       axios.get('http://localhost:8080/carInfo/delCar',{
           params:{
               id:record.id,
           }
       }).then(r=>{
           if(r.status==200){
               message.config({
                   top: 130,
                   duration: 2,
                   maxCount: 3,
               });
               message.info('删除成功', 1);
               this.showMyCar(0);
           }
       })
    }
//获取我卖的车的展示数据
    showMyCar = (page)=> {
        var userId = sessionStorage.getItem("userId");
        axios.get('http://localhost:8080/order/getAllList', {
                params: {
                    userId: userId,
                    pageIndex: page,
                    pageSize: 10,

                }


            }
            //axios No 'Access-Control-Allow-Origin' header is present on the requested resource.   安装chrome 插件:Allow-Control-Allow-Origin

        ).then(
            r => {
                console.log(r)
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

    //我卖的车的数据展示列
    carColumns = [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        width: 80,
        className: 'hidden',
    }, {
        title: '序号',
        width: 100,
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
            <span>{index == null ? '暂无' : index+'万元'}</span>
        )

    }, {
        title: '成交价',
        key: 'price',
        dataIndex: 'price',
        render: (index, record)=>(
            <span>{index == null ? '暂无' : index+'元'}</span>
        )

    }, {
        title: '竞拍时间',
        key: 'auctionTime',
        dataIndex: 'auctionTime',
        render: (index, record)=>(
            <span>{index == null ? '暂无' : index}</span>
        )

    }, {
        title: '说明',
        key: 'remark',
        dataIndex: 'remark',
        render: (text, record)=>(
            <div dangerouslySetInnerHTML={{ __html: text}}></div>
        )
    }
        , {
            title: '状态',
            key: 'state',
            dataIndex: 'state',
            render: (text, record)=>(
                <span>{text == 0 ? '待审核' : text == 1 ? '待交易' : text == 2 ? '竞拍成功' : text == 3 ? '支付成功' : text == 5 ? '交易结束' : '未通过审核'}</span>
            )
        }, {
            title: '操作',
            key: 'action',
            render: (text, record)=>(
                <div>

                    <Button type={'primary'} style={{ marginRight:10}} onClick={(ev)=>{this.handleOk(ev,record)} }
                    >详情</Button>
                    <Popconfirm title="确定继续吗?"
                                onConfirm={(ev)=>{this.delCar(ev,record)}}
                                okText="确定" cancelText="取消">
                        <Button type={'primary'} disabled={record.state != 0&& record.state != 4}>删除</Button>
                    </Popconfirm>

                </div>
            )
        },];
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
        this.showMyCar(0);
    }

    render() {


        return (
            <div >


                <Table rowKey="id" columns={this.carColumns} dataSource={this.state.myCar.items}
                       pagination={false}></Table>
                <Pagination showQuickJumper defaultCurrent={1}
                            total={this.state.myCar.totalNumber} current={this.state.myCar.currentIndex+1}
                            defaultPageSize={10}
                            onChange={(page)=>{this.showMyCar(page-1)}
                            }></Pagination>


            </div>


        )
            ;

    }
}
export default Form.create({})(MyCar);
