import React, { Component } from 'react';
import './css/App.css';
import './css/personal.css';
import {
    message,Tabs,Menu,Layout,Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,
} from 'antd';
import {LocaleProvider} from 'antd';
import axios from 'axios'//这是模块的加载机制，直接写依赖库的名字，会到node_modules下去查找，因此不需要你指明前面的相对路径
import qs from 'qs';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import CarInfo from './sellCar/carInfo'
import ConfigurationInfo from './sellCar/configurationInfo'
import ProcedureInfo from './sellCar/procedureInfo'
import moment from "moment";
class SellCar extends Component {
    state = {
        saveCarInfo: false,
        saveConfigurationInfo: false,
        saveProcedureInfo: false,
    }

    componentDidMount() {

        //console.info("传过来的id" + this.props.carId)
        //var id = this.props.carId;
        //if (id != null) {
        //    var carInfo;
        //    var procedureInfo;
        //    var configurationInfo;
        //    axios.get('http://localhost:8080/carInfo/getList', {
        //            params: {
        //                id: id,
        //                pageSize: 10,
        //                pageIndex: 0,
        //            }
        //        }
        //    ).then(
        //        r => {
        //            carInfo = r.data.content[0]
        //            this.setCarValue(carInfo)
        //        }
        //    );
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
        // }


    }

    setCarValue(car) {
        console.info("传过来的时间" + car.productDate + typeof (car.productDate))
        if (car.source == '1')
            car.source = '是';
        if (car.source == '0')
            car.source = '否'
        car.productDate = moment(car.productDate, 'YYYY-MM-DD');
        console.info("传过来后的时间" + car.productDate + typeof ( car.productDate));
        this.carInfoForm.setFieldsValue(car);
        //  this.procedureInfoForm.setFieldsValue(procedureInfo);
        //configurationInfo
    }


    /**二手车基本信息的数据保存修改*/
    saveCarInfo = ()=> {
        this.setState({saveCarInfo: true,})
        this.carInfoForm.validateFields((err, values)=> {
            if (!err) {
                console.info(values)
            }
        })

    }
    editCarInfo = ()=> {
        this.setState({saveCarInfo: false,})
    }

