import React, { useState } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Loading from '../../components/ui/Loading/Loading';
import { Button, Col, Form, Input, Row } from 'antd';
import { useParams, useLocation } from 'react-router-dom';
import QuillResizeImage from 'quill-resize-image';
import ImagePreviewUploader from '../../components/ui/File Upload/ImagePreview';

// Tambahkan inisialisasi QuillResizeImage
Quill.register('modules/resizeImage', QuillResizeImage);

const PostEdit = () => {
    const [value, setValue] = useState('');
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const [id, setId] = useState(useParams().id);
    const [form] = Form.useForm();
    const [image, setImage] = useState(null);

    const handleImageUpload = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files[0];
            const formData = new FormData();
            formData.append('image', file);

            const response = await fetch('/upload', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            const quill = this.quillRef.getEditor();
            const range = quill.getSelection();
            quill.insertEmbed(range.index, 'image', data.url);
        };
    };

    const modules = {
        toolbar: {
            container: [
                [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                ['bold', 'italic', 'underline', 'strike'],
                [{ 'color': [] }],
                [{ 'script': 'sub' }, { 'script': 'super' }],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                [{ 'indent': '-1' }, { 'indent': '+1' }],
                [{ 'direction': 'rtl' }],
                [{ 'align': [] }],
                ['link', 'image', 'video'],
                ['clean']
            ],
            handlers: {
                // image: handleImageUpload
            }
        },
        resizeImage: true
    };

    return (
        <React.Fragment>
            <Row className="w-full">
                <Col span={24}>
                    <div className='rounded-lg'>
                        <Row>
                            <Col span={24}>
                                <div className='flex flex-col'>
                                    <div className='bg-white p-5 rounded-lg'>
                                        <Row>
                                            <Col span={24}>
                                                <div className='text-[24px] text-main inline-block'>
                                                    {id ? `Post / ${id}` : "Add Post"}
                                                </div>
                                            </Col>
                                        </Row>
                                    </div>
                                    <div className="mt-5 px-4 md:px-10 py-10 bg-white border rounded-lg">
                                        <Form layout="vertical" form={form}>
                                            <Row>
                                                <Col span={24}>
                                                    <Form.Item
                                                        name="title"
                                                        label="Title"
                                                        rules={[{ required: true, message: 'Please input the title' }]}
                                                    >
                                                        <Input placeholder="The title of your post" />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col span={24}>
                                                    <Form.Item
                                                        name="mainImageShowcase"
                                                        label="Main Image Showcase"
                                                        rules={[{ required: true, message: 'Please upload an image' }]}
                                                    >
                                                        <ImagePreviewUploader
                                                            image={image}
                                                            setImage={setImage}
                                                            name="image"
                                                            disabled={false}
                                                        />
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col span={24}>
                                                    <Form.Item
                                                        name="content"
                                                        label="Content"
                                                        rules={[{ required: true, message: 'Please input the content' }]}
                                                    >
                                                        <ReactQuill
                                                            className="h-[50vh] min-h-[30vh] md:min-h-[50vh]"
                                                            theme="snow"
                                                            value={value}
                                                            onChange={(value) => {
                                                                form.setFieldValue('content', value);
                                                            }}
                                                            placeholder="Write your post here..."
                                                            modules={modules}
                                                        // scrollingContainer={document.body}
                                                        />
                                                    </Form.Item>
                                                </Col>
                                            </Row>

                                            <div className="mt-10 flex justify-end">
                                                <Button type="default" className="mr-2" >Cancel</Button>
                                                <Button type="primary" className='bg-main' >Save</Button>
                                            </div>
                                        </Form>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
            <Loading loading={loading} />
        </React.Fragment>
    )
}

export default PostEdit
