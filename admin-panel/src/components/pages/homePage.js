import React from "react";
import { useAuth } from "../auth/useAuth";
import { useNavigate } from "react-router-dom";
import { Button, Col, Row } from 'antd';

const HomePage = () => {
    const { signout } = useAuth();
    const navigate = useNavigate();

    return (
        <>
            <Button 
                size="large"
                className="main-wrapper-button"
            >
                Товары
            </Button>
            <Button 
                size="large"
                className="main-wrapper-button"
            >
                Акции
            </Button>            
            <Button 
                size="large"
                className="main-wrapper-button"
            >
                Заказы
            </Button>
            <Button 
                size="large"
                className="main-wrapper-button"
            >
                Отзывы
            </Button>           
            <Button 
                size="large"
                className="main-wrapper-button"
            >
                Клиенты
            </Button>
           <button onClick={() => signout(() => navigate('/'))}>
                logout
           </button>
        </>
    )
}

export default HomePage;