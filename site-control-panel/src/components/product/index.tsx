import { Button, Card, Checkbox, Col, Divider, Form, Input, InputNumber, List, Modal, Popconfirm, Row, Select, Skeleton, Steps, Upload } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, InboxOutlined } from '@ant-design/icons';
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { add, addVariant, deleteProduct, deleteVariant, getByCat, getProduct, updateProduct, updateVariant } from "../../services/product/";
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import { getAll, update } from "../../services/category";

const { Meta } = Card;
const { Item } = Form;
const { TextArea } = Input;
const { Dragger } = Upload;

interface ProductCard {
    _id: string,
    name: string,
    brief: string,
    description: string,
    compound: string[],
    pfc: {
        proteins: number,
        fats: number,
        carbohydrates: number
    },
    photos: string[],
    expiredDate: string,
    storageCondition: string,
    variants: VariantCard[],
    show: boolean,
}

interface VariantCard {
    weight: number,
    price: number,
    available: boolean,
    supplyDate: string,
    _id: string
}

const Products = () => {

    const [current, setCurrent] = useState(0);
    const [productId, setProductId] = useState("");
    const [editVariantId, setVariantId] = useState("");
    const [productVars, setProductVars] = useState<VariantCard[]>([]);
    const [varEdit, setVarEdit] = useState(false);
    const [products, setProducts] = useState<ProductCard[]>([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const { id } = useParams();
    const [form] = Form.useForm();
    const [formVar] = Form.useForm();
    const [editForm] = Form.useForm();

    useEffect(() => {
        if (id !== null) {
            getByCat(id).then(res => {
                setProducts(res);
            });
        }
    }, [id]);

    useEffect(() => {
        if (current === 2) {
            getProduct(productId)
                .then(res => {
                    setProductVars(res.variants);
                });
        }
    }, [current]);

    useEffect(() => {        
        if (productId !== "") {
            getProduct(productId)
                .then(res => {
                    setProductVars(res.variants);
                });
        }
    }, [productId])

    const firstStep = () => {
        return (
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
        )
    }

    const secondStep = () => {
        const props: UploadProps = {
            name: 'photos',
            multiple: true,
            action: `https://kedrdom27.ru:5000/product/uploadPhoto/${productId}`,
            listType: "picture",
            className: "upload-list-inline"
        };

        return (
            <Dragger {...props}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Нажмите или перетащите файлы для загрузки</p>
            </Dragger>
        )
    }

    const thirdStep = () => {
        return (
            <>
                <List
                    loading={loading}
                    itemLayout="horizontal"
                    dataSource={productVars}
                    renderItem={(variant) => (
                        <List.Item
                            actions={[
                                <Button
                                    type="link"
                                    onClick={() => {
                                        setVariantId(variant._id);
                                        setVarEdit(true);

                                        formVar.setFieldsValue({
                                            weight: variant.weight,
                                            price: variant.price,
                                            available: variant.available,
                                            supplyDate: variant.supplyDate
                                        });
                                    }}
                                >
                                    <EditOutlined />
                                </Button>,
                                <Popconfirm
                                    title={"Вы точно хотите удалить выбранный вариант?"}
                                    onConfirm={() => deleteVariant({
                                        variantId: variant._id,
                                        _id: productId
                                    }).then(() => {
                                        getProduct(productId)
                                            .then(res => {
                                                setProductVars(res.variants);
                                            });
                                    })}
                                    cancelText={"Нет"}
                                    okText={"Да"}
                                    placement={"topRight"}
                                >
                                    <Button
                                        danger
                                        type="link"
                                    >
                                        <DeleteOutlined />
                                    </Button>
                                </Popconfirm>
                            ]}
                        >
                            <Skeleton avatar loading={loading} active>
                                <List.Item.Meta
                                    title={
                                        <>
                                            <span>
                                                {variant.weight}
                                            </span>
                                            <Divider type="vertical" />
                                            <span>
                                                {variant.price}
                                            </span>
                                            <Divider type="vertical" />
                                            <span>
                                                {variant.available ? "В наличии" : "Нет в наличии"}
                                            </span>
                                            <Divider type="vertical" />
                                            <span>
                                                {variant.supplyDate}
                                            </span>
                                        </>
                                    }
                                />
                            </Skeleton>
                        </List.Item>
                    )}
                />
                <Divider />
                {!varEdit ?
                    <span>Добавить новый</span> :
                    <span>Редактировать</span>
                }
                <Form
                    layout="vertical"
                    form={formVar}
                    onFinish={async (values: any) => {
                        !varEdit ?
                            await addVariant({
                                ...values,
                                _id: productId
                            }) :
                            await updateVariant({
                                ...values,
                                variantId: editVariantId,
                                _id: productId
                            });
                        setVarEdit(false);
                        formVar.resetFields();
                        getProduct(productId)
                            .then(res => {
                                setProductVars(res.variants);
                            });
                    }}
                >
                    <Row
                        gutter={[16, 0]}
                    >
                        <Col
                            span={12}
                        >
                            <Item
                                label="Вес"
                                name="weight"
                            >
                                <InputNumber />
                            </Item>
                        </Col>
                        <Col
                            span={12}
                        >
                            <Item
                                label="Цена"
                                name="price"
                            >
                                <InputNumber />
                            </Item>
                        </Col>
                    </Row>
                    <Row
                        gutter={[16, 0]}
                    >
                        <Col
                            span={12}
                        >
                            <Item
                                label="Доступен"
                                valuePropName='checked'
                                name="available"
                            >
                                <Checkbox
                                    defaultChecked={true}
                                />
                            </Item>
                        </Col>
                        <Col
                            span={12}
                        >
                            <Item
                                label="Дата поставки"
                                name="supplyDate"
                            >
                                <Input />
                            </Item>
                        </Col>
                    </Row>
                    <Button
                        type="primary"
                        htmlType="submit"
                    >
                        {!varEdit ? "Добавить" : "Обновить"}
                    </Button>
                </Form>
            </>
        )
    }

    const steps = [
        {
            title: 'Данные',
            content: firstStep(),
        },
        {
            title: 'Фотографии',
            content: secondStep(),
        },
        {
            title: 'Варианты',
            content: thirdStep(),
        },
    ];

    const items = steps.map((item) => ({ key: item.title, title: item.title }));

    const handleChange: UploadProps['onChange'] = ({ file, fileList: newFileList }) => {
        // check multiple upload
        const index = newFileList.findIndex(item => item.uid === file.uid);

        if (index !== -1 && file.response !== undefined) {
            newFileList[index].name = file.response;
        }


        setFileList(newFileList);
    }

    return (
        <div>
            {id !== undefined ?
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
                    <div
                        style={{
                            display: "grid",
                            alignItems: "center",
                            gridTemplateColumns: "repeat(auto-fit, minmax(332px, 1fr))"
                        }}
                    >
                    {
                        products.map(product =>
                            <Card
                                hoverable
                                style={{ width: 300, marginBottom: "16px" }}
                                cover={
                                    <img
                                        alt="example"
                                        src={`https://kedrdom27.ru:5000/${product.photos[0]}` || "https://kedrdom27.ru:5000/product/test.jpg"}
                                    />
                                }
                                actions={[
                                    <Button
                                        type="link"
                                        onClick={() => {
                                            setShowEditModal(true);
                                            setProductId(product._id);
                                            editForm.setFieldsValue({
                                                ...product,
                                                proteins: product.pfc.proteins,
                                                fats: product.pfc.fats,
                                                carbohydrates: product.pfc.carbohydrates,
                                            });
                                            setFileList(product.photos.map((item, index): UploadFile => {
                                                return {
                                                    uid: index.toString(),
                                                    name: item,
                                                    status: 'done',
                                                    url: `https://kedrdom27.ru:5000/${product.photos[index]}` || "https://kedrdom27.ru:5000/product/test.jpg"
                                                }
                                            }))
                                        }}
                                    >
                                        <EditOutlined
                                            key="edit"
                                        />
                                    </Button>
                                    ,
                                    <Popconfirm
                                        title={"Вы точно хотите удалить выбранный товар?"}
                                        onConfirm={() => {
                                            deleteProduct(product._id)
                                                .then(() => getByCat(id).then(res => {
                                                    setProducts(res);
                                                }));
                                        }}
                                        cancelText={"Нет"}
                                        okText={"Да"}
                                        placement={"topRight"}
                                    >
                                        <Button
                                            danger
                                            type="link"
                                        >
                                            <DeleteOutlined />
                                        </Button>
                                    </Popconfirm>
                                ]}
                            >
                                <Meta
                                    title={product.name}
                                />
                            </Card>
                        )
                    }
                </div>
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
                    setCurrent(0);
                }}
                onOk={() => {
                    if (current === 0) {
                        form.validateFields()
                            .then(async (values) => {
                                add({
                                    ...values,
                                    pfc: {
                                        fats: values.fats,
                                        carbohydrates: values.carbohydrates,
                                        proteins: values.proteins
                                    },
                                    categoryId: id
                                })
                                    .then((res) => {
                                        setCurrent(1);
                                        setProductId(res);
                                    });
                            });
                    }

                    if (current === 1) {
                        setCurrent(2);
                    }

                    if (current === 2) {
                        setShowModal(false);
                        getByCat(id).then(res => {
                            setProducts(res);
                        });
                        setCurrent(0);
                        form.resetFields();
                    }
                }}
                cancelText="Отмена"
                closable={false}
            >
                <Steps current={current} items={items} />
                <div
                    className="steps-content"
                    style={{ marginTop: "16px" }}
                >
                    {steps[current].content}
                </div>
            </Modal>
            <Modal
                open={showEditModal}
                onCancel={() => {
                    setShowEditModal(false);
                }}
                onOk={() => {
                    editForm.validateFields()
                        .then(values => {
                            updateProduct({
                                _id: productId,
                                pfc: {
                                    fats: values.fats,
                                    carbohydrates: values.carbohydrates,
                                    proteins: values.proteins
                                },
                                ...values,
                                photos: fileList.map(item => item.name)
                            })
                                .then(() => {
                                    setShowEditModal(false);
                                    getByCat(id).then(res => {
                                        setProducts(res);
                                    });
                                });
                        });
                }}
                cancelText="Отмена"
                closable={false}
            >
                <Form
                    form={editForm}
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
                    <Divider />
                    <span>Фотографии</span>
                    <Upload
                        name="photos"
                        action={`https://kedrdom27.ru:5000/product/uploadPhoto/${productId}`}
                        listType="picture-card"
                        fileList={fileList}
                        multiple={true}
                        onChange={(param) => {
                            handleChange(param);
                        }}
                    >
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Загрузить</div>
                        </div>
                    </Upload>
                    <Divider />
                    <span>Варианты</span>
                </Form>
                {thirdStep()}
            </Modal>
        </div >
    )
}

export default Products;