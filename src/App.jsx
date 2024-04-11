import { BrowserRouter, Route, Routes, Navigate, Outlet } from 'react-router-dom';
import Formulario from './controllers/Login-app/Login';
import { useEffect, useState } from 'react'
import Home from './controllers/Home-app/Home';
import { GlobalStateProvider } from './Hook/useProvaider';
import Products from './controllers/Producto-app/Products';
import NavBar from './controllers/NavBar-app/NavBar';
import SessionExperi from './controllers/other/SessionExperi';
import ProtectedPageAdmins from './controllers/other/ProtectedPageAdmins';
import NotFoundPage from './controllers/other/Page404.jsx';
import './App.css'
import Usuarios from './controllers/Administracion-app/Usuarios-app/Usuarios';
import ConfigPrivg from './controllers/Administracion-app/ConfigPrivg/ConfigPrivg';
import NewPassword from './controllers/Login-app/NewPassword.jsx';
import ProtectPageNewPass from './controllers/other/ProtectPageNewPass.jsx';
import ImageUpload from './controllers/other/ImageUpload.jsx';
import CarProducts from './controllers/Cliente-app/CarProducts.jsx';




const PagesProtected = ({ routerPath = '/', isLoggedIn }) => {

  const protegida = isLoggedIn;
  if (!protegida) {
    return <Navigate to={routerPath} replace />;
  }
  return <Outlet />;
};



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  const handleLogin = () => {
    setIsLoggedIn(true);
  }

  return (
    <GlobalStateProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Formulario onLogin={handleLogin} isLoggedIn={isLoggedIn} />} />
          <Route element={<PagesProtected isLoggedIn={isLoggedIn} />}>
            <Route element={<SessionExperi />}>
              <Route path="/processlogin" element={<NewPassword />} />
              <Route element={<ProtectPageNewPass />}>
                <Route path="/home" element={<Home />} />
                <Route path="/product" element={<Products />} />
                <Route path="/listproducts" element={<CarProducts />} />
                <Route path='/upload' element={<ImageUpload/>}></Route>
                <Route element={<ProtectedPageAdmins />}>
                  <Route path="/user" element={<Usuarios />} />
                </Route>
              </Route>
            </Route>
          </Route>
          <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </GlobalStateProvider>
  );
}

export default App;
