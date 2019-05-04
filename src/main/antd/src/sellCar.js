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
import UploadFile from './admin/uploadFile';
class SellCar extends Component {
    state = {
        saveCarInfo: false,
        saveConfigurationInfo: false,
        saveProcedureInfo: false,
        src: require('./image/view.png'),
    }

    componentDidMount() {

        var id = this.props.carId;
        if (id != null) {
            this.setState({
                saveCarInfo: true,
                saveConfigurationInfo: true,
                saveProcedureInfo: true,
            })
        }


    }

    setCarValue(car) {
        console.info("传过来的时间" + car.productDate + typeof (car.productDate))
        //if (car.source == '1')
        //    car.source = '是';
        //if (car.source == '0')
        //    car.source = '否'
        car.productDate = moment(car.productDate, 'YYYY-MM-DD');
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

    getConfigurationInfoId(carId) {

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
        if (this.state.saveCarInfo && this.state.saveConfigurationInfo && this.state.saveProcedureInfo && this.test('left') && this.test('console') && this.test('right') && this.test('trunk') && this.test('engineCompartment') && this.test('dashBoard') && this.test('frontSeat') && this.test('backSeat')) {
            var id = this.props.carId;
            if (id != null) {
                var carInfo = sessionStorage.getItem("carInfo");
                if (carInfo != null && carInfo != "null") {
                    var values = JSON.parse(carInfo);
                    axios.get('http://localhost:8080/carInfo/save', {
                            params: {
                                id: id,
                                brand: values.brand,
                                name:values.name,
                                color: values.color,
                                discharge: values.discharge,
                                drivingMode: values.drivingMode,
                                emissionStandard: values.emissionStandard,
                                energy: values.energy,
                                engineId: values.engineId,
                                // initialDate: values.initialDate,
                                mileage: values.mileage,
                                nature: values.nature,
                                productDates: values.productDate,
                                registerPlace: values.registerPlace[0]+[1],
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
                var configurationInfo = sessionStorage.getItem("configurationInfo");
                if (configurationInfo != null && configurationInfo != "null") {
                    var values = JSON.parse(configurationInfo);
                    axios.get('http://localhost:8080/configurationInfo/getId', {
                            params: {
                                carId: id
                            }
                        }
                    ).then(
                        r => {
                            if (r.status == 200) {

                                axios.get('http://localhost:8080/configurationInfo/save', {
                                        params: {
                                            id: r.data.id,
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
                                            carId: id,
                                            abs: values.abs,
                                        }
                                    }
                                ).then(
                                    r => {
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
                        });
                }
                var procedureInfo = sessionStorage.getItem("procedureInfo");
                if (procedureInfo != null && procedureInfo != "null") {
                    var values = JSON.parse(procedureInfo);
                    if (typeof(values.compulsoryInsuranceLocation) == "string")
                        var address = values.compulsoryInsuranceLocation;
                    else
                        var address = values.compulsoryInsuranceLocation[0] + values.compulsoryInsuranceLocation[1] + values.compulsoryInsuranceLocation[2];

                    axios.get('http://localhost:8080/procedureInfo/getId', {
                            params: {
                                carId: id
                            }
                        }
                    ).then(
                        r => {
                            if (r.status == 200) {

                                axios.get('http://localhost:8080/procedureInfo/save', {
                                        params: {
                                            id: r.data.id,
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
                        });
                }

            }
            else {
                this.carInfoForm.validateFields((err, values)=> {
                    if (!err) {
                        var str = JSON.stringify(values);
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
                                            var str = JSON.stringify(values);
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
                                                    if (r.status == 200) {

                                                        this.procedureInfoForm.validateFields((err, values)=> {
                                                            if (!err) {
                                                                var str = JSON.stringify(values);
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
                                                                        if (r.status == 200) {
                                                                            if (this.upload('left', carId))
                                                                                if (this.upload('right', carId))
                                                                                    if (this.upload('trunk', carId))
                                                                                        if (this.upload('engineCompartment', carId))
                                                                                            if (this.upload('dashBoard', carId))
                                                                                                if (this.upload('console', carId))
                                                                                                    if (this.upload('frontSeat', carId))
                                                                                                        if (this.upload('backSeat', carId))
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
            }
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
            else {
                message.config({
                    top: 130,
                    duration: 2,
                    maxCount: 3,
                });
                message.info('图片上传不完整!', 1);
            }

        }

    }
    changeItem = (key)=> {
        console.info(key)
    }
    handleReset = ()=> {
        this.emptyCarInfoForm();
        this.emptyProcedureInfoForm();
        this.emptyConfigurationInfoForm();

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
    view = (e, id)=> {
        // var id=this.props.position
        e.preventDefault();
        alert(id)
        var file = document.getElementById(id).files[0];
        if (window.FileReader) {
            var fr = new FileReader();
            fr.onloadend = function (e) {
                document.getElementById(id + 'Img').src = e.target.result;
            }
            fr.readAsDataURL(file);
        }
    }
    upload = (position, carId)=> {
        var upload = false;
        let formData = new FormData();
        var file = document.getElementById(position).files[0];
        // var url=window.URL.createObjectURL(file);
        formData.append('pic', file);
        formData.append('position', position);
        formData.append('carId', carId);
        axios({
            url: 'http://localhost:8080/upload/image',
            method: 'post',
            data: formData,
            processData: false,// 告诉axios不要去处理发送的数据(重要参数)
            contentType: false,   // 告诉axios不要去设置Content-Type请求头
        }).then((res)=> {
            console.info(res.status)
            console.info(typeof(res.status))
            if (res.status == 200) {
                upload = true;
                return true;
            }


        })

        return true;
    }

    test = (position)=> {


        if (document.getElementById(position).files.length == 0)
            return false;
        else {
            return true;
        }
    }

    render() {
        const TabPane = Tabs.TabPane;

        return (
            <div style={{padding:30,backgroundColor:' white',marginTop:-30,marginLeft:-30}}>
                <Button className="buttonMargin" icon="upload" type="primary" style={{marginLeft:40}}
                        hidden={this.props.carId!=null} onClick={this.handleSubmit}>提交</Button>

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
                    <TabPane tab="图片上传" key="upload">
                        <div hidden={this.props.carId==null}>
                            <UploadFile
                                carId={this.props.carId}
                            >

                            </UploadFile>
                        </div>
                        <div hidden={this.props.carId!=null} className="divcss5">
                            <div style={{marginLeft:50}}>
                                <h2>外部</h2>
                                <hr/>
                                <Row  >


                                    <Col span={6}>
                                        <input hidden={this.props.carId!=null} accept="image/*" id='left'
                                               onChange={(ev)=>this.view(ev,'left')} type="file"/>
                                        <img id='leftImg' style={{width:110,height:110}} src={this.state.src}/>

                                    </Col>
                                    <Col span={6}>
                                        <input hidden={this.props.carId!=null} accept="image/*" id='right'
                                               onChange={(ev)=>this.view(ev,'right')} type="file"/>
                                        <img id='rightImg' style={{width:110,height:110}} src={this.state.src}/>
                                         </Col>

                                    <Col span={6}>
                                        <input hidden={this.props.carId!=null} accept="image/*" id='trunk'
                                               onChange={(ev)=>this.view(ev,'trunk')} type="file"/>
                                        <img id='trunkImg' style={{width:110,height:110}} src={this.state.src}/>
                                         </Col>

                                    <Col span={6}>
                                        <input hidden={this.props.carId!=null} accept="image/*" id='engineCompartment'
                                               onChange={(ev)=>this.view(ev,'engineCompartment')} type="file"/>
                                        <img id='engineCompartmentImg' style={{width:110,height:110}}
                                             src={this.state.src}/>
                                         </Col>


                                </Row>
                                <Row  >

                                    <Col span={6}>
                                        <Button type="primary">左前45°</Button></Col>
                                    <Col span={6}>
                                        <Button type="primary">右后45°</Button></Col>
                                    <Col span={6}>
                                        <Button type="primary">后备箱</Button></Col>
                                    <Col span={6}>
                                        <Button type="primary">发动机舱</Button></Col>

                                </Row>

                                <h2>内部</h2>
                                <hr/>
                                <Row>
                                    <Col span={6}>
                                        <input hidden={this.props.carId!=null} accept="image/*" id='dashBoard'
                                               onChange={(ev)=>this.view(ev,'dashBoard')} type="file"/>
                                        <img id='dashBoardImg' style={{width:110,height:110}} src={this.state.src}/>

                                    </Col>
                                    <Col span={6}>
                                        <input hidden={this.props.carId!=null} accept="image/*" id='console'
                                               onChange={(ev)=>this.view(ev,'console')} type="file"/>
                                        <img id='consoleImg' style={{width:110,height:110}} src={this.state.src}/>
                                         </Col>

                                    <Col span={6}>
                                        <input hidden={this.props.carId!=null} accept="image/*" id='frontSeat'
                                               onChange={(ev)=>this.view(ev,'frontSeat')} type="file"/>
                                        <img id='frontSeatImg' style={{width:110,height:110}} src={this.state.src}/>
                                         </Col>

                                    <Col span={6}>
                                        <input hidden={this.props.carId!=null} accept="image/*" id='backSeat'
                                               onChange={(ev)=>this.view(ev,'backSeat')} type="file"/>
                                        <img id='backSeatImg' style={{width:110,height:110}} src={this.state.src}/>
                                         </Col>


                                </Row>
                                <Row >

                                    <Col span={6}> <Button type="primary">仪表盘</Button></Col>
                                    <Col span={6}><Button type="primary">操作台</Button></Col>
                                    <Col span={6}> <Button type="primary">前排座椅</Button></Col>
                                    <Col span={6}><Button type="primary">后排座椅</Button></Col>

                                </Row>
                            </div>
                        </div>
                    </TabPane>
                </Tabs>


            </div>


        );
    }


}
export default Form.create({})(SellCar);
