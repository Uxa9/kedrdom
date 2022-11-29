import React, { useEffect, useState } from 'react';
import { Layout, Menu, MenuProps } from 'antd';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { getAll } from '../../services/category';
import { useLocation } from 'react-router-dom';


const { Sider } = Layout;

interface Category {
    name: string,
    show: boolean,
    type: string,
    _id: string,
    upCategory: string
}

const SideMenu = () => {

    const location = useLocation();
    
    const [categories, setCategories] = useState<Category[]>([]);

    useEffect(() => {
        getAll({type: location.pathname.split('/')[1]})
            .then((res: Category[]) => {
                setCategories(res);
            })
    }, [location.pathname]);

    const parseMenuItems = (data: Category[]) => {
        const nest: any = (items: Category[], id = "") =>
            items
                .filter(item => item.upCategory === id)
                .map(cat => {
                    const children =[ 
                        {
                            key: cat._id,
                            label: "Показать все"
                        },
                        ...nest(items, cat._id)
                    ];

                    return ({
                        key: cat._id,
                        label: cat.name,
                        children: children.length > 1 ? children : undefined
                })}); 
        

        return nest(data);
    }

    return (
        <Sider
            breakpoint="lg"
            collapsedWidth="0"
            style={{
                paddingTop: "64px"
            }}
        >
            <div className="logo" />
            <Menu
                theme="dark"
                mode="inline"
                items={parseMenuItems(categories)}
                onClick={(e) => console.log(e)}
            />
        </Sider>
    );
}

export default SideMenu;