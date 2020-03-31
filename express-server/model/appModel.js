'user strict';
var sql = require('./dbsql.js');
const config = require('./services/config.json');
const jwt = require('jsonwebtoken');
var sha512 = require('js-sha512').sha512;

var Demande = function(Demande) {
    // this.nom_client = Demande.usernameclient;
    this.nom_demande = Demande.nomprojet;
    this.nom_demandeur = Demande.demandeur;
    this.description = Demande.description;
    this.date_demande = Demande.datedemande;
    this.code_NOP = Demande.codenop;
    this.fonction = Demande.fonction;
    this.reference_client = Demande.referenceclient;
    this.validation_chiffrage = null;
    this.reference_interne = Demande.referenceinterne;
    this.fk_utilisateur_id = Demande.idutilisateur;
};

var User = function(User) {
    this.nom_utilisateur = User.nom;
    this.prenom_utilisateur = User.prenom;
    this.login_utilisateur = User.login;
    this.mdp_utilisateur = User.mdp;
    this.droit_utilisateur = User.droit;
    this.nom_entreprise = User.entreprise;
};

var Chiffrage = function(IdDemande, Chiffrage) {
  this.fk_demande_id = IdDemande;
  this.remarque = Chiffrage.remarques;
  this.nom_acteur = Chiffrage.acteur;
  this.valeur_charge = Chiffrage.charge;
  this.nom_grade = Chiffrage.grade;
  this.valeur_tjm = Chiffrage.tjm;
  this.valeur_total = Chiffrage.total;
  this.nom_sous_etape = Chiffrage.sousetape;
  this.nom_etape = Chiffrage.etape;
};

Demande.getDemandes = function (result) {
    sql.query("SELECT Demandes.id_demande,Demandes.nom_demande,Etats.nom_etat,Utilisateurs.nom_entreprise,Demandes.nom_demandeur,Demandes.date_demande,Demandes.date_chiffrage,Demandes.date_demarrage,Demandes.date_livraison from Demandes INNER JOIN Etats ON Demandes.fk_etat_id = Etats.id_etat RIGHT JOIN Utilisateurs ON Demandes.fk_utilisateur_id=Utilisateurs.id_utilisateur WHERE Demandes.nom_demande!='NULL'", function (err, res) {

            if(err) {
                console.log("error: ", err);
                result(null, err);
            }
            else{
              console.log('les demandes en fonction de l\'user : ', res);

             result(null, res);
            }
        });
};

Demande.getDemandeUser = function (IdUtilisateur, result) {
  sql.query("SELECT * from Demandes INNER JOIN  Etats ON Demandes.fk_etat_id = Etats.id_etat WHERE Demandes.fk_utilisateur_id = ?", IdUtilisateur, function (err, res) {

          if(err) {
              console.log("error: ", err);
              result(null, err);
          }
          else{
            console.log('les demandes en fonction de l\'user : ', res);

           result(null, res);
          }
      });
};

Chiffrage.createChiffrage = function (newChiffrage, result) {
  sql.query("INSERT INTO Ligne_Chiffrages SET ?", newChiffrage,function (err, res) {
      // console.log(newChiffrage);
      if(err) {
        console.log("error: ", err);
        result(err, null);
      }
      else{
        // console.log(res.insertId);
        result(null, res.insertId);
      }
  });
};

Chiffrage.afficherChiffrage = function (IdChiffrage, result) {
  sql.query("SELECT `id_ligne`,`nom_etape`,`nom_sous_etape`,`nom_acteur`,`nom_grade`,`valeur_charge`,`valeur_tjm`,`valeur_total`,`remarque` FROM `Ligne_Chiffrages` WHERE `id_ligne` = ?", IdChiffrage,function (err, res) {

          if(err) {
              console.log("error: ", err);
              result(null, err);
          }
          else{
              console.log('chiffrage d\'une etape : ', res);
              result(null, res);
          }
      });
};

Chiffrage.afficherChiffrage2 = function (IdDemande, result) {
  sql.query("SELECT Ligne_Chiffrages.*, ROUND(Ligne_Chiffrages.valeur_total, 2) AS valeur_round, Demandes.fk_etat_id FROM `Ligne_Chiffrages` INNER JOIN Demandes ON fk_demande_id = Demandes.id_demande WHERE `fk_demande_id` = ?", IdDemande,function (err, res) {

          if(err) {
              console.log("error: ", err);
              result(null, err);
          }
          else{
              console.log('chiffrage d\'une etape : ', res);
              result(null, res);
          }
      });
};

