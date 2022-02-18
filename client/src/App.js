import "./App.css";
import {BrowserRouter as Router, Route,  Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Landing from "./components/layout/Landing";

function App() {
  return (
    <Router>
      <>
        <Navbar></Navbar>
          <Routes>
            <Route path="/" element={<Landing/>}></Route>
            <Route path="/register" element={<Register/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
          </Routes>
        </>
    </Router>
  );
}

export default App;