    saveCarInfoFormRef = (form)=> {
        this.carInfoForm = form;
    }
    /**二手车配置信息的数据保存修改*/
    saveConfigurationInfo = ()=> {
        this.setState({saveConfigurationInfo: true,})
    }
    editConfigurationInfo = ()=> {
        this.setState({saveConfigurationInfo: false,})
    }
    saveConfigurationInfoFormRef = (form)=> {
        this.configurationInfoForm = form;
    }
    /**二手车手续信息的数据保存修改*/
    saveProcedureInfo = ()=> {
        this.setState({saveProcedureInfo: true,})
    }
    editProcedureInfo = ()=> {
        this.setState({saveProcedureInfo: false,})
    }
    saveProcedureInfoFormRef = (form)=> {
        this.procedureInfoForm = form;
    }
    /**提交信息*/
    handleSubmit = (e)=> {
        e.preventDefault();
        if (this.state.saveCarInfo && this.state.saveConfigurationInfo && this.state.saveProcedureInfo) {
            this.carInfoForm.validateFields((err, values)=> {
                if (!err) {
                    var str = JSON.stringify(values);
                    console.info(str)
                    sessionStorage.setItem("carInfo", str);
                    var userId = sessionStorage.getItem("userId");
                    axios.get('http://localhost:8080/carInfo/save', {
                            params: {
                                brand: values.brand,
                                color: values.color,
                                discharge: values.discharge,
                                drivingMode: values.drivingMode,
                                emissionStandard: values.emissionStandard,
                                energy: values.energy,
                                engineId: values.engineId,
                                // initialDate: values.initialDate,
                                mileage: values.mileage,
                                nature: values.nature,
                                ownerId: userId,
                                productDates: values.productDate,
                                registerPlace: values.registerPlace,
                                seatNum: values.seatNum,
                                source: values.source,
                                state: 0,
                                type: values.type,
                                transfer: values.transfer,
                                transmission: values.transmission,
                                tyre: values.tyre,
                                vin: values.vin,
                            }
                        }
                    ).then(
                        r => {
                            console.info(r)
                            if (r.status == 200) {
                                //message.config({
                                //    top: 130,
                                //    duration: 2,
                                //    maxCount: 3,
                                //});
                                //message.info('数据保存成功', 1);
                                var carId = r.data.id;
                                this.configurationInfoForm.validateFields((err, values)=> {
                                    if (!err) {
                                        console.info(values)
                                        var str = JSON.stringify(values);
                                        console.info(str)
                                        sessionStorage.setItem("carInfo", str);
                                        var userId = sessionStorage.getItem("userId");
                                        axios.get('http://localhost:8080/configurationInfo/save', {
                                                params: {
                                                    cruiseControl: values.cruiseControl,
                                                    gasbag: values.gasbag,
                                                    hub: values.hub,
                                                    navigation: values.navigation,
                                                    radar: values.radar,
                                                    rearviewMirror: values.rearviewMirror,
                                                    reversingImage: values.reversingImage,
                                                    seat: values.seat,
                                                    seatControl: values.seatControl,
                                                    seatMaterial: values.seatMaterial,
                                                    skylight: values.skylight,
                                                    window: values.window,
                                                    carId: carId,
                                                    abs: values.abs,
                                                }
                                            }
                                        ).then(
                                            r => {
                                                console.info(r)
                                                if (r.status == 200) {

                                                    this.procedureInfoForm.validateFields((err, values)=> {
                                                        if (!err) {
                                                            console.info(values)
                                                            var str = JSON.stringify(values);
                                                            console.info(str)
                                                            sessionStorage.setItem("carInfo", str);
                                                            var userId = sessionStorage.getItem("userId");
                                                            var address = values.compulsoryInsuranceLocation[0] + values.compulsoryInsuranceLocation[1] + values.compulsoryInsuranceLocation[2];
                                                            axios.get('http://localhost:8080/procedureInfo/save', {
                                                                    params: {
                                                                        carId: carId,
                                                                        invoice: values.invoice,
                                                                        license: values.license,
                                                                        nameplate: values.nameplate,
                                                                        plateLocation: values.plateLocation,
                                                                        purchaseTaxCertificate: values.purchaseTaxCertificate,
                                                                        registration: values.registration,
                                                                        spareKey: values.spareKey,
                                                                        vehicleTax: values.vehicleTax,
                                                                        violationRecord: values.violationRecord,
                                                                        commercialDate: values.commercialInsuranceValidityDate,
                                                                        compulsoryInsuranceLocation: address,
                                                                        compulsoryDate: values.compulsoryInsuranceValidityDate,
                                                                        yearlyDate: values.yearlyInspectionValidityDate,
                                                                    }
                                                                }
                                                            ).then(
                                                                r => {
                                                                    console.info(r)
                                                                    if (r.status == 200) {
                                                                        message.config({
                                                                            top: 130,
                                                                            duration: 2,
                                                                            maxCount: 3,
                                                                        });
                                                                        message.info('数据保存成功', 1);

                                                                    }
                                                                });
                                                        }
                                                    })
                                                }
                                            });
                                    }
                                })
                            }
                        });
                }
            })
        } else {
            if (!this.state.saveCarInfo) {
                message.config({
                    top: 130,
                    duration: 2,
                    maxCount: 3,
                });
                message.info('基本信息没有保存!', 1);
            }
            else if (!this.state.saveConfigurationInfo) {
                message.config({
                    top: 130,
                    duration: 2,
                    maxCount: 3,
                });
                message.info('配置信息没有保存!', 1);
            }
            else if (!this.state.saveProcedureInfo) {
                message.config({
                    top: 130,
                    duration: 2,
                    maxCount: 3,
                });
                message.info('手续信息没有保存!', 1);
            }

        }

    }
    changeItem = (key)=> {
        console.info(key)
    }
    handleReset = ()=> {
        this.emptyCarInfoForm();
        this. emptyProcedureInfoForm();
        this. emptyConfigurationInfoForm();

    }
    emptyCarInfoForm = ()=> {
        this.carInfoForm.resetFields();

    }
    emptyProcedureInfoForm = ()=> {
        this.procedureInfoForm.resetFields();
    }
    emptyConfigurationInfoForm = ()=> {
        this.configurationInfoForm.resetFields();
    }
    render() {
        const TabPane = Tabs.TabPane;

        return (
            <div style={{padding:30,backgroundColor:' white',marginTop:-30,marginLeft:-30}}>
                <Button className="buttonMargin" icon="upload" type="primary" style={{marginLeft:40}}
                        onClick={this.handleSubmit}>提交</Button>
                <Button className="buttonMargin" icon="redo" type="primary" style={{marginLeft:40}}
                        onClick={this.handleReset}>清空数据</Button>

                <Tabs type="card" defaultActiveKey="carInfo" onChange={this.changeItem}>
                    <TabPane tab="基本信息" key="carInfo">
                        <h2 style={{marginLeft:40}}>基本信息:</h2>
                        <CarInfo
                            ref={this.saveCarInfoFormRef}
                            onOk={this.handleSubmit}
                            save={this.saveCarInfo}
                            edit={this.editCarInfo}
                            carId={this.props.carId}
                            emptyForm={this.emptyCarInfoForm}
                        ></CarInfo>
                    </TabPane>

                    <TabPane tab="配置信息" key="configurationInfo">


                        <h2 style={{marginLeft:40}}>配置信息:</h2>
                        <ConfigurationInfo
                            ref={this.saveConfigurationInfoFormRef}
                            onOk={this.handleSubmit}
                            save={this.saveConfigurationInfo}
                            edit={this.editConfigurationInfo}
                            carId={this.props.carId}
                            emptyForm={this. emptyConfigurationInfoForm}
                        ></ConfigurationInfo>

                    </TabPane>
                    <TabPane tab="手续信息" key="procedureInfo">
                        <h2 style={{marginLeft:40}}>手续信息:</h2>
                        <ProcedureInfo
                            ref={this.saveProcedureInfoFormRef}
                            onOk={this.handleSubmit}
                            save={this.saveProcedureInfo}
                            edit={this.editProcedureInfo}
                            carId={this.props.carId}
                            emptyForm={this.emptyProcedureInfoForm}
                        ></ProcedureInfo>
                    </TabPane>
                </Tabs>


            </div>


        );
    }


}
export default Form.create({})(SellCar);
