import { BrowserRouter, Route, Routes } from "react-router-dom";

import Main from "./components/pages/Main";

import "./index.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
