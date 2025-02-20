import { useEffect, useState } from "react";
import { BsAirplaneFill } from "react-icons/bs";
import "./scrolltotopbutton.scss";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    isVisible && (
      <button
        onClick={scrollToTop}
        className={`scroll-to-top ${isVisible ? "visible" : ""}`}
      >
        <BsAirplaneFill size={24} />
      </button>
    )
  );
};

export default ScrollToTopButton;
