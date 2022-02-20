import "./App.css";
import {BrowserRouter as Router, Route,  Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Landing from "./components/layout/Landing";
import Alert from "./components/layout/Alert";
// Redux stuff
import {Provider} from 'react-redux'
import store from './store'

function App() {
  return (
    <Provider store={store}>

      <Router>
          <Navbar></Navbar>
            <Alert></Alert>
            <Routes>
              <Route path="/" element={<Landing/>}></Route>
              <Route path="/register" element={<Register/>}></Route>
              <Route path="/login" element={<Login/>}></Route>
            </Routes>
      </Router>
    </Provider>
  );
}

export default App;
