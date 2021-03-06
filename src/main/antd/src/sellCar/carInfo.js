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
import Address from'../address'
import moment from "moment";
import City from '../city'
const { Option } = Select;

const { MonthPicker} = DatePicker;
class CarInfo extends Component {

    state = {
        name:'tlx',
        readOnly: false,
        save: false,
    }
    editForm = ()=> {
        this.setState({
            readOnly: false,
            save: false,
        }, ()=>this.props.edit());

    }

    handleSubmit = (e)=> {
        e.preventDefault();
        this.props.form.validateFields((err, values)=> {
            if (!err) {
                var id = this.props.carId;
                if (id != null) {
                    values.registerPlace=values.registerPlace[0]+values.registerPlace[1];
                   alert( values.registerPlace)
                    var str = JSON.stringify(values);
                    sessionStorage.setItem("carInfo", str);
                }
                this.setState({
                        readOnly: true,
                        save: true
                    },
                    ()=>this.props.save())
            }
        });


    }


    componentDidMount() {


        var id = this.props.carId;
        if (id != null) {
            this.setState({
                save: true,
                readOnly: true,
            })
            var carInfo;
            var procedureInfo;
            var configurationInfo;
            axios.get('http://localhost:8080/carInfo/getList', {
                    params: {
                        id: id,
                        pageSize: 10,
                        pageIndex: 0,
                    }
                }
            ).then(
                r => {
                    carInfo = r.data.content[0]
                    this.setCarValue(carInfo)
                }
            );
            //axios.get('http://localhost:8080/procedureInfo/getList', {
            //        params: {
            //            carId: id,
            //            pageSize: 10,
            //            pageIndex: 0,
            //        }
            //    }
            //).then(
            //    r => {
            //        procedureInfo = r.data.content[0]
            //        this.setProcedureValue(procedureInfo);
            //    }
            //);
            //axios.get('http://localhost:8080/configurationInfo/getList', {
            //        params: {
            //            carId: id,
            //            pageSize: 10,
            //            pageIndex: 0,
            //        }
            //    }
            //).then(
            //    r => {
            //        configurationInfo = r.data.content[0]
            //        this.setConfigurationValue(configurationInfo);
            //    }
            //);
        }


    }

