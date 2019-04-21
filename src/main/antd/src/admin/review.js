import React, { Component } from 'react';
import '../css/App.css';
import '../css/personal.css';
import {
    message,Table,Pagination,Form, Upload, Button, Icon,Modal,Tabs
} from 'antd';
import {LocaleProvider} from 'antd';
import axios from 'axios'//这是模块的加载机制，直接写依赖库的名字，会到node_modules下去查找，因此不需要你指明前面的相对路径
import qs from 'qs';
import Title from '../title';
import BaseInfoForm from '../baseInfoForm'
import zhCN from 'antd/lib/locale-provider/zh_CN';
import PallWrop from './pallWrop';
import SellCar from '../sellCar';
import Examine from './examine'
class Review extends Component {
    constructor() {
        super();
        this.state = {
            review: false,
            confirm: true,
            pageSize: 8,
            result: [],
            visible: false,
            carVisible: false,
            carID:'',
        }
    }

    show = (page)=> {
        var userId = sessionStorage.getItem("userId");
        axios.get('http://localhost:8080/carInfo/getList', {
                params: {
                    state: 0,
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

    showOwnerInfo = (e, id)=> {
        e.preventDefault();
        this.setState({
            visible: true,
        })
        axios.get('http://localhost:8080/user/login', {
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                params: {
                    id: id,
                    pageIndex: 0,
                    pageSize: 1,
                }
            }
        ).then(
            r => {

                if (r.status == 200) {
                    //存储用户Id
                    sessionStorage.setItem("userId", r.data.id);
                    var str = JSON.stringify(r.data);
                    sessionStorage.setItem("user", str);
                    //获取用户信息
                    var user = sessionStorage.getItem("user");
                    user = JSON.parse(user);
                    sessionStorage.setItem("userId", r.data.id);
                    //存储钱包信息
                    console.info("钱包余额" + r.data.wallet);
                    sessionStorage.setItem("wallet", r.data.wallet);
                    // this.props.form.setFieldsValue(user);
                    this.setState(
                        {
                            name: user.name,
                            pwd: user.pwd,
                            mail: user.mail,
                            phone: user.phone,
                            cardId: user.cardId,
                            address: user.address,
                            bankCardNum: user.bankCardNum,
                            openBank: user.openBank,
                            province: user.province,
                            city: user.city,
                            county: user.county,
                            wallet: user.wallet,
                        })
                }
                ;
            }
        );
    }
    handleCancel = ()=> {
        this.setState({
            visible: false,
            carVisible: false,
        })
    }
    showModal = (e, id)=> {
        e.preventDefault();
        console.info(id);
        this.setState({
            carVisible: true,
            carId:id,
        })
    }
    columns = [{
        title: 'ID',
        dataIndex: 'id',
        key: 'id',
        className: 'hidden',
    }, {
        title: '序号',
        width: 80,
        render: (text, record, index) => `${index + 1}`
    }, {
        title: '品牌',
        dataIndex: 'brand',
        key: 'brand',
    }, {
        title: '款式',
        dataIndex: 'productDate',
        key: 'productDate',
    }, {
        title: '变速器',
        key: 'transmission',
        dataIndex: 'transmission',

    }, {
        title: '排放',
        key: 'discharge',
        dataIndex: 'discharge',

    }, {
        title: '型号',
        key: 'type',
        dataIndex: 'type',

    }, {
        title: '操作',
        dataIndex: 'action',
        render: (text, record) => (
            <div>
                <Button onClick={(ev)=>this.showOwnerInfo(ev,record.ownerId)}>车主信息</Button>
                <Button disabled={false} onClick={(ev)=>this.showModal(ev,record.id)}>审核</Button>
            </div>
        )
    }];

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

    render() {

        const TabPane = Tabs.TabPane;
        return (
            <div>

                <Table rowKey="id" columns={this.columns} dataSource={this.state.result.content}
                       pagination={false}></Table>
                <Pagination showQuickJumper defaultCurrent={1}
                            total={this.state.result.totalElements} current={this.state.result.number+1}
                            defaultPageSize={this.state.pageSize}
                            onChange={(page)=>{this.show(page-1)}
                            }></Pagination>
                <Modal
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}

                >
                    <BaseInfoForm
                        name={this.state.name}
                        cardId={this.state.cardId}
                        gender={this.state.gender}
                        mail={this.state.mail}
                        address={this.state.address}
                        phone={this.state.phone}
                        wallet={this.state.wallet}
                        bankCardNum={this.state.bankCardNum}
                        openBank={this.state.openBank}
                        province={this.state.province}
                        city={this.state.city}
                        county={this.state.county}
                    ></BaseInfoForm>
                </Modal>
                <Modal
                    visible={this.state.carVisible}
                    onCancel={this.handleCancel}
                    footer={null}
                    width="1000px"
                    destroyOnClose={true}
                >
                    <Tabs defaultActiveKey="editBaseInfo">
                        <TabPane tab="基本信息审核" key="editBaseInfo">
                            <SellCar
                            carId={this.state.carId}

                            ></SellCar>
                        </TabPane>
                        <TabPane tab="汽车检查" key="editPwd">

                        </TabPane>
                        <TabPane tab="图片上传" key="upload">

                        </TabPane>
                    </Tabs>

                </Modal>
            </div>

        );
    }


}
export default Form.create({})(Review);
