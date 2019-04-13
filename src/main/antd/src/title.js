import React, { Component } from 'react';
import './css/App.css';
import './css/title.css';
import Login  from './login';
import {Select,Affix,Tag,Row, Col, Layout,Menu,Button,Form, Icon, Input,Checkbox,Modal, message} from 'antd';
import axios from 'axios'//这是模块的加载机制，直接写依赖库的名字，会到node_modules下去查找，因此不需要你指明前面的相对路径
import qs from 'qs';
import TradingHall from './tradingHall';
import Register from './register';
import App from './App';

class Title extends Component {
    state = {
        size: 'large',
        result: '',
        login: false,
        name: '',
        pageIndex: 0,
        pageSize: 1,
        loginVisible: false,
        index: 'select',
        target: 'index',
        registerVisible: false,

    };

    showModal = (target)=> {
        this.setState({loginVisible: true, target: target});
    }
    showRegister = (e)=> {
        e.preventDefault();
        this.setState({loginVisible: false, registerVisible: true});
    }





    judgeLogin = (e, target)=> {
        e.preventDefault();
        var userId = sessionStorage.getItem("userId");

        if (userId > 0) {
            var firstLogin= sessionStorage.getItem("firstLogin")
           // if(firstLogin==null)
               // window.location.reload(true);
            window.location.href = "#/" + target;

        }
        else {
            message.config({
                top: 130,
                duration: 2,
                maxCount: 3,
            });
            message.info('请先登陆!', 1, this.showModal(target));
            this.setState({target: target})
        }
    }
    exitLogin = (e)=> {
        e.preventDefault();
        var userId = sessionStorage.setItem("userId", 0);
        window.location.href = "#/index"
        this.setState({

            login: false,

        });
    }
    handleCancel = ()=> {
        this.setState({loginVisible: false, registerVisible: false});
    }
    handleOk = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                axios.get('http://localhost:8080/user/show', {
                        xhrFields: {
                            withCredentials: true
                        },
                        crossDomain: true,
                        params: {
                            name: values.name,
                            pwd: values.pwd,
                            pageIndex: 0,
                            pageSize: 1,
                        }
                    }
                ).then(
                    r => {
                        console.info(r)
                        if (r.data.numberOfElements == 1) {
                            // localStorage.setItem("token",data.token);
                            // var token=localStorage.getItem("token");

                            //   alert(token)
                            sessionStorage.setItem("userId", r.data.content[0].id);
                            message.config({
                                top: 130,
                                duration: 2,
                                maxCount: 3,
                            });
                            message.info('登陆成功', 1);

                            this.setState({
                                name: r.data.content[0].name,
                                login: true,
                                loginVisible: false,
                            });


                           // window.location.reload(true);
                            sessionStorage.setItem("firstLogin",true)
                            window.location.href = "#/" + this.state.target;

                        }
                        else {
                            message.config({
                                top: 130,
                                duration: 2,
                                maxCount: 3,
                            });
                            message.info('用户名或密码错误', 1);
                        }
                        ;
                    }
                );
            }

        });
    }
    saveFormRef = (form) => {
        this.form = form;
    };

    handleSubmit = (user) => {
        console.info(user);
        axios.get('http://localhost:8080/user/save', {
                xhrFields: {
                    withCredentials: true
                },
                crossDomain: true,
                params: {
                    name: user.name,
                    pwd: user.password,
                    mail: user.mail,
                    phone: user.phone,
                    cardId: user.cardId,
                    province:user.area[0],
                    city:user.area[1],
                    county:user.area[2],
                    address: user.address,
                    gender:user.gender,
                    bankCardNum:user.bankCardNum,
                    openBank:user.openBank,
                }
            }
        ).then(
            r => {

                if (r.status == 200) {
                    message.config({
                        top: 130,
                        duration: 2,
                        maxCount: 3,
                    });
                    message.info('注册成功', 1);
                    this.setState({

                        loginVisible:true,
                        registerVisible: false,
                    });
                }
                ;
            }
        );

    }

    componentDidMount() {
        var userId = sessionStorage.getItem("userId");
        if (userId > 0) {
            axios.get('http://localhost:8080/user/login', {
                    xhrFields: {
                        withCredentials: true
                    },
                    crossDomain: true,
                    params: {
                        id: userId,
                        pageIndex: 0,
                        pageSize: 1,
                    }
                }
            ).then(
                r => {

                    if (r.status == 200) {
                        sessionStorage.setItem("userId", r.data.id);
                        var str = JSON.stringify(r.data);
                        sessionStorage.setItem("user",str);
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


    }


    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };


    render() {

        const {
            Header, Footer, Content,
            } = Layout;
        const { getFieldDecorator } =this.props.form;
        const target = this.props.target;
        const { Option } = Select;


        return (
            <div >

                <Layout >
                    <Affix>
                        <Header >
                            <div className="head">

                                <Row >
                                    <Col span={4}>
                                        <div className={target=="index"?"select":""}
                                             onClick={(ev) => {this.judgeLogin(ev,"index")}}>首页
                                        </div>
                                    </Col>
                                    <Col span={4}>
                                        <div className={target=="tradingHall"?"select":" "}
                                             onClick={(ev) => {this.judgeLogin(ev,"tradingHall")}}>交易大厅
                                        </div >
                                    </Col>
                                    <Col span={4}>
                                        <div className={target=="personalCentral"?"select":""}
                                             onClick={(ev) => {this.judgeLogin(ev,"personalCentral")}}>个人中心
                                        </div>
                                    </Col>
                                    <Col span={4}>
                                        <div className={target=="managerCentral"?"select":""}
                                             onClick={(ev) => {this.judgeLogin(ev,"managerCentral")}}>管理中心
                                        </div>
                                    </Col>
                                    <Col span={8}>
                                        <Row className="login">
                                            <Button hidden={this.state.login} onClick={ this.showModal} type="primary">登陆/注册</Button>
                                            <p style={{fontSize:20}} hidden={!this.state.login}>{this.state.name},欢迎您!
                                                <Button onClick={ this.exitLogin} type="primary">
                                                    退出登陆
                                                </Button>
                                            </p>
                                        </Row>
                                    </Col>
                                </Row>

                            </div>
                        </Header>
                    </Affix>
                    <Content >
                        {this.props.children}
                    </Content>
                    <Footer></Footer>
                </Layout>
                <Modal
                    ref={this.saveFormRef()}
                    visible={this.state.loginVisible}
                    onCancel={this.handleCancel}
                    onOk={this.handleOk}
                    footer={null}
                    title="登陆"
                    width='350px'
                >
                    <Form onSubmit={this.handleOk} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('name', {
                                rules: [{required: true, message: '请输入用户名/邮箱/手机号码!'}],
                            })(
                                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                       placeholder="用户名/邮箱/手机号码"/>
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('pwd', {
                                rules: [{required: true, message: '请输入密码!'}],
                            })(
                                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                       type="password" placeholder="密码"/>
                            )}
                        </Form.Item>
                        <Form.Item>
                            {getFieldDecorator('remember', {
                                valuePropName: 'checked',
                                initialValue: true,
                            })(
                                <Checkbox>记住我</Checkbox>
                            )}
                            <a className="login-form-forgot" href="">忘记密码</a><br/>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登陆
                            </Button><br/>
                            Or <a onClick={this.showRegister}>立刻注册!</a>
                        </Form.Item>
                    </Form>
                </Modal>
                <Register
                    ref={this.saveFormRef}
                    onCancel={this.handleCancel}
                    visible={this.state.registerVisible}
                    onOk={this.handleSubmit}

                >


                </Register>
            </div>




        );
    }


}
export default Form.create({})(Title);
