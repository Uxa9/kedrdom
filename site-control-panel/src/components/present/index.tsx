import { Button, Card, Checkbox, Form, Input, InputNumber, Modal, Steps, Upload, UploadProps, Popconfirm, Divider } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, InboxOutlined } from '@ant-design/icons';
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { UploadFile } from "antd/es/upload/interface";
import { add, deletePresent, updatePresent } from "../../services/present";
import { getByCat } from "../../services/present";

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
    containment: string[],
    show: boolean,
    photos: string[],
}

const Present = () => {

    const [current, setCurrent] = useState(0);
    const [presentId, setPresentId] = useState("");
    const [presents, setPresents] = useState<PresentCard[]>([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const { id } = useParams();
    const [form] = Form.useForm();
    const [editForm] = Form.useForm();

    useEffect(() => {
        if (id !== null) {
            getByCat(id).then(res => {
                setPresents(res);
            });
        }
    }, [id]);

    const firstStep = () => {
        return (
            <Form
                form={form}
                initialValues={{
                    name: "",
                    brief: "",
                    price: "",
                    description: "",
                    containment: "",
                    show: true,
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
                            presents.map(present =>
                                <Card
                                    hoverable
                                    style={{ width: 300, marginBottom: "16px" }}
                                    cover={
                                        <img
                                            alt="example"
                                            src={`https://kedrdom27.ru:5000/${present.photos[0]}` || "https://kedrdom27.ru:5000/present/test.jpg"}
                                        />
                                    }
                                    actions={[
                                        <Button
                                            type="link"
                                            onClick={() => {
                                                setShowEditModal(true);
                                                setPresentId(present._id);
                                                editForm.setFieldsValue({
                                                    ...present
                                                });
                                                setFileList(present.photos.map((item, index): UploadFile => {
                                                    return {
                                                        uid: index.toString(),
                                                        name: item,
                                                        status: 'done',
                                                        url: `https://kedrdom27.ru:5000/${present.photos[index]}` || "https://kedrdom27.ru:5000/present/test.jpg"
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
                                                deletePresent(present._id)
                                                    .then(() => getByCat(id).then(res => {
                                                        setPresents(res);
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
                                        title={present.name}
                                    />
                                </Card>
                            )
                        }
                    </div>
                </> :
                <>Выберите категорию чтобы продолжить</>
            }
            <Modal
                open={showModal}
                onCancel={() => {
                    setShowModal(false);
                    form.resetFields();
                    setCurrent(0);
                }}
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
            <Modal
                open={showEditModal}
                onCancel={() => {
                    setShowEditModal(false);
                }}
                onOk={() => {
                    editForm.validateFields()
                        .then(values => {
                            updatePresent({
                                _id: presentId,
                                ...values,
                                photos: fileList.map(item => item.name)
                            })
                                .then(() => {
                                    setShowEditModal(false);
                                    getByCat(id).then(res => {
                                        setPresents(res);
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
                    <Divider />
                    <span>Фотографии</span>
                    <Upload
                        name="photos"
                        action={`https://kedrdom27.ru:5000/present/uploadPhoto/${presentId}`}
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
            </Modal>
        </div>
    )
}

export default Present;