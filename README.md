# Catalogo_Pokemon – Fullstack

Este projeto simula uma Pokédex (ou catálogo Pokémon), com funcionalidades de cadastro, listagem, edição e exclusão de Pokémons e Tipos de Pokémons. É um projeto fullstack que combina ferramentas de frontend e backend, podendo ser rodado com ou sem Docker.


## Tecnologias Utilizadas

- **Frontend:** React + Vite + CSS
- **Backend:** FastAPI (Python 3.11)
- **Banco de Dados:** SQLite
- **Comunicação:** Axios (no frontend)
- **Containerização (opcional):** Docker & Docker Compose


## Como rodar o projeto

O projeto pode ser executado de duas formas:

### 1. Usando Docker (recomendado)

#### Requisitos:
- Docker e Docker Compose instalados

#### Passos:
1. Clone o repositório:
   git clone https://github.com/victor071298/Catalogo_Pokemon.git
   cd Catalogo_Pokemon

2. Rode os serviços com Docker Compose:
   docker-compose up --build

3. Acesse no navegador:
- Frontend com Catálogo: http://localhost:3000
- Backend API dos Pokémons: http://localhost:8000/pokemons
- Backend Api dos Tipos: http://localhost:8000/tipos
- Documentação Swagger: http://localhost:8000/docs

---

### 2. Rodando sem Docker

#### Requisitos:
- Python 3.11 instalado
- Node.js + npm instalados

#### Backend (FastAPI):

cd backend  
python -m venv venv  
venv\Scripts\activate (Windows)  
source venv/bin/activate (Linux/macOS)  
pip install -r requirements.txt  
uvicorn main:app --reload

- Backend API dos Pokémons: http://localhost:8000/pokemons
- Backend Api dos Tipos: http://localhost:8000/tipos
- Documentação Swagger: http://localhost:8000/docs

#### Frontend (React + Vite):

cd frontend  
npm install  
npm run dev

- Frontend com Catálogo: http://localhost:5173

Se necessário, edite o arquivo `frontend/src/services/api.js` para garantir que ele aponte para `http://localhost:8000`


## Estrutura do Projeto

/backend - API em FastAPI com SQLite  
/frontend - Interface em React  
/docker-compose.yml - Orquestração dos containers frontend + backend
