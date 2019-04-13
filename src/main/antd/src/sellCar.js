import React, { Component } from 'react';
import './css/App.css';
import './css/personal.css';
import {
    message,Tabs,Menu,Layout,Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,
} from 'antd';
import {LocaleProvider} from 'antd';
import axios from 'axios'//这是模块的加载机制，直接写依赖库的名字，会到node_modules下去查找，因此不需要你指明前面的相对路径
import qs from 'qs';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import CarInfo from './sellCar/carInfo'
import ConfigurationInfo from './sellCar/configurationInfo'
import ProcedureInfo from './sellCar/procedureInfo'
class SellCar extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                //pwd=values.pwd;
                if (typeof values.area == "string") {
                    values.area = values.area.split("/");
                }
                var userId = sessionStorage.getItem("userId");
                axios.get('http://localhost:8080/user/save', {
                        xhrFields: {
                            withCredentials: true
                        },
                        crossDomain: true,
                        params: {}
                    }
                ).then(
                    r => {

                        if (r.status == 200) {
                            sessionStorage.setItem("userId", r.data.id);
                            message.config({
                                top: 130,
                                duration: 2,
                                maxCount: 3,
                            });
                            message.info('修改成功', 1);
                            var str = JSON.stringify(r.data);
                            sessionStorage.setItem("user", str);
                            var user = sessionStorage.getItem("user");
                            user = JSON.parse(user);
                            this.setState({
                                name: r.data.name,
                                login: true,
                                loginVisible: false,

                            });
                        }
                        ;
                    }
                );
            }
        })
    }


    //componentDidMount() {
    //    var user = sessionStorage.getItem("user");
    //    user = JSON.parse(user);
    //    user.area = user.province + "/" + user.city + "/" + user.county;
    //    //this.props.form.setFieldsValue(user);
    //
    //}

    render() {
        const { getFieldDecorator } = this.props.form;
        const TabPane = Tabs.TabPane;

        return (
            <div style={{padding:30,backgroundColor:' white',marginTop:-30,marginLeft:-30}}>
                <Tabs defaultActiveKey="editBaseInfo">
                    <TabPane tab="基本信息修改" key="editBaseInfo">
                        <h2 style={{marginLeft:40}}>基本信息:</h2>
                        <CarInfo></CarInfo>
                        <h2 style={{marginLeft:40}}>配置信息:</h2>
                        <ConfigurationInfo></ConfigurationInfo>
                        <h2 style={{marginLeft:40}}>手续信息:</h2>
                        <ProcedureInfo></ProcedureInfo>
                    </TabPane>
                    <TabPane tab="密码修改" key="editPwd">

                    </TabPane>
                </Tabs>

            </div>


        );
    }


}
export default Form.create({})(SellCar);
