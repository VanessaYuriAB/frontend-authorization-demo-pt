// ----------------------------------------------------------
// Arquivo para interações de API relacionadas à autenticação
// ----------------------------------------------------------

// BASE_URL da API
export const BASE_URL = "https://api.nomoreparties.co";

// A função register aceita os dados necessários (username, password e email) 
// como argumentos e envia uma solicitação POST ao endpoint especificado.
export const register = (username, password, email) => {
    // Envio da solicitação POST para endpoint /auth/local/register.
    return fetch(`${BASE_URL}/auth/local/register`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
        },
        // Parâmetros envolvidos em um objeto, convertidos em uma string
        // JSON e enviados no body da solicitação.
        body: JSON.stringify({ username, password, email }),
    })
        // Se correr tudo bem, retorna o JSON, se não retorna o erro.
        .then((res) => {
            return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
        });
};

// A função authorize aceita os dados necessários como parâmetros (identifier, password)
// e envia uma solicitação POST ao endpoint especificado.
export const authorize = (identifier, password) => {
    return fetch(`${BASE_URL}/auth/local`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
        },
        body: JSON.stringify({ identifier, password }),
    })
        .then((res) => {
            return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
        });
};