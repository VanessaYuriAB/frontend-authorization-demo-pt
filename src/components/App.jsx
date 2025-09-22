import { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Ducks from "./Ducks";
import Login from "./Login";
import MyProfile from "./MyProfile";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";

import * as auth from "../utils/auth";

import "./styles/App.css";


function App() {
  const [userData, setUserData] = useState({ username: "", email: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);  

  const navigate = useNavigate();

  // Manipulador para inscrição de usuário 
  const handleRegistration = ({
    username,
    email,
    password,
    confirmPassword,
  }) => {
    if (password === confirmPassword) {
      auth.register(username, password, email)
        .then(() => {
          navigate("/login");
        })
        .catch(console.error);
    }
  };

  // Manipulador para login de usuário
  const handleLogin = ({ username, password }) => {
    // Se o nome do usuário ou a senha estiverem vazios, retorne sem enviar a solicitação à API.
    if (!username || !password) {
      return;
    }

    // Nome de usuário e a senha são os argumentos posicionais. 
    // A função authorize é configurada para renomear `username` para `identifier`
    // antes de enviar a solicitação ao servidor, pois é isso que a API espera.
    auth.authorize(username, password)
      .then((data) => {
        // Verifica se um JWT está incluso antes de permitir o login do usuário.
        if (data.jwt) {
          // Salva os dados do usuário no estado.
          setUserData(data.user); 
          // Habilita o login do usuário.
          setIsLoggedIn(true);
          // Redireciona o usuário para /ducks.
          navigate("/ducks");
        }        
      })
      .catch(console.error);
  };

  return (
    <Routes>
      <Route path="/ducks" element={
        <ProtectedRoute isLoggedIn={isLoggedIn} >
          <Ducks />
        </ProtectedRoute>  
      } />
      <Route path="/my-profile" element={
        <ProtectedRoute isLoggedIn={isLoggedIn} >
          <MyProfile userData={userData} />
        </ProtectedRoute>
      } />
      <Route
        path="/login"
        element={
          <div className="loginContainer">
            <Login handleLogin={handleLogin} />
          </div>
        }
      />
      <Route
        path="/register"
        element={
          <div className="registerContainer">
            <Register handleRegistration={handleRegistration} />
          </div>
        }
      />
      <Route path="*"
        element={
          isLoggedIn ? (
            <Navigate to="/ducks" replace />
          ) : (
           <Navigate to="/login" replace />
          )
        }
      />
    </Routes>
  );
}

export default App;
