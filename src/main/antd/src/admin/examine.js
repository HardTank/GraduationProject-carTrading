import React, { Component } from 'react';
import '../css/App.css';
import '../css/personal.css';
import {
    message,Table,Pagination,Form, Upload, Button, Icon,Modal,Tabs,Input
} from 'antd';
import {LocaleProvider} from 'antd';
import axios from 'axios'//这是模块的加载机制，直接写依赖库的名字，会到node_modules下去查找，因此不需要你指明前面的相对路径
import qs from 'qs';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import ExamineForm from './examineForm'
class Examine extends Component {
    constructor() {
        super();
        this.state = {
            result: [],
            visible: false,
            id: '',
            device: '',
            abnormal: '',
            category: '',
            pageSize: 4,
            pageIndex: 0,
        }
    }

    editInfo = (e, record)=> {
        e.preventDefault();
        // this.form.setFieldsValue(record)
        this.setState({
            visible: true,
            category: record.category,
            device: record.device,
            abnormal: record.abnormal,
            id: record.id,
        })
    }
    delInfo = (e, record)=> {
        e.preventDefault();
        axios.get('http://localhost:8080/deviceInspection/delete', {
                params: {
                    id: record.id,
                }
            }
        ).then(
            r => {

                if (r.status == 200) {
                    this.setState({
                        result: r.data,
                    });
                    setTimeout(this.form.resetFields, 1000);

                }
            });
    }
    columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            className: 'hidden',
        },
        {
            title: '序号',
            render: (text, record, index) => `${index + 1}`
        },
        {
            title: '装置名',
            dataIndex: 'device',
            key: 'device',

        },
        {
            title: '异常情况',
            dataIndex: 'abnormal',
            key: 'abnormal',

        },
        {
            title: '创建时间',
            dataIndex: 'createDate',
            key: 'createDate',

        },
        {
            title: '检查所属类别',
            dataIndex: 'category',
            key: 'category',
            render: (text)=>(
                <div>
                    {text == '0' ? '动力检查' : text == '1' ? '车内功能检查' : text == '2' ? '外观检查' : text == '3' ? '车内环境检查' : text == '4' ? '泡水检查' : text == '5' ? '过火检查' : ''}
                </div>
            )

        },
        {
            title: '操作',
            dataIndex: 'action',

            render: (text, record)=>(
                <div>
                    <Button type="primary" onClick={(ev)=>this.editInfo(ev,record)}>修改</Button>
                    <Button type="primary" onClick={(ev)=>this.delInfo(ev,record)}>删除</Button>
                </div>
            )

        },
    ]
    show = (page)=> {

        axios.get('http://localhost:8080/deviceInspection/getList', {
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                params: {
                    carId: this.props.carId,
                    pageIndex: page,
                    pageSize: 4,
                }
            }
        ).then(
            r => {
                this.setState({
                    result: r.data,
                });
            });
    }

    showModal = (e)=> {
        e.preventDefault();
        this.setState({
            visible: true,
            id: 0,
            category: '',
            device: '',
            abnormal: '',
        })
    }
    handleCancel = ()=> {
        this.setState({
            visible: false,
        })
    }
    handleOk = (e) => {
        e.preventDefault();
        this.form.validateFields((err, values) => {
            if (!err) {
                var userId = sessionStorage.getItem("userId");
                let formData = new FormData();
                if (this.state.id > 0)
                    formData.append('id', this.state.id);
                formData.append('device', values.device);
                formData.append('abnormal', values.abnormal);
                formData.append('category', values.category);
                formData.append('adminId', userId);//adminId
                formData.append('carId', this.props.carId);
                axios({
                    url: 'http://localhost:8080/deviceInspection/save',
                    method: 'post',
                    data: formData,
                    processData: false,// 告诉axios不要去处理发送的数据(重要参数)
                    contentType: false,   // 告诉axios不要去设置Content-Type请求头
                }).then((res)=> {
                    if (res.status == 200) {
                        console.info(res)
                        this.setState({
                            visible: false,
                            result: res.data,
                        });
                        setTimeout(this.form.resetFields, 1000);

                    }
                })
                //    axios.get('http://localhost:8080/deviceInspection/save', {
                //            xhrFields: {
                //                withCredentials: true
                //            },
                //            crossDomain: true,
                //        data: formData,
                //        }
                //    ).then(
                //        r => {
                //
                //            if (r.status == 200) {
                //                this.setState({
                //                    result: r.data,
                //                });
                //                setTimeout(this.form.resetFields, 1000);
                //
                //            }
                //        });
            }
        })

    };
    saveFormRef = (form) => {
        this.form = form;
    };

    componentDidMount() {
        var userId = sessionStorage.getItem("userId");
        var user = sessionStorage.getItem("user");
        user = JSON.parse(user);
        this.show(0);

    }

    render() {
        const TabPane = Tabs.TabPane;

        return (
            <div>
                <Button
                    onClick={this.showModal}
                >+</Button>
                <Table rowKey="id" columns={this.columns} dataSource={this.state.result.content}
                       pagination={false}></Table>
                <Pagination showQuickJumper defaultCurrent={1}
                            total={this.state.result.totalElements} current={this.state.result.number+1}
                            defaultPageSize={this.state.pageSize}
                            onChange={(page)=>{this.show(page-1)}
                            }></Pagination>

                < ExamineForm
                    ref={this.saveFormRef}
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    width="1000px"
                    onOk={this.handleOk}
                    category={this.state.category}
                    device={this.state.device}
                    abnormal={this.state.abnormal}
                >

                </ExamineForm>

            </div>

        );
    }


}
export default Form.create({})(Examine);
