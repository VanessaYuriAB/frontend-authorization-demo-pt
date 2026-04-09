# Cryptoducks

Aplicação front-end desenvolvida com **React** e **Vite**, criada como **projeto
educacional** no _bootcamp de Desenvolvimento Web da TripleTen_, com foco em
**autenticação**, **autorização** e **proteção de rotas no front-end**.

O projeto simula um aplicativo que exige login para acesso a determinadas rotas e
funcionalidades, implementando um fluxo completo de autenticação com **JSON Web Tokens
(JWT)**, persistência de sessão e controle de acesso baseado no estado do usuário.

## 📌 Visão Geral

O **CryptoDucks** permite que usuários:

- Se registrem e façam login
- Tenham sua sessão mantida entre recarregamentos da página
- Acessem rotas privadas apenas quando autenticados
- Visualizem dados de perfil exclusivos
- Façam logout de forma segura

Todo o foco do projeto está no **front-end**, simulando interações reais com uma API REST.

## 🚀 Demonstrações Técnicas

- Autenticação completa no front-end (registro, login e logout)
- Proteção de rotas com React Router
- Redirecionamento condicional baseado em autenticação
- Persistência de sessão usando **Local Storage**
- Validação e reaproveitamento de **JWT**
- Controle de acesso centralizado com **Context API**
- Separação de responsabilidades (auth, api, token utils)
- Boas práticas de organização e legibilidade de código

## 🧠 Conceitos

- Rotas públicas vs. rotas privadas
- Wrapper Components (`ProtectedRoute`)
- Redirecionamento com `<Navigate />`
- Hooks do React Router (`useNavigate`, `useLocation`)
- Persistência de autenticação
- Gerenciamento global de estado com Context API
- Evitar prop drilling
- Fluxos reais de autenticação em aplicações SPA

## 🛠️ Tecnologias Utilizadas

- React
- Vite
- React Router DOM
- Context API
- JavaScript (ES6+)
- HTML5 & CSS3
- Fetch API
- Local Storage

## 🔐 Fluxo de Autenticação

### 1. Registro

- Envio de dados de cadastro para um endpoint de registro (`/auth/local/register`)
- Validação de senha e confirmação
- Redirecionamento para login após sucesso

### 2. Login

- Envio de credenciais para um endpoint de autenticação (`/auth/local`)
- Recebimento de JWT
- Armazenamento do token no Local Storage
- Liberação das rotas protegidas

### 3. Persistência

- Verificação de token ao recarregar a págin
- Reautenticação automática via requisição autenticada (`/users/me`)

### 4. Logout

- Remoção do token do armazenamento local
- Reset do estado de autenticação
- Redirecionamento para `/login`

## 📦 Instalação e Uso

Clone o repositório, instale as dependências e execute o projeto localmente:

```Shell
git clone git@github.com:VanessaYuriAB/frontend-authorization-demo-pt.git
cd frontend-authorization-demo-pt
npm install
npm audit
npm run dev
```

O aplicativo estará disponível em: `http://localhost:3000`.

## 🧪 Credenciais de Teste

Para testar rapidamente o login:

- Usuário: Mallard
- Senha: Quack42

## 🧩 Estrutura do Projeto

```
src/
├─ assets/
│  ├─ images/
│  └─ favicon.ico
├─ components/
│  ├─ styles/
│  ├─ App.jsx
│  ├─ DuckCard.jsx
│  ├─ DuckList.jsx
│  ├─ Ducks.jsx
│  ├─ Login.jsx
│  ├─ Logo.jsx
│  ├─ MyProfile.jsx
│  ├─ NavBar.jsx
│  ├─ ProtectedRoute.jsx
│  └─ Register.jsx
├─ context/
│  └─ AppContext.js
├─ utils/
│  ├─ api.js
│  ├─ auth.js
│  ├─ data.js
│  └─ token.js
├─ index.css
└─ main.jsx
```

## 📚 Sobre o Projeto

O código inicial foi fornecido como base no curso e _cada funcionalidade foi implementada
progressivamente_, acompanhando as lições da Sprint. Os commits do repositório representam
_soluções incrementais_, refletindo o aprendizado ao longo do desenvolvimento. Este
projeto consolidou minha compreensão sobre **autenticação no front-end**, segurança básica
em aplicações SPA e organização de aplicações React em um contexto mais próximo do mercado
real.
