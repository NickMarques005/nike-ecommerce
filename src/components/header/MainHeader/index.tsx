import "./main-header.css";
import MainSubHeader from "./layout/MainSubHeader";
import MainNavBar from "./layout/MainNavBar";

const MainHeader = () => {
    return (
        <header className="header" id="navigationHeader">
            <div className="fixed-header">
                <MainSubHeader />
                <MainNavBar />
            </div>
        </header>
    );
};

export default MainHeader;