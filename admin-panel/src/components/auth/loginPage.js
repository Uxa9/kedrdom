import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PageTemplate from "../common/pageTemplate";
import { useAuth } from "./useAuth";
import { useHeader } from "../common/useHeader";
import { Form, Input, Button } from "antd";

const LoginPage = () => {
    const { switchHeader } = useHeader();
    const navigate = useNavigate();
    const location = useLocation();
    const { signin } = useAuth();

    const formPage = location.state?.from?.pathname || '/';

    const handleSubmit = values => {
        const user = values.username;

        signin(user, () => navigate(formPage, { replace: true }));
    }

    useEffect(() => {
        switchHeader('', '', false);
    }, []);

    return (
        <div className="flex-col main-content">
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
                    label="Логин"
                    name="username"
                    rules={[{ required: true, message: 'Введите логин!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Пароль"
                    name="password"
                    rules={[{ required: true, message: 'Введите пароль!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item>
                    <Button style={{ width: '100%', marginTop: '20px' }} type="primary" htmlType="submit">
                        Войти
                    </Button>
                </Form.Item>
            </Form>
        </div>
    )
}

export default LoginPage;