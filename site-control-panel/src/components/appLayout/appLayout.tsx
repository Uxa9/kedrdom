import { Layout } from 'antd';
import SideMenu from './sideMenu';
import ContentArea from './contentArea';
import HeaderMenu from './header';
import { useLocation } from 'react-router-dom';

const { Footer } = Layout;

const AppLayout = () => {
    
    const location = useLocation();
    
    return (
        <Layout>
            {location.pathname.split('/')[1] !== "category" &&
                <SideMenu />
            }
            <Layout>
                <HeaderMenu />
                <ContentArea />
            </Layout>
        </Layout>
    );
}

export default AppLayout;
