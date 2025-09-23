import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useLocation, redirect } from "react-router-dom";

import Ducks from "./Ducks";
import Login from "./Login";
import MyProfile from "./MyProfile";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";

import * as auth from "../utils/auth";
import { setToken, getToken } from "../utils/token";
import * as api from "../utils/api";

import "./styles/App.css";


function App() {
  const [userData, setUserData] = useState({ username: "", email: "" });
  const [isLoggedIn, setIsLoggedIn] = useState(false);  

  const navigate = useNavigate();
  const location = useLocation();

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
          // Salva o token no armazenamento local.
          setToken(data.jwt);
          // Salva os dados do usuário no estado.
          setUserData(data.user); 
          // Habilita o login do usuário.
          setIsLoggedIn(true);

          // Depois do login, em vez de sempre acessar /ducks, 
          // navega até o local armazenado no estado. Se
          // não houver, redireciona para /ducks por padrão.
          const redirectPath = location.state?.from?.pathname || "/ducks";
          navigate(redirectPath);
        }        
      })
      .catch(console.error);
  };

  // Efeito para persistir o login do usuário.
  // Se houver um token salvo, busca as informações do usuário, atualiza o estado 
  // de autenticação (habilitando o login), atualiza as informações do usuário 
  // autenticado (salvando seus dados no estado do usuário) e redireciona para /ducks.
  useEffect(() => {
    const jwt = getToken();

    if (!jwt) {
      return;
    }

    api
      .getUserInfo(jwt)
      .then(({ username, email }) => {
        setIsLoggedIn(true);
        setUserData({ username, email });
        // Redirecionamento definido em ProtectedRoute.
      })
      .catch(console.error);
  }, []);

  return (
    <Routes>

      <Route path="/ducks" element={
        <ProtectedRoute isLoggedIn={isLoggedIn} >
          <Ducks setIsLoggedIn={setIsLoggedIn} />
        </ProtectedRoute>  
      } />

      <Route path="/my-profile" element={
        <ProtectedRoute isLoggedIn={isLoggedIn} >
          <MyProfile userData={userData} setIsLoggedIn={setIsLoggedIn} />
        </ProtectedRoute>
      } />

      {/* Rotas /login e /register possuem a prop anonymous para 
      redirecionar usuários autorizados (logados) até a rota raiz 
      "/". */}

      <Route
        path="/login"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn} anonymous >
            <div className="loginContainer">
              <Login handleLogin={handleLogin} />
            </div>
          </ProtectedRoute>  
        }
      />

      <Route
        path="/register"
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn} anonymous >
            <div className="registerContainer">
              <Register handleRegistration={handleRegistration} />
            </div>
          </ProtectedRoute>
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
