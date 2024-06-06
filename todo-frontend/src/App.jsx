import './App.css';
import { BrowserRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import Header from './components/header';
import Footer from './components/footer';
import Login from './components/login';

import { useState, useEffect } from 'react';

const App1 = () => {
  const location = useLocation();
  console.log(location)
  const [hideNV, sethideNV] = useState(false);
  const navigate = useNavigate()
  useEffect(() => {
    if (location.pathname == "/") {
      sethideNV(true);
    }
    else {
      sethideNV(false);
    }
  }, [location]);
  const token = localStorage.getItem('token')
  useEffect(() => {
    if (token) {
      navigate('/login')
    }
  }, [token])
  return (
    <>


      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/login" element={<Login />}></Route>
      </Routes>

      {/* <Geolocation /> */}
    </>
  )
}
function App() {
  return (
    <BrowserRouter>
      {/* <Nav /> */}
      <App1 />
      {/* <Form /> */}
    </BrowserRouter>
  );
}

export default App;


// export default App;
