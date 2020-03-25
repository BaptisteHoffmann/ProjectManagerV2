'use strict';

var Chiffrage = require('../model/appModel.js').Chiffrage;
var Demande = require('../model/appModel.js').Demande;
var Perimetre = require('../model/appModel.js').Perimetre;
var User = require('../model/appModel.js').User;
var sha512 = require('js-sha512').sha512;
var Role = require('../model/services/role');

exports.delete_ligneadmin = function(req, res) {
  Chiffrage.deleteLigneForm(req.body.idLigne, function(err, chiffrage) {

    console.log('controller')
    if (err) {
      res.send(err);
    }
  });

  Chiffrage.afficherChiffrage2(req.body.idDemande, function(err, chiffrage) {
    if (err) {
      res.send(err);
    }
    else {
      res.json(chiffrage);
    }
  });
};
exports.delete_user = function(req, res) {
  User.deleteUser(req.body.idUser, function(err, chiffrage) {
    if (err) {
      res.send(err);
    }
  });

  User.listUsers(function(err, user) {
    if (err) {
      res.send(err);
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
      res.json(user);
    }
  });
};

exports.post_demandeadmin = function(req, res) {
  var new_chiffrage = new Chiffrage(req.params.IdDemande, req.body.formulaireAdmin);
  console.log(req.body);
  console.log(req.params.IdDemande);

  Chiffrage.createChiffrage(new_chiffrage, function(err, chiffrage) {
    if (err) {
      res.send(err);
    }
    else {
      Chiffrage.afficherChiffrage(chiffrage, function(err, chiffrage2) {
        if (err) {
          res.send(err);
        }
        else {
          res.json(chiffrage2);
        }
      });
    }
  });
};

exports.get_demandeadmin = function(req, res) {
  Chiffrage.afficherChiffrage2(req.params.IdDemande, function(err, chiffrage) {
    if (err) {
      res.send(err);
    }
    else {
      res.json(chiffrage);
    }
  });
};

exports.userlogin = function(req, res) {
  console.log(req.body);
  // console.log(req.body.loginForm.username);
  // console.log(req.body.loginForm.password);
  User.userlogin(req.body.username, req.body.password, function(err, user) {

    // console.log('controller')

    if (err) {
      res.status(400).json({ message: 'Username or password is incorrect' });
    }
    else if(!user) {
      res.status(400).json({ message: 'Username or password is incorrect' });
    }
    else {
      console.log('res', user);
      res.json(user);
    }
  });
};

exports.list_demandes = function(req, res) {
  Demande.getDemandes(function(err, demandes) {

    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', demandes);
    res.json(demandes);
  });
};

exports.list_demandes_users = function(req, res) {
  const currentUser = req.user;
  const id = parseInt(req.params.IdUtilisateur);
  // only allow current client to see his different requests
  if (id !== currentUser.sub) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  Demande.getDemandeUser(req.params.IdUtilisateur, function(err, demande) {

    console.log(req.params.IdUtilisateur);
    if (err) {
      res.send(err);
    }
    console.log('res', demande);
    res.json(demande);
  });
};

exports.list_etapes = function(req, res) {
  var tab = {};
  tab['data'] = [];
  Demande.getEtapesFromDemande(req.params.IdUtilisateur, req.params.IdDemande, function(err, etapes) {

    console.log('controller')
    if (err)
      res.send(err);
    console.log('res', etapes);
    tab['data'].push(etapes);
    // res.json(etapes);
  });
  Demande.getResumeDemandeFromDemande(req.params.IdUtilisateur, req.params.IdDemande, function(err, resume) {
    if (err) {
      res.send(err);
    }
    console.log('res', resume);
    tab['data'].push(resume);
    // res.json(tab['data']);
  });
  Demande.getPerimetresFromDemande(req.params.IdDemande, function(err, perimetres) {
    console.log('controller')
    if (err) {
      res.send(err);
    }
    console.log('res', perimetres);
    tab['data'].push(perimetres);
    res.json(tab['data']);
  });
};

