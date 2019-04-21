import React, { Component } from 'react';
import '../css/App.css';
import '../css/personal.css';
import {
    message,Table,Pagination,Form, Upload, Button, Icon,Modal,Tabs,
} from 'antd';
import {LocaleProvider} from 'antd';
import axios from 'axios'//这是模块的加载机制，直接写依赖库的名字，会到node_modules下去查找，因此不需要你指明前面的相对路径
import qs from 'qs';
import Title from '../title';
import BaseInfoForm from '../baseInfoForm'
import zhCN from 'antd/lib/locale-provider/zh_CN';
import PallWrop from './pallWrop';
import SellCar from '../sellCar'
class Examine extends Component {
    constructor() {
        super();
        this.state = {

        }
    }


    componentDidMount() {
        var userId = sessionStorage.getItem("userId");
        var user = sessionStorage.getItem("user");
        user = JSON.parse(user);


    }

    render() {
    const TabPane = Tabs.TabPane;

        return (
            <div>
                <Tabs defaultActiveKey="editBaseInfo">
                    <TabPane tab="基本信息审核" key="editBaseInfo">
                       <SellCar></SellCar>
                    </TabPane>
                    <TabPane tab="汽车检查" key="editPwd">

                    </TabPane>
                    <TabPane tab="图片上传" key="editPwd">

                    </TabPane>
                </Tabs>

            </div>

        );
    }


}
export default Form.create({})(Examine);
