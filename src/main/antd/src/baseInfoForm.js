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
import zhCN from 'antd/lib/locale-provider/zh_CN';
import watermark from 'water-mark-oc'
class BaseInfoForm extends Component {


    render() {


        const { name } = this.props;
        const { getFieldDecorator} = this.props.form;

        return (
                        <Form    layout={'inline'} className="userInfo-form" >
                            <Form.Item style={{width:300 }}
                                       label="用户名"
                            >
                                {getFieldDecorator('name', {
                                    rules: [{
                                        required: true,
                                    }],
                                })(
                                    <div>{name}</div>
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
                                    <div>{this.props.cardId}</div>
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
                                    <div>{this.props.phone}</div>
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
                                    <div>{this.props.mail}</div>
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
                                    <div>{this.props.province=="北京市"||this.props.province=="天津市"
                                    ||this.props.province=="上海市"||this.props.province=="重庆市"?'':this.props.province}
                                        {this.props.city
                                    +this.props.county+this.props.address}</div>
                                )}
                            </Form.Item><br/>
                                <Form.Item style={{width:300 }}
                                           label="银行卡号"
                                >
                                    {getFieldDecorator('bankCardNum', {
                                        rules: [{
                                            required: true, message: '请输入银行卡号!',
                                        }, {
                                            pattern: /^([1-9]{1})(\d{14}|\d{18})$/,
                                            message: "格式错误",
                                        }],
                                    })(
                                        <div>{this.props.bankCardNum}</div>
                                    )}
                                </Form.Item><br/>
                                <Form.Item style={{width:300 }}
                                           label="开户行"
                                >
                                    {getFieldDecorator('openBank', {
                                        rules: [{
                                            required: true, message: '请输入开户行!',
                                        }],
                                    })(
                                        <div>{this.props.openBank}</div>
                                    )}
                                </Form.Item>

                        </Form>
        );
    }


}
export default Form.create({})(BaseInfoForm);