Chiffrage.deleteLigneForm = function (IdLigne, result) {
  sql.query("DELETE FROM `Ligne_Chiffrages` WHERE `id_ligne` = ?", IdLigne,function (err, res) {

          if(err) {
              console.log("error: ", err);
              result(null, err);
          }
          else{
              console.log('chiffrage d\'une etape : ', res);
              result(null, res);
          }
      });
};

Chiffrage.afficherNomEtapes = function (result) {
  sql.query("SELECT DISTINCT `nom_etape` FROM `Ligne_Chiffrages`",function (err, res) {

          if(err) {
              console.log("error: ", err);
              result(null, err);
          }
          else{
              // console.log('Nom etapes : ', res);
              result(null, res);
          }
      });
};

Chiffrage.afficherNomSE = function (result) {
  sql.query("SELECT DISTINCT `nom_sous_etape` FROM `Ligne_Chiffrages`",function (err, res) {

          if(err) {
              console.log("error: ", err);
              result(null, err);
          }
          else{
              // console.log('Nom sous etapes : ', res);
              result(null, res);
          }
      });
};

Chiffrage.afficherNomActeur = function (result) {
  sql.query("SELECT DISTINCT `nom_acteur` FROM `Ligne_Chiffrages`",function (err, res) {

          if(err) {
              console.log("error: ", err);
              result(null, err);
          }
          else{
              // console.log('Noms acteurs : ', res);
              result(null, res);
          }
      });
};

Chiffrage.afficherNomGrade = function (result) {
  sql.query("SELECT DISTINCT `nom_grade` FROM `Ligne_Chiffrages`",function (err, res) {

          if(err) {
              console.log("error: ", err);
              result(null, err);
          }
          else{
              // console.log('Noms grades : ', res);
              result(null, res);
          }
      });
};

User.userlogin = function (login_utilisateur, mdp_utilisateur, result) {
    // console.log(sha512(mdp_utilisateur));
    mdp_utilisateur = sha512(mdp_utilisateur);
    console.log(login_utilisateur + " " + mdp_utilisateur);
    sql.query("SELECT id_utilisateur, login_utilisateur, droit_utilisateur, nom_entreprise from Utilisateurs WHERE login_utilisateur = ? AND mdp_utilisateur = ?", [login_utilisateur, mdp_utilisateur], function (err, res) {
            if(err) {
              console.log("error: ", err);
              result(null, err);
            }
            else if(!res.length) {
              console.log("res is null");
              res = false;
              result(null, res);
            }
            else{
              console.log('affichage requete : ', res);
              const token = jwt.sign({ sub: res[0].id_utilisateur, role: res[0].droit_utilisateur }, config.secret);

              res[0].token = token;

              console.log('affichage requete : ', res);

              result(null, res[0]);
            }
        });
};

User.createUser = function (user, result) {
  sql.query("INSERT INTO Utilisateurs SET ?", user,function (err, res) {
      // console.log(newChiffrage);
      if(err) {
        console.log("error: ", err);
        result(err, null);
      }
      else{
        console.log(res.insertId);
        result(null, res.insertId);
      }
  });
};

User.listUsers = function (result) {
  sql.query("SELECT id_utilisateur, nom_utilisateur, login_utilisateur, nom_entreprise, droit_utilisateur FROM `Utilisateurs`",function (err, res) {
          if(err) {
            console.log("error: ", err);
            result(null, err);
          }
          else{
            result(null, res);
          }
      });
};

User.deleteUser = function (IdUser, result) {
  sql.query("DELETE FROM `Utilisateurs` WHERE `id_utilisateur` = ?", IdUser,function (err, res) {

          if(err) {
              console.log("error: ", err);
              result(null, err);
          }
          else{
              console.log('Suppression de l\'utilisateur : ', res);
              result(null, res);
          }
      });
};

User.countDemandes = function (result) {
  sql.query("SELECT Utilisateurs.id_utilisateur, Utilisateurs.nom_utilisateur, Utilisateurs.login_utilisateur,Utilisateurs.nom_entreprise, Utilisateurs.droit_utilisateur, COUNT(Demandes.fk_utilisateur_id) AS nombre_demandes FROM `Utilisateurs` INNER JOIN Demandes ON Utilisateurs.id_utilisateur = Demandes.fk_utilisateur_id GROUP BY Demandes.fk_utilisateur_id",function (err, res) {
          if(err) {
            console.log("error: ", err);
            result(null, err);
          }
          else{
            result(null, res);
          }
      });
};

User.selectUser = function (IdUser, result) {
  sql.query("SELECT id_utilisateur, nom_utilisateur, login_utilisateur, prenom_utilisateur, nom_entreprise, droit_utilisateur FROM `Utilisateurs` WHERE `id_utilisateur` = ?", IdUser, function (err, res) {
          if(err) {
            console.log("error: ", err);
            result(null, err);
          }
          else if(!res.length) {
            console.log("error: ", res);
            res = false;
            result(null, res);
          }
          else{
            result(null, res);
          }
      });
};

