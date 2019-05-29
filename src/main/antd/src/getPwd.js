import React, { Component } from 'react';
import './css/App.css';
import './css/title.css';
import Login  from './login';
import {Spin, Cascader,Select,Affix,Tag,Row, Col, Layout,Menu,Button,Form, Icon, Input,Checkbox,Modal, message} from 'antd';
import axios from 'axios'//这是模块的加载机制，直接写依赖库的名字，会到node_modules下去查找，因此不需要你指明前面的相对路径
import qs from 'qs';
import TradingHall from './tradingHall';
import App from './App';
import Address from './address'
const { Option } = Select;


class GetPwd extends Component {


    handleOk = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {

                this.props.onOk(values);
            }

        });
    }


    render() {

        const { visible,onCancel,form,spinning} =this.props;

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
                    title="密码找回"
                    width='350px'
                    destroyOnClose={true}
                >
                    <Spin
                        spinning={spinning}
                    >

                        <Form onSubmit={this.handleOk} className="login-form">
                            <Form.Item hidden >
                                {getFieldDecorator('name', {
                                    rules: [{required: true, message: '请输入用户名!'}],
                                })(
                                    <Input  prefix={<Icon   type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                           placeholder="用户名"/>
                                )}
                            </Form.Item>
                            <Form.Item style={{width:300 } }

                            >
                                {getFieldDecorator('mail', {
                                    rules: [{
                                        type: 'email', message: '邮箱格式错误!',
                                    }, {
                                        required: true, message: '请输入电子邮箱地址!',
                                    }],
                                })(
                                    <Input placeholder="注册时使用邮箱"/>
                                )}
                            </Form.Item>
                            <Form.Item>

                                <Button type="primary" htmlType="submit" className="login-form-button">
                                    确定
                                </Button><br/>

                            </Form.Item>
                        </Form>
                    </Spin>

                </Modal>

            </div>




        );
    }


}
export default Form.create({})(GetPwd);