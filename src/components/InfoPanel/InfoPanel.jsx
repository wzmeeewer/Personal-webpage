import React from "react";
import "./InfoPanel.css";
import { useCurveProgressStore } from "../../store/useCurveProgressStore";

const progressMoveRanges = {
  winter: { start: 0, end: 0.235 },
  spring: { start: 0.235, end: 0.49 },
  summer: { start: 0.49, end: 0.74 },
  fall: { start: 0.74, end: 1 },
};

const seasonImages = {
  winter: "/images/blue.webp",
  spring: "/images/green.webp",
  summer: "/images/orange.webp",
  fall: "/images/red.webp",
};

const getSeason = (scrollProgress) => {
  for (const [season, range] of Object.entries(progressMoveRanges)) {
    if (scrollProgress >= range.start && scrollProgress <= range.end) {
      return season;
    }
  }
  return "winter";
};

const InfoPanel = () => {
  const scrollProgress = useCurveProgressStore((state) => state.scrollProgress);
  const season = getSeason(scrollProgress);

  return (
    <div
      className="info-panel"
      style={{ backgroundImage: `url(${seasonImages[season]})` }}
    >
      hello universe
    </div>
  );
};

export default InfoPanel;
