import React, { Component } from 'react';
import '../css/App.css';
import '../css/personal.css';
import {
    message,Table,Pagination,Form, Upload, Button, Icon,Modal,Tabs,Row,Col,Tag,remark
} from 'antd';
import {LocaleProvider} from 'antd';
import axios from 'axios'//这是模块的加载机制，直接写依赖库的名字，会到node_modules下去查找，因此不需要你指明前面的相对路径
import qs from 'qs';
import Title from '../title';
import BaseInfoForm from '../baseInfoForm'
import zhCN from 'antd/lib/locale-provider/zh_CN';
import PallWrop from './pallWrop';
import SellCar from '../sellCar';
import Examine from './examine';
import UploadFile from './uploadFile';
import AuctionInfo from './auctionInfoForrm';
import moment from 'moment';
import BasicDemo from '../editor'
import ReactWaterMark from 'react-watermark-component';
const FormItem = Form.Item;
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
            carID: '',
            list: [],
            id: '',
            adminEmail:'',
        }
    }

    show = (page)=> {
        var userId = sessionStorage.getItem("userId");
        axios.get('http://localhost:8080/carInfo/getList', {
                params: {
                    state: 0,
                    deleted:0,
                    pageIndex: page,
                    pageSize: this.state.pageSize,

                }
            }
            //axios No 'Access-Control-Allow-Origin' header is present on the requested resource.   安装chrome 插件:Allow-Control-Allow-Origin

        ).then(
            r => {
                var data = r.data;

                this.setState({
                    result: data,
                });
            }
        )

    }

    showOwnerInfo = (e, id)=> {
        e.preventDefault();
        this.setState({
            userVisible: true,
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
                    this.setState(
                        {
                            name: r.data.name,
                            pwd: r.data.pwd,
                            mail: r.data.mail,
                            phone: r.data.phone,
                            cardId: r.data.cardId,
                            address: r.data.address,
                            bankCardNum: r.data.bankCardNum,
                            openBank: r.data.openBank,
                            province: r.data.province,
                            city: r.data.city,
                            county: r.data.county,
                            wallet: r.data.wallet,
                        })
                }
                ;
            }
        );
    }
    handleCancel = ()=> {
        this.setState({
            visible: false,
            id: '',
            userVisible:false,
        })
         this.show(0);
    }

    showModal = (e, record)=> {
        e.preventDefault();
        this.getAuctionP(record.id);
        console.info('carID'+record.id);
        sessionStorage.setItem('remark',record.remark);
        this.setState({
            visible: true,
            carId: record.id,
            remark:record.remark,

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
        title: '名称',
        dataIndex: 'name',
        key: 'name',
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
        title: '备注',
        key: 'remark',
        dataIndex: 'remark',
        className:'hidden'
    }
        , {
        title: '操作',
        dataIndex: 'action',
        render: (text, record) => (
            <div>
                <Button type="primary" onClick={(ev)=>this.showOwnerInfo(ev,record.ownerId)}>车主信息</Button>
                <Button type={'primary'} style={{ marginLeft:10}} onClick={(ev)=>{this.showDetail(ev,record)} }
                >车辆详情</Button>
                <Button  type="primary"  style={{ marginLeft:10}} disabled={false} onClick={(ev)=>this.showModal(ev,record)}>审核</Button>

            </div>
        )
    }];
    showDetail=(e, item)=> {
        e.preventDefault();
        sessionStorage.setItem("carInfo", JSON.stringify(item))
        window.open("http://localhost:3000/#/info")

    }
    handleOk = (e) => {
        e.preventDefault();
        this.form.validateFields((err, values) => {
            if (!err) {
                var userId = sessionStorage.getItem("userId");
                let formData = new FormData();
                if (this.state.id > 0)
                    formData.append('id', this.state.id);
                values.auctionTime = new Date(values.auctionTime.format('YYYY-MM-DD HH:MM:SS'));
                formData.append('deposit', values.deposit);
                formData.append('time', values.auctionTime);
                formData.append('startPrice', values.startPrice);
                formData.append('adminId', userId);//adminId
                formData.append('carId', this.state.carId);
                axios({
                    url: 'http://localhost:8080/transactionInfo/save',
                    method: 'post',
                    data: formData,
                    processData: false,// 告诉axios不要去处理发送的数据(重要参数)
                    contentType: false,   // 告诉axios不要去设置Content-Type请求头
                }).then((res)=> {
                    if (res.status == 200) {
                        this.setState({
                            id: res.data.id,
                        })
                        console.info(res)
                        message.config({
                            top: 130,
                            duration: 2,
                            maxCount: 3,
                        });
                        message.info('数据保存成功', 1);

                    }
                })

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
        this.setState(
            {
                userId: userId,
            })
        this.show(0);
        this.getEmail(userId);
    }
    getEmail=(userId)=>{
        axios.get('http://localhost:8080/user/getName',{
            params:{
                id:userId,
            }
        }).then(r=>{
            if(r.status==200)
            this.setState({
                adminEmail: r.data.mail,
            })
        })
    }
    getAuctionP = (id)=> {

            axios.get('http://localhost:8080/transactionInfo/getList', {
                    params: {
                        carId: id,
                        pageIndex: 0,
                        pageSize: 1,
                    }
                }
            ).then(
                r => {
                    if (r.status == 200) {
                        if (r.data.content.length > 0) {
                            var tr = r.data.content[0];
                            this.setState({
                                id: tr.id,
                            });
                        }
                    }
                })
    }
    getAuction = (key)=> {
        console.log(key)
        if (key == 'auctionInfo') {
            axios.get('http://localhost:8080/transactionInfo/getList', {

                    params: {
                        carId: this.state.carId,
                        pageIndex: 0,
                        pageSize: 1,
                    }
                }
            ).then(
                r => {
                    if (r.status == 200) {
                        if (r.data.content.length > 0) {
                            var tr = r.data.content[0];
                            tr.auctionTime = moment(tr.auctionTime, 'YYYY-MM-DD HH:MM:SS');
                            this.form.setFieldsValue(tr);
                            this.setState({
                                id: tr.id,
                            });
                        }
                    }

                })
        }
    }

    setReview(e) {
        e.preventDefault();
        console.log('id' + this.state.id)
        var remark=sessionStorage.getItem('remark');
        if (this.state.id > 0) {
            axios.get('http://localhost:8080/carInfo/save', {
                params: {
                    id: this.state.carId,
                    state: 1,
                    remark:remark,
                }
            }).then(
                r=> {
                    if(r.status==200) {
                        message.config({
                            top: 130,
                            duration: 2,
                            maxCount: 3,
                        });
                        message.info('操作成功', 1);
                    }
                }
            );
        }
        else {
            message.config({
                top: 130,
                duration: 2,
                maxCount: 3,
            });
            message.info('请添加竞拍信息', 1);
        }
    }
       setRemark(remark){
           sessionStorage.setItem('remark',remark);
           message.config({
               top: 130,
               duration: 2,
               maxCount: 3,
           });
           message.info('保存成功!', 1);
       }
       setBackReview(e){
           e.preventDefault();
           var remark=sessionStorage.getItem('remark');
           console.log(remark)
           if(remark!=''&&remark!='null'){
               axios.get('http://localhost:8080/carInfo/save',{
                   params:{
                       id:this.state.carId,
                       remark:remark,
                       state:4,
                   }
               }).then(r=> {
                   if(r.status==200){
                       message.config({
                           top: 130,
                           duration: 2,
                           maxCount: 3,
                       });
                       message.info('操作成功', 1);
                   }
               })
           }else{
               message.config({
                   top: 130,
                   duration: 2,
                   maxCount: 3,
               });
               message.info('请在备注中说明原因', 1);
           }



       }
    render() {
        const text = this.state.adminEmail==null?'':this.state.adminEmail;
        const beginAlarm = function() { console.log('start alarm'); };
        const options = {
            chunkWidth: 200,
            chunkHeight: 80,
            textAlign: 'left',
            textBaseline: 'bottom',
            globalAlpha: 0.45,
            font: '14px Microsoft Yahei',
            rotateAngle: -0.26,
            fillStyle: '#666'
        }
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
                    visible={this.state.userVisible}
                    onCancel={this.handleCancel}
                    footer={null}

                >
                    <ReactWaterMark
                        waterMarkText={text}
                        openSecurityDefense
                        securityAlarm={beginAlarm}
                        options={options}
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
                        adminEmail={this.state.adminEmail}
                    ></BaseInfoForm>
                        </ReactWaterMark>
                </Modal>
                <Modal
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                    width="1000px"
                    destroyOnClose={true}
                >
                    <Button type="primary" onClick={(ev)=>{this.setReview(ev)}}>通过</Button>
                    <Button type="primary" style={{marginLeft:50}} onClick={(ev)=>{this.setBackReview(ev)}}>不通过</Button>
                    <Tabs defaultActiveKey="reviewCar" onChange={this.getAuction}>

                        <TabPane tab="汽车检查" key="reviewCar">

                            <Examine
                                carId={this.state.carId}

                            ></Examine>


                        </TabPane>
                        <TabPane tab="竞拍信息" key="auctionInfo">

                            <AuctionInfo
                                carId={this.state.carId}
                                ref={this.saveFormRef}
                                onCancel={this.handleCancel}
                                onOk={this.handleOk}
                                id={this.state.id}
                            ></AuctionInfo>


                        </TabPane>
                        <TabPane tab="备注" key="remark">

                            <BasicDemo
                                carId={this.state.carId}
                                ref={this.saveFormRef}
                                onCancel={this.handleCancel}
                                onOk={this.setRemark}
                                remark={this.state.remark}
                                id={this.state.id}
                            ></BasicDemo>


                        </TabPane>
                    </Tabs>

                </Modal>
            </div>

        );
    }


}
export
default
Form
    .create({})

    (
        Review
    )
;
