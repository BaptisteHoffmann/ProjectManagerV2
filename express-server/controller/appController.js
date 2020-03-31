'use strict';

var Chiffrage = require('../model/appModel.js').Chiffrage;
var Demande = require('../model/appModel.js').Demande;
var Perimetre = require('../model/appModel.js').Perimetre;
var User = require('../model/appModel.js').User;
var sha512 = require('js-sha512').sha512;
var Role = require('../model/services/role');

// Suppression d'une ligne d'un chiffrage

exports.delete_ligneadmin = function(req, res) {
  Chiffrage.deleteLigneForm(req.body.idLigne, function(err, chiffrage) {


    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    }
  });

  Chiffrage.afficherChiffrage2(req.body.idDemande, function(err, chiffrage) {
    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    }
    else {
      res.json(chiffrage); // Renvoie le résultat si aucune erreur
    }
  });
};

// Suppression d'un utilisateur

exports.delete_user = function(req, res) {
  User.deleteUser(req.body.idUser, function(err, chiffrage) {
    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    }
  });

  User.listUsers(function(err, user) {
    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    }
    else {
      for (let index = 0; index < user.length; index++) {
        const element = user[index].droit_utilisateur;
        if(element == Role.Admin) {
          user[index].droit_utilisateur = 'Administrateur';
        }
        else if(element == Role.User) {
          user[index].droit_utilisateur = 'Client';
        }
      }
      res.json(user); // Renvoie le résultat si aucune erreur
    }
  });
};

// Application du chiffrage existant pour l'admin sur la page de chiffrage de projet

exports.post_demandeadmin = function(req, res) {
  var new_chiffrage = new Chiffrage(req.params.IdDemande, req.body.formulaireAdmin);


  Chiffrage.createChiffrage(new_chiffrage, function(err, chiffrage) {
    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    }
    else {
      Chiffrage.afficherChiffrage(chiffrage, function(err, chiffrage2) {
        if (err) {
          res.send(err); // Renvoie l'erreur que la bdd a généré
        }
        else {
          res.json(chiffrage2); // Renvoie le résultat si aucune erreur
        }
      });
    }
  });
};

// Formulaire d'application du chiffrage d'un projet par l'admin

exports.get_demandeadmin = function(req, res) {
  Chiffrage.afficherChiffrage2(req.params.IdDemande, function(err, chiffrage) {
    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    }
    else {
      res.json(chiffrage); // Renvoie le résultat si aucune erreur
    }
  });
};

// Authentification des utilisateurs

exports.userlogin = function(req, res) {

  User.userlogin(req.body.username, req.body.password, function(err, user) {



    if (err) {
      res.status(400).json({ message: 'Username or password is incorrect' });
    }
    else if(!user) {
      res.status(400).json({ message: 'Username or password is incorrect' });
    }
    else {
      res.json(user); // Renvoie le résultat si aucune erreur
    }
  });
};


// Page d'état des projets contenant les projets de tous les utilisateurs

exports.list_demandes = function(req, res) {
  Demande.getDemandes(function(err, demandes) {

    if (err)
      res.send(err); // Renvoie l'erreur que la bdd a généré

    res.json(demandes); // Renvoie le résultat si aucune erreur
  });
};

// Page d'état des projets pour les clients à leurs arrivés sur la page d'accueil

exports.list_demandes_users = function(req, res) {
  const currentUser = req.user;
  const id = parseInt(req.params.IdUtilisateur);
  // only allow current client to see his different requests
  if (id !== currentUser.sub) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  Demande.getDemandeUser(req.params.IdUtilisateur, function(err, demande) {


    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    }

    res.json(demande); // Renvoie le résultat si aucune erreur
  });
};

// Page qui résume un projet pour l'admin en fonction de l'identifiant utilisateur et de la demande

exports.resumeprojetadmin = function(req, res) {
  Demande.getDemandeAdmin(req.params.IdDemande, function(err, resume) {
    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    } else if(!resume) {

      res.status(400).json({ message: 'ERROR' });
    }
    else {

      res.json(resume); // Renvoie le résultat si aucune erreur
    }
  });
};

