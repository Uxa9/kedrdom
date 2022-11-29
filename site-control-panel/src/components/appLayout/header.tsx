import { Layout, Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

const navMenu: MenuProps['items'] = [
    {
        key: 'product',
        label: 'Товары'
    },
    {
        key: 'present',
        label: 'Подарки'
    },
];

const HeaderMenu = () => {
    const navigate = useNavigate();

    return (
        <Header className="site-layout-sub-header-background" style={{ padding: 0 }}>
            <Menu
                theme="dark"
                mode="horizontal"
                items={navMenu}
                onClick={(target: any) => navigate(target.key)}
            />
        </Header>
    )
}

export default HeaderMenu;