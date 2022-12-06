import {Button, Card, Checkbox, Col, Divider, Form, Input, InputNumber, Modal, Row, Select, Upload} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, InboxOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {add, getByCat} from "../../services/product/";
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';

const { Meta } = Card;
const { Item } = Form;
const { TextArea } = Input;
const { Dragger } = Upload;

interface ProductCard {
    name: string,
    photos: string[]
}

const Products = () => {

    const [fileList, setFileList] = useState<UploadFile[]>([]);
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
            { id !== undefined ?
                <>
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
                </> :
                <>
                    Выберите категорию чтобы продолжить
                </>
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

                            fileList.forEach((file) => {
                                console.log(file as RcFile);
                            });

                            // fileList.forEach((file) => {
                            //     values.append('files[]', file as RcFile);
                            // });


                            add({
                                ...values,
                                compound: values.compound.split('\n'),
                                categoryId: id
                            })
                                .then(() => {
                                    // setShowModal(false);
                                    // form.resetFields();
                                });
                            // add({ ...values, type: location.pathname.split('/')[1] });
                        });
                }}
                cancelText="Отмена"
                closable={false}
            >
                <Form
                    form={form}
                    initialValues={{
                        name: "",
                        brief: "",
                        description: "",
                        compound: "",
                        proteins: "",
                        fats: "",
                        carbohydrates: "",
                        photos: undefined,
                        expiredDate: "",
                        storageCondition: "",
                        show: true
                    }}
                    layout={"vertical"}
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
                    >
                        <TextArea />
                    </Item>
                    <Item
                        label="Описание"
                        name="description"
                    >
                        <TextArea />
                    </Item>
                    <Item
                        label="Состав"
                        name="compound"
                    >
                        <TextArea
                            rows={6}
                            placeholder={"Вводите каждый ингридиент с новой строки"}
                        />
                    </Item>
                    <Divider />
                    <p>
                        БЖУ
                    </p>
                    <Row
                        gutter={[8, 8]}
                    >
                        <Col
                            span={8}
                        >
                            <Item
                                label="Белки"
                                name="proteins"
                            >
                                <InputNumber />
                            </Item>
                        </Col>
                        <Col
                            span={8}
                        >
                            <Item
                                label="Жиры"
                                name="fats"
                            >
                                <InputNumber />
                            </Item>
                        </Col>
                        <Col
                            span={8}
                        >
                            <Item
                                label="Углеводы"
                                name="carbohydrates"
                            >
                                <InputNumber />
                            </Item>
                        </Col>
                    </Row>
                    <Divider />
                    <Item
                        label="Фотографии"
                        name="photos"
                    >
                        <Dragger
                            listType={'picture'}
                            beforeUpload={(file) => {
                                setFileList([...fileList, file]);
                                return false;
                            }}
                            onRemove={(file) => {
                                setFileList(fileList.filter(item => item.uid === file.uid));
                            }}
                            className="upload-list-inline"
                            multiple={true}
                        >
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Нажмите или перетащите файлы для загрузки</p>
                        </Dragger>
                    </Item>
                    <Divider />
                    <Item
                        label="Срок годности"
                        name="expiredDate"
                    >
                        <Input />
                    </Item>
                    <Item
                        label="Условия хранения"
                        name="storageCondition"
                    >
                        <Input />
                    </Item>
                    <Divider />
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