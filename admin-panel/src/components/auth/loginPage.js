import { useLocation, useNavigate } from "react-router-dom";
import PageTemplate from "../common/pageTemplate";
import { useAuth } from "./useAuth";

const LoginPage = () => {
    const navigate   = useNavigate();
    const location   = useLocation();
    const { signin } = useAuth();

    const formPage = location.state?.from?.pathname || '/';

    const handleSubmit = event => {
        event.preventDefault();
        const form = event.target;
        const user = form.username.value;

        signin(user, () => navigate(formPage, {replace: true}));
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input name="username" />
                <button type="submit">send</button>
            </form>
        </div>
    )
}

export default LoginPage;