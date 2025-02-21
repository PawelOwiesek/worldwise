import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";
import AppLayout from "./pages/AppLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />}>
          Product
        </Route>
        <Route path="product" element={<Product />}>
          Product
        </Route>
        <Route path="pricing" element={<Pricing />}>
          Product
        </Route>
        <Route path="app" element={<AppLayout />}>
          App
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
