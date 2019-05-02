import React, { Component } from 'react';
import tradingHall from '../css/tradingHall.css'
import {Button ,Icon,Row, Col,Input,Modal,Pagination,Card,Form,Carousel,Tabs} from 'antd';
import axios from 'axios';//这是模块的加载机制，直接写依赖库的名字，会到node_modules下去查找，因此不需要你指明前面的相对路径
import qs from 'qs';
import io from 'socket.io-client';
import moment from 'moment';
import Comment from './comment'
import DetailCar from './detailCar'
import ReactWaterMark from 'react-watermark-component';
const { Meta } = Card;
class DetailInfo extends Component {
    constructor() {
        super();
        this.state = {
            item: [],
            fileList:[],
            position:'left'
        }
    }

    componentDidMount() {
        var carInfo = sessionStorage.getItem("carInfo")
        carInfo = JSON.parse(carInfo);
        console.log(carInfo.brand)
        this.setState({
            item: carInfo
        })
        axios.get('http://localhost:8080/upload/getList',{
            params:{
                carId:carInfo.id,
                pageIndex:0,
                pageSize:8,
            }
        }).then(r=>{
            if(r.status==200){
                console.log(r)
                this.setState({
                    fileList:r.data.content,
                })

            }
        })
    }

    onChange(key) {
        console.log(key)
    }

    handlePrev = (key)=> {

        this.refs.img.prev(); //ref = img
    }
    handleNext = ()=> {
        this.refs.img.next();
    }

    render() {
        const {message,item,fileList,position}=this.state;
        const {form} = this.props;
        // const { getFieldDecorator } = form;
        const { getFieldDecorator } = form;
        const TabPane = Tabs.TabPane;

        return (

            <div className="detailInfo" >
              <Card>
                <Row>

                    <Col span={12}>
                        <Carousel afterChange={this.onChange} ref='img' style={{height:500}}>
                            {   fileList.map(function (item,index) {
                                var src=require('../image/carImage/'+item.src+'.jpg')
                                return (
                                    <div key={item.position}  >

                                        <div style={{background:"url(" + src + ")", zIndex:2,height:300}}>

                                        </div>
                                        <div  style={{marginTop:-120,fontSize:18,fontWeight:'bold',}} >
                                            {item.position=='left'?'左前45°':item.position=='right'?'右后45°':item.position=='trunk'?'后备箱':item.position=='engineCompartment'?'发动机舱':item.position=='dashBoard'?'仪表盘':item.position='console'?'操作台':item.position=='frontSeat'?'前排座椅':'后排座椅'}

                                        </div>
                                    </div>

                                )
                            })
                            }
                        </Carousel>
                        <Row >
                            <Col span={8}>
                                <Icon type="left" theme="outlined" style={{ fontSize: '30px',float:'right'}}
                                      onClick={this.handlePrev}/>
                            </Col>
                            <Col span={8} style={{textAlign:'center'}}></Col>
                            <Col span={8}>
                                <Icon type="right" theme="outlined" style={{ fontSize: '30px'}}
                                      onClick={this.handleNext}/>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <div className="carName">
                            <div className="carInfo">{item.brand}
                                { item.productDate}款
                                {item.discharge}
                                {item.transmission}
                                { item.type}</div>
                        </div>
                        <br/>
                        <div style={{marginTop:10,marginLeft:10}}>{item.emissionStandard}/{item.mileage}
                        <br/>竞拍时间:<div style={{fontSize:30,color:'orange'}}>{ item.auctionTime}</div>
                        起拍价:
                        <div style={{fontSize:30,color:'orange'}}>{ item.startPrice}万元</div>
                        </div>
                    </Col>
                </Row>
                  </Card>
                <Tabs defaultActiveKey="editBaseInfo">
                    <TabPane tab="基本信息" key="baseInfo">

                         <DetailCar ></DetailCar>
                    </TabPane>
                    <TabPane tab="评论" key="comment">

                        <Comment></Comment>
                    </TabPane>
                </Tabs>
            </div>


        )
    }
}
export default Form.create({})(DetailInfo);