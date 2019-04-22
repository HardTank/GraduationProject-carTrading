import React, { Component} from 'react'
import 'antd/lib/button/style';
import '../css/App.css';
import axios from 'axios';
import { Form, Icon, Input, Button, Checkbox,Modal,Select} from 'antd';
const { Option } = Select;
class ExamineForm extends  React.Component {
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
            <Modal
                onCancel={onCancel}
                footer={null}
                width='350px'
                visible={visible}
                title="车辆检查"
                destroyOnClose={true}
            >
                <Form onSubmit={onOk} className="login-form">
                    <Form.Item
                        label="装置名">
                        {getFieldDecorator('device', {
                            rules: [{ required: true, message: '请输入装置名!' }],
                        })(
                            <Input   />
                        )}
                    </Form.Item>
                    <Form.Item
                    label="异常情况">
                        {getFieldDecorator('abnormal', {
                            rules: [{ required: true, message: '请输入异常情况!' }],
                        })(
                            <Input   />
                        )}
                    </Form.Item>
                    <Form.Item
                        label="检查所属类别">
                        {getFieldDecorator('category', {
                            rules: [{ required: true, message: '请输入检查所属类别!' }],
                        })(
                            <Select
                                placeholder="请选择"

                            >
                                <Option value="0">动力检查</Option>
                                <Option value="1">车内功能检查</Option>
                                <Option value="2">外观检查</Option>
                                <Option value="3">车内环境检查</Option>
                                <Option value="4">泡水检查</Option>
                                <Option value="5">过火检查</Option>
                            </Select>
                        )}
                    </Form.Item>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        添加
                    </Button><br/>
                </Form>
            </Modal>
        );
    }
}

export default  Form.create({})(ExamineForm)
