// ----------------------------------------------------------------
// Arquivo para solicitações gerais de API, exceto registro e login
// ----------------------------------------------------------------

import { BASE_URL } from "./auth";

// getUserInfo aceita o token como argumento e 
// envia uma solicitação GET a /users/me.
export const getUserInfo = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            // Cabeçalho de autorização com um valor formatado adequadamente.
            Authorization: `Bearer ${token}`,
        },
    }).then((res) => {
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
    });
};