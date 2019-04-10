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
import zhCN from 'antd/lib/locale-provider/zh_CN';
const { Option } = Select;
class EditBaseInfo extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                //pwd=values.pwd;
                var userId = sessionStorage.getItem("userId");
                axios.get('http://localhost:8080/user/save', {
                        xhrFields: {
                            withCredentials: true
                        },
                        crossDomain: true,
                        params: {
                            id: userId,
                            name: values.name,
                            pwd: values.password == null ? this.state.pwd : values.password,
                            mail: values.mail,
                            phone: values.phone,
                            cardId: values.cardId,
                            address: values.address,
                            gender: values.gender,
                            bankCardNum:values.bankCardNum,
                            openBank:values.openBank,
                        }
                    }
                ).then(
                    r => {

                        if (r.status == 200) {
                            sessionStorage.setItem("userId", r.data.id);
                            message.config({
                                top: 130,
                                duration: 2,
                                maxCount: 3,
                            });
                            message.info('修改成功', 1);
                            var str = JSON.stringify(r.data);
                            sessionStorage.setItem("user", str);
                            var user=sessionStorage.getItem("user" );
                            user = JSON.parse(user);
                            this.setState({
                                name: r.data.name,
                                login: true,
                                loginVisible: false,

                            });
                        }
                        ;
                    }
                );
            }
        })
    }


    componentDidMount() {
        var user = sessionStorage.getItem("user");
        user = JSON.parse(user);
        this.props.form.setFieldsValue(user);
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

                                <Form layout="horizontal" style={{marginLeft:100}} onSubmit={this.handleSubmit}>

                                    <Row><Col span={8}>
                                        <Form.Item style={{width:300 } }
                                                   label="姓名"
                                        >
                                            {getFieldDecorator('name', {
                                                rules: [{
                                                    required: true, message: '请输入姓名!',
                                                }],
                                            })(
                                                <Input />
                                            )}
                                        </Form.Item></Col><Col span={8}>
                                        <Form.Item style={{width:300 }}
                                                   label="身份证号"
                                        >
                                            {getFieldDecorator('cardId', {
                                                rules: [{
                                                    required: true, message: '请输入身份证号!',
                                                }, {
                                                    pattern: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
                                                    message: "格式错误",
                                                }],
                                            })(
                                                <Input maxLength={18}/>
                                            )}
                                        </Form.Item></Col></Row>

                                    <Row><Col span={8}>
                                        <Form.Item style={{width:300 } }
                                                   label="邮箱"
                                        >
                                            {getFieldDecorator('mail', {
                                                rules: [{
                                                    type: 'email', message: '邮箱格式错误!',
                                                }, {
                                                    required: true, message: '请输入电子邮箱地址!',
                                                }],
                                            })(
                                                <Input />
                                            )}
                                        </Form.Item></Col><Col span={8}>

                                        <Form.Item style={{width:300 }}
                                                   label="联系电话"
                                        >
                                            {getFieldDecorator('phone', {
                                                rules: [{
                                                    pattern: /^1[34578]\d{9}$/,
                                                    message: "格式错误",
                                                }, {required: true, message: ' 请输入联系电话!'}],
                                            })(
                                                <Input style={{ width: '100%' }} maxLength={11}/>
                                            )}
                                        </Form.Item>
                                    </Col></Row>
                                    <Row><Col span={8}>
                                        <Form.Item style={{width:300 }}
                                                   label="家庭住址"
                                        >
                                            {getFieldDecorator('address', {
                                                rules: [{
                                                    required: true, message: '请输入家庭住址!',
                                                }],
                                            })(
                                                <Input />
                                            )}
                                        </Form.Item></Col><Col span={8}>
                                        <Form.Item
                                            label="性别" style={{width:300 } }
                                        >
                                            {getFieldDecorator('gender', {
                                                rules: [{required: true, message: 'Please select your gender!'}],
                                            })(
                                                <Select
                                                    placeholder="请选择"

                                                >
                                                    <Option value="男">男</Option>
                                                    <Option value="女">女</Option>
                                                </Select>
                                            )}
                                        </Form.Item>
                                    </Col> </Row>
                                    <Row><Col span={8}>
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
                                                <Input maxLength={18}/>
                                            )}
                                        </Form.Item></Col><Col span={8}>
                                        <Form.Item style={{width:300 }}
                                                   label="开户行"
                                        >
                                            {getFieldDecorator('openBank', {
                                                rules: [{
                                                    required: true, message: '请输入开户行!',
                                                }],
                                            })(
                                                <Input />
                                            )}
                                        </Form.Item>
                                    </Col> </Row>
                                    <Form.Item  >
                                        <Button type="primary" htmlType="submit">确认修改</Button>
                                    </Form.Item>
                                </Form>




        );
    }


}
export default Form.create({})(EditBaseInfo);
