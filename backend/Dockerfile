# Usar imagem base
FROM python:3.11

# Diretório de trabalho
WORKDIR /app

# Copia o arquivo de dependências da pasta backend
COPY backend/requirements.txt .

# Copiando os dados iniciais e a função que criar o BD com eles
COPY backend/import_pokemons.py .
COPY backend/dados_iniciais.json .

# Copiando o banco de dados com os 150 pokemons iniciais do Carvalho
COPY backend/pokemons.db .

# Instala dependências
RUN pip install --no-cache-dir -r requirements.txt

# Copia todo o código do backend
COPY backend/ .

# Expor a porta do FastAPI
EXPOSE 8000

#Rodando o script que cria o BD
RUN python import_pokemons.py

# Comando para rodar o backend
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
