import React, { Component } from 'react';
import './css/App.css';
import './css/personalCentral.css';
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

    render() {
        const { getFieldDecorator } = this.props.form;
        const { Option } = Select;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        );


        return (
            <Title
                target="personalCentral"
            >

                <Layout style={{marginTop:-20}}>
                    <Sider >


                        <div style={{marginTop: 180,width: 200, overflow: 'auto'}}>
                            <Menu
                                theme="light"
                                mode="inline"
                                defaultSelectedKeys="index"
                                inlineCollapsed={true}
                                onSelect={(item) => {
                                window.location.href = item.key + ".html";
                            }}>
                                <Menu.Item key="index">
                                    <span>个人信息</span>
                                </Menu.Item>
                                <Menu.SubMenu key="1" title="交易信息">
                                    <Menu.Item key="2">
                                        <span>交易信息</span>
                                    </Menu.Item>
                                    <Menu.Item key="3">
                                        <span>交易信息</span>
                                    </Menu.Item>
                                </Menu.SubMenu>

                            </Menu>
                        </div>
                    </Sider>
                    <Content style={{marginLeft: 20, overflow: 'auto', height: '99vh'}}>


                        <Form style={{width:700,marginLeft:200 }}   onSubmit={this.handleSubmit}>
                            <Row>
                                <Col span="12">
                                    <Form.Item style={{width:300 }}
                                               label="E-mail"
                                    >
                                        {getFieldDecorator('email', {
                                            rules: [{
                                                type: 'email', message: 'The input is not valid E-mail!',
                                            }, {
                                                required: true, message: 'Please input your E-mail!',
                                            }],
                                        })(
                                            <Input />
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span="12">
                                    <Form.Item style={{width:300 }}
                                               label="Password"
                                    >
                                        {getFieldDecorator('password', {
                                            rules: [{
                                                required: true, message: 'Please input your password!',
                                            }, {
                                                validator: this.validateToNextPassword,
                                            }],
                                        })(
                                            <Input type="password"/>
                                        )}
                                    </Form.Item></Col>
                            </Row>



                            <Row>
                                <Col span="12">
                                    <Form.Item style={{width:300 }}
                                               label="Confirm Password"
                                    >
                                        {getFieldDecorator('confirm', {
                                            rules: [{
                                                required: true, message: 'Please confirm your password!',
                                            }, {
                                                validator: this.compareToFirstPassword,
                                            }],

                                        })(
                                            <Input type="password" onBlur={this.handleConfirmBlur}/>
                                        )}
                                    </Form.Item>
                                </Col>
                                <Col span="12">
                                    <Form.Item style={{width:300 }}
                                               label="Phone Number"
                                    >
                                        {getFieldDecorator('phone', {
                                            rules: [{required: true, message: 'Please input your phone number!'}],
                                        })(
                                            <Input addonBefore={prefixSelector} style={{ width: '100%' }}/>
                                        )}
                                    </Form.Item></Col>
                            </Row>


                            <Form.Item {...tailFormItemLayout}>
                                {getFieldDecorator('agreement', {
                                    valuePropName: 'checked',
                                })(
                                    <Checkbox>I have read the <a href="">agreement</a></Checkbox>
                                )}
                            </Form.Item>
                            <Form.Item {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit">Register</Button>
                            </Form.Item>
                        </Form>

                    </Content>
                </Layout>

            </Title>




        );
    }


}
export default Form.create({})(PersonalCentral);
