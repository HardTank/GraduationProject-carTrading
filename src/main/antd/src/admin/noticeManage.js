import React, { Component } from 'react';
import '../css/App.css';
import '../css/personal.css';
import {
    Popconfirm,Alert,Pagination,Card, Modal,Table, message,Tabs,Menu,Layout,Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,
} from 'antd';
import {LocaleProvider} from 'antd';
import axios from 'axios'//这是模块的加载机制，直接写依赖库的名字，会到node_modules下去查找，因此不需要你指明前面的相对路径
import qs from 'qs';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import Highlighter from '../../node_modules/react-highlight-words';
import NoticeForm from'./NoticeForm'
const { Meta } = Card;
const { Option } = Select;
class NoticeManage extends Component {

    state = {
        wallet: '1',
        userId: 0,
        result: {},
        pageIndex: 0,
        pageSize: 10,
        pay: '',
        myCar: [],
        role: '',
        userName: '',
        name: '',
        visible: false,

    }


    //获取竞拍车辆展示的数据
    show = (page)=> {
        console.log(this.state.name)
        axios.get('http://localhost:8080/notice/getList', {
                params: {
                    deleted: 0,
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

    downSelect = (currentPageData)=> {
        return (
            <Select id="role" style={{width:'70%'}} defaultValue="" onChange={this.handleChange}>
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
        filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }}/>,
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
        this.setState({searchText: selectedKeys[0]});
    }

    handleReset = (clearFilters) => {
        clearFilters();
        this.setState({searchText: ''});
    }
    columns = [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        className: "hidden",

    }, {
        title: '序号',
        width: 80,
        render: (text, record, index) => `${index + 1}`
    }, {
        title: '标题',
        dataIndex: 'title',
        key: 'title',
        ...this.getColumnSearchProps('title')
    }, {
        title: '正文内容',
        dataIndex: 'content',
        key: 'content',
        ...this.getColumnSearchProps('content'),
        render: (text)=>(
            <div dangerouslySetInnerHTML={{ __html: text.substring(0,50).replace(/<p>/,"").replace(/<\/p>/,"")+'......'}}></div>
        )
    }, {
        title: '创建时间',
        dataIndex: 'createTime',
        key: 'createTime',
        sorter: (a, b) => new Date(a.createTime).getTime() - new Date(b.createTime).getTime(),

    }, {
        title: '浏览次数',
        dataIndex: 'view',
        key: 'view',
        sorter: (a, b) =>a.view-b.view,
        render: (text, record)=>(
            <span> {text}</span>
        )
    }, {
        title: '操作',
        dataIndex: 'action',

        render: (text, record) => (
            <div>
                <Button type={'primary'} onClick={(ev)=>{this.getNotice(ev,record.id)} }
                >公告详情</Button>
                <Popconfirm title="确定继续吗?"
                            onConfirm={(ev)=>{this.delNotice(ev,record.id)}}
                            okText="确定" cancelText="取消">
                    <Button type={'primary'} style={{ marginLeft:10}} >删除</Button>

                </Popconfirm>
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

    handleCancel = ()=> {

        this.setState({
            visible: false,
        })
    }

    showModal(e) {
        e.preventDefault();
        console.log('true')
        this.setState({
            visible: true,
        })
    }
    saveFormRef = (form) => {
        this.form = form;
    };
    handleOk = (values) => {

                var userId = sessionStorage.getItem("userId");
                let formData = new FormData();
                if (this.state.id > 0)
                    formData.append('id', this.state.id);
                formData.append('title', values.title);
                formData.append('content', values.content.toHTML());
                formData.append('adminId', userId);//adminId
                formData.append('deleted', 0);
                formData.append('view', 0);
                axios({
                    url: 'http://localhost:8080/notice/save',
                    method: 'post',
                    data: formData,
                    processData: false,// 告诉axios不要去处理发送的数据(重要参数)
                    contentType: false,   // 告诉axios不要去设置Content-Type请求头
                }).then((res)=> {
                    if (res.status == 200) {
                        this.setState({
                            visible: false,

                        });
                        setTimeout(this.form.resetFields, 1000);
                        message.config({
                            top: 130,
                            duration: 2,
                            maxCount: 3,
                        });
                        message.info('添加成功', 1);
                    }
                })



    };
    delNotice(e,noticeId){
        e.preventDefault();
        axios.get('http://localhost:8080/notice/save',{
            params:{
                id:noticeId,
                deleted:1,
            }
        }).then(r=>{
            if(r.status==200){
                this.show(0)
                message.config({
                    top: 130,
                    duration: 2,
                    maxCount: 3,
                });
                message.info('删除成功', 1);
            }
        })

    }
    getNotice=(e,noticeId)=>{
        e.preventDefault();
        sessionStorage.setItem("noticeId", noticeId)
        window.open("http://localhost:3000/#/noticeInfo")

        //this.setState({
        //    visible:true,
        //    noticeId:noticeId,
        //
        //})


    }
    render() {
        const TabPane = Tabs.TabPane;
        return (
            <div >

                    <NoticeForm
                     ref={this.saveFormRef}
                     visible={this.state.visible}
                     onCancel={this.handleCancel}
                     onOk={this.handleOk}
                    ></NoticeForm>




                <Button onClick={(ev)=>this.showModal(ev)}>+</Button>
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
export default Form.create({})(NoticeManage);
