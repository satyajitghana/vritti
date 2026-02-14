import React from "react";
import { cn } from "@/lib/utils";

interface LustreTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

const LustreText: React.FC<LustreTextProps> = ({
  text,
  disabled = false,
  speed = 5,
  className = "",
}) => {
  const animationStyle: React.CSSProperties = {
    animationDuration: `${speed}s`,
    animationTimingFunction: "linear",
    animationIterationCount: "infinite",
    animationFillMode: "forwards",
    animationName: disabled ? "none" : "lustre-shine",
    backgroundSize: "200% auto",
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    WebkitTextFillColor: "transparent",
    color: "transparent",
    backgroundImage:
      "linear-gradient(90deg, #666 0%, #999 25%, #fff 50%, #999 75%, #666 100%)",
  };

  return (
    <>
      <span
        className={cn("inline-block", className)}
        style={!disabled ? animationStyle : undefined}
      >
        {text}
      </span>
      <style>{`
        @keyframes lustre-shine {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
      `}</style>
    </>
  );
};

export default LustreText;
