import React, { Component} from 'react'
import 'antd/lib/button/style';
import './css/App.css';
import axios from 'axios';
import { Form, Icon, Input, Button, Checkbox,Modal} from 'antd';
class LoginForm extends  React.Component {
    constructor() {
        super();
        this.state = {
            visible: false,

        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            const user=values;
            if (!err) {
                axios.get('http://localhost:8080/user/show', {

                        params: {
                            name:user.name,
                            pwd:user.pwd,
                            pageIndex: 0,
                            pageSize: 1,
                        }
                    }
                ).then(
                    r => {
                        this.setState({
                            result: r.data
                        });
                        console.log(r.data.numberOfElements);
                    }
                );
            }
        });
    }
    render() {
        const { visible, onCancel, onOk,form} = this.props;
       // const { getFieldDecorator } = form;
        const { getFieldDecorator } = form;
        return (
            <Modal
                onCancel={onCancel}
                footer={null}
                width='350px'
                visible={visible}
                title="登陆"

               >
                <Form onSubmit={onOk} className="login-form">
            <Form.Item>
            {getFieldDecorator('name', {
            rules: [{ required: true, message: '请输入用户名/邮箱/手机号码!' }],
        })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="用户名/邮箱/手机号码" />
        )}
    </Form.Item>
        <Form.Item>
            {getFieldDecorator('pwd', {
                rules: [{ required: true, message: '请输入密码!' }],
            })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
            )}
        </Form.Item>
        <Form.Item>
            {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
            })(
                <Checkbox>记住我</Checkbox>
            )}
            <a className="login-form-forgot" href="">忘记密码</a><br/>
            <Button type="primary" htmlType="submit" className="login-form-button">
            登陆
            </Button><br/>
            Or <a href="">立刻注册!</a>
    </Form.Item>
    </Form>
    </Modal>
        );
    }
}

const Login= Form.create({})(LoginForm);
export default Login
