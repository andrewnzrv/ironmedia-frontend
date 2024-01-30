import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AddContent from "./pages/AddContent";
import About from "./pages/About";
import Navbar from "./components/Navbar";
import ContentDetail from "./pages/ContentDetail";
import ArtworkUpdatePage from "./pages/UpdateContent";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/add" element={<AddContent />} />
        <Route path="/artworks/:artworkId" element={<ContentDetail />} />
        <Route
          path="/artworks/:artworkId/update"
          element={<ArtworkUpdatePage />}
        />
        <Route path="*" element={<p>404</p>} />
      </Routes>
    </>
  );
}

export default App;
