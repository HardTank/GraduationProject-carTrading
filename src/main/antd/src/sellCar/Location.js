import React, { Component } from 'react';
import {
    Pagination,Card, Modal,Table, message,Tabs,Menu,Layout,Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete,
} from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
class Location extends Component {
    constructor(props) {
        super(props);

        const { value } = props;
        this.state = {
            value,
        };
    }
    componentWillReceiveProps(nextProps) {
        if ('value' in nextProps) {
            this.setState({
                value: nextProps.value,
            });
        }
    }
    handleChange = (value) => {
        const { onChange } = this.props;
        this.setState({
            value,
        });
        if (onChange) {
            onChange(value);
        }
    }

    render() {

        const addressOptions = [

            {
                value: '京',

                label: '北京市',
            },
            {
                value: '津',

                label: '天津市',
            },
            {
                value: '沪',

                label: '上海市',
            },
            {
                value: '冀',

                label: '河北省',
            },
            {
                value: '豫',

                label: '河南省',
            },
            {
                value: '云',

                label: '云南省',
            },
            {
                value: '辽',

                label: '辽宁省',
            },
            {
                value: '黑',

                label: '黑龙江省',
            },
            {
                value: '湘',

                label: '湖南省',
            },
            {
                value: '皖',

                label: '安徽省',
            },
            {
                value: '鲁',

                label: '山东省',
            },
            {
                value: '新',

                label: '新疆',
            },
            {
                value: '苏',

                label: '江苏省',
            },
            {
                value: '浙',

                label: '浙江省',
            },
            {
                value: '赣',

                label: '江西省',
            },
            {
                value: '鄂',

                label: '湖北省',
            },
            {
                value: '桂',

                label: '广西',
            },
            {
                value: '甘',

                label: '甘肃省',
            },
            {
                value: '晋',

                label: '山西省',
            },
            {
                value: '蒙',

                label: '内蒙古',
            },
            {
                value: '陕',

                label: '陕西省',
            },
            {
                value: '吉',

                label: '吉林省',
            },
            {
                value: '闽',

                label: '福建省',
            },
            {
                value: '贵',

                label: '贵州省',
            },
            {
                value: '粤',

                label: '广东省',
            },
            {
                value: '川',

                label: '四川省',
            },
            {
                value: '青',

                label: '青海省',
            },
            {
                value: '藏',

                label: '西藏',
            },
            {
                value: '琼',

                label: '海南省',
            },
            {
                value: '宁',

                label: '宁夏',
            },
            {
                value: '渝',

                label: '重庆市',
            },
]

        return (

    <Cascader options={addressOptions} placeholder="请选择"
              onChange={this. handleChange}/>

)
}
}
export default Form.create({})(Location);