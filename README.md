
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
## Screenshots

![Login](https://i.imgur.com/Ok8J2rH.png)

![Restaurantes](https://i.imgur.com/sGip9IF.png)

![Localização](https://i.imgur.com/7iqMNOr.png)
