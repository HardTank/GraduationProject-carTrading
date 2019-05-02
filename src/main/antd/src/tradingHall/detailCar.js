import React, { Component } from 'react';
import tradingHall from '../css/tradingHall.css'
import {Button ,Icon,Row, Col,Input,Modal,Pagination,Card,Form,Carousel,Tabs,Table} from 'antd';
import axios from 'axios';//这是模块的加载机制，直接写依赖库的名字，会到node_modules下去查找，因此不需要你指明前面的相对路径
import qs from 'qs';
import io from 'socket.io-client';
import moment from 'moment';
import Comment from './comment'

import watermark from '../admin/waterMark'
const { Meta } = Card;
class DetailCar extends Component {
    constructor() {
        super();
        this.state = {
            item: [],
            fileList: [],
            carInfo: '',
            configurationInfo: '',
            procedureInfo: '',
            category: '',
            pageIndex: 0,
            pageSize: 4,
            result: [],
        }
    }

    componentWillMount() {

        var carInfo = sessionStorage.getItem("carInfo")
        var userId = sessionStorage.getItem("userId")
        carInfo = JSON.parse(carInfo);
        this.getCarInfo(carInfo.id)
        this.getConfiguration(carInfo.id)
        this.getProcedureInfo(carInfo.id)
        this.getInspection(0, 0)

    }

    getCarInfo = (id)=> {
        axios.get("http://localhost:8080/carInfo/getList", {
            params: {
                id: id,
                pageIndex: 0,
                pageSize: 1,
            }
        }).then(r=> {
            if (r.status == 200) {
                this.setState({
                    carInfo: r.data.content[0],
                })
            }
        })
    }
    getConfiguration = (id)=> {
        axios.get("http://localhost:8080/configurationInfo/getList", {
            params: {
                carId: id,
                pageIndex: 0,
                pageSize: 1,
            }
        }).then(r=> {
            if (r.status == 200) {
                this.setState({
                    configurationInfo: r.data.content[0],
                })
            }
        })
    }
    getProcedureInfo = (id)=> {
        axios.get("http://localhost:8080/procedureInfo/getList", {
            params: {
                carId: id,
                pageIndex: 0,
                pageSize: 1,
            }
        }).then(r=> {
            if (r.status == 200) {
                this.setState({
                    procedureInfo: r.data.content[0],
                })
            }
        })
    }

