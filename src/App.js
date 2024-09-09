import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
            <Route path="/" Component={Home}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
