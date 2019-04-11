import React, { Component } from 'react';
import './css/App.css';
import './css/personal.css';
import {
    message,Tabs,Menu,Layout,Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,
} from 'antd';
import {LocaleProvider} from 'antd';
import axios from 'axios'//这是模块的加载机制，直接写依赖库的名字，会到node_modules下去查找，因此不需要你指明前面的相对路径
import qs from 'qs';
import Title from './title'
import zhCN from 'antd/lib/locale-provider/zh_CN';
class EditPwd extends Component {

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
                            name: this.state.name,
                            pwd: values.password,
                            mail: this.state.mail,
                            phone: this.state.phone,
                            cardId: this.state.cardId,
                            address: this.state.address,
                            gender: this.state.gender,
                            bankCardNum:this.state.bankCardNum,
                            openBank:this.state.openBank,
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
                            setTimeout(this.props.form.resetFields(), 1000);
                            this.setState({
                                name: r.data.name,
                                login: true,
                                loginVisible: false,
                                pwd: values.password,
                            });
                        }
                        ;
                    }
                );
            }
        })
    }

    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    }
    compareToOldPassword = (rule, value, callback) => {
        if (value && value !== this.state.pwd) {
            callback('与旧的密码不一致!');
        } else {

            callback();
        }
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
                gender: user.gender,
            })
        ;
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (

            <Form layout="horizontal" style={{marginLeft:100}} onSubmit={this.handleSubmit}>


                <Form.Item style={{width:300 } }
                           label="旧的密码"
                >
                    {getFieldDecorator('oldPwd', {
                        rules: [{
                            required: true, message: '请输入旧的密码!',
                        }, {
                            validator: this.compareToOldPassword,
                        }],
                    })(
                        <Input type="password"/>
                    )}
                </Form.Item>
                <Form.Item style={{width:300 }}
                           label="新的密码"
                >
                    {getFieldDecorator('password', {
                        rules: [{
                            required: true, message: '请输入新的密码!',
                        }, {
                            validator: this.validateToNextPassword,
                        }],
                    })(
                        <Input type="password"/>
                    )}
                </Form.Item>

                <Form.Item style={{width:300 }}
                           label="确认密码"
                >
                    {getFieldDecorator('confirm', {
                        rules: [{
                            required: true, message: '请再次输入新的密码!',
                        }, {
                            validator: this.compareToFirstPassword,
                        }],

                    })(
                        <Input type="password" onBlur={this.handleConfirmBlur}/>
                    )}
                </Form.Item>


                <Form.Item  >
                    <Button type="primary" htmlType="submit">确认修改</Button>
                </Form.Item>
            </Form>





        );
    }


}
export default Form.create({})(EditPwd);
