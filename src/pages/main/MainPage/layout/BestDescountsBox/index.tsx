"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { useCallback, useEffect } from "react";
import DefaultProductCard from '@/components/card/DefaultProductCard';
import './best-discounts-box-styles.css';
import appImages from "@/utils/ui/appImages";
import { useBestDiscountProductsHandler } from "@/hooks/main/useBestDiscountProductsHandler";


const BestDiscountsBox = () => {
    const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
        loop: false,
        mode: "snap",
        slides: {
            perView: 1,
            spacing: 10,
        },
        breakpoints: {
            "(min-width: 1320px)": {
                slides: {
                    perView: 1,
                    spacing: 5,
                },
            },
            "(min-width: 1350px)": {
                slides: {
                    perView: 2,
                    spacing: 5,
                    
                },
            },
            "(min-width: 1800px)": {
                slides: {
                    perView: 3,
                    spacing: 5,
                },
            },
        },
    });

    const scrollPrev = useCallback(() => slider.current?.prev(), [slider]);
    const scrollNext = useCallback(() => slider.current?.next(), [slider]);

    const { bestDiscountProducts } = useBestDiscountProductsHandler();

    useEffect(() => {
        const timeout = setTimeout(() => {
            slider.current?.update();
        }, 100);

        return () => clearTimeout(timeout);
    }, [slider]);

    return (
        <section className="best-discounts-box">
            <div className="discounts-left-content">
                <div className="discounts-text-box">
                    <h2 className="discounts-title">Melhores Descontos da Loja</h2>
                    <p className="discounts-subtitle">
                        Aproveite as ofertas exclusivas da Nike por tempo limitado!
                    </p>
                </div>

                <div className="discounts-carousel">
                    <div ref={sliderRef} className="keen-slider">
                        {bestDiscountProducts.map((product, index) => (
                            <div className="keen-slider__slide carousel-slide" key={index}>
                                <DefaultProductCard product={product} />
                            </div>
                        ))}
                    </div>
                    <button onClick={scrollPrev} className="carousel-button prev">‹</button>
                    <button onClick={scrollNext} className="carousel-button next">›</button>
                </div>
            </div>

            <div className="discounts-right-banner">
                <img
                    src={appImages.main_images.best_discounts.banner_product_discounts}
                    alt="Banner de Desconto Nike"
                    className="discounts-banner-img"
                />
            </div>
        </section>
    );
};

export default BestDiscountsBox;