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
import Location from'./Location'
import Address from '../address'
import moment from "moment";
const { Option } = Select;
const { MonthPicker} = DatePicker;
class procedureInfo extends Component {
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
                var id = this.props.carId;
                if (id != null) {
                    var str = JSON.stringify(values);
                    sessionStorage.setItem("procedureInfo",str);
                }
                var str = JSON.stringify(values);
                this.setState({
                        readOnly: true,
                        save:true},
                    ()=>this.props.save())
            }
        });



    }
    setProcedureValue(procedureInfo) {
        console.info("p传过来的时间" + typeof (procedureInfo))
        //this.carInfoForm.setFieldsValue(car);
        procedureInfo.yearlyInspectionValidityDate = moment(procedureInfo.yearlyInspectionValidityDate, 'YYYY-MM-DD');
        procedureInfo.commercialInsuranceValidityDate = moment(procedureInfo.commercialInsuranceValidityDate, 'YYYY-MM-DD');
        procedureInfo.compulsoryInsuranceValidityDate = moment(procedureInfo.compulsoryInsuranceValidityDate, 'YYYY-MM-DD');

        this.props.form.setFieldsValue(procedureInfo);
        //configurationInfo
    }
    componentDidMount() {

        var id = this.props.carId;
        if (id != null) {
            var procedureInfo;
            this.setState({
                save:true,
                readOnly:true,
            })
            axios.get('http://localhost:8080/procedureInfo/getList', {
                    params: {
                        carId: id,
                        pageSize: 10,
                        pageIndex: 0,
                    }
                }
            ).then(
                r => {
                    procedureInfo = r.data.content[0]
                    this.setProcedureValue(procedureInfo);
                }
            );

        }


    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="divcss5">
                <Form layout="horizontal" style={{marginLeft:100}} onSubmit={this.handleSubmit}>
                    <Row gutter={8}>
                        <Col span={8}>
                            <Form.Item
                                label="发票"
                            >
                                {getFieldDecorator('invoice', {
                                    rules: [{
                                        required: true, message: '请输入发票信息!',
                                    }],
                                })(
                                    <Input disabled={this.state.readOnly}/>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="车牌所在地"
                            >
                                {getFieldDecorator('plateLocation', {
                                    rules: [{
                                        required: true, message: '请选择车牌所在地!',
                                    },{
                                        pattern:/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}$/,
                                        message:'格式错误'
                                    }],
                                })(
                                    <Input disabled={this.state.readOnly} placeholder="例 京P" />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="交强险所在地"
                            >
                                {getFieldDecorator('compulsoryInsuranceLocation', {
                                    rules: [{
                                        required: true, message: '请选择!',
                                    }],
                                })(
                                    <Address disabled={this.state.readOnly} />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={8}>
                        <Col span={8}>
                            <Form.Item
                                label="交强险有效期"
                            >
                                {getFieldDecorator('compulsoryInsuranceValidityDate', {
                                    rules: [{
                                        required: true, message: '请选择!',
                                    }],
                                })(
                                    <DatePicker style={{width:'100%'}} disabled={this.state.readOnly}/>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="商业保险到期时间"
                            >
                                {getFieldDecorator('commercialInsuranceValidityDate', {
                                    rules: [{
                                        required: true, message: '请选择!',
                                    }],
                                })(
                                    <DatePicker style={{width:'100%'}} disabled={this.state.readOnly}/>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={8}>
                            <Form.Item
                                label="年检有效期"
                            >
                                {getFieldDecorator('yearlyInspectionValidityDate', {
                                    rules: [{
                                        required: true, message: '请选择!',
                                    }],
                                })(
                                    <DatePicker style={{width:'100%'}} disabled={this.state.readOnly}/>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={8}>
                        <Col span={8}>
                            <Form.Item
                                label="登记证"
                            >
                                {getFieldDecorator('registration', {
                                    rules: [{
                                        required: true, message: '请选择!',
                                    }],
                                    initialValue:'有',
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
                                label="车船税"
                            >
                                {getFieldDecorator('vehicleTax', {
                                    rules: [{
                                        required: true, message: '请选择!',
                                    }],
                                    initialValue:'有',
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
                                label="车身铭牌"
                            >
                                {getFieldDecorator('nameplate', {
                                    rules: [
                                        {
                                            required: true, message: '请选择 !',
                                        }],
                                    initialValue:'有',
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
                                label="备用钥匙"
                            >
                                {getFieldDecorator('spareKey', {
                                    rules: [
                                        {
                                            required: true, message: '请选择 !',
                                        }],
                                    initialValue:'有',
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
                                label="行驶证"
                            >
                                {getFieldDecorator('license', {
                                    rules: [
                                        {
                                            required: true, message: '请选择 !',
                                        }],
                                    initialValue:'有',
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
                                label="购置税证"
                            >
                                {getFieldDecorator('purchaseTaxCertificate', {
                                    rules: [
                                        {
                                            required: true, message: '请选择 !',
                                        }],
                                    initialValue:'有',
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
                                label="违章记录"
                            >
                                {getFieldDecorator('violationRecord', {
                                    rules: [
                                        {
                                            required: true, message: '请选择 !',
                                        }],
                                    initialValue:'有',
                                })(
                                    <Select placeholder="请选择" disabled={this.state.readOnly}>
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
                                <Button icon="save" type="primary"  hidden={this.props.carId!=null} disabled={this.state.save} htmlType="submit">保存</Button>
                            </Col>
                            <Col span={4}>
                                <Button icon="edit" type="primary"  hidden={this.props.carId!=null} disabled={!this.state.save} onClick={this.editForm}>修改</Button>
                            </Col>
                            <Col span={4}>
                                <Button icon="redo" type="primary"  hidden={this.props.carId!=null}   onClick={this.props.emptyForm}>清空</Button>
                            </Col>
                        </Row>
                    </Form.Item>
                </Form>

            </div>
        );
    }
}
export default Form.create({})(procedureInfo);
