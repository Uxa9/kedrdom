import { Layout } from 'antd';
import SideMenu from './sideMenu';
import ContentArea from './contentArea';
import HeaderMenu from './header';

const { Footer } = Layout;

const AppLayout = () => {
    
    return (
        <Layout>
            <SideMenu />
            <Layout>
                <HeaderMenu />
                <ContentArea />
                <Footer style={{ textAlign: 'center' }}>Кедровый дом ©2022</Footer>
            </Layout>
        </Layout>
    );
}

export default AppLayout;
