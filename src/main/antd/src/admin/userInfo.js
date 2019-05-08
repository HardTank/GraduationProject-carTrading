import React, { Component } from 'react';
import '../css/tradingHall.css';
import {message,Button ,Icon,Row, Col, Tabs,Affix, Layout,Menu,List,Card,Pagination,Modal,Popconfirm,Empty} from 'antd';
import axios from 'axios'//这是模块的加载机制，直接写依赖库的名字，会到node_modules下去查找，因此不需要你指明前面的相对路径
import qs from 'qs';
import ReactWaterMark from 'react-watermark-component';
class UserInfo extends Component {
    constructor() {
        super();
        this.state = {

            result:{
                name:'',
                mail:'',
                adminEmail:'',
            },

        };
    }

    componentWillMount() {
        var userId = sessionStorage.getItem("userId");
        if (userId == null || userId == 0) {
            window.location.href = "#/index";
        }
        else {

            this.showUser()
            this.getWaterTest();
        }

    }
   //水印信息
    getWaterTest(){
        var userId=sessionStorage.getItem("userId")
        axios.get('http://localhost:8080/user/getName', {
            params: {id: userId}
        }).then(rs=> {
            if (rs.status == 200) {
                console.log(rs)
                this.setState({
                    adminEmail: rs.data.mail,
                })
            }
        })
    }
    showUser() {
        axios.get('http://localhost:8080/carInfo/getCar',{
            params:{id:this.props.carId}
        }).then(r=>{
            if(r.status==200){
                console.log(r)
                axios.get('http://localhost:8080/user/getName', {
                    params: {id: r.data.ownerId}
                }).then(rs=> {
                    if (rs.status == 200) {
                        console.log(rs)
                        this.setState({
                            result: rs.data,
                        })
                    }
                })
            }
        })

    }

    render() {
        var content=[];
        const text = this.state.adminEmail==null?'':this.state.adminEmail;
        const beginAlarm = function() { console.log('start alarm'); };
        const options = {
            chunkWidth: 150,
            chunkHeight: 40,
            textAlign: 'left',
            textBaseline: 'bottom',
            globalAlpha: 0.45,
            font: '10px Microsoft Yahei',
            rotateAngle: -0.26,
            fillStyle: '#666'
        }
        return (



            <ReactWaterMark
                waterMarkText={text}
                openSecurityDefense
                securityAlarm={beginAlarm}
                options={options}
            >
                <Card>
                    <Row>

                        <Col span={8}>
                            姓名：{this.state.result.name}
                        </Col>
                        <Col span={16}>
                            邮箱：{this.state.result.mail}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            手机号：{this.state.result.phone}
                        </Col>
                        <Col span={16}>
                            地址：{this.state.result.province}{this.state.result.city}{this.state.result.county}{this.state.result.address}
                        </Col>
                    </Row>

                </Card>


            </ReactWaterMark>

        );
    }


}
export default UserInfo;
