import { useState } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import MainPage from "./ProxyPage";
import DatabaseChatbot from "./DatabaseChatbot";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" Component={MainPage} />
          <Route path="/database-chatbot" Component={DatabaseChatbot} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