// On sélectionne le droit de l'utilisateur qui a créé le projet au niveau de la page résumé de projet pour l'admin

exports.droitutilisateurresume = function(req, res) {
  Demande.getDroitUtilisateur(req.params.IdDemande, function(err, droit) {


    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    }

    res.json(droit); // Renvoie le résultat si aucune erreur
  });
}

// Tableau du chiffrage pour l'admin sur la page de résumé de projet

exports.chiffrageadmin = function(req, res) {
  Demande.getChiffrageAdmin(req.params.IdDemande, function(err, etapes) {


    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    }

    // tab['data'].push(etapes);
    res.json(etapes); // Renvoie le résultat si aucune erreur
  });
}

// Résumé des périmètres indiqués lors de la création d'un projet sur la page de résumé de projet

exports.resumeperimetreadmin = function(req, res) {
  Demande.getPerimetresAdmin(req.params.IdDemande, function(err, perimetres) {

    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    }

    res.json(perimetres); // Renvoie le résultat si aucune erreur
  });
}

// Formulaire de création d'un utilisateur

exports.post_creationuser = function(req, res) {
  req.body.user.mdp = sha512(req.body.user.mdp);
  if(req.body.user.droit == 'Admin') {
    req.body.user.droit = Role.Admin;
  } else {
    req.body.user.droit = Role.User;
  }
  var new_user = new User(req.body.user);

  User.createUser(new_user, function(err, user) {
    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    }
    else {
      res.json(user); // Renvoie le résultat si aucune erreur
    }
  });
};

// Liste des utilisateurs présent sur l'application, disponible uniquement pour l'admin

exports.get_userslist = function(req, res) {
  User.listUsers(function(err, user) {
    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    }
    else {
      for (let index = 0; index < user.length; index++) {
        const element = user[index].droit_utilisateur;
        if(element == Role.Admin) {
          user[index].droit_utilisateur = 'Administrateur';
        }
        else if(element == Role.User) {
          user[index].droit_utilisateur = 'Client';
        }
      }
      res.json(user); // Renvoie le résultat si aucune erreur
    }
  });
};

// Informations d'un utilisateur spécifique

exports.get_userinfos = function(req, res) {
  const currentUser = req.user;
  const id = parseInt(req.params.IdUtilisateur);

  // only allow current client to see his different requests
  if (id !== currentUser.sub && currentUser.role == Role.User) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  User.selectUser(req.params.IdUtilisateur, function(err, user) {
    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    } else if(!user) {

      res.status(400).json({ message: 'ERROR' });
    }
    else {
      for (let index = 0; index < user.length; index++) {
        const element = user[index].droit_utilisateur;
        if(element == Role.Admin) {
          user[index].droit_utilisateur = 'Administrateur';
        }
        else if(element == Role.User) {
          user[index].droit_utilisateur = 'Client';
        }
      }
      res.json(user); // Renvoie le résultat si aucune erreur
    }
  });
};

// Mise à jour des informations d'un utilisateur

exports.post_userinfos = function(req, res) {
  const currentUser = req.user;
  const iduser = parseInt(req.body.idUser);
  const nom_entreprise = req.body.formulaireuser.nomentreprise;
  const nom = req.body.formulaireuser.nom;
  const prenom = req.body.formulaireuser.prenom;
  // const password = sha512(req.body.formulaireuser.password);
  let droit_utilisateur = req.body.formulaireuser.droitutilisateur;

  // only allow current client to see his different requests
  if (iduser !== currentUser.sub && currentUser.role == Role.User) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if(droit_utilisateur == 'Administrateur') {
    droit_utilisateur = Role.Admin;
  } else {
    droit_utilisateur = Role.User;
  }

  User.updateUserInfos(nom_entreprise, nom, prenom, droit_utilisateur, iduser, function(err, user) {
    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    }
    else {
      res.json(user); // Renvoie le résultat si aucune erreur
    }
  });
};

exports.post_userinfoPassword = function(req, res) {
  const currentUser = req.user;
  const iduser = parseInt(req.body.idUser);
  const password = sha512(req.body.formulaireuser.password);

  // only allow current client to see his different requests
  if (iduser !== currentUser.sub && currentUser.role == Role.User) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  User.updateUserinfoPassword(password, iduser, function(err, user) {
    if (err) {
      res.send(err);
    }
    else {
      res.json(user);
    }
  });
};

