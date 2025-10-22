import CameraCapture from "../components/CameraCapture";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Take a Photo</h1>
        <CameraCapture />
      </div>
    </div>
  );
};

export default Home;
