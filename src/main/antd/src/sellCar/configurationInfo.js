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
import moment from "moment";
const { Option } = Select;
const { MonthPicker} = DatePicker;
class ConfigurationInfo extends Component {
    state = {

        readOnly: false,
        save:false,
    }
    editForm=()=>{
        this.setState({
            readOnly: false,
            save:false,
        },()=>this.props.edit());

    }

    handleSubmit = (e)=> {
        e.preventDefault();
        this.props.form.validateFields((err,values)=>{
            if(!err){
                console.info(values);
                this.setState({
                        readOnly: true,
                        save:true},
                    ()=>this.props.save())
            }
        });



    }
    componentDidMount() {

        console.info("configurationInfo传过来的id" + this.props.carId)
        var id = this.props.carId;
        if (id != null) {
            var carInfo;
            var procedureInfo;
            var configurationInfo;

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
            axios.get('http://localhost:8080/configurationInfo/getList', {
                    params: {
                        carId: id,
                        pageSize: 10,
                        pageIndex: 0,
                    }
                }
            ).then(
                r => {
                    configurationInfo = r.data.content[0]
                    this.setConfigurationValue(configurationInfo);
                }
            );
        }


    }
    setConfigurationValue(configurationInfo) {
        console.info("传过来的configurationInfo" + configurationInfo)
        this.props.form.setFieldsValue(configurationInfo);
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
                                label="座椅材料"
                            >
                                {getFieldDecorator('seatMaterial', {
                                    rules: [{
                                        required: true, message: '请输入座椅材料!',
                                    }],
                                })(
                                    <Input disabled={this.state.readOnly}/>
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
                                    <Input  disabled={this.state.readOnly}/>
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
                                    <Input disabled={this.state.readOnly}/>
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
                                    <Select disabled={this.state.readOnly}
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
                                    <Select disabled={this.state.readOnly}
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
                                    <Select disabled={this.state.readOnly}
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
                                {getFieldDecorator('abs', {
                                    rules: [{
                                        required: true, message: '请选择!',
                                    }],
                                })(
                                    <Select placeholder="请选择"  disabled={this.state.readOnly}>
                                        <Option value="无">无</Option>
                                        <Option value="有">有</Option>
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
                                    <Select placeholder="请选择"  disabled={this.state.readOnly}>
                                        <Option value="无">无</Option>
                                        <Option value="有">有</Option>
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
                                    <Select placeholder="请选择"  disabled={this.state.readOnly}>
                                        <Option value="无">无</Option>
                                        <Option value="有">有</Option>
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
                                    <Select placeholder="请选择"  disabled={this.state.readOnly}>
                                        <Option value="无">无</Option>
                                        <Option value="有">有</Option>
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
                                    <Select placeholder="请选择" disabled={this.state.readOnly}>
                                        <Option value="无">无</Option>
                                        <Option value="有">有</Option>
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
                                    <Select placeholder="请选择" disabled={this.state.readOnly}>
                                        <Option value="无">无</Option>
                                        <Option value="有">有</Option>
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
                                <Select placeholder="请选择"  disabled={this.state.readOnly}>
                                    <Option value="无">无</Option>
                                    <Option value="有">有</Option>
                                </Select>
                            )}
                        </Form.Item>
                    </Col>
                    </Row>

                    <Form.Item  >
                        <Row>
                            <Col span={4}>
                                <Button icon="save" type="primary" disabled={this.state.save} htmlType="submit">保存</Button>
                            </Col>
                            <Col span={4}>
                                <Button icon="edit" type="primary" disabled={!this.state.save} onClick={this.editForm}>修改</Button>
                            </Col>
                            <Col span={4}>
                                <Button icon="redo" type="primary"   onClick={this.props.emptyForm}>清空</Button>
                            </Col>
                        </Row>
                    </Form.Item>
                </Form>

            </div>
        );
    }
}
export default Form.create({})(ConfigurationInfo);
