import { useEffect, useState } from "react";

export default function Cursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [active, setActive] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const move = (event) => {
      setPosition({ x: event.clientX, y: event.clientY });
      setVisible(true);

      const target = event.target;
      setActive(
        Boolean(
          target instanceof Element &&
          target.closest("a, button, [data-cursor]")
        )
      );
    };

    const leave = () => setVisible(false);
    const enter = () => setVisible(true);

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    document.addEventListener("mouseenter", enter);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
      document.removeEventListener("mouseenter", enter);
    };
  }, []);

  return (
    <div
      className={`custom-cursor ${active ? "is-active" : ""} ${
        visible ? "is-visible" : ""
      }`}
      style={{
        "--cursor-x": `${position.x}px`,
        "--cursor-y": `${position.y}px`,
      }}
      aria-hidden="true"
    >
      <span />
    </div>
  );
}