exports.resumeprojetadmin = function(req, res) {
  Demande.getDemandeAdmin(req.params.IdDemande, function(err, resume) {
    if (err) {
      res.send(err);
    } else if(!resume) {
      console.log(resume);
      res.status(400).json({ message: 'ERROR' });
    }
    else {
      console.log('res', resume);
      res.json(resume);
    }
  });
};

exports.droitutilisateurresume = function(req, res) {
  Demande.getDroitUtilisateur(req.params.IdDemande, function(err, droit) {

    console.log('controller')
    if (err) {
      res.send(err);
    }
    console.log('res', droit);
    res.json(droit);
  });
}

exports.chiffrageadmin = function(req, res) {
  Demande.getChiffrageAdmin(req.params.IdDemande, function(err, etapes) {

    console.log('controller')
    if (err) {
      res.send(err);
    }
    console.log('res', etapes);
    // tab['data'].push(etapes);
    res.json(etapes);
  });
}

exports.resumeperimetreadmin = function(req, res) {
  Demande.getPerimetresAdmin(req.params.IdDemande, function(err, perimetres) {
    console.log('controller')
    if (err) {
      res.send(err);
    }
    console.log('res', perimetres);
    res.json(perimetres);
  });
}

exports.post_creationuser = function(req, res) {
  req.body.user.mdp = sha512(req.body.user.mdp);
  if(req.body.user.droit == 'Admin') {
    req.body.user.droit = Role.Admin;
  } else {
    req.body.user.droit = Role.User;
  }
  var new_user = new User(req.body.user);
  console.log('creation utilisateur : ');
  console.log(new_user);
  User.createUser(new_user, function(err, user) {
    if (err) {
      res.send(err);
    }
    else {
      res.json(user);
    }
  });
};

exports.get_userslist = function(req, res) {
  User.listUsers(function(err, user) {
    if (err) {
      res.send(err);
    }
    else {
      console.log('liste utilisateurs : ');
      for (let index = 0; index < user.length; index++) {
        const element = user[index].droit_utilisateur;
        if(element == Role.Admin) {
          user[index].droit_utilisateur = 'Administrateur';
        }
        else if(element == Role.User) {
          user[index].droit_utilisateur = 'Client';
        }
      }
      res.json(user);
    }
  });
};

exports.get_userinfos = function(req, res) {
  const currentUser = req.user;
  const id = parseInt(req.params.IdUtilisateur);

  // only allow current client to see his different requests
  if (id !== currentUser.sub && currentUser.role == Role.User) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  User.selectUser(req.params.IdUtilisateur, function(err, user) {
    if (err) {
      res.send(err);
    } else if(!user) {
      console.log(user);
      res.status(400).json({ message: 'ERROR' });
    }
    else {
      console.log('info user : ');
      for (let index = 0; index < user.length; index++) {
        const element = user[index].droit_utilisateur;
        if(element == Role.Admin) {
          user[index].droit_utilisateur = 'Administrateur';
        }
        else if(element == Role.User) {
          user[index].droit_utilisateur = 'Client';
        }
      }
      res.json(user);
    }
  });
};

exports.post_userinfos = function(req, res) {
  const currentUser = req.user;
  const iduser = parseInt(req.body.idUser);
  const nom_entreprise = req.body.formulaireuser.nomentreprise;
  const nom = req.body.formulaireuser.nom;
  const prenom = req.body.formulaireuser.prenom;
  const password = sha512(req.body.formulaireuser.password);
  let droit_utilisateur = req.body.formulaireuser.droitutilisateur;

  // only allow current client to see his different requests
  if (iduser !== currentUser.sub && currentUser.role == Role.User) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if(droit_utilisateur == 'Admin') {
    droit_utilisateur = Role.Admin;
  } else {
    droit_utilisateur = Role.User;
  }

  User.updateUserInfos(nom_entreprise, nom, prenom, password, droit_utilisateur, iduser, function(err, user) {
    if (err) {
      res.send(err);
    }
    else {
      res.json(user);
    }
  });
};

exports.get_countdemandes = function(req, res) {
  User.countDemandes(function(err, user) {
    if (err) {
      res.send(err);
    }
    else {
      res.json(user);
    }
  });
};

