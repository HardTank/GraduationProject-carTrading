import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import * as serviceWorker from './serviceWorker';
import {LocaleProvider} from 'antd';
import { Router, Route } from 'react-router';
import { createHashHistory} from 'history'
const hashHistory = createHashHistory();
ReactDOM.render(
    <LocaleProvider locale={zhCN}>
        <Router history={hashHistory}>
            <Route path="/app" component={App}/>
        </Router  >
    </LocaleProvider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
