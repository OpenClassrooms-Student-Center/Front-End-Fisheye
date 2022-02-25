import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Photographer from "./components/Photographer";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/photographer" element={<Photographer />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
