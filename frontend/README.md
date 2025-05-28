# Frontend – Catalogo_Pokemon

Este é o frontend da Catálogo Pokémon, desenvolvido com **React** e **Vite**. Ele consome a API desenvolvida em FastAPI e exibe os Pokémons e os tipos dos Pokémons com filtros, listagem e operações de edição e remoção.

---

## Como rodar o frontend

Você pode rodar o frontend com ou sem Docker:

---

### Usando Docker (recomendado)

#### Pré-requisitos:
- Docker instalado

#### Passos:

1. Acesse a pasta do frontend:
   cd frontend

2. Rode o container:
   docker build -t pokedex-frontend .
   docker run -p 3000:3000 pokedex-frontend

3. Acesse no navegador:
   http://localhost:3000

---

### Rodando manualmente

#### Pré-requisitos:
- Node.js e npm instalados

#### Passos:

1. Acesse a pasta do frontend:
   cd frontend

2. Instale as dependências:
   npm install

3. Inicie o servidor de desenvolvimento:
   npm run dev

4. Acesse no navegador:
   http://localhost:5173

> **Importância do `npm install` antes**  
> Esse comando instala todas as dependências listadas no `package.json`, como React, Axios, Vite e outras bibliotecas usadas na interface.

---

## Comunicação com o Backend

O frontend consome a API em FastAPI. Certifique-se de que o endereço da API esteja correto em `frontend/src/services/api.js`(normalmente http://localhost:8000 quando rodando localmente).
