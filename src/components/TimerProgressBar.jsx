import { useState, useEffect, useRef } from "react";

export default function TimerProgressBar({ durationInSeconds }) {
  const [elapsed, setElapsed] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    // reset every time duration changes
    setElapsed(0);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    intervalRef.current = setInterval(() => {
      setElapsed((prev) => {
        const next = prev + 1;
        if (next >= durationInSeconds) {
          clearInterval(intervalRef.current);
          return durationInSeconds;
        }
        return next;
      });
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [durationInSeconds]);

  const percent =
    durationInSeconds > 0
      ? Math.min(100, (elapsed / durationInSeconds) * 100)
      : 0;

  return (
    <div className="w-full p-4">
      <div className="text-center mb-2">
        {Math.floor(percent)}% — {elapsed}s / {durationInSeconds}s --1.5GB
      </div>
      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
}
