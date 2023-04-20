import { useState } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import MainPage from "./MainPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" Component={MainPage} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
