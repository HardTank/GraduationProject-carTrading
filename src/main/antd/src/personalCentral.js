import React, { Component } from 'react';
import './css/App.css';
import './css/personal.css';
import {
    message,Tabs,Menu,Layout,Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,
} from 'antd';
import {LocaleProvider} from 'antd';
import axios from 'axios'//这是模块的加载机制，直接写依赖库的名字，会到node_modules下去查找，因此不需要你指明前面的相对路径
import qs from 'qs';
import Title from './title';
import EditPwd from './editPwd';
import BaseInfoForm from'./baseInfoForm';
import EditBaseInfoForm from'./editBaseInfo';
import Wallet from './wallet';
import SellCar from './sellCar';
import AddCar from './sellCar/addCar'
import OrderCar from './order/orderCar'
import ResultConfirm from  './resultConfirm/resultConfirm'
import zhCN from 'antd/lib/locale-provider/zh_CN';
const {   Sider, Content } = Layout;
class PersonalCentral extends Component {
    constructor() {
        super();
        this.state = {
            baseInfo: false,
            editInfo: true,
            confirm: true,
            order: true,
            sellCar: true,
            myWallet: true,
            name: '',
            pwd: '',
            mail: '',
            phone: '',
            cardId: '',
            province: '',
            city: '',
            county: '',
            address: '',
            wallet: '',
            bankCardNum: '',
            openBank: '',
            deposit: 0,
        }
    }

    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

//判断两次密码
    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    }

//切换不同页面
    handleOk = (item)=> {
        this.setState({
            baseInfo: true,
            editInfo: true,
            confirm: true,
            order: true,
            sellCar: true,
            myWallet: true,
        })
        if (item.key == "baseInfo") {
            var user = sessionStorage.getItem("user");
            user = JSON.parse(user);
            //   this.props.form.setFieldsValue(user);
            this.setState(
                {
                    name: user.name,
                    pwd: user.pwd,
                    mail: user.mail,
                    phone: user.phone,
                    cardId: user.cardId,
                    address: user.address,
                    bankCardNum: user.bankCardNum,
                    openBank: user.openBank,
                    province: user.province,
                    city: user.city,
                    county: user.county,
                })
            this.setState({
                    baseInfo: false,
                }
            )
        }
        else if (item.key == "editInfo") {
            this.setState({
                editInfo: false,

            })
            var user = sessionStorage.getItem("user");
            user = JSON.parse(user);
            user.area = user.province + "/" + user.city + "/" + user.county;
            this.form.setFieldsValue(user);
        }
        else if (item.key == "confirm") {
            this.setState({
                confirm: false,
            })
        }
        else if (item.key == "order") {
            this.setState({
                order: false,
            })
        }
        else if (item.key == "sellCar") {
            this.setState({
                sellCar: false,
            })
        }
        else if (item.key == "myWallet") {
            //var deposit = sessionStorage.getItem("deposit");
            var userId = sessionStorage.getItem("userId");
            var wallet = parseFloat(sessionStorage.getItem("wallet"));
            axios.get('http://localhost:8080/order/getDeposit', {
                    params: {
                        userId: userId,
                        pageIndex: 0,
                        pageSize: 9,
                    }


                }
                //axios No 'Access-Control-Allow-Origin' header is present on the requested resource.   安装chrome 插件:Allow-Control-Allow-Origin

            ).then(
                r => {
                    if(r.status=200){
                        console.info("保证金" + r.data)
                        this.setState({
                            myWallet: false,
                            deposit: r.data,
                            wallet: wallet,
                        })
                    }
                }
            )


        }
    }
