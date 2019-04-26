import React, { PureComponent } from 'react'
import {
    message,Table,Pagination,Form, Upload, Button, Icon,Modal,Tabs,Row,Col,Tag,
} from 'antd';
import PallWrop from './pallWrop';
import axios from 'axios';

export default class UploadFile extends PureComponent {


    render() {
        return (
            <div className="divcss5">
               <div style={{marginLeft:50}}>
                <h2>外部</h2>
                <hr/>
                <Row  >

                    <Col span={6}> <PallWrop
                        position={"left"}
                        carId={this.props.carId}

                    ></PallWrop></Col>
                    <Col span={6}> <PallWrop
                        carId={this.props.carId}
                        position={"right"}></PallWrop></Col>
                    <Col span={6}> <PallWrop
                        carId={this.props.carId}
                        position={"trunk"}></PallWrop></Col>
                    <Col span={6}> <PallWrop
                        carId={this.props.carId}
                        position={"engineCompartment"}></PallWrop></Col>

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
                    <Col span={6}> <PallWrop
                        carId={this.props.carId}
                        position={"dashBoard"}></PallWrop></Col>
                    <Col span={6}> <PallWrop
                        carId={this.props.carId}
                        position={"console"}></PallWrop></Col>

                    <Col span={6}> <PallWrop
                        carId={this.props.carId}
                        position={"frontSeat"}></PallWrop></Col>

                    <Col span={6}> <PallWrop
                        carId={this.props.carId}
                        position={"backSeat"}></PallWrop></Col>


                </Row>
                <Row >

                    <Col span={6}> <Button type="primary">仪表盘</Button></Col>
                    <Col span={6}><Button type="primary">操作台</Button></Col>
                    <Col span={6}> <Button type="primary">前排座椅</Button></Col>
                    <Col span={6}><Button type="primary">后排座椅</Button></Col>

                </Row>
               </div></div>
        )
    }
}