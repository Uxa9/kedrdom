import {Button, Card, Checkbox, Form, Input, InputNumber, Modal, Steps, Upload, UploadProps} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, InboxOutlined } from '@ant-design/icons';
import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import {UploadFile} from "antd/es/upload/interface";
import {add} from "../../services/present";
import {getByCat} from "../../services/product";

const { Meta } = Card;
const { Item } = Form;
const { TextArea } = Input;
const { Dragger } = Upload;

interface PresentCard {
    _id: string,
    name: string,
    brief: string,
    price: number,
    description: string,
    compound: string[],
    show: boolean,
}

const Present = () => {

    const [current, setCurrent] = useState(0);
    const [presentId, setPresentId] = useState("");
    const [products, setProducts] = useState<PresentCard[]>([]);
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

    const firstStep = () => {
        return (
            <Form
                form={form}
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
                    <Input />
                </Item>
                <Item
                    label="Цена"
                    name="price"
                    rules={[{ required: true, message: 'Введите название категории' }]}
                >
                    <InputNumber />
                </Item>
                <Item
                    label="Описание"
                    name="description"
                >
                    <Input />
                </Item>
                <Item
                    label="Состав"
                    name="containment"
                >
                    <TextArea
                        rows={6}
                        placeholder={"Вводите каждую позицию с новой строки"}
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
        )
    }

    const secondStep = () => {
        const props: UploadProps = {
            name: 'photos',
            multiple: true,
            action: `http://localhost:5000/present/uploadPhoto/${presentId}`,
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

    const steps = [
        {
            title: 'Данные',
            content: firstStep(),
        },
        {
            title: 'Фотографии',
            content: secondStep(),
        }
    ];

    const items = steps.map((item) => ({ key: item.title, title: item.title }));

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
                </> :
                <>Выберите категорию чтобы продолжить</>
            }
            <Modal
                open={showModal}
                onCancel={() => setShowModal(false)}
                closable={false}
                cancelText={"Отмена"}
                onOk={() => {
                    if (current === 0) {
                        form.validateFields()
                            .then(async (values) => {
                                add({
                                    ...values,
                                    categoryId: id
                                }).then((res) => {
                                    setCurrent(1);
                                    setPresentId(res);
                                });
                            });
                    }

                    if (current === 1) {
                        setShowModal(false);

                        setCurrent(0);
                        form.resetFields();
                    }
                }}
            >
                <Steps current={current} items={items} />
                <div
                    className="steps-content"
                    style={{ marginTop: "16px" }}
                >
                    {steps[current].content}
                </div>
            </Modal>
        </div>
    )
}

export default Present;