User.updateUserInfos = function (nom_entreprise, nom, prenom, droit_utilisateur, iduser, result) {
  sql.query("UPDATE Utilisateurs SET nom_entreprise = ?, nom_utilisateur = ?, prenom_utilisateur = ?, droit_utilisateur = ? WHERE `id_utilisateur` = ?", [nom_entreprise, nom, prenom, droit_utilisateur, iduser], function (err, res) {
          if(err) {
            console.log("error: ", err);
            result(null, err);
          }
          else{
            result(null, res);
          }
      });
};

User.updateUserinfoPassword = function (password, iduser, result) {
  sql.query("UPDATE Utilisateurs SET mdp_utilisateur = ? WHERE `id_utilisateur` = ?", [password, iduser], function (err, res) {
          if(err) {
            console.log("error: ", err);
            result(null, err);
          }
          else{
            result(null, res);
          }
      });
};


// Données de la demande côté client
Demande.getEtapesFromDemande = function (IdUser, IdDemande, result) {
    sql.query("SELECT * FROM Ligne_Chiffrages INNER JOIN Demandes ON `fk_demande_id` = `id_demande` WHERE `fk_utilisateur_id` = ? AND `fk_demande_id` = ?", [IdUser, IdDemande], function (err, res) {

            if(err) {
                console.log("error: ", err);
                result(null, err);
            }
            else{
                console.log('etapes en fonction de la demande : ', res);
                result(null, res);
            }
        });
};

Demande.getResumeDemandeFromDemande = function (IdUser, IdDemande, result) { // départager la partie perim et demande
    sql.query("SELECT Demandes.nom_demande,Demandes.date_demande,Demandes.date_chiffrage,Demandes.date_demarrage,Demandes.date_livraison,Demandes.description, Demandes.code_nop, Demandes.fonction, Demandes.reference_client, Demandes.reference_interne ,Etats.nom_etat,Utilisateurs.nom_utilisateur FROM Demandes LEFT JOIN Etats on fk_etat_id=Etats.id_etat RIGHT JOIN Utilisateurs on fk_utilisateur_id=Utilisateurs.id_utilisateur WHERE Utilisateurs.id_utilisateur = ? AND Demandes.id_demande= ?", [IdUser, IdDemande],function (err, res) {

            if(err) {
                console.log("error: ", err);
                result(null, err);
            }
            else{
                console.log('etapes en fonction de la demande : ', res);
                result(null, res);
            }
        });
};

Demande.getPerimetresFromDemande = function (IdDemande, result) { // départager la partie perim et demande
  sql.query("SELECT nom_perimetre FROM `Demandes_Perimetres` INNER JOIN Perimetres ON fk_perimetre_id = id_perimetre WHERE fk_demande_id = ?", IdDemande,function (err, res) {

          if(err) {
              // console.log("error: ", err);
              result(null, err);
          }
          else{
              // console.log('perimetres en fonction de la demande : ', res);
              result(null, res);
          }
      });
};


// Données de la demande côté admin
Demande.getChiffrageAdmin = function (IdDemande, result) {
  sql.query("SELECT * FROM Ligne_Chiffrages INNER JOIN Demandes ON `fk_demande_id` = `id_demande` WHERE `fk_demande_id` = ?", IdDemande, function (err, res) {

          if(err) {
              // console.log("error: ", err);
              result(null, err);
          }
          else{
              // console.log('etapes en fonction de la demande : ', res);
              result(null, res);
          }
      });
};

Demande.getDemandeAdmin = function (IdDemande, result) { // départager la partie perim et demande
  console.log(IdDemande);
  sql.query("SELECT Demandes.nom_demande, Demandes.nom_demandeur, Demandes.date_demande,Demandes.date_chiffrage,Demandes.date_demarrage,Demandes.date_livraison,Demandes.description, Demandes.code_nop, Demandes.fonction, Demandes.reference_client, Demandes.reference_interne, Demandes.fk_etat_id, Demandes.Total, Demandes.validation_chiffrage, Demandes.remarque_validation, Etats.nom_etat,Utilisateurs.nom_utilisateur, Utilisateurs.login_utilisateur FROM Demandes LEFT JOIN Etats on fk_etat_id=Etats.id_etat RIGHT JOIN Utilisateurs on fk_utilisateur_id=Utilisateurs.id_utilisateur WHERE Demandes.id_demande= ?", IdDemande,function (err, res) {

          if(err) {
            // console.log("error: ", err);
            result(null, err);
          }
          else if(!res.length) {
            console.log("error: ", res);
            res = false;
            result(null, res);
          }
          else{
            console.log('la demande : ', res);
            result(null, res);
          }
      });
};

