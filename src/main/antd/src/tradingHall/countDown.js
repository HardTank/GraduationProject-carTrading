import React, {Component} from 'react'
import moment from 'moment'
export default class CountDown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            day: 0,
            hour: 0,
            minute: 0,
            second: 0,
            overdue: false,
        }
    }

    componentWillMount() {

        if (this.props.endTime) {

            let endTime = this.props.endTime.replace(/-/g, "/");
            this.countFun(endTime);
        }

    }

    //组件卸载取消倒计时
    componentWillUnmount() {
        clearInterval(this.timer);
    }

    countFun = (time) => {

        let end_time = new Date(time).getTime();
        // alert()
        let sys_second;
        if (this.props.auction)
            sys_second = (end_time - moment().subtract(10, 'minutes'));
        else
            sys_second = (end_time - new Date().getTime());
        this.timer = setInterval(() => {
            //防止倒计时出现负数
            if (sys_second > 1000) {
                sys_second -= 1000;
                let day = Math.floor((sys_second / 1000 / 3600) / 24);
                let hour = Math.floor((sys_second / 1000 / 3600) % 24);
                let minute = Math.floor((sys_second / 1000 / 60) % 60);
                let second = Math.floor(sys_second / 1000 % 60);
                if(day==0&&hour==0&&minute==0&&second==0){
                    this.setState({
                        overdue:true,
                    })
                }
                this.setState({
                    day: day,
                    hour: hour < 10 ? "0" + hour : hour,
                    minute: minute < 10 ? "0" + minute : minute,
                    second: second < 10 ? "0" + second : second
                })
            } else {
                clearInterval(this.timer);
                //倒计时结束时触发父组件的方法
                //this.props.timeEnd();
            }
        }, 1000);
    }

    render() {

        return (
            <div>
            <span hidden={this.state.overdue}
                  style={{color:'orange'}}>{this.state.day}天 {this.state.hour}:{this.state.minute}:{this.state.second}</span>
<span hidden={!this.state.overdue}
      style={{color:'orange'}}>竞拍已经开始</span>

            </div>
        )
    }
}
