import "./main-page.css";
import BannerParallax from './layout/BannerParallax';
import BrandIconsGrid from './layout/BrandIconsGrid';
import PlaylistSection from './layout/PlaylistSection';
import BestDiscountsBox from './layout/BestDescountsBox';

const MainPage = () => {
    return (
        <div className={"main-container"}>
            <BannerParallax />
            <div className={"main-content-box"}>
                <BrandIconsGrid />
                <PlaylistSection />
                <BestDiscountsBox />
            </div>
        </div>
    )
}

export default MainPage;