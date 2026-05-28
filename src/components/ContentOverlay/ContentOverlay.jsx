import { useEffect, useCallback } from "react";
import { useInteractionStore } from "../../store/useInteractionStore";
import { overlayContent } from "./contentData";
import Book from "./Book";
import Cards from "./Cards";
import Notebook from "./Notebook";
import Envelope from "./Envelope";
import "./ContentOverlay.css";

const ContentOverlay = () => {
  const activeArea = useInteractionStore((state) => state.activeArea);
  const setActiveArea = useInteractionStore((state) => state.setActiveArea);

  const close = useCallback(() => {
    setActiveArea(null);
  }, [setActiveArea]);

  useEffect(() => {
    if (!activeArea || activeArea === "home") return;
    const handleKey = (e) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeArea, close]);

  if (!activeArea || activeArea === "home") return null;

  const content = overlayContent[activeArea];
  if (!content) return null;

  const renderContent = () => {
    switch (content.type) {
      case "book":
        return (
          <Book
            coverTitle={content.coverTitle}
            coverSubtitle={content.coverSubtitle}
            coverColor={content.coverColor}
            pages={content.pages}
          />
        );
      case "cards":
        return <Cards title={content.title} items={content.items} />;
      case "notebook":
        return <Notebook title={content.title} body={content.body} />;
      case "envelope":
        return (
          <Envelope
            title={content.title}
            intro={content.intro}
            lines={content.lines}
          />
        );
      default:
        return null;
    }
  };

  const isBook = content.type === "book";

  return (
    <div
      className="co-overlay"
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="co-container" onClick={(e) => e.stopPropagation()}>
        {!isBook && (
          <button className="co-close-btn" onClick={close} aria-label="关闭">
            &#10005;
          </button>
        )}
        {renderContent()}
      </div>
    </div>
  );
};

export default ContentOverlay;
