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
            visible:false,
        }
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
            className: 'hidden',
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
    ]
    show = ()=> {
        axios.get('http://localhost:8080/deviceInspection/getList', {
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                params: {
                    carId: this.props.carId,
                    pageIndex: 0,
                    pageSize: 10,
                }
            }
        ).then(
            r => {
                this.setState({
                    result: r.data,
                });
            });
    }

    showModal=(e)=>{
        e.preventDefault();
        this.setState({
            visible:true,
        })
    }
    handleCancel=()=>{
        this.setState({
            visible:false,
        })
    }
    handleOk = (e) => {
        e.preventDefault();
        this.form.validateFields((err,values) => {
            if (!err) {
                var userId=sessionStorage.getItem("userId");
                axios.get('http://localhost:8080/deviceInspection/save', {
                        xhrFields: {
                            withCredentials: true
                        },
                        crossDomain: true,
                        params: {
                            carId:this.props.carId,
                            device:values.device,
                            abnormal:values.abnormal,
                            category:values.category,
                            adminId:userId,

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
        })

    };
    saveFormRef = (form) => {
        this.form = form;
    };
    componentDidMount() {
        var userId = sessionStorage.getItem("userId");
        var user = sessionStorage.getItem("user");
        user = JSON.parse(user);
        this.show();

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
                     >

                    </ExamineForm>

            </div>

        );
    }


}
export default Form.create({})(Examine);
