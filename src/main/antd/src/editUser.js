import React from 'react';
import {Button, Input, Form, Modal, Select} from 'antd';
import './css/App.css';
const FormItem = Form.Item;
class EditUser extends React.Component {

    // componentDidMount() {
    //     const {editTarget, form} = this.props;
    //     if (editTarget) {
    //         form.setFieldsValue(editTarget);
    //     }
    // }

    render() {

        const { visible, onCancel, onOk, form } = this.props;
        const { getFieldDecorator } = form;
        return(
            <div>
                <Modal
                    onCancel={onCancel}
                    width='720px'
                    visible={visible}
                    title="添加/编辑用户"
                    footer={[
                        <Button key="submit" type="primary" onClick={onOk} >提交</Button>,
                        <Button key="back" onClick={onCancel} >取消</Button>
                    ]}
                >
                    <Form
                        hideRequiredMark={true}
                    >
                        <FormItem label="供应商名称" colon={false} className="form-item-name">
                            {getFieldDecorator('name', {
                                rules:[{
                                    required: true,
                                    whiteSpace: true,
                                    message: "请输入名称",
                                }]
                            })(<Input placeholder="请输入" />)}
                        </FormItem>
                        <FormItem label="供应商编码" colon={false} className="form-item-name">
                            {getFieldDecorator('password', {
                                rules:[{
                                    required: true,
                                    whiteSpace: true,
                                    message: "请输入编码",
                                }]
                            })(<Input placeholder="请输入" />)}
                        </FormItem>



                    </Form>
                </Modal>
            </div>
        );
    }

}

export default Form.create({})(EditUser);
