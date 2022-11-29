
# Ranguinho - Front End

Ranguinho é um pequeno projeto baseado no iFood para delivery de comida, utilizando firebase, typescript, react e vite
- Backend (https://github.com/Alkazuz/Ranguinho-backend)

## Ferramentas usadas

- React (https://pt-br.reactjs.org/)
- Firebase (https://firebase.google.com/)
- Vite (https://vitejs.dev/)
- node-geohash (https://www.npmjs.com/package/ngeohash)
- Typescript (https://www.typescriptlang.org/)

## Regras Firestore

```bash
    rules_version = '2';
    service cloud.firestore {
    match /databases/{database}/documents {
            match /users/{uid} {
                allow write, update, read: if request.auth != null && request.auth.uid == uid;
            }
        }
    }
```

## Telas
### Definições:
`*` - Necessário login para acessar 

- `*`Tela principal (Home): A tela irá mostrar as categorias, banners de anúncios e restaurantes num raio de 10 km do usuário que inseriu a Localização;
- Login: Telas para o usuário fazer o login. A tela pergunta login com Google, Facebook, Telefone, Email-senha;
- Login com email: Tela que permite o usuário logar com email e senha;
- Registro (email/senha): Tela com os campos: nome e sobrenome, email, senha e um botão para confirmar;
- `*`Categoria: Usada para filtrar os restaurantes a partir de uma categoria selecionada;
- `*`Restaurate: Permite o usuário visualizar as informações, itens e realizar um pedido no restaurante

### Janelas
- Localização: permite o usuário definir a própria Localização;
- Pedido: janela para efetuar a compra. Permite o usuário alterar a quantia e adicionar alguma observação

## Screenshots

![Login](https://i.imgur.com/Ok8J2rH.png)

![Inicio](https://i.imgur.com/Zqvd5mo.png)
![Restaurante](https://i.imgur.com/7SJJceW.png)
![Localização](https://i.imgur.com/7iqMNOr.png)
