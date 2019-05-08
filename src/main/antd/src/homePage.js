import React, { Component } from 'react';
import './css/tradingHall.css';
import {Button ,Icon,Row, Col, Tabs,Affix, Layout,Menu,List,Card} from 'antd';
import axios from 'axios'//这是模块的加载机制，直接写依赖库的名字，会到node_modules下去查找，因此不需要你指明前面的相对路径
import qs from 'qs';
import Title from './title'
import Notice from './notice'
class HomePage extends Component {
    state = {
        size: 'large',
        result: '',
        name: '',
        visible: false,
    };

    render() {

        return (
            <Title
                target="index"
            >
                <Notice></Notice>
            </Title>




        );
    }


}
export default HomePage;
