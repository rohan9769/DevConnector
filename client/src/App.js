import "./App.css";
import { useEffect } from "react";
import {BrowserRouter as Router, Route,  Routes } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Landing from "./components/layout/Landing";
import Alert from "./components/layout/Alert";
import {loadUser} from './actions/auth'
import setAuthToken from "./utils/setAuthToken";
import Dashboard from "./components/dashboard/Dashboard";
import PrivateRoute from "./components/Routing/PrivateRoute";
import CreateProfile from "./components/profile-forms/CreateProfile";
// Redux stuff
import {Provider} from 'react-redux'
import store from './store'

if(localStorage.token){
  setAuthToken(localStorage.token)
}

const App = () => {
  useEffect(()=>{
    store.dispatch(loadUser())
  },[])


  return (
    <Provider store={store}>
      <Router>
            <Navbar></Navbar>
            <Alert></Alert>
            <Routes>
              <Route path="/" element={<Landing/>}></Route>
              <Route path="/register" element={<Register/>}></Route>
              <Route path="/login" element={<Login/>}></Route>
              <Route path="/dashboard" element={<PrivateRoute component = {Dashboard}></PrivateRoute>}></Route>
              <Route path="/create-profile" element={<PrivateRoute component = {CreateProfile}></PrivateRoute>}></Route>
            </Routes>
      </Router>
    </Provider>
  );
}

export default App;
