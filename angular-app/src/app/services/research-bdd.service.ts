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

  getEtatProjetClient(iduser: number): Observable<any> {
    console.log(iduser);
    const url: string = 'http://localhost:3000/demandes/' + iduser;
    const observable: Observable<any> =
    this.http.get(url);
    return observable;
  }

  getResumeProjetClient(iduser: string, iddemande: string): Observable<any> {
    console.log(iduser, iddemande);
    const url: string = 'http://localhost:3000/resumeprojet/' + iduser + '/' + iddemande;
    const observable: Observable<any> =
    this.http.get(url);
    return observable;
  }

  getChiffrageClient(iduser: string, iddemande: string): Observable<any> {
    const url: string = 'http://localhost:3000/chiffrageclient/' + iduser + '/' + iddemande;
    const observable: Observable<any> =
    this.http.get(url);
    return observable;
  }

  getResumePerimetreClient(iduser: string, iddemande: string): Observable<any> {
    const url: string = 'http://localhost:3000/resumeperimetreclient/' + iduser + '/' + iddemande;
    const observable: Observable<any> =
    this.http.get(url);
    return observable;
  }

  setCommentaireChiffrage(iddemande: string, formulaireForm: FormGroup) {
    console.log(formulaireForm.value);
    const url = 'http://localhost:3000/commentairechiffrageclient';
    const data = { repChiffrageClient: formulaireForm.value, id: iddemande };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.http.post(url, JSON.stringify(data), httpOptions).subscribe();
  }





  // ADMIN
  getResumeProjetAdmin(iduser: string, iddemande: string): Observable<any> {
    const url: string = 'http://localhost:3000/resumeprojetadmin/' + iduser + '/' + iddemande;
    const observable: Observable<any> =
    this.http.get(url);
    return observable;
  }

  getFormulaireAdmin(iduser: string, iddemande: string): Observable<any> {
    const url: string = 'http://localhost:3000/formulaireadmintab/' + iduser + '/' + iddemande;
    const observable: Observable<any> =
    this.http.get(url);
    return observable;
  }

  getChiffrageAdmin(iduser: string, iddemande: string): Observable<any> {
    const url: string = 'http://localhost:3000/chiffrageadmin/' + iduser + '/' + iddemande;
    const observable: Observable<any> =
    this.http.get(url);
    return observable;
  }

  getResumePerimetreAdmin(iduser: string, iddemande: string): Observable<any> {
    const url: string = 'http://localhost:3000/resumeperimetreadmin/' + iduser + '/' + iddemande;
    const observable: Observable<any> =
    this.http.get(url);
    return observable;
  }

  getEtatProjetAdmin() {
    const url = 'http://localhost:3000/demandesadmin';
    const observable: Observable<any> =
    this.http.get(url);
    return observable;
  }

  getDroitUtilisateurAdmin(iduser: string, iddemande: string): Observable<any> {
    const url: string = 'http://localhost:3000/droitutilisateuradmin/' + iduser + '/' + iddemande;
    const observable: Observable<any> =
    this.http.get(url);
    return observable;
  }

  setEtatProjetTraiteAdmin(id: string, etat: number) { // A finir
    console.log(id);
    const url = 'http://localhost:3000/etat/';
    const data = { IdDemande: id , IdEtat: etat};

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.http.post(url, JSON.stringify(data), httpOptions).subscribe();
  }

  setValeurTotal(id: string, calcul: string) { // A finir
    console.log(id);
    const url = 'http://localhost:3000/total/';
    const data = { IdDemande: id , calcul : calcul};

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.http.post(url, JSON.stringify(data), httpOptions).subscribe();
  }

  setCreationUser(formulaireForm: FormGroup) {
    console.log(formulaireForm.value);
    const url = 'http://localhost:3000/creationuser';
    const data = { user: formulaireForm.value };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    this.http.post(url, JSON.stringify(data), httpOptions).subscribe();
  }

  getUtilisateurs() {
    const url = 'http://localhost:3000/listusers';
    const observable: Observable<any> =
    this.http.get(url);
    return observable;
  }

  getUtilisateurInfos(iduser: string) {
    const url = 'http://localhost:3000/userinfos/' + iduser;
    const observable: Observable<any> =
    this.http.get(url);
    return observable;
  }

  getCountDemandes() {
    const url = 'http://localhost:3000/countdemandes';
    const observable: Observable<any> =
    this.http.get(url);
    return observable;
  }

  setDeleteUser(IdUser: string): Observable<any> {
    const url = 'http://localhost:3000/deleteuser';
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

  setUserInfos(iduser: string, formulaireUser: FormGroup): Observable<any> {
    console.log(iduser);
    const url = 'http://localhost:3000/userinfos/update';
    const data = { idUser: iduser, formulaireuser: formulaireUser.value };

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const observable: Observable<any> = this.http.post(url, JSON.stringify(data), httpOptions);
    return observable;
  }
}