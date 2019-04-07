import React, { Component } from 'react';
import './css/tradingHall.css';
import {Button ,Icon,Row, Col, Tabs,Affix, Layout,Menu,List,Card} from 'antd';
import axios from 'axios'//这是模块的加载机制，直接写依赖库的名字，会到node_modules下去查找，因此不需要你指明前面的相对路径
import qs from 'qs';
import Title from './title'
class TradingHall extends Component {
    state = {
        size: 'large',
        result: '',
        name: '',
        visible: false,
    };
    componentDidMount() {
        var userId = sessionStorage.getItem("userId");
        if (userId==null||userId==0) {
            window.location.href = "#/index";
        }
    }
    render() {

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


                  </Title>




        );
    }


}
export default TradingHall;
