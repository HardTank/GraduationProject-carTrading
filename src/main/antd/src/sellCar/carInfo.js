import React, { Component } from 'react';
import '../css/App.css';
import '../css/personal.css';
import {
    message,Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Button,
} from 'antd';
import {LocaleProvider} from 'antd';
import axios from 'axios'//这是模块的加载机制，直接写依赖库的名字，会到node_modules下去查找，因此不需要你指明前面的相对路径
import qs from 'qs';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import Address from'../address'
const { Option } = Select;
class CarInfo extends Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        return (

            <div className="divcss5">
                <Form layout="horizontal" style={{marginLeft:100}} onSubmit={this.handleSubmit}>
                    <Row gutter={8}>
                        <Col span={8}>
                            <Form.Item
                                label="VIN码"
                            >
                                {getFieldDecorator('vin', {
                                    rules: [{pattern: /^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/, message: '格式错误'},
                                        {
                                            required: true, message: '请输入vin码!',
                                        }],
                                })(
                                    <Input />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="品牌"
                            >
                                {getFieldDecorator('brand', {
                                    rules: [{
                                        required: true, message: '请输入厂商品牌!',
                                    }, {
                                        pattern: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
                                        message: "格式错误",
                                    }],
                                })(
                                    <Input maxLength={18}/>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="汽车类型"
                            >
                                {getFieldDecorator('productDate', {
                                    rules: [{pattern: /^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/, message: '格式错误'},
                                        {
                                            required: true, message: '请输入汽车类型!',
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
                                label="颜色"
                            >
                                {getFieldDecorator('color', {
                                    rules: [{pattern: /^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/, message: '格式错误'},
                                        {
                                            required: true, message: '请输入颜色!',
                                        }],
                                })(
                                    <Input />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="使用性质"
                            >
                                {getFieldDecorator('nature', {
                                    rules: [{
                                        required: true, message: '请输入使用性质!',
                                    }, {
                                        pattern: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
                                        message: "格式错误",
                                    }],
                                })(
                                    <Input maxLength={18}/>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="注册地"
                            >
                                {getFieldDecorator('productDate', {
                                    rules: [{pattern: /^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/, message: '格式错误'},
                                        {
                                            required: true, message: '请输入姓名!',
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
                                label="出厂日期"
                            >
                                {getFieldDecorator('productDate', {
                                    rules: [{pattern: /^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/, message: '格式错误'},
                                        {
                                            required: true, message: '请输入出厂日期!',
                                        }],
                                })(
                                    <Input />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="排量"
                            >
                                {getFieldDecorator('discharge', {
                                    rules: [{
                                        required: true, message: '请输入排量!',
                                    }, {
                                        pattern: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
                                        message: "格式错误",
                                    }],
                                })(
                                    <Input maxLength={18}/>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="驱动方式"
                            >
                                {getFieldDecorator('drivingMode', {
                                    rules: [{pattern: /^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/, message: '格式错误'},
                                        {
                                            required: true, message: '请选择驱动方式!',
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
                                label="座位数"
                            >
                                {getFieldDecorator('seatNum', {
                                    rules: [{pattern: /^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/, message: '格式错误'},
                                        {
                                            required: true, message: '请输入座位数!',
                                        }],
                                })(
                                    <Input />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="发动机号"
                            >
                                {getFieldDecorator('engineId', {
                                    rules: [{
                                        required: true, message: '请输入发动机号!',
                                    }, {
                                        pattern: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
                                        message: "格式错误",
                                    }],
                                })(
                                    <Input />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="是否进口"
                            >
                                {getFieldDecorator('source', {
                                    rules: [{pattern: /^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/, message: '格式错误'},
                                        {
                                            required: true, message: '请选择来源!',
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
                                label="表显里程"
                            >
                                {getFieldDecorator('mileage', {
                                    rules: [{pattern: /^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/, message: '格式错误'},
                                        {
                                            required: true, message: '请输入表显里程!',
                                        }],
                                })(
                                    <Input />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="变速器"
                            >
                                {getFieldDecorator('transmission', {
                                    rules: [{
                                        required: true, message: '请选择变速器类型!',
                                    }, {
                                        pattern: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
                                        message: "格式错误",
                                    }],
                                })(
                                    <Select
                                        placeholder="请选择"

                                    >
                                        <Option value="AT">自动变速器</Option>
                                        <Option value="MT">手动变速器</Option>
                                        <Option value="AMT">手动/自动变速器</Option>
                                        <Option value="CVT">无级变速器</Option>
                                        <Option value="DCT">双离合自动变速器</Option>
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="排放标准"
                            >
                                {getFieldDecorator('emissionStandard', {
                                    rules: [{pattern: /^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/, message: '格式错误'},
                                        {
                                            required: true, message: '请选择排放标准!',
                                        }],
                                })(
                                    <Select
                                        placeholder="请选择"

                                    >
                                        <Option value="国六">国六</Option>
                                        <Option value="国五">国五</Option>
                                        <Option value="国四">国四</Option>
                                        <Option value="国三">国三</Option>
                                        <Option value="国二及以下">国二及以下</Option>
                                        <Option value="新能源">新能源</Option>
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={8}>
                            <Form.Item
                                label="能源类型"
                            >
                                {getFieldDecorator('energy', {
                                    rules: [{pattern: /^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/, message: '格式错误'},
                                        {
                                            required: true, message: '请输入能源类型!',
                                        }],
                                })(
                                    <Input />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="轮胎规格"
                            >
                                {getFieldDecorator('tyre', {
                                    rules: [{
                                        required: true, message: '请输入轮胎规格!',
                                    }, {
                                        pattern: /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
                                        message: "格式错误",
                                    }],
                                })(
                                    <Input />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="过户次数"
                            >
                                {getFieldDecorator('transfer', {
                                    rules: [{pattern: /^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/, message: '格式错误'},
                                        {
                                            required: true, message: '请输入过户次数!',
                                        }],
                                })(
                                    <Input />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item  >
                        <Button type="primary" htmlType="submit">确认修改</Button>
                    </Form.Item>
                </Form>

            </div>



        );
    }


}
export default Form.create({})(CarInfo);
