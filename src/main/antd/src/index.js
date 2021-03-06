import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Title  from './title';
import Login from './login'
import HomePage from './homePage'
import TradingHall  from './tradingHall';
import PersonalCentral from './personalCentral';
import AdminCentral from './admin/adminCentral'
import zhCN from 'antd/lib/locale-provider/zh_CN';
import * as serviceWorker from './serviceWorker';
import {LocaleProvider} from 'antd';
import { Router, Route ,Switch} from 'react-router';
import { createHashHistory} from 'history'
import AuctionCenter from './tradingHall/auctionCenter'
import DetailInfo from './tradingHall/detailInfo'
import CountDown from './tradingHall/countDown'
import NoticeDetailInfo from './homePage/noticeDetailInfo'
const hashHistory = createHashHistory();
ReactDOM.render(
    <LocaleProvider locale={zhCN}>
        <Router history={hashHistory}>
            <Switch>
                <Route path="/index" component={HomePage}/>
                <Route path="/login" component={Login}/>
                <Route path="/tradingHall" component={TradingHall}/>
                <Route path="/tradingHall" component={TradingHall}/>
                <Route path="/personalCentral" component={PersonalCentral}/>
                <Route path="/adminCentral" component={AdminCentral}/>
                <Route path="/test" component={AuctionCenter}/>
                <Route path="/info" component={DetailInfo}/>
                <Route path="/noticeInfo" component={NoticeDetailInfo}/>
                <Route path="/countDown" component={CountDown}/>
                <Route path="/" component={HomePage}/>
            </Switch>
        </Router>
    </LocaleProvider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
