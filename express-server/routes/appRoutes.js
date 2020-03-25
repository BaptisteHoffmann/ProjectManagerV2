'use strict';
module.exports = function(app, path) {
  var todoList = require('../controller/appController.js');
  const authorize = require('../model/services/authorize.js');
  const Role = require('../model/services/role.js');


    // route utilisée pour authentifier les utilisateurs à leur première connexion
    app.post('/authentification', todoList.userlogin);

    // Contenu au niveau de l'administrateur

    // Page d'état des projets contenant les projets de tous les utilisateurs

    app.get('/demandesadmin', authorize(Role.Admin), todoList.list_demandes);

    app.get('/resumeprojetadmin/:IdUtilisateur/:IdDemande', authorize(Role.Admin), todoList.resumeprojetadmin);

    app.get('/chiffrageadmin/:IdUtilisateur/:IdDemande', authorize(Role.Admin), todoList.chiffrageadmin);

    app.get('/resumeperimetreadmin/:IdUtilisateur/:IdDemande', authorize(Role.Admin), todoList.resumeperimetreadmin);

    app.get('/droitutilisateuradmin/:IdUtilisateur/:IdDemande', authorize(Role.Admin), todoList.droitutilisateurresume);

    // Contenu au niveau du client

    // Page d'état des projets pour les clients à leurs arrivés sur la page d'accueil

    app.get('/demandes/:IdUtilisateur', authorize(), todoList.list_demandes_users);

    app.get('/resumeprojet/:IdUtilisateur/:IdDemande', authorize(), todoList.resumeprojet);

    app.get('/chiffrageclient/:IdUtilisateur/:IdDemande', authorize(), todoList.chiffrageclient);

    app.get('/resumeperimetreclient/:IdUtilisateur/:IdDemande', authorize(), todoList.resumeperimetreclient);

    // Changement d'état d'un projet si le projet a été chiffré par l'administrateur

    app.post('/etat', authorize(), todoList.post_changementetat);

    // Obtention du coût total d'un projet

    app.post('/total', authorize(), todoList.post_valeurtotal);

    app.post('/commentairechiffrageclient', authorize(), todoList.post_acceptation);

    app.post('/formulaireclient', authorize(), todoList.post_demandeclient);

    app.post('/formulaireadmin/:IdDemande', authorize(Role.Admin), todoList.post_demandeadmin);

    app.get('/formulaireadmintab/:IdDemande', authorize(Role.Admin), todoList.get_demandeadmin);

    app.post('/creationuser', authorize(Role.Admin), todoList.post_creationuser);

    app.get('/listusers',  authorize(Role.Admin), todoList.get_userslist);

    app.get('/userinfos/:IdUtilisateur', authorize(), todoList.get_userinfos);

    app.post('/userinfos/update', authorize(), todoList.post_userinfos);

    app.get('/countdemandes',  authorize(Role.Admin), todoList.get_countdemandes);

    app.post('/users/authenticate', todoList.userlogin);

    app.post('/deleteligneform', authorize(Role.Admin), todoList.delete_ligneadmin);

    app.post('/deleteuser', authorize(Role.Admin), todoList.delete_user);
};
