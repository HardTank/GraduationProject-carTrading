import 'braft-editor/dist/index.css'
import React from 'react'
import BraftEditor from 'braft-editor'
import App from './css/App.css'
import { Form, Input, Button } from 'antd'
const {FormItem}=Form.Item
class BasicDemo extends React.Component {

    componentDidMount () {

        // 异步设置编辑器内容
        setTimeout(() => {
            this.props.form.setFieldsValue({
                content: BraftEditor.createEditorState(this.props.remark)
            })
        }, 1)

    }

    handleSubmit = (event) => {

        event.preventDefault()

        this.props.form.validateFields((error, values) => {
            if (!error) {
                //const submitData = {
                //    title: values.title,
                //    content:values.content.toHTML()
                //}
                this.props.onOk(values.content.toHTML())
               // console.log(submitData)
            }
        })

    }

    render () {

        const { getFieldDecorator } = this.props.form
        const controls = ['bold', 'italic', 'underline', 'text-color', 'separator', 'link', 'separator', 'media' ]

        return (
            <div  >
                <Form onSubmit={this.handleSubmit} >

                    <Form.Item    >
                        {getFieldDecorator('content', {
                            validateTrigger: 'onBlur',
                            rules: [{
                                required: true,
                                validator: (_, value, callback) => {
                                    if (value.isEmpty()) {
                                        callback('请输入内容')
                                    } else {
                                        callback()
                                    }
                                }
                            }],
                        })(

                            <BraftEditor
                                className="my-editor"
                                controls={controls}
                                placeholder="请输入内容"

                            />
                        )}
                    </Form.Item>
                    <Form.Item  >
                        <Button size="large" type="primary" htmlType="submit">提交</Button>
                    </Form.Item>
                </Form>
            </div>
        )

    }

}

export default Form.create()(BasicDemo)