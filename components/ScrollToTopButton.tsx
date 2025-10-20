"use client";
import { useEffect, useState } from "react";

const ScrollToTopButton = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const toggleVisible = () => {
            setVisible(window.scrollY > 300);
        };

        window.addEventListener("scroll", toggleVisible);
        return () => window.removeEventListener("scroll", toggleVisible);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-6 right-4 z-50 rounded-full transition-opacity
  ${visible ? "opacity-100" : "opacity-0"} glow-bounce hover:animate-none`}
            aria-label="Scroll to top"
        >
        {/* <FaAngleUp size={20}/> */}
        <img src="/images/scroll_top.webp" alt="Scroll Button" className="w-[10.3vw] lg:w-[2.2vw]" />
        </button>

    );
};

export default ScrollToTopButton;
