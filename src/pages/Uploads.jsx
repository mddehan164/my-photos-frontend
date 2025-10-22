import Gallery from "../components/Gallery";

const Uploads = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Photo Gallery</h1>
        <Gallery />
      </div>
    </div>
  );
};

export default Uploads;
