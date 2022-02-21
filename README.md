# STORELAB

![Logo.png](./assets/Logo.png)



![Badge In Development](https://img.shields.io/badge/STATUS-IN%20DEVELOPMENT-orange)
![Badge License](https://img.shields.io/badge/LICENSE-MIT-green)



API RESTFULL destinada a gerenciar uma rede de lojas e o estoque dos produtos.

As tecnologias utilizadas nesse projeto são:

- TypeScript;
- NodeJS;
- ExpressJS;
- Knex;
- MySQL;

### Install

Para  instalar a API, deve-se executar o script:

`npm install`

### Rodando as Migrations:

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
  npm run migrations:users check
  npm run migrations:posts check
  ```

### Rodando a  API

Para rodar a API, deve-se executar o script:

`npm run dev`

### Rodando os Tests

Para rodar os testes, o seguinte script deve ser executado:

`npm run test`



## REST API

### Url:

#### 1- URL Base:

- http://localhost:3006/

#### 2 - Stores URL:

- http://localhost:3006/stores/

- `Signup`: http://localhost:3006/stores/signup
  
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
        message: 'Sucess',
        token: jwtToken
    }
    ```

- `Login`: http://localhost:3006/users/login
  
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

#### 3 - Posts URL:

- http://localhost:3006/posts/

- `Create Post`: http://localhost:3006/posts/create
  
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

- `Get By Id`: http://localhost:3006/posts/login/:id
  
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

### Autor:

<img title="" src="./assets/Thumb.png" alt="Thumb.png" data-align="inline" width="70">  

João Filippe Rossi Rodrigues 

[![Linkedin Badge](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white&link=LINK_LINKEDIN)](https://www.linkedin.com/in/joaofilippe/)

Image Credits:
<a href="https://www.flaticon.com/free-icons/book" title="book icons">Book icons created by Freepik - Flaticon</a> 
