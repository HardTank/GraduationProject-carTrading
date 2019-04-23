import React, { Component } from 'react';
import '../css/App.css';
import '../css/personal.css';
import {
    message,Tabs,Menu,Layout,Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,
} from 'antd';
import {LocaleProvider} from 'antd';
import axios from 'axios'//这是模块的加载机制，直接写依赖库的名字，会到node_modules下去查找，因此不需要你指明前面的相对路径
import qs from 'qs';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import SellCar from '../sellCar'
import moment from "moment";
class AddCar extends Component {

    render() {
        const TabPane = Tabs.TabPane;

        return (
            <div style={{padding:30,backgroundColor:' white',marginTop:-30,marginLeft:-30}}>

                <SellCar></SellCar>

            </div>


        );
    }


}
export default Form.create({})(AddCar);