// Compteur des demandes de projet en fonction des utilisateurs

exports.get_countdemandes = function(req, res) {
  User.countDemandes(function(err, user) {
    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    }
    else {
      res.json(user); // Renvoie le résultat si aucune erreur
    }
  });
};

// Page qui résume un projet en fonction de l'identifiant utilisateur et de la demande

exports.resumeprojet = function(req, res) {
  const currentUser = req.user;

  Demande.getDemandeClient(req.params.IdDemande, req.params.IdUtilisateur, function(err, resume) {
    if (err) {
      res.status(400).json({ message: err });
    } else if(!resume) {
      res.status(400).json({ message: 'ERROR' });
    }
    else {
      res.json(resume); // Renvoie le résultat si aucune erreur
    }
  });
};

// Tableau du chiffrage pour le client sur la page de résumé de projet

exports.chiffrageclient = function(req, res) {
  Demande.getChiffrageAdmin(req.params.IdDemande, function(err, etapes) {


    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    }
    // tab['data'].push(etapes);
    res.json(etapes); // Renvoie le résultat si aucune erreur
  });
}

// Résumé des périmètres indiqués lors de la création d'un projet sur la page de résumé de projet

exports.resumeperimetreclient = function(req, res) {
  Demande.getPerimetresAdmin(req.params.IdDemande, function(err, perimetres) {
    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    }
    res.json(perimetres); // Renvoie le résultat si aucune erreur
  });
}

// Formulaire de demande de projet

exports.post_demandeclient = function(req, res) {
  var new_demande = new Demande(req.body.formulaireForm);

  var perim = [];
  var perimuse = [];

  perim = Object.values(req.body.perimetreForm);
  for (let index = 0; index < perim.length; index++) {
    if(perim[index] != null) {
      perimuse.push(perim[index]);
    }
  }

  //handles null error
  if(!new_demande.nom_demande
    || !new_demande.nom_demandeur
    || !new_demande.description
    || !new_demande.date_demande
    || !new_demande.fk_utilisateur_id
  ){
    res.status(400).send({ message: 'Veuillez renseigner tous les champs saisis' });
  } else {
    Demande.createDemande(new_demande, perimuse, function(err, demande) {

      if (err) {
        res.send(err); // Renvoie l'erreur que la bdd a généré
      }
      // Demande.createPerimetre(demande);
      res.json(demande); // Renvoie le résultat si aucune erreur
    });
  }
}

// Changement d'état d'un projet si le projet a été chiffré par l'administrateur

exports.post_changementetat = function(req, res) {

  Demande.changementEtat(req.body.IdDemande, req.body.IdEtat, function(err, etat) {
    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    }
    res.json(etat); // Renvoie le résultat si aucune erreur
  });

  switch (req.body.IdEtat) {
    case 3:
      var datechiffrage = new Date();
      Demande.dateChiffrage(req.body.IdDemande, datechiffrage, function(err, date) {
        if (err) {
          res.send(err); // Renvoie l'erreur que la bdd a généré
        }
      });
      break;

    default:
      break;
  }
}

// Obtention du coût total d'un projet

exports.post_valeurtotal = function(req, res) {

  Demande.valeurtotal(req.body.IdDemande, req.body.calcul, function(err, valeur) {
    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    }
    res.json(valeur);
  });
}

// Commentaire posté par le client si il n'est pas satisfait du chiffrage appliqué par l'admin

exports.post_acceptation = function(req, res) {
  const idDemande = req.body.id;
  const commentaire = req.body.repChiffrageClient.commentaire;
  const etatprojet = req.body.repChiffrageClient.etatProjet;
  const validationChiffrage = req.body.repChiffrageClient.validationChiffrage;
  Demande.acceptation(idDemande, commentaire, etatprojet, validationChiffrage,function(err, etat) {
    if (err) {
      res.send(err); // Renvoie l'erreur que la bdd a généré
    }
    res.json(etat);
  });
}
