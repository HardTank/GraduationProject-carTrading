import React, { Component } from 'react';
import './css/App.css';
import './css/title.css';
import Login  from './login';
import { Cascader,Select,Affix,Tag,Row, Col, Layout,Menu,Button,Form, Icon, Input,Checkbox,Modal, message} from 'antd';
import axios from 'axios'//这是模块的加载机制，直接写依赖库的名字，会到node_modules下去查找，因此不需要你指明前面的相对路径
import qs from 'qs';
import TradingHall from './tradingHall';
import App from './App';
import Address from './address'
const { Option } = Select;


class Register extends Component {


    showRegister = (e)=> {
        e.preventDefault();
        this.setState({loginVisible: false, registerVisible: true});
    }


    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {

                this.props.onOk(values);
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


    handleSelectChange = (value) => {
        this.props.form.setFieldsValue({
            note: `Hi, ${value === '男' ? '男' : '女'}!`,
        });
    }

    render() {

        const { visible,onCancel,form} =this.props;

        const { getFieldDecorator } =form;

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
return (
    <div>


        <Modal

            visible={visible}
            onCancel={onCancel}
            footer={null}
            title="注册"
            width='750px'

            destroyOnClose={true}
        >

            <Form layout="horizontal" onSubmit={this.handleSubmit}>

                <Row><Col span={12}>
                    <Form.Item style={{width:300 } }
                               label="姓名"
                    >
                        {getFieldDecorator('name', {
                            rules: [{pattern: /^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/, message: '格式错误'},
                                {
                                    required: true, message: '请输入姓名!',
                                }],
                        })(
                            <Input />
                        )}
                    </Form.Item></Col><Col span={12}>
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
                <Row><Col span={12}>
                    <Form.Item style={{width:300 }}
                               label="密码"
                    >
                        {getFieldDecorator('password', {
                            rules: [{
                                required: true, message: '请输入密码!',
                            }, {
                                validator: this.validateToNextPassword,
                            }],
                        })(
                            <Input type="password"/>
                        )}
                    </Form.Item>
                </Col><Col span={12}>
                    <Form.Item style={{width:300 }}
                               label="确认密码"
                    >
                        {getFieldDecorator('confirm', {
                            rules: [{
                                required: true, message: '请再次输入密码!',
                            }, {
                                validator: this.compareToFirstPassword,
                            }],

                        })(
                            <Input type="password" onBlur={this.handleConfirmBlur}/>
                        )}
                    </Form.Item></Col></Row>
                <Row><Col span={12}>
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
                    </Form.Item></Col><Col span={12}>

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
                <Row><Col span={12}>
                    <Form.Item style={{width:300 }}
                               label="所处区域"
                    >
                        {getFieldDecorator('area', {
                            rules: [{
                                required: true, message: '请输入所处区域!',
                            }],
                        })(
                            < Address />
                        )}
                    </Form.Item></Col><Col span={12}>
                    <Form.Item style={{width:300 }}
                               label="家庭住址"
                    >
                        {getFieldDecorator('address', {
                            rules: [{
                                required: true, message: '请输入所处区域!',
                            }],
                        })(
                            <Input/>
                        )}
                    </Form.Item></Col><Col span={12}>

                </Col> </Row>
                <Row><Col span={12}>
                    <Form.Item style={{width:300 }}
                               label="银行卡号"
                    >
                        {getFieldDecorator('bankCardNum', {
                            rules: [{pattern: /^(\d{16}|\d{19})$/, message: '格式错误'}, {
                                required: true, message: '请输入银行卡号!',
                            },],
                        })(
                            <Input maxLength={19}/>
                        )}
                    </Form.Item></Col><Col span={12}>
                    <Form.Item style={{width:300 }}
                               label="开户行"
                    >
                        {getFieldDecorator('openBank', {
                            rules: [{pattern: /^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/, message: '格式错误'},
                                {
                                    required: true, message: '请输入开户行!',
                                }],
                        })(
                            <Input />
                        )}
                    </Form.Item>
                </Col> </Row>
                <Form.Item style={{width:300 }}
                           label="性别"
                >
                    {getFieldDecorator('gender', {
                        rules: [{required: true, message: '请选择性别!'}],
                    })(
                        <Select
                            placeholder="请选择"

                        >
                            <Option value="男">男</Option>
                            <Option value="女">女</Option>
                        </Select>
                    )}
                </Form.Item>
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">注册</Button>
                </Form.Item>
            </Form>


        </Modal>

    </div>




);
}


}
export default Form.create({})(Register);