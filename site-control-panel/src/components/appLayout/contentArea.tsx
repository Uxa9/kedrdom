import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

const { Content } = Layout;

const ContentArea = () => {
    

    return (
        <Content style={{ margin: '0' }}>
            <div 
                className="site-layout-background" 
                style={{ 
                    padding: 24, 
                    minHeight: "calc(100vh - 131px)",
                    boxSizing: "border-box"
                }}>
                <Outlet />
            </div>
        </Content>
    )
}

export default ContentArea;