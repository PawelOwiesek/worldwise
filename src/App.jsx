import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Homepage from "./pages/Homepage";

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
