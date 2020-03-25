import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { ResearchBDDService } from '../services/research-bdd.service';
import { DemandeClientService } from '../services/demandeclient.service';
import { AuthenticationService } from '../services/authentication.service';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-resumeprojetadmin',
  templateUrl: './resumeprojetadmin.component.html',
  styleUrls: ['./resumeprojetadmin.component.css']
})
export class ResumeprojetadminComponent implements OnInit {
  iddemande: string;
  tableauProjets: any[];
  tableauPerimetres: any[];
  ligneChiffrageProjets: string[];
  tableauDroitUtilisateur: any[];
  userinfos: any;
  i: number;
  submitted = false;
  formulaireForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private resumeProjet: ResearchBDDService,
    private router: Router,
    private fb: FormBuilder,
    private authenticationService: AuthenticationService
  ) {
    this.userinfos = this.authenticationService.currentUserValue;
  }

  ngOnInit() {


    this.formulaireForm = this.fb.group({  // Crée une instance de FormGroup
      commentaire: ['', Validators.required],
      etatProjet: [''],
      validationChiffrage: ['']
    });


    this.iddemande = this.route.snapshot.paramMap.get('iddemande');
    console.log(this.iddemande);

    this.resumeProjet.getResumeProjetAdmin(this.userinfos.id_utilisateur, this.iddemande).subscribe((data: string[]) => {
      this.tableauProjets = data;
      console.log(this.tableauProjets);
    });

    this.resumeProjet.getChiffrageAdmin(this.userinfos.id_utilisateur, this.iddemande).subscribe((data: string[]) => {
      this.ligneChiffrageProjets = data;
      console.log(this.ligneChiffrageProjets);
    });

    this.resumeProjet.getResumePerimetreAdmin(this.userinfos.id_utilisateur, this.iddemande).subscribe((data: string[]) => {
      this.tableauPerimetres = data;

      if (this.tableauPerimetres.length === 0) {
        this.tableauPerimetres[0] = { nom_perimetre: 'Non renseigné' };
      }

      console.log('taille perim' + this.tableauPerimetres.length);
      console.log(this.tableauPerimetres);
    });

    this.resumeProjet.getDroitUtilisateurAdmin(this.userinfos.id_utilisateur, this.iddemande).subscribe((data: string[]) => {
      this.tableauDroitUtilisateur = data;
      console.log(this.tableauDroitUtilisateur);
    });

  }



  onClickRouteChiffrage(etat: string) {
    console.log(this.iddemande);
    if (etat === 'Demande transmise') {
      this.resumeProjet.setEtatProjetTraiteAdmin(this.iddemande, 2);
    }
    this.router.navigate(['/formulaireadmin/', this.iddemande]);
  }

  verificationPopup(etat: string) {
    if (etat === 'Demande transmise') {
      // console.log('true');
      return true;
    } else {
      // console.log('false');
      return false;
    }
  }

  isAfficherChiffrage(etat: number) {
    if (etat >= 2) {
      // console.log('true');
      return true;
    } else {
      // console.log('false');
      return false;
    }
  }

  isApresChiffrage() {
    if (this.tableauProjets && this.tableauProjets[0] && this.tableauProjets[0].fk_etat_id >= 3) {
      return true;
    } else {
      return false;
    }
  }

  isValidationChiffrage() {
    if ( this.tableauProjets && this.tableauProjets[0].validation_chiffrage === null) {
      return false;
    } else {
      return true;
    }
  }

  isRemarqueValidation() {
    if ( (this.tableauProjets && this.tableauProjets[0].remarque_validation === null) ||
     (this.tableauProjets && this.tableauProjets[0].remarque_validation === '') ) {
      return false;
    } else {
      return true;
    }
  }

  isDemandeChiffre() {
    if ( this.tableauProjets && this.tableauProjets[0].fk_etat_id === 3) {
      return true;
    } else {
      return false;
    }
  }

  isAfficherBoutonChiffrageAdmin() {
    if ( (this.tableauProjets && this.tableauProjets[0].fk_etat_id === 3) &&
     (this.tableauProjets && this.tableauProjets[0].nom_utilisateur === 'Admin') ) {
      // console.log('true');
      return true;
    } else {
      // console.log('false');
      return false;
    }
  }

  get f() { return this.formulaireForm.controls; }

  onClickValider(bouton: string) {
    this.submitted = true;
    console.log('debut de fonction');

    if (bouton === 'accepter') {
      console.log('accepter');
      this.formulaireForm.get('commentaire').setValue('');
      this.formulaireForm.get('etatProjet').setValue('4');
      this.formulaireForm.get('validationChiffrage').setValue('Chiffrage accepté');
      this.resumeProjet.setCommentaireChiffrage(this.iddemande, this.formulaireForm);
      this.router.navigate(['/etatprojet']);
    }

    if (this.formulaireForm.invalid) {
        return;
    }
    console.log(bouton);
    if (bouton === 'refus') {
    console.log('refus');
    this.formulaireForm.get('etatProjet').setValue('7');
    this.formulaireForm.get('validationChiffrage').setValue('Chiffrage refusé');
    this.resumeProjet.setCommentaireChiffrage(this.iddemande, this.formulaireForm);
    }

    if (bouton === 'réserve') {
    console.log('réserve');
    this.formulaireForm.get('etatProjet').setValue('2');
    this.formulaireForm.get('validationChiffrage').setValue('Chiffrage accepté avec réserve');
    this.resumeProjet.setCommentaireChiffrage(this.iddemande, this.formulaireForm);
    }
    this.router.navigate(['/etatprojet']);
  }

  reinitialiseCommentaire() {
    this.formulaireForm.get('commentaire').setValue('');
  }

  isUtilisateurAdmin() {
    if (this.tableauDroitUtilisateur && this.tableauDroitUtilisateur[0].droit_utilisateur === 2) {
      return true;
    } else {
      return false;
    }
  }

}
