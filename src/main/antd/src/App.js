import React, { Component } from 'react';
import './css/App.css';
import {Button ,Icon,Row, Col, Tabs,Input,Divider,Span,Table,Modal,Pagination} from 'antd';
import axios from 'axios';//这是模块的加载机制，直接写依赖库的名字，会到node_modules下去查找，因此不需要你指明前面的相对路径
import qs from 'qs';
import EditUser from './EditUser.js';
class App extends Component {
    state = {
        size: 'large',
        result: '',
        name: '',
        visible: false,

    };

    columns = [{
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        render: text => <a href="javascript:;">{text}</a>,
    }, {
        title: '密码',
        dataIndex: 'password',
        key: 'password',
    }, {
        title: '操作',
        key: 'action',
        dataIndex: 'id',
        render: (text, record) => (
            <div>
                <a onClick={() => this.showModal(record)}>编辑</a>
                <a onClick={() => Modal.confirm(this.getConfirmOption(record))}>删除</a>
            </div>
        ),
    }];
    dataSource = [];
    showModal = (record) => {
        this.setState({visible: true});
        this.form.setFieldsValue(record);
        this.state.id = record.id;
    };
    saveFormRef = (form) => {
        this.form = form;
    };
    handleOk = (e) => {
        e.preventDefault();

        this.form.validateFields((err, values) => {
            if (!err) {
                this.state.vendor.id = this.state.id;
                this.state.vendor = values;
                this.save().then((data) => {
                    this.setState({visible: false});
                    setTimeout(this.form.resetFields, 1000);
                    // data.code === "200" ? message.success('成功') : message.error('失败');
                });
            }
        });

    };

    handleCancel = () => {
        this.setState({visible: false});
        this.state.id = null;
        this.form.resetFields();
    };


    getConfirmOption(record) {
        this.state.vendor = record;
        return {
            content: '确定删除吗？',
            onOk: () => this.del().then((data) => {
                //  data.code === "200" ? message.success('成功') : message.error('失败');
            }),
            onCancel: () => {
            }
        }
    }

    ajaxPostRequest = (id) => {
        const name = this.state.name;

        axios.get('http://localhost:8080/user/show', {

                params: {
                    name: name,
                    password: "tlx14"
                }


            }
            //axios No 'Access-Control-Allow-Origin' header is present on the requested resource.   安装chrome 插件:Allow-Control-Allow-Origin

        ).then(
            r => {
                this.setState({
                    result: r.data
                });
                console.info(r.data);
            }
        ).catch(e => {
            if (e.response) {
                //请求已发出，服务器返回状态码不是2xx。
                console.info(e.response.data)
                console.info(e.response.status)
                console.info(e.response.headers)
            } else if (e.request) {
                // 请求已发出，但没有收到响应
                // e.request 在浏览器里是一个XMLHttpRequest实例，
                // 在node中是一个http.ClientRequest实例
                console.info(e.request)
            } else {
                //发送请求时异常，捕捉到错误
                console.info('error', e.message)
            }
            console.info(e.config)
        })
    };
    update = (record)=> {
        alert(record.name);
    }

    componentDidMount() {

        this.ajaxPostRequest();
    }

    render() {

        const TabPane = Tabs.TabPane;


        return (
            <div>
                <div>
                    <Button type="primary" onClick={this.ajaxPostRequest}>获取数据</Button>

                    <Input onChange={(value)=>{this.state.name = value.target.value} }/>

                </div>
                <div>
                    <EditUser
                        ref={this.saveFormRef}
                        visible={this.state.visible}

                        onCancel={this.handleCancel}
                        onOk={this.handleOk}
                    />
                    <br/>

                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Tab 1" key="1">
                            <div className="table-content">
                                <Table rowKey="id"  columns={this.columns} dataSource={[...this.state.result]}pagination={false}></Table>
                            </div>
                            <div className="table-pagination">
                                <Pagination showQuickJumper defaultCurrent={1}
                                            total={2} current={1}
                                            defaultPageSize={1}
                                            onChange={(page) => {
                                      (this.state.page = page) && this.getList()
                                  }}></Pagination>
                            </div>
                        </TabPane>
                        <TabPane tab="Tab 2" key="2">
                            <Row gutter={8}>
                                <Col span={6} order={4} className="App-color">
                                    <div > 1 col-order-4</div>
                                </Col>
                                <Col span={6} order={3} className="App-color">2 col-order-3</Col>
                                <Col span={6} order={2} className="App-color">3 col-order-2</Col>
                                <Col span={6} order={1} className="App-color">4 col-order-1</Col>
                            </Row>
                        </TabPane>

                    </Tabs>
                </div>
            </div>
        );
    }
}
export default App;
