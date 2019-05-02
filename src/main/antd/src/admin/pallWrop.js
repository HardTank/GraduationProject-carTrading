import * as React from 'react';
import { Icon, Modal, Upload,Button,message } from 'antd';
import payOne from '../image/1000.jpg'
import axios from 'axios';
export default class PallWrop extends React.Component {
    state = {
        previewVisible: false,
        previewImage: '',
        show: true,
        list: [],
        fileList: [],
        path: '7e12f1fc-28ba-40b2-a60e-8e250be5fdca',
        src: require('../image/view.png'),
    };
    handleCancel = () => this.setState({previewVisible: false})

    handlePreview = (file) => {
        this.setState({
            previewImage: file.url || file.thumbUrl,
            previewVisible: true,
        });
    }

    handleChange = ({ file,fileList }) => {
        // e.preventDefault();
        message.config({
            top: 130,
            duration: 2,
            maxCount: 3,
        });
        var id = this.props.carId;
        if (id == null) {
            if (fileList.length == 0)
                this.setState({fileList: [], show: false})
            else
                this.setState({fileList: fileList, show: false})
            //this.showImage()
            //alert(fileList[0].url)

            if (file.status == 'done') {

                message.info('上传成功!', 1);
                //this.showImage();
            } else if (file.status == 'error')
                message.info('上传失败!', 1);
        }
        else {
            message.info('禁止此操作!', 1);
        }

    }

    componentWillMount() {
        var src = "xx.jpg";
        console.info('加载')
        var id = this.props.carId;

        if (id != null)
            this.showImage(id);
        //if (this.props.src != null)
        //    this.setState({list: [{
        //        uid: '-1',
        //        name: 'xxx.png',
        //        status: 'done',
        //        url: require('../image/carImage/' + this.props.src),
        //    }]});

    }

    showImage = (id)=> {

        axios.get('http://localhost:8080/upload/getList', {
                params: {
                    carId: id,
                    position: this.props.position,
                    pageIndex: 0,
                    pageSize: 1,
                }
            }
        ).then(
            r => {
                if (r.status == 200)
                    if (r.data.content[0] != null) {
                        var fileList1 = [{
                            uid: '-1',
                            name: 'xxx.png',
                            status: 'done',
                            url: require('../image/carImage/' + r.data.content[0].src + '.jpg'),
                        }];
                        this.setState(
                            {
                                fileList: fileList1,
                                src: require('../image/carImage/' + r.data.content[0].src + '.jpg'),

                            });
                    }
            })
    }
    test = (e)=> {
        e.preventDefault();
        let formData = new FormData();
        var file = document.getElementById(this.props.position).files[0];

        // var url=window.URL.createObjectURL(file);
        formData.append('pic', file);
        formData.append('position', this.props.position);
        formData.append('carId', 19);
        axios({
            url: 'http://localhost:8080/upload/image',
            method: 'post',
            data: formData,
            processData: false,// 告诉axios不要去处理发送的数据(重要参数)
            contentType: false,   // 告诉axios不要去设置Content-Type请求头
        }).then((res)=> {
            alert(res.data)
        })


    }
    view = ()=> {
        var id = this.props.position
        var file = document.getElementById(id).files[0];
        if (window.FileReader) {
            var fr = new FileReader();
            fr.onloadend = function (e) {
                document.getElementById(id + 'img').src = e.target.result;
            }
            fr.readAsDataURL(file);
        }
    }

    render() {
        const { previewVisible, previewImage, fileList ,list,show} = this.state;
        //  const src=require('../image/carImage/ec13bbef-52e8-4d3d-9afc-52f1c296e5c1.jpg')
        const uploadButton = (
            <div>
                <Icon type="plus"/>
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        return (
            <div  >
                <Upload

                    action="http://localhost:8080/upload/image"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    data={file => ({ // data里存放的是接口的请求参数
                    pic: file, // file 是当前正在上传的图片
                    carId: 19,
                    position: this.props.position,
            })}
                >
                    { fileList.length >= 1 ? null : uploadButton}
                </Upload>

                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                    <img alt="example" style={{ width: '100%' }} src={previewImage}/>
                </Modal>
            </div>
        )
            ;
    }
}
