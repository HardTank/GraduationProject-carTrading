import React, { Component } from 'react';
import './css/tradingHall.css';
import {Button ,Icon,Row, Col, Tabs,Affix, Layout,Menu,List,Card,Pagination} from 'antd';
import axios from 'axios'//这是模块的加载机制，直接写依赖库的名字，会到node_modules下去查找，因此不需要你指明前面的相对路径
import qs from 'qs';
import Title from './title'
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
            status:false
        };
    }
    componentDidMount() {
        var userId = sessionStorage.getItem("userId");
        if (userId==null||userId==0) {
            window.location.href = "#/index";
        }
        else{
            var ws = new WebSocket('ws://localhost:8080');
            alert(ws.readyState)
          this.showPage(0,userId)
    }

    }
    showPage(page,userId){
        axios.get('http://localhost:8080/tradingInfo/getDetailList',{
            params:{
                userId:userId,
                state:1,
                pageIndex:page,
                pageSize:this.state.pageSize,
            }}).then( r=>{
            if(r.status==200){
                this.setState({
                    result: r.data.items,
                    r: r.data,
                })
            }
        })

    }
    test(t){
        this.setState({
            test:t,
        })
    }
    onOk(id){
      //  alert(id)
      //  if(id==25)
      //return false;
      //  else
            return false;
    }
    ws(){
        var ws = new WebSocket('ws://localhost:8080');
        alert(ws.readyState)
    }
    render() {
          const{test,status}=this.state;
         // const t=this.test();
        var content=[];

        this.state.result.map(function(item,index) { // map 返回的是一个新数组

                return content.push(<Card className="app-item" key={index}
                >
                    <Row>
                        <Col span={4}>
                            <img style={{height:120,width:160}} alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
                        </Col>
                        <Col span={10}>
                            <div style={{fontSize:20,fontWeight:'bold', height:10}}>
                                <div className="carInfo">{item.brand}</div>
                                <div className="carInfo">{ item.productDate}款</div>
                                <div className="carInfo">{item.discharge}</div>
                                <div className="carInfo">{item.transmission}</div>
                                <div className="carInfo">{ item.type}</div>

                            </div><br/>
                            <div style={{marginTop:10}} >{item.emissionStandard}/{item.mileage}</div>
                        </Col>
                        <Col span={6}>
                             竞拍时间:<br/> { item.auctionTime}<br/>
                             起拍价:<div style={{fontSize:20}}>{ item.startPrice}万元</div>

                        </Col>
                        <Col span={4}>
                            <Button   type={'primary'}   onClick={this.test.bind(this,item.id)}>{item.status==1?'退订':'订阅'}</Button>
                            <Button   type={'primary'}   onClick={this.ws.bind(this,item.id)}>竞拍</Button>
                        </Col>
                    </Row>
                </Card>)
            },this)

        return (
           <Title
           target="tradingHall"

           >

                        <div>
                            <div className="title">条件筛选</div>
                            <div className="option">所在地</div>
                            <div className="content" ><div className="box">北京</div><div className="box">天津</div><div className="box">上海</div></div>
                            <div className="option">排放</div>
                            <div className="content"><div className="box">国六</div><div className="box">国六</div><div className="box">国五</div><div className="box">国四</div><div className="box">国三</div><div className="box" style={{width:100}}>国二及以下</div></div>
                            <div className="option">品牌</div>
                            <div className="content"><div className="box">奥迪</div><div className="box">奔驰</div><div className="box">大众</div><div className="box">丰田</div></div>
                            <div className="option">价格区间</div>
                            <div className="content"><div className="box">5万</div><div className="box" style={{width:100}}>5万-10万</div><div className="box" style={{width:100}}>10万-20万</div><div className="box" style={{width:100}}>20万以上</div></div>
                        </div>
               <div>

                   {content}
               </div>
               <Pagination showQuickJumper defaultCurrent={1}
                           total={this.state.r.totalNumber} current={this.state.r.number+1}
                           defaultPageSize={this.state.pageSize}
                           onChange={(page)=>{this.showPage(page-1)}
                            }></Pagination>
                  </Title>




        );
    }


}
export default TradingHall;
