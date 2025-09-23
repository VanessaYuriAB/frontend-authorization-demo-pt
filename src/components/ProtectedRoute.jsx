import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AppContext from "../context/AppContext";

// Prop anonymous: para indicar as rotas que podem ser acessadas 
// anonimamente, sem autorização (/register e /login).
function ProtectedRoute({ children, anonymous = false }) {
    // Invocação do hook useLocation e acesso ao valor da propriedade 
    // 'from' do seu objeto de estado - caso não haja, acesso à "/" 
    // por padrão.
    const location = useLocation();
    const from = location.state?.from || "/";

    // isLoggedIn desestruturado do valor fornecido por AppContext
    const { isLoggedIn } = useContext(AppContext);

    // Se o usuário estiver logado, redireciona para longe das rotas anônimas.
    if (isLoggedIn && anonymous) {
        return <Navigate to={from} />;
    }

    // Se o usuário não estiver logado e tentar acessar uma rota que
    // requer autorização, redireciona para a rota /login.
    if (!isLoggedIn && !anonymous) {
        // Ao redirecionar para /login, definimos a propriedade
        // state.from dos objetos de local para armazenar o valor de local atual.
        // Armazenamos o valor de location atual no objeto state do hook useLocation,
        // habilitando o redirecionamento para rota que tentaram acessar inicialmente. 
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return children;
}

export default ProtectedRoute;

