import { useState, useEffect } from "react";

const Crosshair = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleLockChange = () => {
      setVisible(document.pointerLockElement !== null);
    };

    document.addEventListener("pointerlockchange", handleLockChange);
    return () => document.removeEventListener("pointerlockchange", handleLockChange);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="
        pointer-events-none
        absolute
        top-1/2 left-1/2
        -translate-x-1/2 -translate-y-1/2
      "
    >
      <div
        className="
          w-3 h-3
          rounded-full
          border border-white
          bg-transparent
        "
      />
    </div>
  );
};

export default Crosshair;
