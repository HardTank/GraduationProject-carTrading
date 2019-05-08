import React, { Component } from 'react';
import '../css/App.css';
import '../css/personal.css';
import {
    message,Tabs,Menu,Layout,Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,
} from 'antd';
import {LocaleProvider} from 'antd';
import axios from 'axios'//这是模块的加载机制，直接写依赖库的名字，会到node_modules下去查找，因此不需要你指明前面的相对路径
import qs from 'qs';
import Title from '../title';
import Review from './review';
import Confirm from './confirm'
import AllUser from './allUserManage'
import AllCar from './allCarManage'
import AllNotice from './noticeManage'
import zhCN from 'antd/lib/locale-provider/zh_CN';
const {   Sider, Content } = Layout;
class AdminCentral extends Component {
    constructor() {
        super();
        this.state = {
            review: false,
            confirm: true,
            allCar:true,
            allUser:true,
            allNotice:true,
        }
    }

//切换不同页面
    handleOk = (item)=> {
        this.setState({
            review: true,
            confirm: true,
            allCar:true,
            allUser:true,
            allNotice:true,
        })
        if (item.key == "review") {
            var user = sessionStorage.getItem("user");
            user = JSON.parse(user);
            this.setState({
                review:false,
            })

        }
        else if (item.key == "confirm") {
            this.setState({
                confirm: false,

            })
            var user = sessionStorage.getItem("user");
            user = JSON.parse(user);
            user.area = user.province + "/" + user.city + "/" + user.county;
            //this.form.setFieldsValue(user);
        } else if (item.key == "allCar") {
            this.setState({
                allCar: false,

            })
        }else if (item.key == "allUser") {
            this.setState({
                allUser: false,

            })
        }
        else if (item.key == "allNotice") {
            this.setState({
                allNotice: false,

            })
        }

    }
//自动渲染页面
    componentDidMount() {
        var userId = sessionStorage.getItem("userId");
        var role = sessionStorage.getItem("role");
        if (userId == null || userId == 0) {
            window.location.href = "#/index";
        }
        else if (role != 1) {
            message.config({
                top: 130,
                duration: 2,
                maxCount: 3,
            });
            message.info('您没有访问权限', 1);
            window.location.href = "#/index";
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
                target="adminCentral"
            >

                <Layout style={{marginTop:-20}}>
                    <Sider >


                        <div style={{marginTop: 80,width: 200, overflow: 'auto'}}>
                            <Menu
                                theme="light"
                                mode="inline"
                                defaultSelectedKeys={['review']}
                                inlineCollapsed={true}
                                onSelect={(item) => {
                                this.handleOk(item);
                            }}>
                                <Menu.ItemGroup key="tradingCenter" title="交易中心">
                                    <Menu.Item key="review">
                                        <span>汽车审核</span>
                                    </Menu.Item>
                                    <Menu.Item key="confirm">
                                        <span>成交确认</span>
                                    </Menu.Item>
                                    <Menu.Item key="allCar">
                                        <span>车辆管理</span>
                                    </Menu.Item>
                                    <Menu.Item key="allUser">
                                        <span>用户管理</span>
                                    </Menu.Item>
                                    <Menu.Item key="allNotice">
                                        <span>公告管理</span>
                                    </Menu.Item>
                              </Menu.ItemGroup>

                            </Menu>
                        </div>
                    </Sider>
                    <Content style={{marginLeft: 20, overflow: 'auto', height: '80vh'}}>

                        <div hidden={this.state.review}>
                            <Review></Review>
                        </div>
                        <div hidden={this.state.confirm}>

                            <Confirm></Confirm>
                        </div>
                        <div hidden={this.state.allCar}>
                            <AllCar></AllCar>
                        </div>
                        <div hidden={this.state.allUser}>

                            <AllUser></AllUser>
                        </div>
                        <div hidden={this.state.allNotice}>

                            <AllNotice></AllNotice>
                        </div>
                    </Content>
                </Layout>
            </Title>




        );
    }


}
export default Form.create({})(AdminCentral);
