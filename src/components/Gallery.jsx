import { useState, useEffect } from "react";
import axios from "axios";

// This component displays the gallery of captured photos
const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch photos from server when component mounts
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get("/api/photos");
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

  if (error) {
    return <div className="text-red-500 p-4">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="bg-white rounded-lg shadow-lg overflow-hidden"
          >
            <img
              src={`/api/photos/${photo.filename}`}
              alt={`Photo ${photo.id}`}
              className="w-full aspect-square object-cover"
            />
            <div className="p-4">
              <p className="text-gray-500 text-sm">
                Uploaded: {new Date(photo.upload_time).toLocaleString()}
              </p>
              <p className="text-gray-500 text-sm">
                Device: {photo.device_type}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