Demande.getDroitUtilisateur = function (IdDemande, result) { // départager la partie perim et demande
  console.log(IdDemande);
  sql.query("SELECT `droit_utilisateur` FROM `Utilisateurs` INNER JOIN Demandes ON id_utilisateur = Demandes.fk_utilisateur_id Where Demandes.id_demande = ?", IdDemande,function (err, res) {

          if(err) {
            // console.log("error: ", err);
            result(null, err);
          }
          else{
            console.log('la demande : ', res);
            result(null, res);
          }
      });
};

Demande.getDemandeClient = function (IdDemande, IdUtilisateur, result) { // départager la partie perim et demande
  sql.query("SELECT Demandes.nom_demande, Demandes.nom_demandeur, Demandes.date_demande,Demandes.date_chiffrage,Demandes.date_demarrage,Demandes.date_livraison,Demandes.description, Demandes.code_nop, Demandes.fonction, Demandes.reference_client, Demandes.reference_interne, Demandes.fk_etat_id, Demandes.Total, Demandes.validation_chiffrage, Demandes.remarque_validation, Etats.nom_etat,Utilisateurs.nom_utilisateur, Utilisateurs.login_utilisateur FROM Demandes LEFT JOIN Etats on fk_etat_id=Etats.id_etat RIGHT JOIN Utilisateurs on fk_utilisateur_id=Utilisateurs.id_utilisateur WHERE Demandes.id_demande= ? AND Utilisateurs.id_utilisateur = ?", [IdDemande, IdUtilisateur], function (err, res) {

          if(err) {
            // console.log("error: ", err);
            result(null, err);
          }
          else if(!res.length) {
            console.log("error: ", res);
            res = false;
            result(null, res);
          }
          else{
            console.log('la demande : ', res);
            result(null, res);
          }
      });
};

Demande.getPerimetresAdmin = function (IdDemande, result) { // départager la partie perim et demande
sql.query("SELECT nom_perimetre FROM `Demandes_Perimetres` INNER JOIN Perimetres ON fk_perimetre_id = id_perimetre WHERE fk_demande_id = ?", IdDemande,function (err, res) {

        if(err) {
            // console.log("error: ", err);
            result(null, err);
        }
        else{
            // console.log('perimetres en fonction de la demande : ', res);
            result(null, res);
        }
    });
};

Demande.createDemande = function (newDemande, newPerimetre, result) {
    sql.query("INSERT INTO Demandes SET ?", newDemande,function (err, res) {
        console.log(newDemande);
        if(err) {
            console.log("error: ", err);
            result(err, null);
        }
        else{
            // console.log(res.insertId);
            result(null, res.insertId);
            var demandeid = res.insertId;
            newPerimetre.forEach(element => {
                sql.query("INSERT INTO Demandes_Perimetres (fk_demande_id, fk_perimetre_id) VALUES (?, ?)", [demandeid, element]);
            });
        }
    });
};

Demande.changementEtat = function (IdDemande, IdEtat, result) {
  sql.query("UPDATE Demandes SET fk_etat_id = ? WHERE id_demande = ?", [IdEtat, IdDemande],function (err, res) {
      if(err) {
          console.log("error: ", err);
          result(err, null);
      }
      else{
          // console.log(res.insertId);
          result(null, res);
      }
  });
};

Demande.valeurtotal = function (IdDemande, calcul, result) {
  sql.query("UPDATE Demandes SET Total = ? WHERE id_demande = ?", [calcul, IdDemande],function (err, res) {
      if(err) {
          console.log("error: ", err);
          result(err, null);
      }
      else{
          // console.log(res.insertId);
          result(null, res);
      }
  });
};

Demande.acceptation = function (IdDemande, commentaire, etatprojet, validationChiffrage, result) {
  sql.query("UPDATE Demandes SET remarque_validation = ?, fk_etat_id = ?, validation_chiffrage = ? WHERE id_demande = ?", [commentaire, etatprojet, validationChiffrage, IdDemande], function (err, res) {
      if(err) {
          console.log("error: ", err);
          result(err, null);
      }
      else{
          // console.log(res.insertId);
          result(null, res);
      }
  });
};

Demande.dateChiffrage = function (IdDemande, datechiffrage, result) {
  sql.query("UPDATE Demandes SET date_chiffrage = ? WHERE id_demande = ?", [datechiffrage, IdDemande],function (err, res) {
      if(err) {
          console.log("error: ", err);
          result(err, null);
      }
      else{
          // console.log(res.insertId);
          result(null, res);
      }
  });
};

module.exports= {
    Demande,
    User,
    Chiffrage
}
