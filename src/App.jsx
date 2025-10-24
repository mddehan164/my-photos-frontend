import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Uploads from "./pages/Uploads";
import Capture from "./pages/Capture";

const App = () => {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
        // আপনি প্রয়োজন অনুযায়ী অন্যান্য flags
      }}
    >
      <div>
        {/* Navigation */}
        <nav className="bg-blue-500 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">Photos & Video Viwer</h1>
            <div className="space-x-4">
              <Link to="/" className="hover:text-blue-200 transition-colors">
                home
              </Link>
              <Link
                to="/uploads"
                className="hover:text-blue-200 transition-colors"
              >
                Gallery
              </Link>
              <Link
                to="/capture"
                className="hover:text-blue-200 transition-colors"
              >
                Capture Photo
              </Link>
            </div>
          </div>
        </nav>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/uploads" element={<Uploads />} />
          <Route path="/capture" element={<Capture />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
