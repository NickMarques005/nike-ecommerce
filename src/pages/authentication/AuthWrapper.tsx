import { Outlet } from "react-router-dom";
import "./index.css";

const AuthWrapper = () => {
    return (
        <>
            <Outlet />
        </>
    );
}

export default AuthWrapper;