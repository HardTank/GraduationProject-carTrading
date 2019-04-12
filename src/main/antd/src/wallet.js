import React, { Component } from 'react';
import './css/App.css';
import './css/personal.css';
import payOne from './image/1000.jpg'
import payTwo from './image/2000.jpg'
import payThree from './image/5000.jpg'
import payFour from './image/10000.jpg'

import {
    Pagination,Card, Modal,Table, message,Tabs,Menu,Layout,Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,
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
            wallet: '',
            userId: 0,
            result: {},
            pageIndex: 0,
            pageSize: 4,
            pay:''
        }
    }
    //提取操作
    handleOk = ()=> {
        this.setState({
            visible: false,
            wallet: this.state.wallet + parseFloat(this.state.amount),
        })
        var wallet = this.state.wallet + parseFloat(this.state.amount)
        this.changeWallet(0,this.state.amount);
        axios.get('http://localhost:8080/user/save', {
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                params: {
                    id: this.state.userId,
                    wallet: wallet,
                }
            }
        ).then(
            r => {

                if (r.status == 200) {
                    sessionStorage.setItem("userId", r.data.id);
                    var str = JSON.stringify(r.data);
                    sessionStorage.setItem("user", str);
                    this.setState({
                        name: r.data.name,
                        login: true,
                        loginVisible: false,

                    });
                }
                ;
            }
        );
    }
    //隐藏modal
    handleCancel = ()=> {
        this.setState({visible: false,withdrawVisible:false})
    }
    //充值界面
    showPayModal = ()=> {
        this.setState({visible: true,amount:1000})
    }
    //提取界面
    showDrawModal = ()=> {
        this.setState({withdrawVisible: true})
    }

    //获取table展示的数据
    show = (page)=> {
        var userId = sessionStorage.getItem("userId");
        axios.get('http://localhost:8080/wallet/show', {
                params: {
                    userId: userId,
                    pageIndex: page,
                    pageSize: this.state.pageSize,
                }


            }
            //axios No 'Access-Control-Allow-Origin' header is present on the requested resource.   安装chrome 插件:Allow-Control-Allow-Origin

        ).then(
            r => {
                var data = r.data;
                console.info(data)

                this.setState({
                    result: data,
                });
                console.info(r);
            }
        )
    }
    //按填写金额提取
    withdraw=()=>{
        this.props.form.validateFields((err, values) => {
            if (!err) {

                this.setState({
                    withdrawVisible:false,
                    wallet:parseFloat(this.state.wallet)-values.withdraw,

                })
               var wallet=parseFloat(this.state.wallet)-values.withdraw
                this.changeWallet(1,values.withdraw );
                axios.get('http://localhost:8080/user/save', {
                        xhrFields: {
                            withCredentials: true
                        },
                        crossDomain: true,
                        params: {
                            id: this.state.userId,
                            wallet: wallet,
                        }
                    }
                ).then(
                    r => {

                        if (r.status == 200) {
                            sessionStorage.setItem("userId", r.data.id);
                            var str = JSON.stringify(r.data);
                            sessionStorage.setItem("user", str);

                        }
                        ;
                    }
                );
            }

        });
    }
    //余额全部取出
    handleSubmit=()=>{
        this.setState({
            withdrawVisible:false,
            wallet:0,

        })
        this.changeWallet(1,this.state.wallet );
        axios.get('http://localhost:8080/user/save', {
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                params: {
                    id: this.state.userId,
                    wallet: 0,
                }
            }
        ).then(
            r => {

                if (r.status == 200) {
                    sessionStorage.setItem("userId", r.data.id);
                    var str = JSON.stringify(r.data);
                    sessionStorage.setItem("user", str);

                }
                ;
            }
        );
    }
    //充值或者提取
    changeWallet = (type,amount)=> {
        var userId = sessionStorage.getItem("userId");
        axios.get('http://localhost:8080/wallet/save', {
                params: {
                    userId: userId,
                    amount:amount,
                    type:type,
                }
            }
        ).then(
            this.show(0)
        )
    }
    //确定余额是否符合
    confirmAmount=(rule, value, callback)=>{
        if (value>this.state.wallet) {
            callback('超过可取金额!');
        } else {
            callback();
        }
    }
    //table展示列
    columns = [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        className: 'hidden',
    },{
        title: '序号',
        width: 80,
        render: (text, record, index) => `${index + 1}`
    }, {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        render: (text) =>(
            <div>{text == 0 ? '充值' : text == 1 ? '提取' : text == 2 ? '保证金支出' : text == 3 ? '保证金收回' : text == 4 ? '交易支出' : '交易收入'  }</div>),
    }, {
        title: '金额',
        dataIndex: 'amount',
        key: 'amount',
        render: (text, record) =>(
            <div>{record.type == 3 || record.type == 5 || record.type == 0 ? '+' : '-'}{text}</div>),
    }, {
        title: '时间',
        key: 'createTime',
        dataIndex: 'createTime',

    }];
    //自动加载
    componentDidMount() {
        var userId = sessionStorage.getItem("userId");
        var user = sessionStorage.getItem("user");
        user = JSON.parse(user);
        this.setState(
            {
                wallet: user.wallet,
                userId: userId,
            })
        this.show(0);
    }

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
                        <div className="walletPrice">余额:{this.state.wallet}元</div>
                    </Col>
                    <Col span={4} style={{height:60}}>
                        <div className="walletPrice">保证金:</div>
                    </Col>
                </Row>
                <Row style={{height:40}}><Col span={3} style={{height:40}}>
                    <Button type="primary" onClick={this.showPayModal}>充值</Button></Col><Col style={{height:40}} span={3}>
                    <Button type="primary" disabled={this.state.wallet==0}  onClick={this.showDrawModal}>提取</Button></Col>

                </Row>

                    <div  style={{  fontWeight:'bold',height:80}}>流水记录:</div>

                <hr/>

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
                    onOk={this.withdraw}
                    onCancel={this.handleCancel}
                    visible={this.state.withdrawVisible}
                    destroyOnClose="true"
                    footer={null}
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
                                    },{
                                        validator: this.confirmAmount,
                                    }],
                            })(
                                <Input />
                            )}
                        </Form.Item>
                        <Form.Item  >
                            <Row><Col span={8}>
                            <Button type="primary" htmlType="submit">全部取出</Button></Col>
                                <Col  span={8}>
                            <Button type="primary" onClick={this.withdraw}>提取</Button></Col>
                                </Row>
                        </Form.Item>
                    </Form>
                </Modal>
                <Table rowKey="id" columns={this.columns} dataSource={this.state.result.content}
                       pagination={false}></Table>
                <Pagination showQuickJumper defaultCurrent={1}
                            total={this.state.result.totalElements} current={this.state.result.number+1}
                            defaultPageSize={this.state.pageSize}
                            onChange={(page)=>{this.show(page-1)}
                            }></Pagination>
            </div>


        )
            ;

    }
}
export default Form.create({})(Wallet);
