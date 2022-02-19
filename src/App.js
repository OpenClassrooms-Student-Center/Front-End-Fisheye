import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./components/Index";
import Photographer from "./components/Photographer";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Index />}></Route>
        <Route path="/photographer" element={<Photographer />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
