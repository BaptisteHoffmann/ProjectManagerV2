import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ResearchBDDService } from '../services/research-bdd.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '@app/services/authentication.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  formulaireUser: FormGroup;
  utilisateur: any;
  iduser: string;
  nomentreprise: string;
  droitutilisateur: string;
  nom: string;
  prenom: string;
  currentUser: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private fctbdd: ResearchBDDService,
    private user: AuthenticationService
    ) {
    this.currentUser = this.user.currentUserValue;
   }

  ngOnInit() {
    this.iduser = this.route.snapshot.paramMap.get('iduser');

    this.fctbdd.getUtilisateurInfos(this.iduser).subscribe((data: string[]) => {
      this.utilisateur = data[0];
      this.nomentreprise = this.utilisateur.nom_entreprise;
      this.droitutilisateur = this.utilisateur.droit_utilisateur;
      this.nom = this.utilisateur.login_utilisateur;
      this.prenom = this.utilisateur.prenom_utilisateur;
    });

    this.formulaireUser = this.fb.group({  // Crée une instance de FormGroup
      password: [],
      nom: [],
      prenom: [],
      droitutilisateur: [],
      nomentreprise: []
    });
  }

  update() {
    this.fctbdd.setUserInfos(this.iduser, this.formulaireUser).subscribe((data: string[]) => {
      document.getElementById('openModal').click();
      // this.router.navigate(['/utilisateurs']);
    });
  }

  userlist() {
    this.router.navigate(['/utilisateurs']);
  }

}
