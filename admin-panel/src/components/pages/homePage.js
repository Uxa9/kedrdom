import React, { useEffect } from "react";
import { useHeader } from "../common/useHeader";
import { useNavigate } from "react-router-dom";
import { Button, Col, Row } from 'antd';

const HomePage = () => {
    const { switchHeader } = useHeader();
    const navigate = useNavigate();

    useEffect(() => {
        switchHeader('Главная', '', false);
    }, []);

    return (
        <div
            className="flex-col main-content"
        >
            <Button 
                size="large"
                className="main-wrapper-button"
                onClick={() => navigate('/goods')}
            >
                Товары
            </Button>
            <Button 
                size="large"
                className="main-wrapper-button"
                onClick={() => navigate('/promos')}
            >
                Акции
            </Button>            
            <Button 
                size="large"
                className="main-wrapper-button"
                onClick={() => navigate('/orders')}
            >
                Заказы
            </Button>
            <Button 
                size="large"
                className="main-wrapper-button"
                onClick={() => navigate('/reviews')}
            >
                Отзывы
            </Button>           
            <Button 
                size="large"
                className="main-wrapper-button"
                onClick={() => navigate('/clients')}
            >
                Клиенты
            </Button>
        </div>
    )
}

export default HomePage;