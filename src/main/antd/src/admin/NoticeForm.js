import '../../node_modules/braft-editor/dist/index.css'
import React from 'react'
import BraftEditor from 'braft-editor'
import { Form, Input, Button,Modal } from 'antd'

class NoticeForm extends React.Component {

    componentDidMount () {

        // 异步设置编辑器内容
        //setTimeout(() => {
        //    this.props.form.setFieldsValue({
        //        content: BraftEditor.createEditorState('<p>Hello <b>World!</b></p>')
        //    })
        //}, 1000)

    }

    handleSubmit = (event) => {

        event.preventDefault()

        this.props.form.validateFields((error, values) => {
            if (!error) {
                this.props.onOk(values)
                const submitData = {
                    title: values.title,
                    content: values.content.toHTML() // or values.content.toHTML()
                }
                console.log(submitData)
            }
        })

    }

    render () {
        const {visible,onCancel,onOk}=this.props
        const { getFieldDecorator } = this.props.form
        const controls = ['bold', 'italic', 'underline', 'text-color', 'separator', 'link', 'separator', 'media' ]

        return (
            <Modal
                visible={visible}
                onCancel={onCancel}
                footer={null}
                destroyOnClose={true}
            >
            <div className="demo-container">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Item   label="文章标题">
                        {getFieldDecorator('title', {
                            rules: [{
                                required: true,
                                message: '请输入标题',
                            }],
                        })(
                            <Input size="large" placeholder="请输入标题"/>
                        )}
                    </Form.Item>
                    <Form.Item   label="文章正文">
                        {getFieldDecorator('content', {
                            validateTrigger: 'onBlur',
                            rules: [{
                                required: true,
                                validator: (_, value, callback) => {
                                    if (value.isEmpty()) {
                                        callback('请输入正文内容')
                                    } else {
                                        callback()
                                    }
                                }
                            }],
                        })(
                            <BraftEditor
                                className="my-editor"
                                controls={controls}
                                placeholder="请输入正文内容"
                            />
                        )}
                    </Form.Item>
                    <Form.Item  >
                        <Button size="large" type="primary" htmlType="submit">提交</Button>
                    </Form.Item>
                </Form>
            </div>
                </Modal>
        )

    }

}

export default Form.create()(NoticeForm)