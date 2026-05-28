import { useEffect, useRef, useState } from "react";
import { useCameraStore } from "../../store/useCameraStore";
import { useInteractionStore } from "../../store/useInteractionStore";
import "./PortfolioNav.css";

const navItems = [
  { id: "home", label: "首页" },
  { id: "about", label: "关于我" },
  { id: "projects", label: "项目" },
  { id: "methods", label: "方法" },
  { id: "notes", label: "笔记" },
  { id: "contact", label: "联系" },
];

const PortfolioNav = () => {
  const activeView = useCameraStore((state) => state.activeView);
  const setActiveView = useCameraStore((state) => state.setActiveView);
  const setActiveArea = useInteractionStore((state) => state.setActiveArea);
  const [clickedId, setClickedId] = useState(null);
  const clickTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      window.clearTimeout(clickTimerRef.current);
    };
  }, []);

  const handleClick = (itemId) => {
    setActiveView(itemId);
    setActiveArea(null);
    setClickedId(itemId);
    window.clearTimeout(clickTimerRef.current);
    clickTimerRef.current = window.setTimeout(() => {
      setClickedId(null);
    }, 200);
  };

  return (
    <nav className="portfolio-nav" aria-label="作品集展区导航">
      {navItems.map((item) => (
        <button
          key={item.id}
          type="button"
          className={[
            activeView === item.id ? "is-active" : "",
            clickedId === item.id ? "is-clicked" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          onClick={() => handleClick(item.id)}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
};

export default PortfolioNav;
