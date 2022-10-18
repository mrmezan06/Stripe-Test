import "./App.css";
import Checkout from "./Checkout";

import { Routes, Route } from "react-router-dom";
import Success from "./Success";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Checkout />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </div>
  );
}

export default App;
