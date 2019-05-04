import React, { Component } from 'react';
import './css/tradingHall.css';
import {message,Button ,Icon,Row, Col, Tabs,Affix, Layout,Menu,List,Card,Pagination,Modal,Popconfirm,Empty} from 'antd';
import axios from 'axios'//这是模块的加载机制，直接写依赖库的名字，会到node_modules下去查找，因此不需要你指明前面的相对路径
import qs from 'qs';
import Title from './title'
import AuctionCenter from './tradingHall/auctionCenter'
import CountDown from './tradingHall/countDown'
class TradingHall extends Component {
    constructor() {
        super();
        this.state = {
            size: 'large',
            result: [],
            name: '',
            visible: false,
            pageIndex: 0,
            pageSize: 10,
            r: '',
            test: 'xxx',
            status: false,
            visible: false,
            cityList: [],
            brandList: [],
            brand: '',
            allBrand: true,
            brandState:'all',
            location: '',
            allLocation: true,
            locationState:'all',
            startPrice:'',
            endPrice:'',
            allPrice:true,
            priceState:'all',
            emissionStandard:'',
            allEmissionStandard:true,
            emissionStandardState:'all',




        };
    }

    componentDidMount() {
        var userId = sessionStorage.getItem("userId");
        if (userId == null || userId == 0) {
            window.location.href = "#/index";
        }
        else {

            this.getCity();
            this.getBrand();
            this.showPage(0, userId)
        }

    }

    //获取城市列表
    getCity() {
        axios.get('http://localhost:8080/procedureInfo/location', {}).then(r=> {
            if (r.status == 200) {
                this.setState({
                    cityList: r.data,
                })
            }
        })
    }

    //获取厂商列表
    getBrand() {
        axios.get('http://localhost:8080/tradingInfo/brand', {}).then(r=> {
            if (r.status == 200) {
                this.setState({
                    brandList: r.data,
                })
            }
        })
    }

    showPage(page, userId) {
        axios.get('http://localhost:8080/tradingInfo/getDetailList', {
            params: {
                userId: userId,
                state: 1,
                pageIndex: page,
                pageSize: this.state.pageSize,
            }
        }).then(r=> {
            if (r.status == 200) {
                this.setState({
                    result: r.data.items,
                    r: r.data,
                })
            }
        })

    }

    handleOk(item) {
        sessionStorage.setItem("carInfo", JSON.stringify(item))
        window.open("http://localhost:3000/#/info")
    }

