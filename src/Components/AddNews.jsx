import React, { useState } from 'react';
import { Form, Input, Button, Upload, message } from 'antd';
import axios from 'axios';
import { PlusOutlined } from '@ant-design/icons';

const AddNews = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [url, setUrl] = useState('');
    const [files, setFiles] = useState([]);

    // Handle file upload change
    const handleFileChange = (info) => {
        if (info.fileList.length > 0) {
            setFiles(info.fileList);
        }
    };

    // Submit the form data to the backend
    const handleSubmit = async () => {
        if (!title || !description || !url || files.length === 0) {
            message.error('Please fill out all fields and upload media');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('url', url);

        // Append all files to the formData
        files.forEach(file => {
            formData.append('media', file.originFileObj);
        });

        try {
            const response = await axios.post('http://localhost:3000/apiNews/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 201) {
                message.success('News added successfully');
                setTitle('');
                setDescription('');
                setUrl('');
                setFiles([]);
            }
        } catch (error) {
            console.error('Error adding news:', error);
            message.error('Failed to add news');
        }
    };

    return (
        <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}> {/* Adjusted maxWidth to 500px */}
            <h2>Add News</h2>
            <Form layout="vertical" onFinish={handleSubmit}>
                <Form.Item label="Title" required>
                    <Input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Enter news title"
                    />
                </Form.Item>

                <Form.Item label="Description" required>
                    <Input.TextArea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        placeholder="Enter news description"
                    />
                </Form.Item>

                <Form.Item label="URL" required>
                    <Input
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        placeholder="Enter URL"
                    />
                </Form.Item>

                <Form.Item label="Upload Media" required>
                    <Upload
                        accept="image/*"
                        listType="picture-card"
                        fileList={files}
                        onChange={handleFileChange}
                        beforeUpload={() => false} // Disable automatic upload
                    >
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    </Upload>
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                        Add News
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default AddNews;
