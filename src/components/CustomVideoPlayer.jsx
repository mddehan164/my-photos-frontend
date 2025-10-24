import { useRef, useState } from "react";

export default function CustomVideoPlayer({ video, capture, src }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPause = () => {
    capture && capture();
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleVolume = (e) => {
    videoRef.current.volume = e.target.value;
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
      <img src={src && src} className="object-cover w-full rounded-md" />

      {/* Custom Controls */}
      <div className="flex items-center gap-4 bg-gray-900 p-3 rounded-b-md">
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
      {/* <button
        onClick={capture}
        className="py-2 px-2 text-center hover:bg-green-600 bg-green-400 rounded-md"
      >
        Download
      </button> */}
    </div>
  );
}
