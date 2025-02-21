import { useEffect, useState } from "react";

export default function ProgressBar(props) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(props.percent);
  }, [props.percent]);

  return (
    <div style={{ width: "100%", padding: "20px" }}>
      <div
        style={{
          width: "100%",
          backgroundColor: "#e0e0e0",
          borderRadius: "10px",
          height: "20px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            backgroundColor: "var(--ColorBg3)",
            height: "100%",
            textAlign: "center",
            lineHeight: "20px",
            color: "white",
            fontWeight: "bold",
            transition: "width 0.5s ease-in-out",
          }}
        >
          {progress}%
        </div>
      </div>
    </div>
  );
}
