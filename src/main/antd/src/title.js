import React, { Component } from 'react';
import './css/App.css';
import './css/title.css';
import Login  from './login';
import {Affix,Tag,Row, Col, Layout,Menu,Button,Form, Icon, Input,Checkbox,Modal, message} from 'antd';
import axios from 'axios'//这是模块的加载机制，直接写依赖库的名字，会到node_modules下去查找，因此不需要你指明前面的相对路径
import qs from 'qs';
import TradingHall from './tradingHall';
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
        target: ''

    };

    showModal = (target)=> {
        this.setState({loginVisible: true, target: target});
    }
    judgeLogin = (e, target)=> {
        e.preventDefault();
        var userId = sessionStorage.getItem("userId");

        if (userId > 0) {
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
        this.setState({loginVisible: false});
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

    render() {

        const {
            Header, Footer, Content,
            } = Layout;
        const { getFieldDecorator } =this.props.form;
        const target = this.props.target;
        return (
            <div>

                <Layout>
                    <Affix>
                        <Header>
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
                                        <div className={target=="serviceCentral"?"select":""}
                                             onClick={(ev) => {this.judgeLogin(ev,"serviceCentral")}}>服务中心
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
                                            <p hidden={!this.state.login}>{this.state.name},欢迎您!
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
                    <Content>
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
                            Or <a href="">立刻注册!</a>
                        </Form.Item>
                    </Form>
                </Modal>

            </div>




        );
    }


}
export default Form.create({})(Title);
