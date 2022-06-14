import { Outlet, useNavigate } from "react-router-dom";
import { PageHeader, Button } from 'antd';
import { useHeader } from "./useHeader";
import { useAuth } from "../auth/useAuth";

import Div100vh from 'react-div-100vh';

// provide base wrapper for application
const PageTemplate = props => {
    const { signout } = useAuth();
    const { header, subheader, canGoBack } = useHeader();
    const navigate = useNavigate();

    return (
        <Div100vh
            className="main-wrapper"
        >
            {header != '' && <PageHeader
                onBack={canGoBack ? () => navigate(-1) : false}
                title={header}
                subTitle={subheader}
                extra={[
                    <Button 
                        onClick={() => signout(() => navigate('/'))}
                        type="link" 
                        danger>
                        Выйти
                    </Button>,
                ]}
                className="header"
            />}
            <Outlet />
            <div
                className="footer"
            >
                <span>
                    Кедрдом, 2022
                </span>
                <span>
                    @Дарья Уткина
                </span>
            </div>
        </Div100vh>
    )
}

export default PageTemplate;