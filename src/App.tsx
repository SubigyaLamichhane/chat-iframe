import { useState } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import MainPage from "./MainPage";
import DatabaseChatbot from "./DatabaseChatbot";
import Demo from "./Demo";
import TestPage from "./TestPage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" Component={MainPage} />
          {/* <Route path="/database-chatbot" Component={DatabaseChatbot} /> */}
          {/* <Route path="/demo" Component={Demo} /> */}
          {/* <Route path="/test" Component={TestPage} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
