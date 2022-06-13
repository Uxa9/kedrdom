import { Outlet } from "react-router-dom";

// provide base wrapper for application
const PageTemplate = () => {

    return (
        <div
            className="main-wrapper"
        >
            
            <Outlet />
        </div>
    )
}

export default PageTemplate;