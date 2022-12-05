import { Button, Card, Checkbox, Form, Input, Modal, Select } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getByCat } from "../../services/product/getByCat";

const { Meta } = Card;
const { Item } = Form;
const { TextArea } = Input;

interface ProductCard {
    name: string,
    photos: string[]
}

const Products = () => {
    
    const [products, setProducts] = useState<ProductCard[]>([]);
    const [showModal, setShowModal] = useState(false);
    const { id } = useParams();
    const [form] = Form.useForm();
    
    useEffect(() => {
        getByCat(id).then(res => {
            setProducts(res);
        });
    }, [id]);

    return (
        <div>
            <Button
                style={{ marginBottom: "20px" }}
                type="primary"
                icon={<PlusOutlined />}
                size="large"
                onClick={() => {
                    setShowModal(true);
                }}
            >
                Добавить
            </Button>
            {
                products.map(product =>
                    <Card
                        hoverable
                        style={{ width: 300 }}
                        cover={
                            <img
                                alt="example"
                                src={`http://localhost:5000/${product.photos[0]}` || "http://localhost:5000/product/test.jpg"}
                            />
                        }
                        actions={[
                            <EditOutlined
                                key="edit"
                                onClick={() => {
                                    console.log(product);

                                }}
                            />,
                            <DeleteOutlined
                                key="setting"
                            />,
                        ]}
                    >
                        <Meta
                            title={product.name}
                        />
                    </Card>
                )
            }
            <Modal
                open={showModal}
                onCancel={() => {
                    setShowModal(false);
                    form.resetFields();
                }}
                onOk={() => {
                    form.validateFields()
                        .then(values => {
                            // add({ ...values, type: location.pathname.split('/')[1] });
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
                        label="Краткое описание"
                        name="brief"
                        rules={[{ required: true, message: 'Введите название категории' }]}
                    >
                        <TextArea />
                    </Item>
                    <Item
                        label="Описание"
                        name="description"
                        rules={[{ required: true, message: 'Введите название категории' }]}
                    >
                        <TextArea />
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
        </div>
    )
}

export default Products;