    getInspection = (page, key)=> {
        var carInfo = sessionStorage.getItem("carInfo")
        carInfo = JSON.parse(carInfo);
        axios.get('http://localhost:8080/deviceInspection/getList', {
            params: {
                carId: carInfo.id,
                category: key,
                pageIndex: page,
                pageSize: this.state.pageSize,
            }
        }).then(r=> {
            this.setState({
                result: r.data,
            })
        })
    }
    columns = [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        className: 'hidden',
        width: 10,

    }, {
        title: '序号',
        width: 80,
        render: (text, record, index) => `${index + 1}`
    }, {
        title: '位置',
        dataIndex: 'device',
        key: 'device',
        width: 100
    }, {
        title: '检查情况',
        dataIndex: 'abnormal',
        key: 'abnormal',
    }];

    render() {
        const {carInfo,configurationInfo,procedureInfo}=this.state;
        const {form} = this.props;
        // const { getFieldDecorator } = form;
        //const { getFieldDecorator } = form;
        const TabPane = Tabs.TabPane;
        return (
            <div>

                <Card title="基本信息" style={{fontSize: 16}}>
                    <Row>
                        <Col span={6}>
                            <div className="key">厂商:</div>
                            {carInfo.brand}</Col>
                        <Col span={6}>
                            <div className="key">使用性质:</div>
                            {carInfo.nature}</Col>
                        <Col span={6}>
                            <div className="key">表显里程:</div>
                            {carInfo.mileage}</Col>
                        <Col span={6}>
                            <div className="key">出厂日期:</div>
                            {carInfo.productDate}</Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <div className="key">注册地:</div>
                            {carInfo.registerPlace}</Col>
                        <Col span={6}>
                            <div className="key">排放标准:</div>
                            {carInfo.emissionStandard}</Col>
                        <Col span={6}>
                            <div className="key">排量:</div>
                            {carInfo.discharge}</Col>
                        <Col span={6}>
                            <div className="key">变速箱形式:</div>
                            {carInfo.transmission}</Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <div className="key">车辆类型:</div>
                            {carInfo.type}</Col>
                        <Col span={6}>
                            <div className="key">驱动方式:</div>
                            {carInfo.drivingMode}</Col>
                        <Col span={6}>
                            <div className="key">能源类型:</div>
                            {carInfo.energy}</Col>
                        <Col span={6}>
                            <div className="key">颜色:</div>
                            {carInfo.color}</Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <div className="key">座位数:</div>
                            {carInfo.seatNum}</Col>
                        <Col span={6}>
                            <div className="key">轮胎规格:</div>
                            {carInfo.tyre}</Col>
                        <Col span={6}>
                            <div className="key">是否进口:</div>
                            {carInfo.source}</Col>
                        <Col span={6}>
                            <div className="key">使用方:</div>
                            {carInfo.brand}</Col>
                    </Row>
                </Card>
                <Card title="配置信息" style={{marginTop:30,fontSize: 16}}>
                    <Row>
                        <Col span={6}>
                            <div className="key">车窗玻璃:</div>
                            {configurationInfo.window}</Col>
                        <Col span={6}>
                            <div className="key">车外后视镜:</div>
                            {configurationInfo.rearviewMirror}</Col>
                        <Col span={6}>
                            <div className="key">轮毂:</div>
                            {configurationInfo.hub}</Col>
                        <Col span={6}>
                            <div className="key">座椅功能:</div>
                            {configurationInfo.seat}</Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <div className="key">座椅材质:</div>
                            {configurationInfo.seatMaterial}</Col>
                        <Col span={6}>
                            <div className="key">座椅调节方式:</div>
                            {configurationInfo.seatControl}</Col>
                        <Col span={6}>
                            <div className="key">ABS:</div>
                            {configurationInfo.abs}</Col>
                        <Col span={6}>
                            <div className="key">定速巡航:</div>
                            {configurationInfo.cruiseControl}</Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <div className="key">导航:</div>
                            {configurationInfo.navigation}</Col>
                        <Col span={6}>
                            <div className="key">倒车影像:</div>
                            {configurationInfo.reversingImage}</Col>
                        <Col span={6}>
                            <div className="key">倒车雷达:</div>
                            {configurationInfo.radar}</Col>
                        <Col span={6}>
                            <div className="key">空调:</div>
                            {configurationInfo.color}</Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <div className="key">气囊:</div>
                            {configurationInfo.gasbag}</Col>
                        <Col span={6}>
                            <div className="key">天窗:</div>
                            {configurationInfo.skylight}</Col>
                        <Col span={6}>
                            <div className="key">影音设备:</div>
                        </Col>
                        <Col span={6}>
                            <div className="key">转向助力:</div>
                        </Col>
                    </Row>


                </Card>
                <Card title="手续信息" style={{marginTop:30,fontSize: 16}}>
                    <Row>
                        <Col span={6}>
                            <div className="key">购车发票:</div>
                            {procedureInfo.invoice}</Col>
                        <Col span={6}>
                            <div className="key">登记证:</div>
                            {procedureInfo.registration}</Col>
                        <Col span={6}>
                            <div className="key">行驶证:</div>
                            {procedureInfo.license}</Col>
                        <Col span={6}>
                            <div className="key">车牌所在地:</div>
                            {procedureInfo.plateLocation}</Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <div className="key">年检有效期:</div>
                            {procedureInfo.yearlyInspectionValidityDate}</Col>
                        <Col span={6}>
                            <div className="key">交强险有效期:</div>
                            {procedureInfo.compulsoryInsuranceValidityDate}</Col>
                        <Col span={6}>
                            <div className="key">商业险有效期:</div>
                            {procedureInfo.commercialInsuranceValidityDate}</Col>
                        <Col span={6}>
                            <div className="key">购置税证:</div>
                            {procedureInfo.purchaseTaxCertificate}</Col>
                    </Row>
                    <Row>
                        <Col span={6}>
                            <div className="key">车船税:</div>
                            {procedureInfo.vehicleTax}</Col>
                        <Col span={6}>
                            <div className="key">车身铭牌:</div>
                            {procedureInfo.nameplate}</Col>
                        <Col span={6}>
                            <div className="key">违章记录:</div>
                            {procedureInfo.violationRecord}</Col>
                        <Col span={6}>
                            <div className="key">天窗:</div>
                        </Col>
                    </Row>
                </Card>
                <Card title="检测信息" style={{marginTop:30,fontSize: 16}}>
                    <Tabs defaultActiveKey="动力检查" onChange={(key)=>this.getInspection(0,key)}>
                        <TabPane tab="动力检查" key="0">
                            <Table rowKey="id" columns={this.columns} dataSource={this.state.result.content}
                                   pagination={false}></Table>


                        </TabPane>
                        <TabPane tab="车内功能检查" key="1">
                            <Table rowKey="id" columns={this.columns} dataSource={this.state.result.content}
                                   pagination={false}></Table>

                        </TabPane>
                        <TabPane tab="外观检查" key="3">
                            <Table rowKey="id" columns={this.columns} dataSource={this.state.result.content}
                                   pagination={false}></Table>
                        </TabPane>
                        <TabPane tab="车内环境检查" key="4">
                            <Table rowKey="id" columns={this.columns} dataSource={this.state.result.content}
                                   pagination={false}></Table>

                        </TabPane>
                        <TabPane tab="泡水检查" key="5">
                            <Table rowKey="id" columns={this.columns} dataSource={this.state.result.content}
                                   pagination={false}></Table>

                        </TabPane>
                        <TabPane tab="过火检查" key="6">
                            <Table rowKey="id" columns={this.columns} dataSource={this.state.result.content}
                                   pagination={false}></Table>

                        </TabPane>
                    </Tabs>
                    <Pagination showQuickJumper defaultCurrent={1}
                                total={this.state.result.totalElements} current={this.state.result.number+1}
                                defaultPageSize={this.state.pageSize}
                                onChange={(page)=>{this.getInspection(page-1,0)}
                            }></Pagination>
                </Card>
            </div>


        )
    }
}
export default Form.create({})(DetailCar);