import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { FormGroup } from '@angular/forms';
import { async } from 'q';

@Injectable({
  providedIn: 'root'
})
export class ResearchBDDService {
  currentUser: any;

  constructor(private http: HttpClient) {
  }

  // CLIENT

  // Récupère les informations pour la page d'accueil etatprojet (client)
  getEtatProjetClient(iduser: number): Observable<any> {
    console.log(iduser);
    const url: string = '/api/demandes/' + iduser;
    const observable: Observable<any> =
    this.http.get(url);
    return observable;
  }

  // Récupère le Résumé du projet pour la page resumeprojet (client)
  getResumeProjetClient(iduser: string, iddemande: string): Observable<any> {
    console.log(iduser, iddemande);
    const url: string = '/api/resumeprojet/' + iduser + '/' + iddemande;
    const observable: Observable<any> =
    this.http.get(url);
    return observable;
  }

  // Récupère le Chiffrage du projet pour la page resumeprojet (client)
  getChiffrageClient(iduser: string, iddemande: string): Observable<any> {
    const url: string = '/api/chiffrageclient/' + iduser + '/' + iddemande;
    const observable: Observable<any> =
    this.http.get(url);
    return observable;
  }

  // Récupère les Périmètres du projet pour la page resumeprojet (client)
  getResumePerimetreClient(iduser: string, iddemande: string): Observable<any> {
    const url: string = '/api/resumeperimetreclient/' + iduser + '/' + iddemande;
    const observable: Observable<any> =
    this.http.get(url);
    return observable;
  }

  // Envoie le formulaire pour la création de projet de la page formulaireclient
  setFormulaireClient(formulaireForm: FormGroup, perimetreForm: FormGroup): Observable<any> {
    const url = '/api/formulaireclient';
    const data = { formulaireForm: formulaireForm.value, perimetreForm: perimetreForm.value };

    // console.log(JSON.stringify(data));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const observable: Observable<any> = this.http.post(url, JSON.stringify(data), httpOptions);
    return observable;
  }




  // ADMIN

  // Récupère le Résumé du projet pour la page resumeprojetadmin (admin)
  getResumeProjetAdmin(iduser: string, iddemande: string): Observable<any> {
    const url: string = '/api/resumeprojetadmin/' + iduser + '/' + iddemande;
    const observable: Observable<any> =
    this.http.get(url);
    return observable;
  }

  // Récupère le Chiffrage du projet pour la page resumeprojetadmin (admin)
  getChiffrageAdmin(iduser: string, iddemande: string): Observable<any> {
    const url: string = '/api/chiffrageadmin/' + iduser + '/' + iddemande;
    const observable: Observable<any> =
    this.http.get(url);
    return observable;
  }

  // Récupère les Périmètres du projet pour la page resumeprojetadmin (admin)
  getResumePerimetreAdmin(iduser: string, iddemande: string): Observable<any> {
    const url: string = '/api/resumeperimetreadmin/' + iduser + '/' + iddemande;
    const observable: Observable<any> =
    this.http.get(url);
    return observable;
  }

  // Récupère les informations pour la page d'accueil etatprojetadmin (admin)
  getEtatProjetAdmin() {
    const url = '/api/demandesadmin';
    const observable: Observable<any> =
    this.http.get(url);
    return observable;
  }

  // Récupère la valeur du droit de l'utilisateur qui a créer le projet pour la page resumeprojetadmin (admin)
  getDroitUtilisateurAdmin(iduser: string, iddemande: string): Observable<any> {
    const url: string = '/api/droitutilisateuradmin/' + iduser + '/' + iddemande;
    const observable: Observable<any> =
    this.http.get(url);
    return observable;
  }

  // (Envoi) Permet de changer l'état d'un projet
  setEtatProjetTraiteAdmin(id: string, etat: number): Observable<any> {
    console.log(id);
    const url = '/api/etat/';
    const data = { IdDemande: id , IdEtat: etat};

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const observable: Observable<any> = this.http.post(url, JSON.stringify(data), httpOptions);
    return observable;
  }

  // Envoie la valeur total d'un projet lié au coût de l'ensemble du chiffrage dans la page formulaireadmin. on indique l'id du projet
  setValeurTotal(id: string, lecalcul: string): Observable<any> {
    console.log(id);
    const url = '/api/total/';
    const data = { IdDemande: id , calcul : lecalcul};

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const observable: Observable<any> = this.http.post(url, JSON.stringify(data), httpOptions);
    return observable;
  }

