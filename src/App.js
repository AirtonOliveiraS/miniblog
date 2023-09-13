import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext';
import { onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from 'react'
import { useAuthentication } from './hooks/useAuthentication';

import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Navbar from './Components/Navbar';
import Footer from './Components/Footer';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';



function App() {


  const [user, setUser] = useState(undefined)
  const auth = useAuthentication()

  const loadingUser = user === undefined



  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [auth]);

  if (loadingUser) {
    return <p>Carregando..</p>;
  }
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <div className='container'>
            <Routes>

              <Route path='/' element={<Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/login' element={<Login />} />
              <Route path='/register' element={<Register />} />

            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
