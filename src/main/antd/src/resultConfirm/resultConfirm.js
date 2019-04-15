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
        pageSize: 4,
        pay: '',
        myCar:[],

    }



    //获取table展示的数据
    show = (page)=> {
        var userId = sessionStorage.getItem("userId");
        axios.get('http://localhost:8080/order/getList', {
                params: {
                    userId: userId,
                    pageIndex: page,
                    pageSize: this.state.pageSize,
                    state:1,
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
showMyCar=(page)=>{
    var userId = sessionStorage.getItem("userId");
    axios.get('http://localhost:8080/order/getMyList', {
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
            console.info(data)

            this.setState({
                myCar: data,
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
        title: '成交价',
        key: 'price',
        dataIndex: 'price',
        render:(text, record)=>(
            <span>{text}万元</span>
        )
    }
        ,{
            title: '状态',
            key: 'state',
            dataIndex: 'state',

        }, {
        title: '操作',
        dataIndex: 'action',
        render: (text, record) => (
            <div>
                <a className="render_a" onClick={() => this.showModal(record)}>付款</a>
            </div>
        )
    }];
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
        title: '保证金',
        key: 'deposit',
        dataIndex: 'deposit',
        render:(text, record)=>(
            <span>{text}元</span>
        )

    },{
        title: '成交价',
        key: 'price',
        dataIndex: 'price',
        render:(text, record)=>(
            <span>{text}万元</span>
        )
    }
        ,{
            title: '状态',
            key: 'state',
            dataIndex: 'state',

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
                        <Alert
                            message="提示"
                            description="自竞拍成功当日开始,三个工作日内没有付款,保证金将不予退还!"
                            type="warning"
                            showIcon
                        ></Alert>
                        <Table rowKey="id" columns={this.columns} dataSource={this.state.result.items}
                               pagination={false}></Table>
                        <Pagination showQuickJumper defaultCurrent={1}
                                    total={this.state.result.totalNumber} current={this.state.result.currentIndex+1}
                                    defaultPageSize={this.state.pageSize}
                                    onChange={(page)=>{this.show(page-1)}
                            }></Pagination>
                    </TabPane>
                    <TabPane tab="我的汽车" key="editPwd">
                        <Alert
                            message="提示"
                            description="自竞拍成功当日开始,七个工作日您的卖车费用将到账!"
                            type="warning"
                            showIcon
                        ></Alert>
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
export default Form.create({})(ResultConfirm);