    setCarValue(car) {
        console.info("传过来的时间" + car.productDate + typeof (car.productDate))
        if (car.source == '1')
            car.source = '是';
        if (car.source == '0')
            car.source = '否'
        car.productDate = moment(car.productDate, 'YYYY-MM-DD');
        this.props.form.setFieldsValue(car);
        //  this.procedureInfoForm.setFieldsValue(procedureInfo);
        //configurationInfo
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="divcss5">
                <Form layout="horizontal" style={{marginLeft:100}} onSubmit={this.handleSubmit}>
                    <Row gutter={8}>

                        <Col span={8}>
                            <Form.Item
                                label="品牌"
                            >
                                {getFieldDecorator('brand', {
                                    rules: [{
                                        required: true, message: '请输入厂商品牌!',
                                    }]
                                    ,

                                })(
                                    <Input disabled={this.state.readOnly}/>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="名称"
                            >
                                {getFieldDecorator('name', {
                                    rules: [
                                    ],
                                })(
                                    <Input disabled={this.state.readOnly}/>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="汽车类型"
                            >
                                {getFieldDecorator('type', {
                                    rules: [{
                                        required: true, message: '请输入汽车类型!',
                                    }],
                                })(
                                    <Input disabled={this.state.readOnly}/>
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
                                    rules: [{
                                        required: true, message: '请输入颜色!',
                                    }],
                                    initialValue:'黑色',
                                })(
                                    <Input disabled={this.state.readOnly}/>
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
                                    }],
                                    initialValue:'非营运',
                                })(
                                    <Select
                                        placeholder="请选择" disabled={this.state.readOnly}

                                    >
                                        <Option value="营运">营运</Option>
                                        <Option value="非营运">非营运</Option>

                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="注册地"
                            >
                                {getFieldDecorator('registerPlace', {

                                    rules: [,{
                                    required: true, message: '请输入注册地!',
                                }],
                                })(
                                    <City disabled={this.state.readOnly}/>
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
                                    rules: [{
                                        required: true, message: '请输入出厂日期!',
                                    }],
                                })(
                                    <MonthPicker disabled={this.state.readOnly} style={{width:'100%'}}/>
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
                                    }],
                                })(
                                    <Input disabled={this.state.readOnly}/>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="驱动方式"
                            >
                                {getFieldDecorator('drivingMode', {
                                    rules: [
                                        {
                                            required: true, message: '请选择驱动方式!',
                                        }],
                                    initialValue:'两驱',
                                })(

                                    <Select
                                    placeholder="请选择" disabled={this.state.readOnly}

                                    >
                                    <Option value="两驱">两驱</Option>
                                    <Option value="四驱">四驱</Option>

                                    </Select>
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
                                    rules: [{pattern: /^[0-9]*$/, message: '格式错误'},
                                        {
                                            required: true, message: '请输入座位数!',
                                        }],
                                    initialValue:'5',
                                })(
                                    <Input disabled={this.state.readOnly}/>
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
                                        pattern: /^[0-9A-Za-z\-\－\u4e00-\u9fa5]{1,20}$/,
                                        message: "格式错误",
                                    }],
                                })(
                                    <Input disabled={this.state.readOnly}/>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="是否进口"
                            >
                                {getFieldDecorator('source', {
                                    rules: [{
                                        required: true, message: '请选择来源!',
                                    }],
                                    initialValue:'否',
                                })(
                                    <Select
                                        placeholder="请选择" disabled={this.state.readOnly}

                                    >
                                        <Option value="是">是</Option>
                                        <Option value="否">否</Option>

                                    </Select>
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
                                    rules: [{
                                        required: true, message: '请输入表显里程!',
                                    }],
                                })(
                                    <Input disabled={this.state.readOnly}/>
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
                                    }],
                                    initialValue:'AT',
                                })(
                                    <Select
                                        placeholder="请选择" disabled={this.state.readOnly}

                                    >
                                        <Option value="AT">AT</Option>
                                        <Option value="MT">MT</Option>
                                        <Option value="AMT">AMT</Option>
                                        <Option value="CVT">CVT</Option>
                                        <Option value="DCT">DCT</Option>
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="排放标准"
                            >
                                {getFieldDecorator('emissionStandard', {
                                    rules: [{
                                        required: true, message: '请选择排放标准!',
                                    }],
                                    initialValue:'国四',
                                })(
                                    <Select
                                        placeholder="请选择" disabled={this.state.readOnly}

                                    >
                                        <Option value="国六">国六</Option>
                                        <Option value="国五">国五</Option>
                                        <Option value="国四">国四</Option>
                                        <Option value="国三">国三</Option>
                                        <Option value="国一">国一</Option>

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
                                    rules: [{
                                        required: true, message: '请输入能源类型!',
                                    }],
                                    initialValue:'燃油',
                                })(
                                    <Input disabled={this.state.readOnly}/>
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
                                    }],
                                })(
                                    <Input disabled={this.state.readOnly}/>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="过户次数"
                            >
                                {getFieldDecorator('transfer', {
                                    rules: [{pattern: /^[0-9]*$/, message: '格式错误'}, {
                                        required: true, message: '请输入过户次数!',
                                    }],
                                    initialValue:'0',
                                })(
                                    <Input disabled={this.state.readOnly}/>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Form.Item
                        label="VIN码"
                    >
                        {getFieldDecorator('vin', {
                            rules: [{pattern: /^[0-9A-Za-z]{17}$/, message: '格式错误'},
                                {
                                    required: true, message: '请输入vin码!',
                                }],
                        })(
                            <Input disabled={this.state.readOnly}/>
                        )}
                    </Form.Item>

                    <Form.Item  >
                        <Row>
                            <Col span={4}>
                                <Button icon="save" type="primary" hidden={this.props.carId!=null}
                                        disabled={this.state.save} htmlType="submit">保存</Button>
                            </Col>
                            <Col span={4}>
                                <Button icon="edit" type="primary" hidden={this.props.carId!=null}
                                        disabled={!this.state.save} onClick={this.editForm}>修改</Button>
                            </Col>
                            <Col span={4}>
                                <Button icon="redo" type="primary" hidden={this.props.carId!=null}
                                        onClick={this.props.emptyForm}>清空</Button>
                            </Col>
                        </Row>
                    </Form.Item>
                </Form>


            </div>
        );
    }
}
export
default
Form
    .create({})

    (
        CarInfo
    )
;
