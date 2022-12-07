import { Button, Checkbox, Form, Input, InputNumber, Modal, Steps, UploadProps } from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined, InboxOutlined } from '@ant-design/icons';
import { useParams } from "react-router-dom";
import { useState } from "react";
import TextArea from "antd/es/input/TextArea";
import Dragger from "antd/es/upload/Dragger";


const Present = () => {

    const { id } = useParams();
    const [current, setCurrent] = useState(0);
    const [presentId, setPresentId] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [form] = Form.useForm();
    const { Item } = Form;

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
                        placeholder={"Вводите каждый ингридиент с новой строки"}
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
            action: `http://95.163.242.54:5000/present/uploadPhoto/${presentId}`,
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
                            .then(async (values) => { })
                            .then(() => {
                                setPresentId("");
                                setCurrent(1);
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