  // Envoie les informations de l'utilisateur a créer depuis la page creationusers
  setCreationUser(formulaireForm: FormGroup): Observable<any> {
    const url = '/api/creationuser';
    const data = { user: formulaireForm.value };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const observable: Observable<any> = this.http.post(url, JSON.stringify(data), httpOptions);
    return observable;
  }

  // Récupère les différents utilisateurs existant pour les afficher dans la page utilisateurs (component list-users)
  getUtilisateurs() {
    const url = '/api/listusers';
    const observable: Observable<any> =
    this.http.get(url);
    return observable;
  }

  // Récupère les informations d'un utilisateur indiqué en paramètre pour la page utilisateur (component user)
  getUtilisateurInfos(iduser: string) {
    const url = '/api/userinfos/' + iduser;
    const observable: Observable<any> =
    this.http.get(url);
    return observable;
  }

  // Récupère le nombre de demandes (nb de projet) par utilisateurs pour la page utilisateurs (component list-users)
  getCountDemandes() {
    const url = '/api/countdemandes';
    const observable: Observable<any> =
    this.http.get(url);
    return observable;
  }

  // Envoie l'id de l'utilisateur à supprimer depuis la page utilisateurs (component list-users)
  setDeleteUser(IdUser: string): Observable<any> {
    const url = '/api/deleteuser';
    const data = { idUser: IdUser };

    // console.log(JSON.stringify(data));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const observable: Observable<any> = this.http.post(url, JSON.stringify(data), httpOptions);
    return observable;
  }

  // Envoie les informations a modifié pour un utilisateur donné (grâce à son id) depuis la page utilisateur (component user)
  setUserInfos(iduser: string, formulaireUser: FormGroup): Observable<any> {
    console.log(iduser);
    const url = '/api/userinfos/update';
    const data = { idUser: iduser, formulaireuser: formulaireUser.value };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const observable: Observable<any> = this.http.post(url, JSON.stringify(data), httpOptions);
    return observable;
  }

  // Envoie le nouveau mot de passe pour un utilisateur donné (grâce à son id) depuis la page utilisateur (component user)
  setUserInfoPassword(iduser: string, formulaireUser: FormGroup): Observable<any> {
    console.log(iduser);
    const url = '/api/userinfos/updatepassword';
    const data = { idUser: iduser, formulaireuser: formulaireUser.value };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const observable: Observable<any> = this.http.post(url, JSON.stringify(data), httpOptions);
    return observable;
  }

  // Envoie une ligne de chiffrage complète pour un projet donnée (repéré par son id)
  setFormulaireAdmin(IdDemande: string, sousetapeForm: FormGroup): Observable<any> {
    const url = '/api/formulaireadmin/' + IdDemande;
    const data = { formulaireAdmin: sousetapeForm.value};

    // console.log(JSON.stringify(data));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const observable: Observable<any> = this.http.post(url, JSON.stringify(data), httpOptions);
    return observable;
  }

  // Récupère le Chiffrage du projet pour la page formulaireadmin (admin)
  getFormulaireAdmin(IdDemande: string): Observable<any> {
    const url: string = '/api/formulaireadmintab/' + IdDemande;
    const observable: Observable<any> =
    this.http.get(url);
    return observable;
  }

  // (Envoi) Permet de supprimer une ligne de chiffrage répéré par son id et l'id du projet associé.
  setDeleteFormulaire(IdLigne: string, IdDemande: string): Observable<any> {
    const url = '/api/deleteligneform';
    const data = { idLigne: IdLigne, idDemande : IdDemande };

    // console.log(JSON.stringify(data));
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const observable: Observable<any> = this.http.post(url, JSON.stringify(data), httpOptions);
    return observable;
  }

  // ADMIN ET CLIENT

  // Envoie le Commentaire de chiffrage du client depuis la page resumeprojet (client)
  setCommentaireChiffrage(iddemande: string, formulaireForm: FormGroup): Observable<any> {
    // console.log(formulaireForm.value);
    const url = '/api/commentairechiffrageclient';
    const data = { repChiffrageClient: formulaireForm.value, id: iddemande };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const observable: Observable<any> = this.http.post(url, JSON.stringify(data), httpOptions);
    return observable;
  }

}
