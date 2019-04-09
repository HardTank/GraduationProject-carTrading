import React, { Component } from 'react';
import './css/App.css';
import './css/personal.css';
import {
    Menu,Layout,Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,
} from 'antd';
import {LocaleProvider} from 'antd';
import axios from 'axios'//这是模块的加载机制，直接写依赖库的名字，会到node_modules下去查找，因此不需要你指明前面的相对路径
import qs from 'qs';
import Title from './title'
import zhCN from 'antd/lib/locale-provider/zh_CN';
const { Header, Footer, Sider, Content } = Layout;
const FormItem = Form.Item;

class PersonalCentral extends Component {
    state = {
        size: 'large',
        result: '',
        name: '',
        visible: false,
        user: {
            name: '',
            cardId: '',
            phone: '',
            mail: '',
            pwd: '',
        },
    };

    componentDidMount() {
        var userId = sessionStorage.getItem("userId");
        if (userId == null || userId == 0) {
            window.location.href = "#/index";
        }
    }


    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    }

    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次密码不一致!');
        } else {
            callback();
        }
    }

    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    }

    handleWebsiteChange = (value) => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({autoCompleteResult});
    }
    handleOk = (item)=> {
        alert(item.key);
    }

    componentDidMount() {
        var user = sessionStorage.getItem("user");
        user = JSON.parse(user);
        this.setState(
            {
                name: user.name,
                pwd: user.pwd,
                mail: user.mail,
                phone: user.phone,
                cardId: user.cardId,
                address: user.address,
            })
        ;
    }

    render() {
        const { getFieldDecorator } = this.props.form;

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
                                defaultSelectedKeys="index"
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
                                    <Menu.Item key="outbid">
                                        <span>历史竞价</span>
                                    </Menu.Item>
                                    <Menu.Item key="bond">
                                        <span>保证金</span>
                                    </Menu.Item>
                                </Menu.ItemGroup>
                                <Menu.ItemGroup key="userInfo" title="个人信息">
                                    <Menu.Item key="baseInfo">
                                        <span onClick={this.handleOk}>基本信息</span>
                                    </Menu.Item>
                                    <Menu.Item key="editInfo">
                                        <span>信息修改</span>
                                    </Menu.Item>

                                </Menu.ItemGroup>

                            </Menu>
                        </div>
                    </Sider>
                    <Content style={{marginLeft: 20, overflow: 'auto', height: '80vh'}}>
                        <Form layout={'inline'} className="userInfo-form">
                            <Form.Item style={{width:300 }}
                                       label="用户名"
                            >
                                {getFieldDecorator('name', {
                                    rules: [{
                                        required: true,
                                    }],
                                })(
                                    <div>{this.state.name}</div>
                                )}
                            </Form.Item><br/>
                            <Form.Item style={{width:300 }}
                                       label="身份证号"
                            >
                                {getFieldDecorator('cardId', {
                                    rules: [{
                                        required: true,
                                    }],
                                })(
                                    <div>{this.state.cardId}</div>
                                )}
                            </Form.Item><br/>
                            <Form.Item style={{width:300 }}
                                       label="联系电话"
                            >
                                {getFieldDecorator('phone', {
                                    rules: [{
                                        required: true,
                                    }],
                                })(
                                    <div>{this.state.phone}</div>
                                )}
                            </Form.Item><br/>
                            <Form.Item style={{width:300 }}
                                       label="邮箱"
                            >
                                {getFieldDecorator('mail', {
                                    rules: [{
                                        required: true,
                                    }],
                                })(
                                    <div>{this.state.mail}</div>
                                )}
                            </Form.Item><br/>
                            <Form.Item style={{width:300 }}
                                       label="家庭住址"
                            >
                                {getFieldDecorator('address', {
                                    rules: [{
                                        required: true,
                                    }],
                                })(
                                    <div>{this.state.address}</div>
                                )}
                            </Form.Item><br/>
                        </Form>

                    </Content>
                </Layout>

            </Title>




        );
    }


}
export default Form.create({})(PersonalCentral);
