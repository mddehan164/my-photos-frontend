import { useRef, useState } from "react";
import pause from "../assets/pause.png";
import play from "../assets/play.png";
import TimerProgressBar from "./TimerProgressBar";

export default function CustomVideoPlayer({ video, capture, src }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [open, setOpen] = useState(false);
  const [download, setDownload] = useState(false);
  const [progress, setProgress] = useState(false);
  const handlePlayPause = () => {
    capture && capture();
    handlePlay();
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleDownload = () => {
    capture && capture();

    setDownload(true);
    setTimeout(() => {
      setProgress(true);
    }, 4000);
  };

  const handleVolume = (e) => {
    videoRef.current.volume = e.target.value;
  };
  const handlePlay = () => {
    capture && capture();
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
      alert("Your Network is Slow Please wait for a while or Try again");
    }, 5000);
  };

  return (
    <div className="w-full">
      {video && (
        <video
          ref={videoRef}
          src={video && video}
          className="object-cover w-full rounded-md"
        ></video>
      )}
      <div className="flex items-center justify-between relative">
        <div
          onClick={handlePlay}
          className="absolute top-14 left-32  z-10 flex items-center justify-center"
        >
          {!open && (
            <img src={src && pause} className="object-cover w-16 rounded-md" />
          )}
          {open && (
            <div className="w-16 aspect-square border-amber-50 border-t-2 border-l-2 animate-spin rounded-full"></div>
          )}
          {/* <img src={src && play} className="object-cover w-16 rounded-md " /> */}
        </div>
        <img
          src={src && src}
          className="object-cover w-full rounded-md absolute top-0 left-0 z-0"
        />
      </div>

      {/* Custom Controls */}
      <div className="flex items-center gap-4 bg-gray-900 p-3 rounded-b-md pt-48">
        <button
          onClick={handlePlayPause}
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>

        <input
          type="range"
          min="0"
          max="1"
          step="0.05"
          onChange={handleVolume}
          className="w-40"
        />
      </div>
      <button
        onClick={handleDownload}
        className="py-2 px-2 text-center hover:bg-green-600 bg-green-400 rounded-md mt-3 flex items-center gap-1"
      >
        {download ? (
          <>
            <span className="w-5 aspect-square inline-block rounded-full border-t-2 border-l-2 animate-spin"></span>
            <span className="inline-block">Downloading</span>
          </>
        ) : (
          <span>Download</span>
        )}
      </button>
      {progress && <TimerProgressBar durationInSeconds={300} />}
    </div>
  );
}
