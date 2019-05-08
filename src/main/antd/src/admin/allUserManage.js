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
import Highlighter from '../../node_modules/react-highlight-words';
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
        name:'',

    }




    //获取竞拍车辆展示的数据
    show = (page)=> {
         console.log(this.state.name)
        axios.get('http://localhost:8080/user/show', {
                params: {
                    userId:'',
                    name:this.state.name,
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

    downSelect = (currentPageData)=>{
        return(
            <Select id="role" style={{width:'70%'}} defaultValue=""  onChange={this.handleChange}  >
                <Option value="">全部</Option>
                <Option value="1">管理员</Option>
                <Option value="0">普通用户</Option>
            </Select>
        )
    }
    getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys, selectedKeys, confirm, clearFilters,
            }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => { this.searchInput = node; }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                    style={{ width: 188, marginBottom: 8, display: 'block' }}
                />
                <Button
                    type="primary"
                    onClick={() => this.handleSearch(selectedKeys, confirm)}
                    icon="search"
                    size="small"
                    style={{ width: 90, marginRight: 8 }}
                >
                    Search
                </Button>
                <Button
                    onClick={() => this.handleReset(clearFilters)}
                    size="small"
                    style={{ width: 90 }}
                >
                    Reset
                </Button>
            </div>
        ),
        filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: (text) => (
            <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[this.state.searchText]}
                autoEscape
                textToHighlight={text.toString()}
            />
        ),
    })

    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    }

    handleReset = (clearFilters) => {
        clearFilters();
        this.setState({ searchText: '' });
    }
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
        ...this.getColumnSearchProps('name')
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
        ...this.getColumnSearchProps('address'),

        render:(text,record)=>(
            <span>{record.province}{record.city}{record.county}{text}</span>
        )
    } ,  {
        title: this.downSelect,
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
        },()=>{this.show(0)})
    }
    setName(value){
        this.setState({
            name : value.target.value,
        },()=>{this.show(0)})

    }
    render() {
        const TabPane = Tabs.TabPane;
        return (
            <div >

                 <Input  onChange={(value)=>{this.setName(value)}} placeholder='请输入姓名' style={{width:200}}/>

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
