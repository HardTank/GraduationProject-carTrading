import React, { Component } from 'react';
import './css/tradingHall.css';
import {Button ,Icon,Row, Col, Tabs,Affix, Layout,Menu,List,Card} from 'antd';
import axios from 'axios'//这是模块的加载机制，直接写依赖库的名字，会到node_modules下去查找，因此不需要你指明前面的相对路径
import qs from 'qs';
class TradingHall extends Component {
    state = {
        size: 'large',
        result: '',
        name: '',
        visible: false,
    };

    render() {
        const {
            Header, Footer, Sider, Content,
            } = Layout;
        const data = [
            {
                title: 'Title 1',
            }
        ];
        return (
            <div>
                <Layout>
                    <Affix>
                        <Header>
                            <div className="head">
                                <Row >
                                    <Col span={4}><a href="#/index">首页</a> </Col>
                                    <Col span={4}><a href="#/tradingHall">
                                        <div className="select">交易大厅</div>
                                    </a ></Col>
                                    <Col span={4}><a>服务中心</a></Col>
                                    <Col span={4}><a>管理中心</a></Col>
                                    <Col span={8}>
                                        <Row className="login">登陆 注册</Row>
                                    </Col>
                                </Row>
                            </div>
                        </Header>
                    </Affix>
                    <Content>

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


                    </Content>
                    <Footer></Footer>
                </Layout>
            </div>




        );
    }


}
export default TradingHall;
