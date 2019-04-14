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
class SellCar extends Component {
    state = {
        saveCarInfo: false,
        saveConfigurationInfo: false,
        saveProcedureInfo: false,
    }
    /**二手车基本信息的数据保存修改*/
    saveCarInfo = ()=> {
        this.setState({saveCarInfo: true,})
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
        if (this.state.saveCarInfo&&this.state.saveConfigurationInfo&&this.state.saveProcedureInfo) {
            this.carInfoForm.validateFields((err, values)=> {
                if (!err) {
                    var str = JSON.stringify(values);
                    console.info(str)
                    sessionStorage.setItem("carInfo", str);
                    var userId=sessionStorage.getItem("userId");
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
                                ownerId:userId,
                                productDates:values.productDate,
                                registerPlace:values.registerPlace,
                                seatNum:values.seatNum,
                                source: values.source,
                                state:0,
                                type: values.type,
                                transfer: values.transfer,
                                transmission:values.transmission,
                                tyre: values.tyre,
                                vin:values.vin,
                            }
                        }
                    ).then(
                        r => {
                            console.info(r)
                            if (r.status==200) {
                                //message.config({
                                //    top: 130,
                                //    duration: 2,
                                //    maxCount: 3,
                                //});
                                //message.info('数据保存成功', 1);
                                var carId= r.data.id;
                                this.configurationInfoForm.validateFields((err, values)=> {
                                            if (!err) {
                                                console.info(values)
                                                var str = JSON.stringify(values);
                                                console.info(str)
                                                sessionStorage.setItem("carInfo", str);
                                                var userId=sessionStorage.getItem("userId");
                                                axios.get('http://localhost:8080/configurationInfo/save', {
                                                        params: {
                                                            cruiseControl: values. cruiseControl,
                                                            gasbag: values.gasbag,
                                                            hub:values.hub,
                                                            navigation: values.navigation,
                                                            radar: values.radar,
                                                            rearviewMirror: values.rearviewMirror,
                                                            reversingImage: values.reversingImage,
                                                            seat:values.seat,
                                                            seatControl: values.seatControl,
                                                            seatMaterial: values.seatMaterial,
                                                            skylight: values.skylight,
                                                            window: values.window,
                                                            carId:carId,
                                                            abs:values.abs,
                                                        }
                                                    }
                                                ).then(
                                                    r => {
                                                        console.info(r)
                                                        if (r.status==200) {

                                                            this.procedureInfoForm.validateFields((err, values)=> {
                                                                        if (!err) {
                                                                            console.info(values)
                                                                            var str = JSON.stringify(values);
                                                                            console.info(str)
                                                                            sessionStorage.setItem("carInfo", str);
                                                                            var userId = sessionStorage.getItem("userId");
                                                                            var address=values.compulsoryInsuranceLocation[0]+values.compulsoryInsuranceLocation[1]+values.compulsoryInsuranceLocation[2];
                                                                            axios.get('http://localhost:8080/procedureInfo/save', {
                                                                                    params: {
                                                                                        carId:carId,
                                                                                        invoice: values.invoice,
                                                                                        license: values.license,
                                                                                        nameplate: values.nameplate,
                                                                                        plateLocation: values.plateLocation,
                                                                                        purchaseTaxCertificate: values.purchaseTaxCertificate,
                                                                                        registration: values.registration,
                                                                                        spareKey: values.spareKey,
                                                                                        vehicleTax: values.vehicleTax,
                                                                                        violationRecord: values.violationRecord,
                                                                                        commercialDate:values.commercialInsuranceValidityDate,
                                                                                        compulsoryInsuranceLocation:address,
                                                                                        compulsoryDate:values.compulsoryInsuranceValidityDate,
                                                                                        yearlyDate:values.yearlyInspectionValidityDate,
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
            if(!this.state.saveCarInfo){
            message.config({
                top: 130,
                duration: 2,
                maxCount: 3,
            });
            message.info('基本信息没有保存!', 1);}
           else if(!this.state.saveConfigurationInfo){
                message.config({
                    top: 130,
                    duration: 2,
                    maxCount: 3,
                });
                message.info('配置信息没有保存!', 1);}
           else if(!this.state.saveProcedureInfo){
                message.config({
                    top: 130,
                    duration: 2,
                    maxCount: 3,
                });
                message.info('手续信息没有保存!', 1);}

        }
        //if (this.state.saveConfigurationInfo) {
        //    this.configurationInfoForm.validateFields((err, values)=> {
        //        if (!err) {
        //            console.info(values)
        //            var str = JSON.stringify(values);
        //            console.info(str)
        //            sessionStorage.setItem("carInfo", str);
        //            var userId=sessionStorage.getItem("userId");
        //            axios.get('http://localhost:8080/configurationInfo/save', {
        //                    params: {
        //                        cruiseControl: values. cruiseControl,
        //                        gasbag: values.gasbag,
        //                        hub:values.hub,
        //                        navigation: values.navigation,
        //                        radar: values.radar,
        //                        rearviewMirror: values.rearviewMirror,
        //                        reversingImage: values.reversingImage,
        //                        seat:values.seat,
        //                        seatControl: values.seatControl,
        //                        seatMaterial: values.seatMaterial,
        //                        skylight: values.skylight,
        //                        window: values.window,
        //                        carId:19,
        //                        abs:values.abs,
        //                    }
        //                }
        //            ).then(
        //                r => {
        //                    console.info(r)
        //                    if (r.data.status==200) {
        //                        message.config({
        //                            top: 130,
        //                            duration: 2,
        //                            maxCount: 3,
        //                        });
        //                        message.info('数据保存成功', 1);
        //
        //                    }
        //                });
        //        }
        //    })
        //} else {
        //    message.config({
        //        top: 130,
        //        duration: 2,
        //        maxCount: 3,
        //    });
        //    message.info('信息没有保存!', 1);
        //}
        //if (this.state.saveProcedureInfo) {
        //    this.procedureInfoForm.validateFields((err, values)=> {
        //        if (!err) {
        //            console.info(values)
        //            var str = JSON.stringify(values);
        //            console.info(str)
        //            sessionStorage.setItem("carInfo", str);
        //            var userId = sessionStorage.getItem("userId");
        //            var address=values.compulsoryInsuranceLocation[0]+values.compulsoryInsuranceLocation[1]+values.compulsoryInsuranceLocation[2];
        //            axios.get('http://localhost:8080/procedureInfo/save', {
        //                    params: {
        //                        carId:19,
        //                        invoice: values.invoice,
        //                        license: values.license,
        //                        nameplate: values.nameplate,
        //                        plateLocation: values.plateLocation,
        //                        purchaseTaxCertificate: values.purchaseTaxCertificate,
        //                        registration: values.registration,
        //                        spareKey: values.spareKey,
        //                        vehicleTax: values.vehicleTax,
        //                        violationRecord: values.violationRecord,
        //                        commercialDate:values.commercialInsuranceValidityDate,
        //                        compulsoryInsuranceLocation:address,
        //                        compulsoryDate:values.compulsoryInsuranceValidityDate,
        //                        yearlyDate:values.yearlyInspectionValidityDate,
        //                }
        //                }
        //            ).then(
        //                r => {
        //                    console.info(r)
        //                    if (r.data.status == 200) {
        //                        message.config({
        //                            top: 130,
        //                            duration: 2,
        //                            maxCount: 3,
        //                        });
        //                        message.info('数据保存成功', 1);
        //
        //                    }
        //                });
        //        }
        //    })
        //} else {
        //    message.config({
        //        top: 130,
        //        duration: 2,
        //        maxCount: 3,
        //    });
        //    message.info('信息没有保存!', 1);
        //}
    }

    render() {
        const TabPane = Tabs.TabPane;

        return (
            <div style={{padding:30,backgroundColor:' white',marginTop:-30,marginLeft:-30}}>

                        <h2 style={{marginLeft:40}}>基本信息:</h2>
                        <CarInfo
                            ref={this.saveCarInfoFormRef}
                            onOk={this.handleSubmit}
                            save={this.saveCarInfo}
                            edit={this.editCarInfo}
                        ></CarInfo>
                        <h2 style={{marginLeft:40}}>配置信息:</h2>
                        <ConfigurationInfo
                            ref={this.saveConfigurationInfoFormRef}
                            onOk={this.handleSubmit}
                            save={this.saveConfigurationInfo}
                            edit={this.editConfigurationInfo}></ConfigurationInfo>
                        <h2 style={{marginLeft:40}}>手续信息:</h2>
                        <ProcedureInfo
                            ref={this.saveProcedureInfoFormRef}
                            onOk={this.handleSubmit}
                            save={this.saveProcedureInfo}
                            edit={this.editProcedureInfo}></ProcedureInfo>
                        <Button type="primary" style={{marginLeft:40}} onClick={this.handleSubmit}>提交</Button>


            </div>


        );
    }


}
export default Form.create({})(SellCar);
