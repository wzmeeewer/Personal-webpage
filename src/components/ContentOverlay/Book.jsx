import { useState, useCallback } from "react";
import { useInteractionStore } from "../../store/useInteractionStore";

const Book = ({ coverTitle, coverSubtitle, coverColor, pages }) => {
  const setActiveArea = useInteractionStore((state) => state.setActiveArea);
  const [showCover, setShowCover] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);
  const [flipping, setFlipping] = useState(false);

  const totalPages = pages.length;

  const close = useCallback(() => {
    setActiveArea(null);
  }, [setActiveArea]);

  const openCover = () => setShowCover(false);

  const goNext = useCallback(() => {
    if (flipping) return;
    if (pageIndex >= totalPages - 1) {
      close();
      return;
    }
    setFlipping(true);
    setTimeout(() => {
      setPageIndex((p) => p + 1);
      setFlipping(false);
    }, 500);
  }, [flipping, pageIndex, totalPages, close]);

  const goPrev = useCallback(() => {
    if (flipping || pageIndex === 0) return;
    setFlipping(true);
    setTimeout(() => {
      setPageIndex((p) => p - 1);
      setFlipping(false);
    }, 500);
  }, [flipping, pageIndex]);

  // ── cover ──────────────────────────────────────────
  if (showCover) {
    return (
      <div className="book-cover-outer">
        <div className="book-cover" style={{ background: coverColor }} onClick={openCover}>
          <div className="book-cover-spine" />
          <div className="book-cover-body">
            <div className="book-cover-deco" />
            <h2 className="book-cover-title">{coverTitle}</h2>
            <div className="book-cover-rule" />
            <p className="book-cover-subtitle">{coverSubtitle}</p>
          </div>
          <span className="book-cover-hint">点击翻开</span>
        </div>
        <button className="book-close-btn" onClick={close}>&#10005;</button>
      </div>
    );
  }

  // ── open spread ────────────────────────────────────
  const { left, right } = pages[pageIndex];

  return (
    <div className="book-open-wrapper">
      <button
        className={`book-nav-btn${pageIndex === 0 ? " book-nav-hidden" : ""}`}
        onClick={goPrev}
        aria-label="上一页"
      >
        &#8249;
      </button>

      <div style={{ position: "relative" }}>
        <div className="book-spread">
          {/* left page */}
          <div className="book-page book-page-left">
            <h3 className="book-pg-title">{left.title}</h3>
            <div className="book-pg-rule" />
            <p className="book-pg-body">{left.body}</p>
          </div>

          <div className="book-spine-shadow" />

          {/* right page with flip */}
          <div className={`book-page book-page-right${flipping ? " book-is-flipping" : ""}`}>
            <div className="book-pg-front">
              <h3 className="book-pg-title">{right.title}</h3>
              <div className="book-pg-rule" />
              <p className="book-pg-body">{right.body}</p>
              <span className="book-pg-num right">{pageIndex + 1}</span>
            </div>
            <div className="book-pg-back" />
          </div>
        </div>

        <div className="book-counter">
          {pageIndex + 1} / {totalPages}
        </div>
      </div>

      <button className="book-nav-btn" onClick={goNext} aria-label="下一页">
        &#8250;
      </button>

      <button className="book-close-btn" onClick={close}>&#10005;</button>
    </div>
  );
};

export default Book;