    showModal = ()=> {
        this.setState({
            visible: true,
        })
    }
    cancelModal = ()=> {
        this.setState({
            visible: false,
        })
    }
    //订阅汽车
    orderCar(carId, status, deposit) {
        var userId = sessionStorage.getItem("userId")
        if (status == 0) {

            var userId = sessionStorage.getItem('userId')
            axios.get('http://localhost:8080/user/getName', {
                params: {
                    id: userId,
                }
            }).then(r=> {
                    if (r.status == 200) {
                        if (deposit > r.data.wallet) {
                            message.config({
                                top: 130,
                                duration: 2,
                                maxCount: 3,
                            });
                            message.info('余额不足,请到个人中心里充值!', 1);
                        }
                        else {
                            this.saveUserWallet(deposit, carId)
                        }

                    }

                }
            )

            // this.changeWallet(carId,userId,deposit)
        }
    }

//更新用户余额
    saveUserWallet = (wallet, carId)=> {
        var userId = sessionStorage.getItem('userId')
        axios.get('http://localhost:8080/user/saveMoney', {
            params: {
                id: userId,
                wallet: -wallet
            }
        }).then(r=> {
                if (r.status == 200) {

                    this.saveWallet(wallet, carId);
                }

            }
        )
    }
    //更新账户流水
    saveWallet = (wallet, carId)=> {
        var userId = sessionStorage.getItem('userId')
        axios.get('http://localhost:8080/wallet/save', {
            params: {
                userId: userId,
                type: 2,
                amount: wallet,
            }
        }).then(r=> {
                if (r.status == 200) {

                    this.saveRecord(carId)
                }

            }
        )
    }
    //更新交易记录
    saveRecord = (carId)=> {
        var userId = sessionStorage.getItem('userId')
        axios.get('http://localhost:8080/transactionRecord/save', {
            params: {
                userId: userId,
                state: 0,
                carId: carId,
                price: 0,

            }
        }).then(r=> {
                if (r.status == 200) {

                    message.config({
                        top: 130,
                        duration: 2,
                        maxCount: 3,
                    });
                    message.info('订阅成功,请去个人中心查看', 1);
                    this.showPage(0, userId)
                }

            }
        )
    }
//厂商的筛选条件
    updateBrand(brand) {

        if (brand =='all')
            this.setState({
                allBrand: true,
                brandState:'all',
            })
        else
        this.setState({
            allBrand: false,
            brand: brand,
            brandState:brand,
        })
    }


//所在地筛选条件
    updateLocation(location) {

        if (location =='all')
            this.setState({
                allLocation: true,
                locationState:'all',
            })
        else
            this.setState({
                allLocation: false,
                location: location,
                locationState:location,
            })
    }
//emissionStandard 排放标准筛选条件
    updateEmissionStandard=(e,emissionStandard)=> {
        e.preventDefault();

        if (emissionStandard =='all')
            this.setState({
                allEmissionStandard: true,
                emissionStandardState:'all',
            })
        else
            this.setState({
                allEmissionStandard: false,
                emissionStandard: emissionStandard,
                emissionStandardState:emissionStandard,
            })
    }
//价格筛选条件
    updatePrice=(e,startPrice,endPrice)=>{
        e.preventDefault();

        if (startPrice =='all')
            this.setState({
                allPrice: true,
                priceState:'all'
            })
        else
            this.setState({
                allPrice: false,
                startPrice: startPrice,
                endPrice:endPrice,
                priceState:endPrice,
            })
    }
    judgePrice(price){

        if(this.state.price==5){
            if(price<=5)
                return true;
        }
        if(this.state.price==10){
            if(price<=10&&price>5)
                return true;
        }
        if(this.state.price==15){
            if(price<=20&&price>10)
                return true;
        }
        if(this.state.price==5){
            if(price>20)
                return true;
        }
        return false;
    }
    render() {
        const {test,status,priceState,emissionStandardState,brandState,locationState}=this.state;
        // const t=this.test();
        var content = [];
         var count=0;
        this.state.result.map(function (item, index) { // map 返回的是一个新数组
            var src = require('./image/carImage/' + item.src + '.jpg')
            if (this.state.allBrand || item.brand == this.state.brand)
                if (this.state.allLocation || item.location == this.state.location)
                    if (this.state.allEmissionStandard || item.emissionStandard == this.state.emissionStandard)
                        if (this.state.allPrice|| 3>this.state.startPrice&&3<=this.state.endPrice){
                            return content.push(<Card className="app-item" key={index}
                            >
                                <Row>
                                    <Col span={4}>
                                        <img style={{height:120,width:160}} alt="example"
                                             src={src}/>
                                    </Col>
                                    <Col span={10}>
                                        <div className="carName" onClick={this.handleOk.bind(this,item)}>
                                            <div className="carInfo">{item.brand}
                                                { item.name}
                                                { item.productDate}款
                                                {item.discharge}
                                                {item.transmission}
                                                { item.type}</div>
                                        </div>
                                        <br/>
                                        <div
                                            style={{marginTop:10,marginLeft:10}}>{item.location}/{item.emissionStandard}/{item.mileage}</div>
                                    </Col>
                                    <Col span={6}>
                                        竞拍时间:{item.auctionTime}<br/>
                                        <div style={{fontSize:20}}><CountDown
                                            endTime={item.auctionTime}
                                        >

                                        </CountDown></div>
                                        <Row>
                                            <Col span={12}> 起拍价:
                                                <div style={{fontSize:20}}>{ item.startPrice}万元</div>
                                            </Col>
                                            <Col span={12}>
                                                保证金:
                                                <div style={{fontSize:20}}>{ item.deposit}元</div>
                                            </Col>
                                        </Row>


                                    </Col>
                                    <Col span={4}>
                                        <Popconfirm title="需要加保证金,当竞拍结束后退还,确定继续吗"
                                                    onConfirm={this.orderCar.bind(this,item.id,item.status,item.deposit)}
                                                    okText="确定" cancelText="取消">
                                            <Button type={'primary'}
                                            >{item.status == 1 ? '退订' : '订阅'}({item.count})</Button><br/>

                                        </Popconfirm>
                                        <Button
                                            hidden={item.status != 1}
                                            style={{marginTop:20}}
                                            type={'primary'}
                                            onClick={this.showModal }
                                        >
                                            竞拍
                                        </Button>
                                    </Col>
                                </Row>
                                <Modal
                                    visible={this.state.visible}
                                    onCancel={this.cancelModal}
                                    footer={null}
                                >
                                    <AuctionCenter
                                        carId={item.id}
                                        startPrice={item.startPrice}
                                        endTime={item.auctionTime}

                                    ></AuctionCenter>
                                </Modal>
                            </Card>)

                        }


        }, this)
        return (
            <Title
                target="tradingHall"

            >

                <div>


                    <div  >
                        <Card title="所在地">
                            <Button type={locationState=='all'?'primary':''} onClick={  this.updateLocation.bind(this,'all') } className="box">全部</Button>
                            {this.state.cityList.map(function (item, index) {
                                return (
                                    <Button type={locationState==item.plateLocation?'primary':''} key={index} onClick={this.updateLocation.bind(this,item.plateLocation) }
                                         className="box">{item.plateLocation}</Button>
                                )
                            },this)
                            }
                        </Card>

                    </div>

                    <div  >
                        <Card title="排放">
                            <Button type={emissionStandardState=='all'?'primary':''} className="box" onClick={(ev)=>{this.updateEmissionStandard(ev,'all')}}>全部</Button>
                            <Button type={emissionStandardState=='国六'?'primary':''} className="box" onClick={(ev)=>{this.updateEmissionStandard(ev,'国六')}}>国六</Button>
                            <Button type={emissionStandardState=='国五'?'primary':''} className="box" onClick={(ev)=>{this.updateEmissionStandard(ev,'国五')}}>国五</Button>
                            <Button type={emissionStandardState=='国四'?'primary':''} className="box" onClick={(ev)=>{this.updateEmissionStandard(ev,'国四')}}>国四</Button>
                            <Button type={emissionStandardState=='国三'?'primary':''} className="box" onClick={(ev)=>{this.updateEmissionStandard(ev,'国三')}}>国三</Button>
                            <Button type={emissionStandardState=='国二'?'primary':''} className="box" onClick={(ev)=>{this.updateEmissionStandard(ev,'国二')}}>国二</Button>
                            <Button type={emissionStandardState=='国一'?'primary':''} className="box" onClick={(ev)=>{this.updateEmissionStandard(ev,'国一')}}>国一</Button>
                        </Card>
                    </div>

                    <div  >
                        <Card title="品牌">
                            <Button  type={brandState=='all'?'primary':''} onClick={  this.updateBrand.bind(this,'all') } className="box">全部</Button>

                            {this.state.brandList.map(function (item, index) {
                                return (
                                    <Button key={index} onClick={  this.updateBrand.bind(this,item.brand) }
                                            type={brandState==item.brand?'primary':''}
                                         className="box">{item.brand}</Button>
                                )
                            }, this)
                            }
                        </Card>
                    </div  >

                    <div >
                        <Card title="价格区间">
                            <Button className="box" type={priceState=='all'?'primary':''}onClick={(ev)=>{this.updatePrice(ev,'all')}}>全部</Button>
                            <Button className="box" type={priceState==5?'primary':''} onClick={(ev)=>{this.updatePrice(ev,0,5)}}>5万以下</Button>
                            <Button className="box" type={priceState==10?'primary':''}onClick={(ev)=>{this.updatePrice(ev,5,10)}}>5万-10万</Button>
                            <Button className="box" type={priceState==20?'primary':''} onClick={(ev)=>{this.updatePrice(ev,10,20)}}>10万-20万</Button>
                            <Button className="box" type={priceState==10000?'primary':''} onClick={(ev)=>{this.updatePrice(ev,20,10000)}}>20万以上</Button>
                        </Card>
                    </div>
                </div>
                <div>

                    {content.length==0?<Empty/>:content}
                </div>
                <Pagination showQuickJumper defaultCurrent={1}
                            total={this.state.r.totalNumber} current={this.state.r.preIndex+1}
                            defaultPageSize={this.state.pageSize}
                            onChange={(page)=>{this.showPage(page-1)}
                            }></Pagination>
            </Title>




        );
    }


}
export default TradingHall;
