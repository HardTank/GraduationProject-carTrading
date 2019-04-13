import React, { Component } from 'react';
import '../css/App.css';
import '../css/personal.css';
import {
    message,Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Button, DatePicker
} from 'antd';
import {LocaleProvider} from 'antd';
import axios from 'axios'//这是模块的加载机制，直接写依赖库的名字，会到node_modules下去查找，因此不需要你指明前面的相对路径
import qs from 'qs';
import zhCN from 'antd/lib/locale-provider/zh_CN';

const { Option } = Select;
const { MonthPicker} = DatePicker;
class ConfigurationInfo extends Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="divcss5">
                <Form layout="horizontal" style={{marginLeft:100}} onSubmit={this.handleSubmit}>
                    <Row gutter={8}>
                        <Col span={8}>
                            <Form.Item
                                label="座椅材料"
                            >
                                {getFieldDecorator('seatMaterial', {
                                    rules: [{
                                        required: true, message: '请输入座椅材料!',
                                    }],
                                })(
                                    <Input />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="座椅功能"
                            >
                                {getFieldDecorator('seat', {
                                    rules: [{
                                        required: true, message: '请输入座椅功能!',
                                    }],
                                })(
                                    <Input  />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="轮毂"
                            >
                                {getFieldDecorator('hub', {
                                    rules: [{
                                        required: true, message: '请输入轮毂规格!',
                                    }],
                                })(
                                    <Input />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={8}>
                            <Form.Item
                                label="车窗玻璃调节方式"
                            >
                                {getFieldDecorator('window', {
                                    rules: [{
                                        required: true, message: '车窗玻璃调节方式!',
                                    }],
                                })(
                                    <Select
                                        placeholder="请选择"

                                    >
                                        <Option value="电动">电动</Option>
                                        <Option value="手摇">手摇</Option>
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="车窗后视镜调节方式"
                            >
                                {getFieldDecorator('rearviewMirror', {
                                    rules: [{
                                        required: true, message: '请选择车窗后视镜调节方式!',
                                    }],
                                })(
                                    <Select
                                        placeholder="请选择"

                                    >
                                        <Option value="电动">电动</Option>
                                        <Option value="手摇">手摇</Option>
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="座椅调节方式"
                            >
                                {getFieldDecorator('seatControl', {
                                    rules: [{
                                        required: true, message: '请选择座椅调节方式!',
                                    }],
                                })(
                                    <Select
                                        placeholder="请选择"

                                    >
                                        <Option value="电动">电动</Option>
                                        <Option value="手摇">手摇</Option>
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={8}>
                        <Col span={8}>
                            <Form.Item
                                label="ABS/防抱死制动系统"
                            >
                                {getFieldDecorator('productDate', {
                                    rules: [{
                                        required: true, message: '请选择!',
                                    }],
                                })(
                                    <Select placeholder="请选择">
                                        <Option value="0">无</Option>
                                        <Option value="1">有</Option>
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="定速巡航"
                            >
                                {getFieldDecorator('cruiseControl', {
                                    rules: [{
                                        required: true, message: '请选择!',
                                    }],
                                })(
                                    <Select placeholder="请选择">
                                        <Option value="0">无</Option>
                                        <Option value="1">有</Option>
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="倒车影像"
                            >
                                {getFieldDecorator('reversingImage', {
                                    rules: [
                                        {
                                            required: true, message: '请选择 !',
                                        }],
                                })(
                                    <Select placeholder="请选择">
                                        <Option value="0">无</Option>
                                        <Option value="1">有</Option>
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={8}>
                            <Form.Item
                                label="倒车雷达"
                            >
                                {getFieldDecorator('radar', {
                                    rules: [
                                        {
                                            required: true, message: '请选择 !',
                                        }],
                                })(
                                    <Select placeholder="请选择">
                                        <Option value="0">无</Option>
                                        <Option value="1">有</Option>
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="安全气囊"
                            >
                                {getFieldDecorator('gasbag', {
                                    rules: [
                                        {
                                            required: true, message: '请选择 !',
                                        }],
                                })(
                                    <Select placeholder="请选择">
                                        <Option value="0">无</Option>
                                        <Option value="1">有</Option>
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="导航"
                            >
                                {getFieldDecorator('navigation', {
                                    rules: [
                                        {
                                            required: true, message: '请选择 !',
                                        }],
                                })(
                                    <Select placeholder="请选择">
                                        <Option value="0">无</Option>
                                        <Option value="1">有</Option>
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                    <Col span={8}>
                        <Form.Item
                            label="天窗"
                        >
                            {getFieldDecorator('skylight', {
                                rules: [
                                    {
                                        required: true, message: '请选择 !',
                                    }],
                            })(
                                <Select placeholder="请选择">
                                    <Option value="0">无</Option>
                                    <Option value="1">有</Option>
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                    </Row>
                     
                    <Form.Item  >
                        <Button type="primary" htmlType="submit">保存</Button>
                    </Form.Item>
                </Form>

            </div>
        );
    }
}
export default Form.create({})(ConfigurationInfo);
