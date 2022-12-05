import { Button, Card, Checkbox, Col, Divider, Form, Input, List, Modal, Popconfirm, Radio, Row, Select, Skeleton } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getByCat } from "../../services/product/getByCat";
import { add, deleteCat, getAll, update } from "../../services/category";

const { Item } = Form;
const { Meta } = Card;

interface ProductCard {
    name: string,
    upCategory: string,
    _id: string,
    show: boolean
}

const Categories = () => {

    const [form] = Form.useForm();
    const [type, setType] = useState("product");
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [editId, setEditId] = useState<string | undefined>(undefined);
    const [categories, setCategories] = useState<ProductCard[]>([]);

    const getData = (params: {} | undefined) => {
        getAll({...params, type})
            .then(res => {
                setCategories(res);
                setLoading(false);
            });
    }

    const deleteData = (id: string) => {
        setLoading(true);
        deleteCat(id)
            .then(() => {
                getData({});
            });
    }

    useEffect(() => {
        setLoading(true);
        getData({});
    }, []);

    useEffect(() => {
        setLoading(true);
        getData({});
    }, [type]);

    return (
        <>
            <Row
                align="middle"
                gutter={[16, 16]}
                style={{ marginBottom: "20px" }}
            >
                <Col>
                    <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        size="large"
                        onClick={() => {
                            setShowModal(true);
                            setModalMode("add");
                        }}
                    >
                        Добавить
                    </Button>
                </Col>
                <Col>
                    <Radio.Group 
                        defaultValue="product" 
                        buttonStyle="solid"
                        size="large"
                        onChange={(e) => setType(e.target.value)}
                    >
                        <Radio.Button value="product">Товары</Radio.Button>
                        <Radio.Button value="present">Подарки</Radio.Button>
                    </Radio.Group>
                </Col>
            </Row>
            <List
                loading={loading}
                itemLayout="horizontal"
                dataSource={categories}
                renderItem={(cat) => (
                    <List.Item
                        actions={[
                            <Button
                                type="link"
                                onClick={() => {
                                    setModalMode("edit");
                                    setEditId(cat._id);
                                    form.setFieldsValue({
                                        name: cat.name,
                                        upCategory: cat.upCategory,
                                        show: cat.show
                                    });
                                    setShowModal(true);
                                }}
                            >
                                Редактировать
                            </Button>,
                            <Popconfirm 
                                title={"Вы точно хотите удалить выбранную категорию?"}
                                onConfirm={() => deleteData(cat._id)}
                                cancelText={"Нет"}
                                okText={"Да"}
                                placement={"topRight"}
                            >
                                <Button
                                    danger
                                    type="link"
                                >
                                    Удалить
                                </Button>
                            </Popconfirm>
                        ]}
                    >
                        <Skeleton avatar loading={loading} active>
                            <List.Item.Meta
                                title={
                                    <>
                                        <span>
                                            {cat.name}
                                        </span>
                                        <Divider type="vertical" />
                                        <span
                                            style={{color: "rgb(197 169 169 / 65%)"}}
                                        >
                                            {categories.find(item => 
                                                item._id === cat.upCategory
                                            )?.name}
                                        </span>
                                    </>
                                }
                            />
                        </Skeleton>
                    </List.Item>
                )}
            />
            <Modal
                open={showModal}
                onCancel={() => {
                    setShowModal(false);
                    form.resetFields();
                }}
                onOk={() => {
                    form.validateFields()
                        .then(values => {

                            if (modalMode === 'add') {
                                add({ ...values, type })
                                    .then(() => getData({}));
                            }

                            if (modalMode === 'edit') {
                                update({ ...values, _id: editId })
                                    .then(() => getData({}));
                            }

                            setEditId(undefined);
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
                            options={categories.filter(cat => cat._id != editId).map(cat => {
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
    )
}

export default Categories;