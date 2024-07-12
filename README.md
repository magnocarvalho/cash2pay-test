##  Ambiente

```
docker compose up -d 
```
## Requisitos 

Node.JS 16+ 
Docker Compose

## Api 

Instalar NPM

```
yarn install
```

Copilar codigo

```
yarn build
```

Rodar codigo localhost 

```
yarn start
```



# Iniciar processo 

```
curl --location 'http://localhost:3000/universities/queue' \
--header 'Content-Type: application/json' \
--data '{
    "countries": [
        "brazil"
    ]
}'
```


