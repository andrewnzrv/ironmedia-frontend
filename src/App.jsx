import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import AddContent from "./pages/AddContent";
import About from "./pages/About";
import ContentDetail from "./pages/ContentDetail";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/add" element={<AddContent />} />
        <Route path="/detail" element={<ContentDetail />} />
        <Route path="*" element={<p>404</p>} />
      </Routes>
    </>
  );
}

export default App;
