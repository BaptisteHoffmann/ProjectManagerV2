# ProjectManager
Outils de création, de validation et de gestion de projets


# Outils et logiciels requis pour l'application

# Logiciels requis #

- Angular CLI
  * Version 8.3.17
  * Front


- NPM / NodeJS
  * Version 12.13.0
  * Back

- Docker
  * Dernière version
  
- Docker Compose
  * Dernière version

# Outils open source inclus et utilisés #

  * Angular
  * NodeJS / NPM
  * Docker
  
## Installation

**Avant de proceder :** veuillez bien installer les outils en pré requis

## Utilisation des differents outils


### Obtenir les fichiers sources pour le fonctionnement de l'application

```bash
git clone https://github.com/AhmedALSGit/ProjectManager.git
```

### Verification du fonctionnement d'Angular

```bash
ng help
```

### Generation d'un projet

```bash
ng new NOM-DU-PROJET-ANGULAR
cd NOM-DU-PROJET-ANGULAR
```

### Copier le contenu du dossier angular-app à la racine du projet Angular crée précédemment

```bash
cp -rf ~/ProjectManager/angular-app/* ~/ProjectManager/NOM-DU-PROJET-ANGULAR/
```


### Verification du fonctionnement de Docker

```bash
docker version
```

### Verification du fonctionnement de Docker-compose

```bash
docker-compose version
```

## Utilisation de Docker-compose

**Avant d'utiliser le fichier docker-compose.yml :** il faut modifier le nom du projet angular dans le fichier docker-compose comme indiqué en bas

```bash
version: '3.7' # specify docker-compose version

networks:
  # Server network to hold database and backend
  applinetwork: {}

# Define the services/containers to be run
services:
  
  database: # name of the third service
    build: mariadb
    environment:
      MYSQL_ROOT_PASSWORD: 8CFmTxG4r5oSS7IYvT2N
      MYSQL_DATABASE: retest
    ports:
      - "3306:3306" # specify port forewarding
    networks:
      # Add the database service to the servernetwork.
      - applinetwork

  express-app: #name of the second service
    build: express-server # specify the directory of the Dockerfile
    restart: always
    ports:
      - "3000:3000" #specify ports forewarding
    networks:
      # Add the express service to the servernetwork.
      - applinetwork
    depends_on:
      - "database-app"
    command: bash -c "./wait-for-it.sh --timeout=0 database-app:3306 && npm start"

  angular: # name of the first service
    build: CHANGEZ LE NOM PAR LE NOM DU PROJET ANGULAR # specify the directory of the Dockerfile
    ports:
      - "4200:4200" # specify port forewarding
    networks:
      # Add the angular service to the servernetwork.
      - applinetwork
```

Une fois le fichier docker-compose.yml modifié et le projet Angular créé avec les fichiers sources ajoutés;
On doit pouvoir exécuter la commande docker-compose décrit ci-dessous :

```bash
docker-compose -f docker-compose.yml up -d --build
```

Une fois le script lancer, il devrait passer par 9 étapes au total (voir ci-dessous)

```bash
Creating network "projectmanager_applinetwork" with the default driver
Building database-app
Step 1/2 : FROM mariadb:10.1
 ---> 97b484de89b8
Step 2/2 : ADD ./database_file /docker-entrypoint-initdb.d
 ---> Using cache
 ---> 889bb63851e1

Successfully built 889bb63851e1
Successfully tagged projectmanager_database-app:latest
Building angular-app
Step 1/9 : FROM node:12.16.1 as build
 ---> d834cbcf2402
Step 2/9 : WORKDIR /app
 ---> Using cache
 ---> 7e75b3f1f02e
Step 3/9 : ENV PATH /app/node_modules/.bin:$PATH
 ---> Using cache
 ---> 6400c9d969b0
Step 4/9 : COPY package.json /app/package.json
 ---> Using cache
 ---> 89ec948dec2b
Step 5/9 : RUN npm install
 ---> Using cache
 ---> 78d80df41380
Step 6/9 : RUN npm install -g @angular/cli@8.3.17
 ---> Using cache
 ---> 0f72d934b259
Step 7/9 : COPY . /app
```

Attention : certains messages en rouge au niveau des installations NPM peuvent apparaitre en rouge\
Ce ne sont pas des erreurs, il faut attendre que le script continue dans ces cas précis.\

On obtient donc trois containeurs avec la commande ***docker-compose ps*** :

```bash
            Name                           Command               State           Ports         
-----------------------------------------------------------------------------------------------
projectmanager_angular-app_1    docker-entrypoint.sh npm start   Up      0.0.0.0:4200->4200/tcp
projectmanager_database-app_1   docker-entrypoint.sh mysqld      Up      0.0.0.0:3306->3306/tcp
projectmanager_express-app_1    docker-entrypoint.sh bash  ...   Up      0.0.0.0:3000->3000/tcp
```