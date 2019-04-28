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
            test: 'xxx'
        };
    }
    componentDidMount() {
        var userId = sessionStorage.getItem("userId");
        if (userId==null||userId==0) {
            window.location.href = "#/index";
        }
        else{
          this.showPage(0)
    }

    }
    showPage(page){
        axios.get('http://localhost:8080/carInfo/getList',{
            params:{
                pageIndex:page,
                pageSize:this.state.pageSize,
            }}).then( r=>{
            if(r.status==200){
                this.setState({
                    result: r.data.content,
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
    render() {
          const{test}=this.state;
         // const t=this.test();
        var content=[];

        this.state.result.map(function(item,index) { // map 返回的是一个新数组

                return content.push(<Card className="app-item" key={index}
                >
                    <Row>
                        <Col span={4}>
                            <img style={{height:120,width:160}} alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />
                        </Col>
                        <Col span={12}>
                            <div style={{fontSize:20,fontWeight:'bold', height:10}}>
                                <div className="carInfo">{item.brand}</div>
                                <div className="carInfo">{ item.productDate}款</div>
                                <div className="carInfo">{item.discharge}</div>
                                <div className="carInfo">{item.transmission}</div>
                                <div className="carInfo">{ item.type}</div>

                            </div><br/>
                            <div style={{marginTop:10}} >{item.emissionStandard}/{item.mileage}</div>
                        </Col>
                        <Col span={4}>
                            { test}
                        </Col>
                        <Col span={4}>
                            <Button   type={'primary'}>订阅</Button>
                        </Col>
                    </Row>
                </Card>)
            })

        return (
           <Title
           target="tradingHall"

           >

                        <div>
                            <div className="title">条件筛选</div>
                            <div className="option">所在地</div>
                            <div className="content">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</div>
                            <div className="content">xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx</div>
                            <div className="option">排放</div>
                            <div className="content">xx</div>
                            <div className="option">年限</div>
                            <div className="content">xx</div>
                            <div className="option">品牌</div>
                            <div className="content">xx</div>
                            <div className="option">所在地</div>
                            <div className="content">xx</div>
                            <div className="option">价格区间</div>
                            <div className="content">排放</div>
                        </div>
               <div>

                   {content}
               </div>
               <Pagination showQuickJumper defaultCurrent={1}
                           total={this.state.r.totalElements} current={this.state.r.number+1}
                           defaultPageSize={this.state.pageSize}
                           onChange={(page)=>{this.showPage(page-1)}
                            }></Pagination>
                  </Title>




        );
    }


}
export default TradingHall;
