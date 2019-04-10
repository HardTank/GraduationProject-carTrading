import React, { Component } from 'react';
import './css/App.css';
import './css/personal.css';
import payOne from './image/1000.jpg'
import payTwo from './image/2000.jpg'
import payThree from './image/5000.jpg'
import payFour from './image/10000.jpg'

import {
    Card, Modal,Table, message,Tabs,Menu,Layout,Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,
} from 'antd';
import {LocaleProvider} from 'antd';
import axios from 'axios'//这是模块的加载机制，直接写依赖库的名字，会到node_modules下去查找，因此不需要你指明前面的相对路径
import qs from 'qs';
import Title from './title';
import EditPwd from './editPwd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
const { Meta } = Card;
class Wallet extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            amount: 1000,
            withdrawVisible: false,
        }
    }

    handleOk = ()=> {
        this.setState({visible: false})

    }
    handleCancel = ()=> {
        this.setState({visible: false})
    }
    showPayModal = ()=> {
        this.setState({visible: true})
    }
    showDrawModal = ()=> {
        this.setState({withdrawVisible: true})
    }
    columns = [{
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        render: text => <a href="javascript:;">{text}</a>,
    }, {
        title: '金额',
        dataIndex: 'amount',
        key: 'amount',
    }, {
        title: '时间',
        key: 'datetime',
        dataIndex: 'datetime',

    }];

    render() {
        const TabPane = Tabs.TabPane;
        const { getFieldDecorator } = this.props.form;
        return (
            <div >
                <Row style={{height:60}}>
                    <Col span={4} style={{height:60}}>
                        <div className="walletPrice">总额:</div>
                    </Col>
                    <Col span={4} style={{height:60}}>
                        <div className="walletPrice">余额:</div>
                    </Col>
                    <Col span={4} style={{height:60}}>
                        <div className="walletPrice">保证金:</div>
                    </Col>
                </Row>
                <Row><Col span={3}>
                    <Button type="primary" onClick={this.showPayModal}>充值</Button></Col><Col span={3}>
                    <Button type="primary" onClick={this.showDrawModal}>提取</Button></Col>
                </Row>
                <hr/>
                <Table rowKey="id" columns={this.columns} pagination={false}></Table>
                <Modal
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    visible={this.state.visible}
                    destroyOnClose="true"
                >
                    <Tabs defaultActiveKey="1000" onChange={(key)=>{this.setState({amount:key})}}>
                        <TabPane tab="1000元" key="1000">
                            <Card
                                hoverable
                                cover={<img   style={{ marginLeft:110,width: 250, height:300 }} alt="example" src={payOne }/>}
                            >
                            </Card>
                        </TabPane>
                        <TabPane tab="2000元" key="2000">
                            <Card
                                hoverable
                                cover={<img   style={{ marginLeft:110,width: 250, height:300 }} alt="example" src={payTwo }/>}
                            >
                            </Card>
                        </TabPane>
                        <TabPane tab="5000元" key="5000">
                            <Card
                                hoverable
                                cover={<img   style={{ marginLeft:110,width: 250, height:300 }} alt="example" src={payThree }/>}
                            >
                            </Card>
                        </TabPane>
                        <TabPane tab="10000元" key="10000">
                            <Card
                                hoverable
                                cover={<img   style={{ marginLeft:110,width: 250, height:300 }} alt="example" src={payFour }/>}
                            >
                            </Card>
                        </TabPane>
                    </Tabs>
                </Modal>
                <Modal
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    visible={this.state.withdrawVisible}
                    destroyOnClose="true"
                >
                    <Form layout="horizontal" style={{marginLeft:100}} onSubmit={this.handleSubmit}>
                        <Form.Item style={{width:300 } }
                                   label="取款金额"
                        >
                            {getFieldDecorator('withdraw', {
                                rules: [
                                    {
                                        pattern: /^\+?(?!0+(\.00?)?$)\d+(\.\d\d?)?$/, message: '格式错误!',
                                    }, {
                                        required: true, message: '请输入取款金额!',
                                    },],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item  >
                            <Button type="primary" htmlType="submit">全部取出</Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </div>


        )
            ;

    }
}
export default Form.create({})(Wallet);
