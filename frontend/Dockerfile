# Imagem base do Node.js
FROM node:20

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependência primeiro (otimiza cache do Docker)
COPY frontend/package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia todos os arquivos do frontend para dentro do container
COPY frontend/ .

# Constrói a aplicação para produção (gera a pasta dist/)
RUN npm run build

# Instala o "serve", que é usado para rodar a aplicação estática
RUN npm install -g serve

# Expõe a porta 3000
EXPOSE 3000

# Comando que inicia o servidor do frontend
CMD ["serve", "-s", "dist", "-l", "3000"]