exports.resumeprojet = function(req, res) {
  const currentUser = req.user;
  // console.log('demandetest');
  // console.log(req.params.IdDemande);
  // console.log(req.params.IdUtilisateur);
  Demande.getDemandeClient(req.params.IdDemande, req.params.IdUtilisateur, function(err, resume) {
    if (err) {
      console.log(err);
      res.status(400).json({ message: err });
    } else if(!resume) {
      console.log(resume);
      res.status(400).json({ message: 'ERROR' });
    }
    else {
    // console.log('res', resume);
      res.json(resume);
    }
  });
};

exports.chiffrageclient = function(req, res) {
  Demande.getChiffrageAdmin(req.params.IdDemande, function(err, etapes) {

    console.log('controller')
    if (err) {
      res.send(err);
    }
    console.log('res', etapes);
    // tab['data'].push(etapes);
    res.json(etapes);
  });
}

exports.resumeperimetreclient = function(req, res) {
  Demande.getPerimetresAdmin(req.params.IdDemande, function(err, perimetres) {
    console.log('controller')
    if (err) {
      res.send(err);
    }
    console.log('res', perimetres);
    res.json(perimetres);
  });
}

exports.post_demandeclient = function(req, res) {
  var new_demande = new Demande(req.body.formulaireForm);

  console.log(new_demande);

  // if(!new_demande.product || !new_product.status){
  //   res.status(400).send({ error:true, message: 'Please provide all elements for a product' });
  // }
  // else{

  var perim = [];
  var perimuse = [];

  console.log('les params : ');
  console.log(req.body.perimetreForm);

  perim = Object.values(req.body.perimetreForm);
  for (let index = 0; index < perim.length; index++) {
    if(perim[index] != null) {
      perimuse.push(perim[index]);
    }
  }

  // var new_perimetre = new Perimetre(perimuse);

  //handles null error
  // console.log(req.body)
  if(!new_demande.nom_demande
    || !new_demande.nom_demandeur
    || !new_demande.description
    || !new_demande.date_demande
    // || !new_demande.code_NOP
    // || !new_demande.fonction
    // || !new_demande.reference_client
    // || !new_demande.reference_interne
    || !new_demande.fk_utilisateur_id
  ){
    res.status(400).send({ message: 'Veuillez renseigner tous les champs saisis' });
  } else {
    Demande.createDemande(new_demande, perimuse, function(err, demande) {

      if (err) {
        res.send(err);
      }
      // Demande.createPerimetre(demande);
      res.json(demande);
    });
  }
}

exports.post_changementetat = function(req, res) {
  console.log(req.body.IdDemande);
  console.log(req.body.IdEtat);
  Demande.changementEtat(req.body.IdDemande, req.body.IdEtat, function(err, etat) {
    if (err) {
      res.send(err);
    }
    console.log('res', etat);
  });

  switch (req.body.IdEtat) {
    case 3:
      var datechiffrage = new Date();
      Demande.dateChiffrage(req.body.IdDemande, datechiffrage, function(err, date) {
        if (err) {
          res.send(err);
        }
        console.log('res', date);
        res.json(date);
      });
      break;

    default:
      break;
  }
}

exports.post_valeurtotal = function(req, res) {
  console.log('le calcul');
  console.log(req.body.calcul);
  Demande.valeurtotal(req.body.IdDemande, req.body.calcul, function(err, etat) {
    if (err) {
      res.send(err);
    }
    console.log('res', etat);
  });
}

exports.post_acceptation = function(req, res) {
  const idDemande = req.body.id;
  const commentaire = req.body.repChiffrageClient.commentaire;
  const etatprojet = req.body.repChiffrageClient.etatProjet;
  const validationChiffrage = req.body.repChiffrageClient.validationChiffrage;
  Demande.acceptation(idDemande, commentaire, etatprojet, validationChiffrage,function(err, etat) {
    if (err) {
      res.send(err);
    }
    console.log('res', etat);
  });
}

exports.verification_requetes = function(req, res) {
  const currentUser = req.user;
  const id = parseInt(req.params.IdUtilisateur);

  // only allow current client to see his different requests
  if (id !== currentUser.sub && currentUser.role == Role.User) {
    return res.status(400).json({ message: 'Authorisation refusée' });
  }
}
