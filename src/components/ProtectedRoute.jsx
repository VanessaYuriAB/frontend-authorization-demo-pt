import { Navigate, useLocation } from "react-router-dom";

// Prop anonymous: para indicar as rotas que podem ser acessadas 
// anonimamente, sem autorização (/register e /login).
function ProtectedRoute({ isLoggedIn, children, anonymous = false }) {
    // Invocação do hook useLocation e acesso ao valor da propriedade 
    // 'from' do seu objeto de estado - caso não haja, acesso à "/" 
    // por padrão.
    const location = useLocation();
    const from = location.state?.from || "/";

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

