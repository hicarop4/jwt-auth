# AuthAvatar API
## Bem-vindo ao AuthAvatar API, uma poderosa API de backend para autenticação com JWT e upload de avatar.

### Funcionalidades
* Autenticação de usuários usando tokens JWT.
* Upload de avatar para usuários autenticados.
### Tecnologias Utilizadas
* Linguagem de programação: **Typescript (Javascript superset)**
* Ambiente de execução: **Node.js** 
* Framework: **Express.js**
* Banco de Dados: **MongoDB**
* Biblioteca para hashing: **bcrypt** 
* Biblioteca para manipulação de tokens JWT: **jsonwebtoken**
* Biblioteca para serializer de arquivos: **Multer**
* Repositório remoto: **AWS S3**
### Instalação
1. Clone o repositório:
`git clone https://github.com/hicarop4/jwt-auth.git`
1. Instale as dependências:
`npm install`
1. Configure as variáveis de ambiente:
   * Crie um arquivo .env na raiz do projeto e defina as seguintes variáveis:
      ```
      MONGO_URI=seu_mongo_uri
      JWT_SECRET=seu_secret_desejado
      PORT=sua_porta_desejada
      S3_ACCESS_KEY=sua_senha_de_acesso_da_amazon_s3
      S3_SECRET_ACCESS_KEY=seu_secret_de_acesso_da_amazon_s3
      S3_REGION=a_regiao_do_seu_bucket_s3
      ADMIN_TOKEN=sua_senha_de_admin_do_projeto_desejado
      ```
     Para fins de estudo, JWT_SECRET, PORT e ADMIN_TOKEN são chaves que podem receber qualquer valor
1. Inicie o servidor: `npm run start` ou `npm run dev`
### Contribuição
Se você quiser contribuir com este projeto, por favor, abra uma issue ou envie um pull request.
