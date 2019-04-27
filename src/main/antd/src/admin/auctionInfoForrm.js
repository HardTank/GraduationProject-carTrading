import React, { Component} from 'react'
import 'antd/lib/button/style';
import axios from 'axios';
import { Form, Icon, Input, Button, Checkbox,Modal,Select,Row,Col,DatePicker} from 'antd';
const { Option } = Select;
class AuctionInfo extends React.Component {
    constructor() {
        super();
        this.state = {
            visible: false,

        }
    }

    resetForm(e){
        e.preventDefault();
        this.props.form.resetFields();
    }
    render() {
        const {onOk,form,id} = this.props;
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
                            <DatePicker  style={{width:'100%'}} renderExtraFooter={() => 'extra footer'} showTime />
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
                    <Button type="primary" htmlType="submit"  >
                        {this.props.id>0?'修改':'确定'}
                    </Button>
                    <Button type="primary" style={{marginLeft:100}} onClick={(ev)=>{this.resetForm(ev)}}  >
                       清空
                    </Button><br/>
                </Form>
                </Col>
                <Col span={8}></Col>
            </Row>
        );
    }
}

export default  Form.create({})(AuctionInfo)
