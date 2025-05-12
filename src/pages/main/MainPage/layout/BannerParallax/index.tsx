"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useInView } from "framer-motion";
import appImages from "@/utils/ui/appImages";
import "./banner-parallax-styles.css";
import BannerProductCard from "@/components/card/BannerProductCard";
import { useComboProductsHandler } from "@/hooks/main/useComboProductsHandler";

const BannerParallax = () => {
    const frontImage = appImages.main_images.banner.nike_air_max_plus_banner_2;
    const backImage = appImages.main_images.banner.nike_air_max_plus_banner_1;

    // Valores de movimento do mouse
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const frontX = useTransform(mouseX, [0, 1], [-40, 80]);
    const frontY = useTransform(mouseY, [0, 1], [-40, 40]);

    const backX = useTransform(mouseX, [0, 1], [-20, 20]);
    const backY = useTransform(mouseY, [0, 1], [-20, 20]);

    const bannerContainerRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    const itemCardContainerRef = useRef(null);
    const isInView = useInView(itemCardContainerRef, { once: true, margin: "-50px" });

    const handleMouseMove = (e: MouseEvent) => {
        if (!bannerContainerRef.current) return;
        const { left, top, width, height } = bannerContainerRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        mouseX.set(x);
        mouseY.set(y);
    };

    useEffect(() => {
        const node = bannerContainerRef.current;
        if (!node) return;

        const onEnter = () => setIsHovering(true);
        const onLeave = () => setIsHovering(false);

        node.addEventListener("mousemove", handleMouseMove);
        node.addEventListener("mouseenter", onEnter);
        node.addEventListener("mouseleave", onLeave);

        return () => {
            node.removeEventListener("mousemove", handleMouseMove);
            node.removeEventListener("mouseenter", onEnter);
            node.removeEventListener("mouseleave", onLeave);
        };
    }, []);

    const { comboProducts } = useComboProductsHandler("combo-air-max-plus");    // Combo de Air Max Plus

    return (
        <div className="main-content-banner" ref={bannerContainerRef}>
            <div className={"banner-column-container"}>
                <div className={"banner-presentation-container"}>
                    <div className="banner-hero-section">
                        <h1 className="banner-title">
                            Combo Exclusivo
                            <br />
                            <strong>Air Max Plus</strong>
                        </h1>
                        <p className="banner-description">
                            Conforto, estilo e atitude em um só tênis. Movimente-se com personalidade usando o novo Nike Air Max Plus.
                        </p>
                        <div className={"banner-add-item-container"}>
                            <button>
                                Comprar
                            </button>
                        </div>
                    </div>

                    <div className="parallax-wrapper">
                        {/* Camada traseira */}
                        <motion.div
                            className="shoe-layer back"
                            style={{ x: backX, y: backY }}
                            animate={
                                isHovering
                                    ? { y: 0, rotateZ: 0 }
                                    : {
                                        y: [0, -14, 0],
                                    }
                            }
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            <motion.img
                                src={backImage}
                                alt="Tênis Air Max Plus 2"
                                style={{ width: "60%" }}
                                draggable={false}
                            />
                        </motion.div>

                        {/* Camada frontal */}
                        <motion.div
                            className="shoe-layer front"
                            style={{ x: frontX, y: frontY }}
                            animate={
                                isHovering
                                    ? { y: 0, rotateZ: 0 }
                                    : {
                                        y: [0, -18, 0],
                                    }
                            }
                            transition={{
                                duration: 4.2,
                                repeat: Infinity,
                                ease: [0.4, 0.0, 0.2, 1]
                            }}
                        >
                            <motion.img
                                src={frontImage}
                                alt="Tênis Air Max Plus 1"
                                style={{ width: "35vw" }}
                                draggable={false}
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
            <div className={"banner-column-container"}>
                <motion.div
                    ref={itemCardContainerRef}
                    className={"banner-items-card-container"}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: "easeOut" }}>
                    {comboProducts.map(product => (
                        <BannerProductCard key={product._id} product={product} />
                    ))}
                </motion.div>
            </div>

        </div>
    );
};

export default BannerParallax;