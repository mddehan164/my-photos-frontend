import { useState, useEffect } from "react";
import axios from "axios";

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null); // ✅ NEW

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(
          "https://my-photos-backend-1.onrender.com/api/photos"
        );
        setPhotos(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error fetching photos: " + err.message);
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) return <div className="text-red-500 p-4">{error}</div>;
  if (photos.length === 0)
    return (
      <div className="text-gray-400 p-4 text-center">No photos available</div>
    );

  return (
    <div className="container mx-auto p-4">
      {/* ✅ FULLSCREEN MODAL */}
      {selectedPhoto && (
        <div
          onClick={() => setSelectedPhoto(null)}
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 cursor-zoom-out"
        >
          <img
            src={`https://my-photos-backend-1.onrender.com/api/photos/${selectedPhoto}`}
            className="max-h-[95vh] max-w-[95vw] object-contain rounded-lg"
            alt="Preview"
          />
        </div>
      )}

      {/* ✅ GALLERY GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
        {photos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => setSelectedPhoto(photo.filename)} // ✅ Click → Preview
            className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer group"
          >
            <img
              src={`https://my-photos-backend-1.onrender.com/api/photos/${photo.filename}`}
              alt=""
              className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="p-3 text-xs text-gray-600">
              <p>Uploaded: {new Date(photo.upload_time).toLocaleString()}</p>
              <p>Device: {photo.device_type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