//自动渲染页面
    componentDidMount() {
        var userId = sessionStorage.getItem("userId");
        if (userId == null || userId == 0) {
            window.location.href = "#/index";
        }
        else {
            axios.get('http://localhost:8080/user/login', {
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    params: {
                        id: userId,
                        pageIndex: 0,
                        pageSize: 1,
                    }
                }
            ).then(
                r => {

                    if (r.status == 200) {
                        //存储用户Id
                        sessionStorage.setItem("userId", r.data.id);
                        var str = JSON.stringify(r.data);
                        sessionStorage.setItem("user", str);
                        //获取用户信息
                        var user = sessionStorage.getItem("user");
                        user = JSON.parse(user);
                        sessionStorage.setItem("userId", r.data.id);
                        //存储钱包信息
                        console.info("钱包余额" + r.data.wallet);
                        sessionStorage.setItem("wallet", r.data.wallet);
                        // this.props.form.setFieldsValue(user);
                        this.setState(
                            {
                                name: user.name,
                                pwd: user.pwd,
                                mail: user.mail,
                                phone: user.phone,
                                cardId: user.cardId,
                                address: user.address,
                                bankCardNum: user.bankCardNum,
                                openBank: user.openBank,
                                province: user.province,
                                city: user.city,
                                county: user.county,
                                wallet: user.wallet,
                            })
                    }
                    ;
                }
            );
        }


    }
//关联form表单数据
    saveFormRef = (form) => {
        this.form = form;
    };

    render() {
        const TabPane = Tabs.TabPane;

        return (
            <Title
                target="personalCentral"
            >

                <Layout style={{marginTop:-20}}>
                    <Sider >


                        <div style={{marginTop: 80,width: 200, overflow: 'auto'}}>
                            <Menu
                                theme="light"
                                mode="inline"
                                defaultSelectedKeys={['baseInfo']}
                                inlineCollapsed={true}
                                onSelect={(item) => {
                                this.handleOk(item);
                            }}>
                                <Menu.ItemGroup key="tradingCenter" title="交易中心">
                                    <Menu.Item key="confirm">
                                        <span>成交确认</span>
                                    </Menu.Item>
                                    <Menu.Item key="order">
                                        <span>订单车辆</span>
                                    </Menu.Item>
                                    <Menu.Item key="sellCar">
                                        <span>我要卖车</span>
                                    </Menu.Item>
                                    <Menu.Item key="myWallet">
                                        <span>我的钱包</span>
                                    </Menu.Item>
                                </Menu.ItemGroup>
                                <Menu.ItemGroup key="userInfo" title="个人信息">
                                    <Menu.Item key="baseInfo">
                                        <span  >基本信息</span>
                                    </Menu.Item>
                                    <Menu.Item key="editInfo">
                                        <span>信息修改</span>
                                    </Menu.Item>

                                </Menu.ItemGroup>

                            </Menu>
                        </div>
                    </Sider>
                    <Content style={{marginLeft: 20, overflow: 'auto', height: '80vh'}}>

                        <div hidden={this.state.confirm}>
                            < ResultConfirm></ ResultConfirm>
                        </div>
                        <div hidden={this.state.order}>
                            <OrderCar></OrderCar>
                        </div>
                        <div hidden={this.state.sellCar}>

                            <AddCar></AddCar>
                        </div>
                        <div hidden={this.state.myWallet}>
                            <Wallet
                                wallet={this.state.wallet}
                                deposit={this.state.deposit}
                            ></Wallet>
                        </div>
                        <div hidden={this.state.baseInfo}>
                            <BaseInfoForm
                                name={this.state.name}
                                cardId={this.state.cardId}
                                gender={this.state.gender}
                                mail={this.state.mail}
                                address={this.state.address}
                                phone={this.state.phone}
                                wallet={this.state.wallet}
                                bankCardNum={this.state.bankCardNum}
                                openBank={this.state.openBank}
                                province={this.state.province}
                                city={this.state.city}
                                county={this.state.county}
                            ></BaseInfoForm>

                        </div>
                        <div hidden={this.state.editInfo}>
                            <Tabs defaultActiveKey="editBaseInfo">
                                <TabPane tab="基本信息修改" key="editBaseInfo">
                                    <EditBaseInfoForm
                                        ref={this.saveFormRef}

                                    ></EditBaseInfoForm>
                                </TabPane>
                                <TabPane tab="密码修改" key="editPwd">
                                    <EditPwd></EditPwd>
                                </TabPane>
                            </Tabs>
                        </div>
                    </Content>
                </Layout>
            </Title>




        );
    }


}
export default Form.create({})(PersonalCentral);
