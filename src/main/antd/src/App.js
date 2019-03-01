import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Button ,Icon,Row, Col, Tabs} from 'antd';
import axios from 'axios'//这是模块的加载机制，直接写依赖库的名字，会到node_modules下去查找，因此不需要你指明前面的相对路径
import qs from 'qs';
class App extends Component {
  state = {
    size: 'large',
    result:'1',
  };
  ajaxPostRequest = (id) => {
     this.setState({
       result:"3",
     })
    axios.get('http://localhost:8080/user/test',{

      params: {
        name: "123456",
        password:"tlx1234"
      }


    }
    //axios No 'Access-Control-Allow-Origin' header is present on the requested resource.   安装chrome 插件:Allow-Control-Allow-Origin
   
).then(
        r => this.setState({
            result: r.data.name
        })
    );
};

 
  render() {
    const size = this.state.size;
    const TabPane = Tabs.TabPane;
    
   
    

    return (
      <div>
       <Button onClick={this.ajaxPostRequest} >Ajax</Button>
       <div className="App-color">{this.state.result}</div>
       <Row   gutter={8} >
         <Col span={3} order={4}  className="App-color" ><div > 1 col-order-4</div></Col>
         <Col span={3} order={3}  className="App-color">2 col-order-3</Col>
         <Col span={3} order={2}className="App-color">3 col-order-2</Col>
         <Col span={3} order={1}className="App-color">4 col-order-1</Col>
         <Col span={3} order={4}  className="App-color" ><div > 1 col-order-4</div></Col>
         <Col span={3} order={3}  className="App-color">2 col-order-3</Col>
         <Col span={3} order={2}className="App-color">3 col-order-2</Col>
         <Col span={3} order={1}className="App-color">4 col-order-1</Col>
       </Row>
       <br/>
       <Row   gutter={8}>
         <Col span={6} order={4}  className="App-color" ><div > 1 col-order-4</div></Col>
         <Col span={6} order={3}  className="App-color">2 col-order-3</Col>
         <Col span={6} order={2}className="App-color">3 col-order-2</Col>
         <Col span={6} order={1}className="App-color">4 col-order-1</Col>
       </Row>
       <Tabs defaultActiveKey="1"  >
        <TabPane tab="Tab 1" key="1">
        <Row   gutter={8} >
         <Col span={3} order={4}  className="App-color" ><div > 1 col-order-4</div></Col>
         <Col span={3} order={3}  className="App-color">2 col-order-3</Col>
         <Col span={3} order={2}className="App-color">3 col-order-2</Col>
         <Col span={3} order={1}className="App-color">4 col-order-1</Col>
         <Col span={3} order={4}  className="App-color" ><div > 1 col-order-4</div></Col>
         <Col span={3} order={3}  className="App-color">2 col-order-3</Col>
         <Col span={3} order={2}className="App-color">3 col-order-2</Col>
         <Col span={3} order={1}className="App-color">4 col-order-1</Col>
       </Row>
        </TabPane>
        <TabPane tab="Tab 2" key="2">
        <Row   gutter={8}>
         <Col span={6} order={4}  className="App-color" ><div > 1 col-order-4</div></Col>
         <Col span={6} order={3}  className="App-color">2 col-order-3</Col>
         <Col span={6} order={2}className="App-color">3 col-order-2</Col>
         <Col span={6} order={1}className="App-color">4 col-order-1</Col>
       </Row>
        </TabPane>
        
      </Tabs>
     </div>
    );
  }
}
export default App;
