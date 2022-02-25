
![Logo.png](./assets/Logo.png)

# STORELAB

----------------

![Badge In Development](https://img.shields.io/badge/STATUS-IN%20DEVELOPMENT-orange)
![Badge License](https://img.shields.io/badge/LICENSE-MIT-green)

API RESTFULL destinada a gerenciar uma rede de lojas e o estoque dos produtos.

As tecnologias utilizadas nesse projeto são:

- TypeScript;
- NodeJS;
- ExpressJS;
- Knex;
- MySQL;

-------------

## Estrutura da API

A API possui dois principais objetivos:

- O gerenciamento de uma rede de lojas, com uma matriz por rede e suas filiais;
- O gerenciamento do estoque de produtos dessa rede;

O usuário principal da API é a matriz, que possui amplos poderes de acessar, cadastrar e atualizar informações a respeito de suas filiais e produtos.

Uma matriz não pode acessar informações de outra rede que não seja proprietária.

As filiais não podem acessar informações sobre outras filiais da mesma rede.

## Estrutura do Banco de Dados

A persistência dos dados é feita por meio de duas tabelas no MySQL:

- Tabela de lojas: STORES;
- Tabela de produtos: PRODUCTS;

### Estrutura das Tabelas

#### STORES

A tabela "stores" possui a seguinte disposição:

- store_id;
- head_id;
- store_name;
- email;
- password;
- CNPJ;
- adress;
- role ('head' ou 'sub');
- created_at;
- updated_at;

A tabela "products" possui a seguinte disposição:

- product_id;
- product_name;
- brand;
- store_id;
- head_id;
- quantity;
- price;
- created_at;
- updated_at;

## Instalação

Primeiro você deve clonar esse repositório.

Para isso, use o seguinte comando:

`git clone https://github.com/joaofilippe/store-system`

Para  instalar a API, deve-se executar o script:

`npm install`

### Configurando o arquivo .ENV

A API usa um arquivo .ENV para trabalhar com informações do banco de dados e para configurar a autenticação das lojas.

Por isso, após a instalação, você deve criar um arquivo com o seguinte nome `.evn` em sua pasta raiz.

Esse arquivo deve estar estrurado da seguinte maneira

```
DB_HOST = [endereço do seu banco de dados]
DB_PORT = [porta de comunicação de seu banco de dados]
DB_USER = [nome do usuário de seu banco de dados]
DB_PASS= [senha do usuário do seu banco de dados]
DB_NAME = [nome do banco de dados/schema em que as tabelas serão criadas]
JWT_KEY = [string aleatória que será utilizada para a criptografia]
BCRYPT_COST = 12
PORT = [porta do servidor Express]
```

### Rodando as Migrations

- Para criar as tabelas, deve-se executar os seguintes scripts:
  
  ```
  npm run migrations:users create
  npm run migrations:products create
  ```

- Para excluir as tabelas, deve-se executar os seguintes scripts:
  
  ```
  npm run migrations:stores drop
  npm run migrations:products drop
  ```

- Para checar se as tabelas já constam em seu banco de dados, deve-se executar os seguintes scripts:
  
  ```
  npm run migrations:stores check
  npm run migrations:products check
  ```

--------------

## Rodando a  API

Para rodar a API, deve-se executar o script:

`npm run dev`

### Rodando os Tests

*[Em desenvolvimento]*

Para rodar os testes, o seguinte script deve ser executado:

`npm run test`

## REST API

### Url

#### 1- URL Base

- <http://localhost:3006/>

> NOTA: O número da porta poderá ser substituído pela porta indicada no arquivo `.env`, caso não seja indicada, a API atribuirá a porta 3006.

#### 2 - Stores URL

<http://localhost:3006/stores/>

1. `Signup`: <http://localhost:3006/stores/signup>
  
  - Method: `POST`;
  
  - Body (JSON):

    ```
    {
        "storeName": "name {String}";
        "email": "email {String}";
        "password" : "password {String}",
        "CNPJ": "CNPJ {Number}",
        "adress": "adress {String}"
     } 
    ```
  
  - No Headers;
  
  - Return:

    ```
    {
        message: 'Sucesso',
        token: jwtToken
    }
    ```

  - Será criada uma loja matriz (role = 'head') no banco de dados, responsável por gerenciar a rede de lojas.
  -----
2. `Create`: <http://localhost:3006/stores/create>
  
  - Method: `POST`;
  
  - Body (JSON):

    ```
    
    {
        "storeName": "name {String}";
        "email": "email {String}";
        "password" : "password {String}",
        "CNPJ": "CNPJ {Number}",
        "adress": "adress {String}"
     } 
     
    ```
  
  - Headers:

```
    {
        Authorization: 
            {
                "token": jwtToken
            }
        } 
 ``` 
  
  - Return:

    ```
    {
        message: 'Sucesso',
        token: jwtToken
    }
    ```

  - Será criada uma loja matriz (role = 'head') no banco de dados, responsável por gerenciar a rede de lojas.

- `Login`: <http://localhost:3006/users/login>
  
  - Method: `POST`;
  
  - Body (JSON):

    ```
    {
        "name": "name";
        "email": "email";
        "password" : "password"
     } 
    ```
  
  - No Headers;
  
  - Return:

    ```
    {
        "message": "Sucess",
        "token": jwtToken
    }
    ```

#### 3 - Posts URL

- <http://localhost:3006/posts/>

- `Create Post`: <http://localhost:3006/posts/create>
  
  - Method: `POST`;
  
  - Body (JSON):

    ```
    {
        "photo": "photo_url";
        "description": "text";
        "type" : "event/normal"
     } 
    ```
  
  - Headers:

    ```
    {
        Authorization: 
            {
                "token": jwtToken
            }
        } 
    ```

- `Get By Id`: <http://localhost:3006/posts/login/:id>
  
  - Method: `GET`;
  
  - Params(`id`): post id  
  
  - Headers:

    ```
    {
        Authorization: 
            {
                "token": jwtToken
            }
        } 
    ```

###

--------------
### Autor

<img title="" src="./assets/Thumb.png" alt="Thumb.png" data-align="inline" width="70">  

João Filippe Rossi Rodrigues

[![Linkedin Badge](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white&link=LINK_LINKEDIN)](https://www.linkedin.com/in/joaofilippe/)

Image Credits:
<a href="https://www.flaticon.com/free-icons/book" title="book icons">Book icons created by Freepik - Flaticon</a>
