import { Outlet } from "react-router-dom";
import MainHeader from "@/components/header/MainHeader";
import { MainFooter } from "@/components/footer/MainFooter";
import { useUpdateAppStateFromAuth } from "@/hooks/auth/useUpdateAppStateFromAuth";

const MainWrapper = () => {

    useUpdateAppStateFromAuth();

    return (
        <>
            <MainHeader />
            <main>
                <Outlet />
            </main>
            <MainFooter />
        </>
    );
};

export default MainWrapper;