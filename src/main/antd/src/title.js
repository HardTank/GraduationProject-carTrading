import React, { Component } from 'react';
import './css/App.css';
import './css/title.css';
import {Affix,Tag,Row, Col, Layout,Menu} from 'antd';
import axios from 'axios'//这是模块的加载机制，直接写依赖库的名字，会到node_modules下去查找，因此不需要你指明前面的相对路径
import qs from 'qs';
import TradingHall from './tradingHall';
import App from './App';
class Title extends Component {
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
        return (
            <div>

                <Layout>
                    <Affix>
                        <Header>
                            <div className="head">

                                    <Row >
                                        <Col span={4}><a href="#/index" ><div className="select">首页</div></a> </Col>
                                        <Col span={4}><a href="#/tradingHall">交易大厅</a ></Col>
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
                    </Content>
                    <Footer></Footer>
                </Layout>
            </div>




        );
    }


}
export default Title;
