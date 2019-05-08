import React, { Component } from 'react';
import '../css/App.css';
import '../css/personal.css';
import {
    Popconfirm,Pagination,Card, Modal,Table, message,Tabs,Menu,Layout,Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,
} from 'antd';
import {LocaleProvider} from 'antd';
import axios from 'axios'//这是模块的加载机制，直接写依赖库的名字，会到node_modules下去查找，因此不需要你指明前面的相对路径
import qs from 'qs';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import CountDown from '../tradingHall/countDown'
import AuctionCenter from '../tradingHall/auctionCenter'
import Highlighter from '../../node_modules/react-highlight-words';
import UserInfo from './userInfo'
const { Meta } = Card;
const { Option } = Select;

class AllCar extends Component {

    state = {
        wallet: '1',
        userId: 0,
        result: {},
        pageIndex: 0,
        pageSize: 10,
        pay: '',
        allCar: [],
        visible: false,
        state: '',
        searchText: '',
        carId:'',
    }

    handleOk(e, item) {
        e.preventDefault();
        sessionStorage.setItem("carInfo", JSON.stringify(item))
        window.open("http://localhost:3000/#/info")

    }


//删除数据
    delCar = (e, record)=> {
        axios.get('http://localhost:8080/carInfo/delCar', {
            params: {
                id: record.id,
            }
        }).then(r=> {
            if (r.status == 200) {
                message.config({
                    top: 130,
                    duration: 2,
                    maxCount: 3,
                });
                message.info('删除成功', 1);
                this.showAllCar(0);
            }
        })
    }
//获取我卖的车的展示数据
    showAllCar = (page)=> {
        axios.get('http://localhost:8080/order/getAllCar', {
                params: {
                    name: document.getElementById('name') == null ? '' : document.getElementById('name').value,
                    state: this.state.state,
                    pageIndex: page,
                    pageSize: 10,
                }
            }
        ).then(
            r => {
                console.log(r)
                var data = r.data;
                this.setState({
                    allCar: data,
                });
            }
        )
    }
    //showModal = ()=> {
    //    this.setState({
    //        visible: true,
    //    })
    //}
    //cancelModal = ()=> {
    //    this.setState({
    //        visible: false,
    //    })
    //}
    //table筛选条件
    getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys, selectedKeys, confirm, clearFilters,
            }) => (
            <div style={{ padding: 8 }}>
                <Input
                    ref={node => { this.searchInput = node; }}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={e => setSelectedKeys(e.target.value ?[e.target.value] : [])}
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


    //自动加载
    componentDidMount() {

        var userId = sessionStorage.getItem("userId");
        var user = sessionStorage.getItem("user");
        user = JSON.parse(user);
        this.setState(
            {
                //  wallet: user.wallet,
                userId: userId,
            })
        this.showAllCar(0);
    }

    //重新审核
    reviewCar = (e, carId)=> {
        e.preventDefault();
        axios.get('http://localhost:8080/carInfo/save', {
            params: {
                id: carId,
                state: 0,
            }
        }).then(r=> {
            if (r.status == 200) {
                message.config({
                    top: 130,
                    duration: 2,
                    maxCount: 3,
                });
                message.info('操作成功', 1);
                this.showAllCar(0);
            }
        })
    }
//获取车主信息
    getUserInfo=(e,record)=>{
        e.preventDefault();

        this.setState({
            visible:true,
            carId:record.id,
        })
    }
    cancelModal=()=>{
        this.setState({
            visible:false,

        })
    }
    render() {
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};
        //我卖的车的数据展示列
        var carColumns = [{
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            width: 80,
            className: 'hidden',
        }, {
            title: '序号',
            width: 100,
            render: (text, record, index) => `${index + 1}`
        }, {
            title: '品牌',
            dataIndex: 'brand',
            key: 'brand',
            width: 100,
            ...this.getColumnSearchProps('brand')
        }, {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            ...this.getColumnSearchProps('name')

        }, {
            title: '起拍价',
            key: 'startPrice',
            dataIndex: 'startPrice',
            sorter: (a, b) =>a.startPrice - b.startPrice,
            render: (index, record)=>(
                <span>{index == null ? '暂无' : index + '万元'}</span>
            )

        }, {
            title: '成交价',
            key: 'price',
            dataIndex: 'price',
            sorter: (a, b) => a.price - b.price,
            render: (index, record)=>(
                <span>{index == null ? '暂无' : index + '元'}</span>
            )

        }, {
            title: '竞拍时间',
            key: 'auctionTime',
            dataIndex: 'auctionTime',
            sorter: (a, b) => new Date(a.auctionTime).getTime() - new Date(b.auctionTime).getTime(),
            render: (index, record)=>(
                <span>{index == null ? '暂无' : index}</span>
            )

        }, {
            title: '说明',
            key: 'remark',
            dataIndex: 'remark',
            render: (text, record)=>(
                <div dangerouslySetInnerHTML={{ __html: text}}></div>
            )
        }
            , {
                title: '状态',
                key: 'state',
                dataIndex: 'state',
                filters: [
                    {text: '等待审核', value: '0'},
                    {text: '等待竞拍/流拍', value: '1'},
                    {text: '支付成功', value: '3'},
                    {text: '没有通过审核', value: '4'},
                    {text: '竞拍结束，交易成功', value: '5'},

                ],
                filterMultiple: false,
                onFilter: (value, record) => JSON.stringify(record.state).indexOf(value) === 0,
                render: (text, record) => {
                    switch (text) {
                        case 0:
                        {
                            return "等待审核";
                        }
                        case 1:
                        {
                            if (record.price == null && new Date(record.auctionTime).getTime() + 600000 < new Date().getTime())
                                return "流拍"
                            return "等待竞拍";
                        }
                        case 3:
                            return "支付成功";
                        case 4:
                            return "没有通过审核";
                        case 5:
                            return "竞拍结束，交易成功";
                    }
                }


                //render: (text, record)=>(
                //    <span>{text == 0 ? '待审核' : text == 1 ? '待交易' : text == 2 ? '竞拍成功' : text == 3 ? '支付成功' : text == 5 ? '交易结束' : '未通过审核'}</span>
                //)
            }, {
                title: '操作',
                key: 'action',
                render: (text, record)=>(
                    <div>
                        <Button type={'primary'} style={{ marginRight:10}} onClick={(ev)=>{this.getUserInfo(ev,record)} }
                        >车主信息</Button>
                        <Button type={'primary'} style={{ marginRight:10}} onClick={(ev)=>{this.handleOk(ev,record)} }
                        >详情</Button>
                        <Button type={'primary'}
                                hidden={!(record.state==1&&record.price==null&&new Date(record.auctionTime).getTime()+600000<new Date().getTime())}
                                style={{ marginRight:10,marginTop:5}} onClick={(ev)=>{this.reviewCar(ev,record.id)} }
                        >重新审核</Button>
                        <Popconfirm title="确定继续吗?"
                                    onConfirm={(ev)=>{this.delCar(ev,record)}}
                                    okText="确定" cancelText="取消">
                        </Popconfirm>

                    </div>
                )
            },];
        return (
            <div >


                <Table rowKey="id" columns={carColumns} dataSource={this.state.allCar.items}
                       pagination={false}></Table>
                <Pagination showQuickJumper defaultCurrent={1}
                            total={this.state.allCar.totalNumber} current={this.state.allCar.currentIndex+1}
                            defaultPageSize={10}
                            onChange={(page)=>{this.showAllCar(page-1)}
                            }></Pagination>
                <Modal
                 visible={this.state.visible}
                 onCancel={this.cancelModal}
                 footer={null}
                >
                      <UserInfo
                       carId={this.state.carId}
                      ></UserInfo>
                </Modal>

            </div>


        )
            ;

    }
}
export default Form.create({})(AllCar);
