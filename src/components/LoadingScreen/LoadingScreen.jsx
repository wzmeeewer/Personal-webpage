import React, { useEffect, useRef, useState } from "react";
import { useProgress } from "@react-three/drei";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { profile } from "../../data/profileData";
import { useExperienceStore } from "../../store/useExperienceStore";
import "./LoadingScreen.css";

const preloadImages = ["red", "blue", "green", "orange"];

const LoadingScreen = () => {
  const { progress, active } = useProgress();
  const [fallbackReady, setFallbackReady] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [gone, setGone] = useState(false);

  const setIsExperienceReady = useExperienceStore((state) => state.setIsExperienceReady);
  const isSceneReady = useExperienceStore((state) => state.isSceneReady);

  const tlRef = useRef(null);
  const trRef = useRef(null);
  const blRef = useRef(null);
  const brRef = useRef(null);

  useEffect(() => {
    const readyFallback = window.setTimeout(() => {
      setFallbackReady(true);
    }, 1200);

    return () => window.clearTimeout(readyFallback);
  }, []);

  useGSAP(() => {
    if (!revealed) return;

    setIsExperienceReady(true);

    gsap.to(tlRef.current, {
      top: "-100%",
      left: "-100%",
      duration: 1,
      ease: "power2.inOut",
    });
    gsap.to(trRef.current, {
      top: "-100%",
      right: "-100%",
      duration: 1,
      ease: "power2.inOut",
    });
    gsap.to(blRef.current, {
      bottom: "-100%",
      left: "-100%",
      duration: 1,
      ease: "power2.inOut",
    });
    gsap.to(brRef.current, {
      bottom: "-100%",
      right: "-100%",
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        setGone(true);
      },
    });
  }, [revealed, setIsExperienceReady]);

  const displayProgress = fallbackReady ? 100 : Math.min(100, Math.round(progress));
  const isLoaded = displayProgress === 100 || isSceneReady || (!active && progress === 100);

  if (gone) return null;

  return (
    <>
      <div className="loading-screen">
        <div ref={tlRef} className="quadrant quadrant--tl" />
        <div ref={trRef} className="quadrant quadrant--tr" />
        <div ref={blRef} className="quadrant quadrant--bl" />
        <div ref={brRef} className="quadrant quadrant--br" />

        {!revealed && (
          <>
            <div className="loading-bar-container">
              <div className="loading-bar-fill" style={{ width: `${displayProgress}%` }} />
            </div>

            <div className="hero-copy">
              <p className="hero-kicker">欢迎来到</p>
              <h1 className="title">{profile.name}的小屋</h1>
              <p className="hero-signature">{profile.signature}</p>
              <p className="hero-subtitle">{profile.role}</p>
              <p className="hero-description">{profile.intro}</p>
            </div>

            {preloadImages.map((imageName) => (
              <div
                key={imageName}
                style={{
                  backgroundImage: `url("/images/${imageName}.webp")`,
                  width: 0,
                  height: 0,
                  visibility: "hidden",
                  position: "absolute",
                }}
              />
            ))}

            <a
              href="https://github.com/andrewwoan/aimee-weis-papercraft-world"
              className="credits-link"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                position: "absolute",
                left: "50%",
                bottom: "15%",
                transform: "translate(-50%, -50%)",
                fontSize: "14px",
                color: "rgb(233, 233, 233)",
                textDecoration: "underline",
              }}
            >
              基于开源纸艺 3D 项目改造
            </a>

            <div
              className="instructions"
              style={{
                position: "absolute",
                left: "50%",
                bottom: "205px",
                width: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                transform: "translate(-50%, -50%)",
                fontSize: "14px",
                color: "rgb(233, 233, 233)",
              }}
            >
              ~ 拖拽环视 / 滚动探索 ~
            </div>
          </>
        )}

        {isLoaded && !revealed && (
          <button
            className="enter-button"
            onClick={() => setRevealed(true)}
          >
            进入小屋
          </button>
        )}
      </div>

      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="torn" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency="0.065" numOctaves="4" seed="2" />
            <feDisplacementMap in="SourceGraphic" scale="12" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
    </>
  );
};

export default LoadingScreen;
