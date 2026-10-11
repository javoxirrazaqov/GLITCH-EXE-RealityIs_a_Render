
import { useEffect, useState } from "react";
import "./Intro.css";

export default function Intro() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame;
    let start;

    const duration = 2600;

    const animate = (timestamp) => {
      if (!start) start = timestamp;

      const elapsed = timestamp - start;
      const value = Math.min((elapsed / duration) * 100, 100);

      setProgress(Math.round(value));

      if (elapsed < duration) {
        frame = requestAnimationFrame(animate);
      } else {
        setProgress(100);
        setTimeout(() => setVisible(false), 350);
      }
    };

    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className="gx-intro">
      <div className="gx-intro-grid" />

      <div className="gx-intro-noise" />

      <div className="gx-intro-top">
        <span>GLITCH.EXE</span>
        <span>SYS.BOOT // 001</span>
      </div>

      <div className="gx-intro-center">
        <div className="gx-logo-orbit gx-orbit-one" />
        <div className="gx-logo-orbit gx-orbit-two" />

        <div className="gx-intro-logo" aria-label="GLITCH.EXE">
          <span className="gx-bolt">ϟ</span>
        </div>

        <div className="gx-intro-title" data-text="GLITCH.EXE">
          GLITCH<span>.EXE</span>
        </div>

        <p className="gx-intro-subtitle">
          EXPERIMENTAL DIGITAL UNIVERSE
        </p>

        <div className="gx-loading">
          <div className="gx-loading-info">
            <span>INITIALIZING WORLDS</span>
            <span>{String(progress).padStart(3, "0")}%</span>
          </div>

          <div className="gx-loading-track">
            <div
              className="gx-loading-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="gx-intro-bottom">
        <span>REALITY IS A SYSTEM</span>
        <span>EST. 2026</span>
      </div>

      <div className="gx-intro-flash" />
    </div>
  );
}
