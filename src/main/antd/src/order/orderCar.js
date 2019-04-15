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
const { Meta } = Card;
class OrderCar extends Component {

    state = {
        wallet: '1',
        userId: 0,
        result: {},
        pageIndex: 0,
        pageSize: 4,
        pay: ''
    }



    //获取table展示的数据
    show = (page)=> {
        var userId = sessionStorage.getItem("userId");
        axios.get('http://localhost:8080/order/getList', {
                params: {
                    userId: userId,
                    pageIndex: page,
                    pageSize: this.state.pageSize,
                    state:0,
                }


            }
            //axios No 'Access-Control-Allow-Origin' header is present on the requested resource.   安装chrome 插件:Allow-Control-Allow-Origin

        ).then(
            r => {
                var data = r.data;
                console.info(data)
                sessionStorage.setItem("deposit", r.data.totalNumber);
                this.setState({
                    result: data,
                });
                console.info(r);
            }
        )
    }


    //table展示列
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
        title: '保证金',
        key: 'deposit',
        dataIndex: 'deposit',
        render:(text, record)=>(
            <span>{text}元</span>
        )

    },{
        title: '起拍价',
        key: 'startPrice',
        dataIndex: 'startPrice',
        render:(text, record)=>(
            <span>{text}万元</span>
        )
    },{
        title: '开始时间',
        key: 'auctionTime',
        dataIndex: 'auctionTime',

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
