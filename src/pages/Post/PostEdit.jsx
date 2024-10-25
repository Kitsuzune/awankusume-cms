import React, { useEffect, useState, useRef, useMemo } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Loading from '../../components/ui/Loading/Loading';
import { Button, Col, Form, Input, message, Modal, Row, Switch } from 'antd';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import QuillResizeImage from 'quill-resize-image';
import ImagePreviewUploader from '../../components/ui/File Upload/ImagePreview';
import { apiRequest } from '../../utils/api';
import CryptoJS from 'crypto-js';

// Register QuillResizeImage
Quill.register('modules/resizeImage', QuillResizeImage);

// Custom Image Format to allow custom styles like margin: auto
const BlockImageBlot = Quill.import('formats/image');
class ImageBlot extends BlockImageBlot {
    static create(value) {
        let node = super.create(value);
        if (value.style) {
            node.setAttribute('style', value.style);
        }
        return node;
    }

    static formats(domNode) {
        return {
            ...super.formats(domNode),
            style: domNode.getAttribute('style'),
        };
    }

    format(name, value) {
        if (name === 'style' && value) {
            this.domNode.setAttribute('style', value);
        } else {
            super.format(name, value);
        }
    }
}
Quill.register(ImageBlot, true);

const PostEdit = () => {
    const [value, setValue] = useState('');
    const [image, setImage] = useState(null);
    const [imageCurrent, setImageCurrent] = useState(null);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const [id, setId] = useState(useParams().id);
    const [form] = Form.useForm();
    const [active, setActive] = useState(false);
    const quillRef = useRef(null);
    const navigate = useNavigate();

    const handleImageUpload = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = async () => {
            const file = input.files[0];

            // Create a random string using CryptoJS
            const randomName = CryptoJS.lib.WordArray.random(16).toString();
            const fileExtension = file.name.split('.').pop(); // Get file extension
            const newFileName = `file-${randomName}.${fileExtension}`; // Format: file-(random)

            // Create a new File object with the new name
            const newFile = new File([file], newFileName, { type: file.type });

            const sendData = {
                file: newFile,
            };

            // const response = await apiRequest('POST', '/blog/upload/image', sendData);
            const response = await apiRequest('POST', `/blog/upload/image/${id}`, sendData);

            // Insert the uploaded image into the Quill editor with custom styles
            const quill = quillRef.current.getEditor();
            const range = quill.getSelection();
            quill.insertEmbed(range.index, 'image', `${process.env.REACT_APP_API_URL_CSM}/public/blog/${id}/${response.data.data}`);
            quill.formatText(range.index, range.index + 1, { 'width': '100px' });
        };
    };

    const modules = useMemo(() => ({
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
                image: handleImageUpload
            }
        },
        resizeImage: true
    }), []);

    const fetchData = async () => {
        try {
            setLoading(true);
            const response = await apiRequest('get', `/blog/${id}`);
            setData(response.data.data);
            form.setFieldsValue({
                title: response.data.data.title,
                content: response.data.data.content == 'default_content' ? '' : response.data.data.content,
                show: response.data.data.show === '1' ? true : false,
            });
            setValue(response.data.data.content);
            setActive(response.data.data.show === '1' ? true : false);
            setImage(`${process.env.REACT_APP_API_URL_CSM}/public/blog/${response.data.data.id}/${response.data.data.image}`);
            setImageCurrent(`${process.env.REACT_APP_API_URL_CSM}/public/blog/${response.data.data.id}/${response.data.data.image}`);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    const handleSubmit = async () => {
        try {
            setLoading(true);

            const fileToSend = image !== imageCurrent ? image : undefined;

            const sendData = {
                title: form.getFieldValue('title'),
                content: value || 'default_content',
                show: active ? '1' : '0',
            };

            if (fileToSend) {
                sendData.file = fileToSend;
            }

            let response;

            if (id) {
                response = await apiRequest('PATCH', `/blog/${id}`, sendData);
            } else {
                response = await apiRequest('POST', `/blog`, sendData);
            }

            setLoading(false);

            if (response.status === 200) {
                Modal.success({
                    title: 'Success',
                    content: 'Data has been updated',
                    centered: true,
                });

                let newUuid = null;
                if (!id) {
                    newUuid = response.data.data.id;
                    navigate('/app/post/' + newUuid);
                    setId(newUuid);
                }

                fetchData(newUuid ? newUuid : id);
            }

        } catch (error) {
            setLoading(false);
            console.log(error);
            message.error(error.response?.data?.message || 'Something went wrong');
        }
    };

    useEffect(() => {
        if (id) {
            fetchData(id);
        }
    }, []);
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
                                                <Col span={24} className='flex justify-end gap-3'>
                                                    <Form.Item
                                                        name="show"
                                                        valuePropName="checked"
                                                    >
                                                        <span className='text-[15px]'>Hide</span>
                                                        <Switch
                                                            checked={active}
                                                            className='mx-2'
                                                            onClick={() => setActive(!active)}
                                                        />
                                                        <span className='text-[15px]'>Show</span>
                                                    </Form.Item>
                                                </Col>
                                            </Row>
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
                                            {id && (
                                                <Row>
                                                    <Col span={24}>
                                                        <Form.Item
                                                            name="content"
                                                            label="Content"
                                                            rules={[{ required: true, message: 'Please input the content' }]}
                                                        >
                                                            <ReactQuill
                                                                ref={quillRef} // Attach the Quill ref here
                                                                className="h-[50vh] min-h-[30vh] md:min-h-[50vh]"
                                                                theme="snow"
                                                                value={value}
                                                                onChange={setValue}
                                                                placeholder="Write your post here..."
                                                                modules={modules}
                                                            // formats={[
                                                            //     "align", "width", "bold", "italic", "underline", "blockquote", "header", 
                                                            //     "script", "code-block", "strike", "size", "color", "background", "font", 
                                                            //     "image", "align", "calltoaction", "link", "height", "float", "imagewithstyle",
                                                            //     "style"
                                                            // ]}
                                                            />
                                                        </Form.Item>
                                                    </Col>
                                                </Row>
                                            )}

                                            <div className="mt-10 flex justify-end">
                                                <Button type="default" className="mr-2" >Cancel</Button>
                                                <Button type="primary" className='bg-main' onClick={handleSubmit}>Save</Button>
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
    );
};

export default PostEdit;
