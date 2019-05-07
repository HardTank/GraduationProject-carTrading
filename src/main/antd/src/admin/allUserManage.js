import React, { Component } from 'react';
import '../css/App.css';
import '../css/personal.css';
import {
    Alert,Pagination,Card, Modal,Table, message,Tabs,Menu,Layout,Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,
} from 'antd';
import {LocaleProvider} from 'antd';
import axios from 'axios'//这是模块的加载机制，直接写依赖库的名字，会到node_modules下去查找，因此不需要你指明前面的相对路径
import qs from 'qs';
import zhCN from 'antd/lib/locale-provider/zh_CN';
const { Meta } = Card;
const { Option } = Select;
class AllUser extends Component {

    state = {
        wallet: '1',
        userId: 0,
        result: {},
        pageIndex: 0,
        pageSize:10,
        pay: '',
        myCar: [],
        role:'',
        userName:'',

    }




    //获取竞拍车辆展示的数据
    show = (page)=> {

        axios.get('http://localhost:8080/user/show', {
                params: {
                    userId:'',
                    name:document.getElementById('name')==null?'':document.getElementById('name').value,
                    role:this.state.role,
                    pageIndex: page,
                    pageSize: this.state.pageSize,

                }
            }
        ).then(
            r => {
                var data = r.data;
                this.setState({
                    result: data,
                });

            }
        )

    }

//setUserName=(e)=>{
//    e.preventDefault();
//    var userName=
//    this.setState({
//        userName:userName,
//    }, this.show(0))
//
//}
    //竞拍的汽车的table展示列
    columns = [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        className:"hidden",

    }, {
        title: '序号',
        width: 80,
        render: (text, record, index) => `${index + 1}`
    }, {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: '邮箱',
        dataIndex: 'mail',
        key: 'mail',
    }, {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone',

    }, {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
        render:(text,record)=>(
            <span>{record.province}{record.city}{record.county}{text}</span>
        )
    } ,  {
        title: '角色',
        dataIndex: 'role',
        key: 'role',
        render:(text,record)=>(
            <span>{text==0?'普通用户':'管理员'}</span>
        )
    } , {
            title: '操作',
            dataIndex: 'action',
             className:"hidden",
            render: (text, record) => (
                <div>
                    <Button type={'primary'}  onClick={(ev)=>{this.showDetail(ev,record)} }
                    >车辆详情</Button>
                    <Button type={'primary'} style={{ marginLeft:10}} onClick={() => this.payMoney(record)}>转帐</Button>
                </div>
            )
        }];

    //自动加载信息
    componentDidMount() {

        var userId = sessionStorage.getItem("userId");
        var user = sessionStorage.getItem("user");
        user = JSON.parse(user);
        this.setState(
            {
                //  wallet: user.wallet,
                userId: userId,
            })
        this.show(0);



    }
    handleChange=(value)=>{

        this.setState({
            role:value,
        })
    }
    render() {
        const TabPane = Tabs.TabPane;
        return (
            <div >

                 <Input id="name" placeholder='请输入姓名' style={{width:200}}/>

                <Select id="role" style={{width:200}} defaultValue=""  onChange={this.handleChange}  >
                    <Option value="">全部</Option>
                    <Option value="1">管理员</Option>
                    <Option value="0">普通用户</Option>
                </Select>
                <Button icon="search" onClick={(ev)=>this.show(0)}></Button>
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
export default Form.create({})(AllUser);
