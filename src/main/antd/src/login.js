import React, { Component} from 'react'
import request from 'utils/request'
import 'antd/lib/button/style';
import './index.css'
import { Form, Icon, Input, Button, Checkbox } from 'antd';
class Login extends Component {
    componentDidMount () {
        request({
            method: 'get',
            url: 'http://47.88.159.228:8080/item/2'
        }).then(data => {
            console.log(data)
        }).catch(err => {
            console.error(err)
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        console.log(2)
        this.setState({loading: true})
        console.log(3)
        this.props.form.validateFieldsAndScroll((err, values) => {

            if (err) {} else {

             //   message.loading('提交成功，正在验证')
                const body = {
                    ...values
                }

                fetch('api', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(body)
                }).then((res) => {
                    return res.json()

                }).then((json) => {
                    if (json.code === 0) {
                     //   message.success('success')

                    } else {
                      //  message.error('failed')
                    }
                }).catch((e) => {
                    console.log(e.message)
                })
            }
        })
    }


    render () {
        const {FormItem}=Form.Item;
        return (
            <div>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem>
                        {getFieldDecorator('userName', {
                            rules: [{ required: true, message: 'Please input your username!' }],
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: 'Please input your Password!' }],
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(
                            <Checkbox>Remember me</Checkbox>
                        )}
                        <a className="login-form-forgot" href="">Forgot password</a>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Log in
                        </Button>
                        Or <a href="">register now!</a>
                    </FormItem>
                </Form>

            </div>
        )
    }
}

export default Login
