# Use a imagem base do Node.js
FROM node:16

# Defina o usuário
USER root

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /home/api

# Copie todo o código fonte para o diretório de trabalho
COPY . .

# Exponha a porta em que a API será executada
EXPOSE 3000
