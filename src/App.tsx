import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.tsx";
import Solutions from "./pages/Solutions.tsx";
import Products from "./pages/Products.tsx";
// Import other pages here...

import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/products" element={<Products />} />
        {/* Add other routes here... */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;