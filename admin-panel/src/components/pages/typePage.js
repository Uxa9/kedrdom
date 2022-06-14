import React, { useEffect, useState } from "react";
import { useHeader } from "../common/useHeader";
import { useHttp } from "../api/http.hook";
import { Avatar, Button, List, Skeleton, Form, Input, Modal, message, Select } from 'antd';
import {
    DeleteOutlined,
    EditOutlined
} from '@ant-design/icons';
import { Link, useParams } from "react-router-dom";

const axios = require('axios');
const { Option } = Select;

const TypePage = () => {

    const { switchHeader } = useHeader();
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState([]);
    const [item, setItem] = useState({});
    const [header, setHeader] = useState('');
    const [categories, setCategories] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        getHeader();
        getList();
        getCategoryList();
    }, []);

    useEffect(() => {
        switchHeader(header, 'товары', true);
    }, [header]);

    const getCategoryList = () => {
        axios.get(`http://192.168.1.157:5000/api/goodTypes/get`)
            .then(function (res) {
                setCategories(res.data);
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const getHeader = () => {
        axios.get(`http://192.168.1.157:5000/api/goodTypes/${id}`)
            .then(function (res) {
                setHeader(res.data.name);
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const getList = () => {
        setLoading(true);

        axios.get(`http://192.168.1.157:5000/api/goods/${id}`)
            .then(function (res) {
                setData(res.data);
                setLoading(false);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const handleSubmit = values => {
        setLoading(true);

        Object.keys(item) == 0
            ? axios.put('http://192.168.1.157:5000/api/goods/add', {
                params: {
                    name     : values.name,
                    category : values.category,       
                    weight   : values.weight,   
                    price    : values.price,   
                    desc     : values.desc,   
                    amount   : values.amount,   
                }
            })
                .then(function (res) {
                    setModalVisible(false);
                    getList();
                    if (res.status == 201) return message.success("Добавлено");
                })
                .catch(function (error) {
                    console.log(error);
                })
            : axios.post(`http://192.168.1.157:5000/api/goods/${item._id}`, {
                params: {
                    name     : values.name,
                    category : values.category,       
                    weight   : values.weight,   
                    price    : values.price,   
                    desc     : values.desc,   
                    amount   : values.amount,
                }
            })
                .then(function (res) {
                    setItem({});
                    setModalVisible(false);
                    getList();
                    if (res.status == 201) return message.success("Добавлено");
                })
                .catch(function (error) {
                    console.log(error);
                });
    }

    const editCat = item => {
        setItem(item);
        setModalVisible(true);
    }

    const deleteCat = id => {
        setLoading(true);

        axios.delete(`http://192.168.1.157:5000/api/goods/${id}`)
            .then(function (res) {
                getList();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <>
            <List
                // className="demo-loadmore-list"
                loading={loading}
                // itemLayout="horizontal"
                // loadMore={loadMore}
                dataSource={data}
                // pagination={{
                //     onChange: page => {
                //     console.log(page);
                //     },
                //     pageSize: 10,
                // }}
                renderItem={(item) => (
                    <List.Item
                        style={{
                            padding: "0 10px"
                        }}
                        actions={[
                            <EditOutlined
                                onClick={() => editCat(item)}
                            />,
                            <DeleteOutlined
                                onClick={() => deleteCat(item._id)}
                                style={{ color: "red" }}
                            />
                        ]}
                    >
                        <Skeleton
                            loading={loading}
                        // avatar title={false} loading={item.loading} active
                        >
                            <List.Item.Meta
                                // avatar={<Avatar src={item.picture.large} />}
                                title={
                                    <span
                                        style={{ fontSize: '18px' }}
                                    >
                                        {item.name}
                                    </span>
                                }
                            // description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                            />
                        </Skeleton>
                    </List.Item>
                )}
            />
            <Button
                type="link"
                style={{
                    width: '200px',
                    alignSelf: 'flex-end',
                    position: 'absolute',
                    bottom: '80px'
                }}
                onClick={() => setModalVisible(true)}
            >
                Добавить товар
            </Button>
            <Modal
                visible={modalVisible}
                closable={true}
                onCancel={() => {
                    setModalVisible(false);
                    setItem({});
                }}
                footer={[]}
            >
                <Form
                    name="basic"
                    layout="vertical"
                    labelCol={{ span: 8 }}
                    labelWrap={false}
                    initialValues={{ remember: true }}
                    onFinish={handleSubmit}
                    autoComplete="off"
                >
                    <Form.Item
                        label="Введите название"
                        name="name"
                        rules={[{ required: true, message: 'Введите вес!' }]}
                    >
                        <Input initialValues={item.name} />
                    </Form.Item>
                    <Form.Item
                        label="Название категории"
                        name="category"
                        rules={[{ required: true, message: 'Выберите название!' }]}
                    >
                        <Select>
                            {categories.map(cat => {
                                return (
                                    <Option value={cat._id}>
                                        {cat.name}
                                    </Option>
                                )
                            })}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Введите вес"
                        name="weight"
                        rules={[{ required: true, message: 'Введите вес!' }]}
                    >
                        <Input initialValues={item.weight} addonAfter={'гр.'}/>
                    </Form.Item>
                    <Form.Item
                        label="Введите цену"
                        name="price"
                        rules={[{ required: true, message: 'Введите цену!' }]}
                    >
                        <Input initialValues={item.price} addonAfter={"руб."} />
                    </Form.Item>
                    <Form.Item
                        label="Введите описание товара"
                        name="desc"
                    >
                        <Input initialValues={item.desc} />
                    </Form.Item>
                    <Form.Item
                        label="Введите количество на складе"
                        name="amount"
                        rules={[{ required: true, message: 'Введите количество!' }]}
                    >
                        <Input initialValues={item.amount} />
                    </Form.Item>

                    <Form.Item>
                        <Button style={{ width: '100%', marginTop: '20px' }} type="primary" htmlType="submit">
                            Добавить
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}

export default TypePage;