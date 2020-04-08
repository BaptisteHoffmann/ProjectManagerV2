'use strict';
module.exports = function(app, path) {
  var todoList = require('../controller/appController.js');
  const authorize = require('../model/services/authorize.js');
  const Role = require('../model/services/role.js');

    // Contenu au niveau de l'administrateur

    // Page d'état des projets contenant les projets de tous les utilisateurs

    app.get('/api/demandesadmin', authorize(Role.Admin), todoList.list_demandes);

    // Page qui résume un projet pour l'admin en fonction de l'identifiant utilisateur et de la demande

    app.get('/api/resumeprojetadmin/:IdUtilisateur/:IdDemande', authorize(Role.Admin), todoList.resumeprojetadmin);

    // Tableau du chiffrage pour l'admin sur la page de résumé de projet

    app.get('/api/chiffrageadmin/:IdUtilisateur/:IdDemande', authorize(Role.Admin), todoList.chiffrageadmin);

    // Résumé des périmètres indiqués lors de la création d'un projet sur la page de résumé de projet

    app.get('/api/resumeperimetreadmin/:IdUtilisateur/:IdDemande', authorize(Role.Admin), todoList.resumeperimetreadmin);

    // On sélectionne le droit de l'utilisateur qui a créé le projet au niveau de la page résumé de projet pour l'admin

    app.get('/api/droitutilisateuradmin/:IdUtilisateur/:IdDemande', authorize(Role.Admin), todoList.droitutilisateurresume);

    // Contenu au niveau du client

    // Page d'état des projets pour les clients à leurs arrivés sur la page d'accueil

    app.get('/api/demandes/:IdUtilisateur', authorize(), todoList.list_demandes_users);

    // Page qui résume un projet en fonction de l'identifiant utilisateur et de la demande

    app.get('/api/resumeprojet/:IdUtilisateur/:IdDemande', authorize(), todoList.resumeprojet);

    // Tableau du chiffrage pour le client sur la page de résumé de projet

    app.get('/api/chiffrageclient/:IdUtilisateur/:IdDemande', authorize(), todoList.chiffrageclient);

    // Résumé des périmètres indiqués lors de la création d'un projet sur la page de résumé de projet

    app.get('/api/resumeperimetreclient/:IdUtilisateur/:IdDemande', authorize(), todoList.resumeperimetreclient);

    // Changement d'état d'un projet si le projet a été chiffré par l'administrateur

    app.post('/api/etat', authorize(), todoList.post_changementetat);

    // Obtention du coût total d'un projet

    app.post('/api/total', authorize(), todoList.post_valeurtotal);

    // Commentaire posté par le client si il n'est pas satisfait du chiffrage appliqué par l'admin

    app.post('/api/commentairechiffrageclient', authorize(), todoList.post_acceptation);

    // Formulaire de demande de projet

    app.post('/api/formulaireclient', authorize(), todoList.post_demandeclient);

    // Application du chiffrage existant pour l'admin sur la page de chiffrage de projet

    app.post('/api/formulaireadmin/:IdDemande', authorize(Role.Admin), todoList.post_demandeadmin);

    // Formulaire d'application du chiffrage d'un projet par l'admin

    app.get('/api/formulaireadmintab/:IdDemande', authorize(Role.Admin), todoList.get_demandeadmin);

    // Formulaire de création d'un utilisateur

    app.post('/api/creationuser', authorize(Role.Admin), todoList.post_creationuser);

    // Liste des utilisateurs présent sur l'application, disponible uniquement pour l'admin

    app.get('/api/listusers',  authorize(Role.Admin), todoList.get_userslist);

    // Informations d'un utilisateur spécifique

    app.get('/api/userinfos/:IdUtilisateur', authorize(), todoList.get_userinfos);

    // Mise à jour des informations d'un utilisateur

    app.post('/api/userinfos/update', authorize(), todoList.post_userinfos);

    app.post('/api/userinfos/updatepassword', authorize(), todoList.post_userinfoPassword);

    // Compteur des demandes de projet en fonction des utilisateurs

    app.get('/api/countdemandes',  authorize(Role.Admin), todoList.get_countdemandes);

    // Authentification des utilisateurs

    app.post('/api/users/authenticate', todoList.userlogin);

    // Suppression d'une ligne d'un chiffrage

    app.post('/api/deleteligneform', authorize(Role.Admin), todoList.delete_ligneadmin);

    // Suppression d'un utilisateur

    app.post('/api/deleteuser', authorize(Role.Admin), todoList.delete_user);
};
