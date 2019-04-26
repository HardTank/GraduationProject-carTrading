import React, { Component} from 'react'
import 'antd/lib/button/style';
import '../css/App.css';
import axios from 'axios';
import { Form, Icon, Input, Button, Checkbox,Modal,Select,Row,Col} from 'antd';
const { Option } = Select;
class AuctionInfo extends React.Component {
    constructor() {
        super();
        this.state = {
            visible: false,

        }
    }

    render() {
        const { visible, onCancel, onOk,form} = this.props;
        // const { getFieldDecorator } = form;
        const { getFieldDecorator } = form;
        return (
            <Row>
                <Col span={8}></Col>
                <Col span={8}>
                <Form onSubmit={onOk} className="login-form">
                    <Form.Item
                        label="保证金(元)">
                        {getFieldDecorator('deposit', {
                            rules: [{
                                pattern: /^\+?(?!0+(\.00?)?$)\d+(\.\d\d?)?$/, message: '格式错误!',
                            }, {required: true, message: '请输入保证金!'}],

                        })(
                            <Input/>
                        )}
                    </Form.Item>
                    <Form.Item
                        label="竞拍时间">
                        {getFieldDecorator('auctionTime', {
                            rules: [{required: true, message: '请输入竞拍时间!'}],

                        })(
                            <Input   />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="起拍价(万元)">
                        {getFieldDecorator('startPrice', {
                            rules: [{
                                pattern: /^\+?(?!0+(\.00?)?$)\d+(\.\d\d?)?$/, message: '格式错误!',
                            }, {required: true, message: '请输入起拍价!'}],

                        })(
                            <Input />
                        )}
                    </Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        确定
                    </Button><br/>
                </Form>
                </Col>
                <Col span={8}></Col>
            </Row>
        );
    }
}

export default  Form.create({})(AuctionInfo)
