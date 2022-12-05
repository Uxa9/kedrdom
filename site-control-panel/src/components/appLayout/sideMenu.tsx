import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, Layout, Menu, MenuProps, Modal, Select, Switch } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { add, getAll } from '../../services/category';
import { useLocation, useNavigate } from 'react-router-dom';
import FormItemLabel from 'antd/es/form/FormItemLabel';

const { Item } = Form;
const { Sider } = Layout;

interface Category {
    name: string,
    show: boolean,
    type: string,
    _id: string,
    upCategory: string
}

const SideMenu = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const [categories, setCategories] = useState<Category[]>([]);
    const [showModal, setShowModal] = useState(false);

    const getCats = () => {
        getAll({ type: location.pathname.split('/')[1] })
            .then((res: Category[]) => {
                setCategories(res);
            })
    }

    useEffect(() => {
        getCats();
    }, [location.pathname]);

    useEffect(() => {
        getCats();
    }, [showModal]);


    const parseMenuItems = (data: Category[]) => {
        const nest: any = (items: Category[], id = "") =>
            items
                .filter(item => item.upCategory === id)
                .map(cat => {
                    const children = [
                        {
                            key: cat._id,
                            label: "Показать все"
                        },
                        ...nest(items, cat._id)
                    ];

                    return ({
                        key: cat._id,
                        label: cat.name,
                        children: children.length > 1 ? children : undefined
                    })
                });


        return nest(data);
    }

    return (
        <>
            <Sider
                breakpoint="lg"
                collapsedWidth="0"
                style={{
                    paddingTop: "64px",
                    display: 'flex !important',
                    flexDirection: 'column',
                    justifyContent: "space-between"
                }}
            >
                <div>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="inline"
                        items={parseMenuItems(categories)}
                        onClick={(e) => navigate(`product/${e.key}`)}
                    />
                </div>
                <Button
                    style={{ marginLeft: "5%", marginBottom: "20px", width: "90%" }}
                    type="primary"
                    icon={<PlusOutlined />}
                    size="large"
                    onClick={() => {
                        setShowModal(true);
                    }}
                >
                    Добавить
                </Button>
            </Sider>
            <Modal
                open={showModal}
                onCancel={() => {
                    setShowModal(false);
                    form.resetFields();
                }}
                onOk={() => {
                    form.validateFields()
                        .then(values => {
                            add({ ...values, type: location.pathname.split('/')[1] });
                            setShowModal(false);
                            form.resetFields();
                        });
                }}
                cancelText="Отмена"
                closable={false}
            >
                <Form
                    form={form}
                    initialValues={{
                        name: "",
                        upCategory: "",
                        show: true
                    }}
                >
                    <Item
                        label="Название"
                        name="name"
                        rules={[{ required: true, message: 'Введите название категории' }]}
                    >
                        <Input />
                    </Item>
                    <Item
                        label="Надкатегория"
                        name="upCategory"
                    >
                        <Select
                            showSearch
                            placeholder="Выберите категорию"
                            optionFilterProp="children"
                            onChange={() => { }}
                            filterOption={(input, option) =>
                                (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                            }
                            style={{ width: "100%" }}
                            options={categories.map(cat => {
                                return {
                                    label: cat.name,
                                    value: cat._id
                                }
                            })}
                        />
                    </Item>
                    <Item
                        label="Отображать на сайте"
                        valuePropName='checked'
                        name="show"
                    >
                        <Checkbox
                            defaultChecked={true}
                        />
                    </Item>
                </Form>
            </Modal>
        </>
    );
}

export default SideMenu;