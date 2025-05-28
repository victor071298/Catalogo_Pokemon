# Backend – Catalogo_Pokemon

O backend foi desenvolvido em **FastAPI** com banco de dados **SQLite**.

---

## Como rodar o backend

Você pode rodar esse backend com ou sem Docker:

---

### Usando Docker (recomendado)

Pré-requisitos:
- Docker instalado

Passos:

1. Acesse a pasta do backend:
   cd backend

2. Rode o container:
   docker build -t pokedex-backend .
   docker run -p 8000:8000 pokedex-backend

3. Acesse no navegador:
   http://localhost:8000/pokemons - Lista de Pokémons  
   http://localhost:8000/tipos - Tipos de Pokémons  
   http://localhost:8000/docs - Documentação Swagger da API

---

### Rodando sem Docker

Pré-requisitos:
- Python 3.11 instalado

Passos:

1. Acesse a pasta do backend:
   cd backend

2. Crie um ambiente virtual:
   python -m venv venv

3. Ative o ambiente virtual:
   - Windows:
     venv\Scripts\activate
   - Linux/macOS:
     source venv/bin/activate

4. Instale as dependências:
   pip install -r requirements.txt

5. Rode o servidor:
   uvicorn main:app --reload

6. Acesse no navegador:
   http://localhost:8000/pokemons - Lista de Pokémons  
   http://localhost:8000/tipos - Tipos de Pokémons  
   http://localhost:8000/docs - Documentação Swagger da API

---

## 🗃️ Estrutura dos arquivos

- `main.py`: inicia o FastAPI, define rotas, e monta a interface
- `models.py`: define os modelos de banco de dados (usando SQLAlchemy)
- `schemas.py`: define os schemas de entrada/saída com Pydantic
- `crud.py`: contém as operações do banco (listar, criar, editar, deletar)
- `import_pokemons.py`: script que popula o banco com os 150 primeiros pokémons dos dados iniciais
- `pokemons.db`: banco SQLite local com os dados inicias já cadastrados
- `dados_iniciais.json`: base de dados para importação inicial
- `requirements.txt`: dependências do projeto (FastAPI, SQLAlchemy, etc)

---

## Integração com o frontend

Este backend está preparado para responder às requisições feitas pelo frontend do projeto, que consome as rotas usando Axios. Certifique-se de que o endereço da API está correto em `frontend/src/services/api.js` (normalmente `http://localhost:8000` quando rodando localmente).
