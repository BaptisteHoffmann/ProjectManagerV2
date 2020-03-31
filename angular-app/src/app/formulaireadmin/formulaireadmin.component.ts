import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import {
  Router,
  RouterModule,
  ActivatedRoute
} from '@angular/router';
import {
  ResearchBDDService
} from '../services/research-bdd.service';
import { delay } from 'q';

@Component({
  selector: 'app-formulaireadmin',
  templateUrl: './formulaireadmin.component.html',
  styleUrls: ['./formulaireadmin.component.css']
})





export class FormulaireadminComponent implements OnInit {

  sousetapeForm: FormGroup;
  submitted = false;
  calcul: any;
  index: any;
  values = '';
  values2 = '';
  bouton: boolean ;
  regexNom: RegExp = /^[0-9]/;
  lignechiffrageprojets: any[];
  tableau: any[];
  id3: string;
  id2: string;
  id: string;
  iddemande: string;
  i: number;
  pageChiffrage: Array < any > ;
  test: number;

  // onKey(value: string) {
  //   this.values = value ;
  // }

  // onKey2(value: string) {
  //   this.values2 = value ;
  // }

  constructor(
      private route: ActivatedRoute,
      private fb: FormBuilder,
      private router: Router,
      private etatProjet: ResearchBDDService,
  ) {}

  ngOnInit() {

      this.sousetapeForm = this.fb.group({

          // Initialisation des champs
          acteur: ['',
              [
                  Validators.required,
                  Validators.maxLength(250),

              ]
          ],
          charge: ['',
              [
                  Validators.required,
                  Validators.maxLength(50),
                  Validators.pattern(this.regexNom)

              ]
          ],
          grade: ['',
          [
              Validators.required,
              Validators.maxLength(50),

          ]
      ],
          tjm: ['',
              [
                  Validators.required,
                  Validators.maxLength(50),
                  Validators.pattern(this.regexNom)

              ]
          ],
          total: [''],
          remarques: [],
          sousetape: ['',
              [
                  Validators.required,
                  Validators.maxLength(250),

              ]
          ],
          etape: ['',
              [
                  Validators.required,
                  Validators.maxLength(250),

              ]
          ],


      });
      // Permet de mettre à jour le tableau des sousetape en allant piocher dans la BDD
      this.id = this.route.snapshot.paramMap.get('id');
      this.etatProjet.getFormulaireAdmin(this.id).subscribe((data: string[]) => {
          this.lignechiffrageprojets = data;
          // tslint:disable-next-line: max-line-length

          // CALCUL TOTAL cout
          this.calcul = 0;
          for (this.index = 0; this.index < this.lignechiffrageprojets.length; this.index++) {
        this.calcul = this.calcul + this.lignechiffrageprojets[this.index].valeur_total;
     }
          this.calcul = this.calcul + this.sousetapeForm.get('total').value;

          if (this.lignechiffrageprojets && this.lignechiffrageprojets[0]
            && this.lignechiffrageprojets[0].fk_etat_id !== (2 || undefined)) {
            this.router.navigate(['/resumeprojetadmin/', this.id]);
          }
          console.log(this.lignechiffrageprojets);
      });


  }



  formulaire() {

    // Permet de faire le calcul TJM* CHARGE = TOTAL
    this.sousetapeForm.get('total').setValue((this.sousetapeForm.get('tjm').value * this.sousetapeForm.get('charge').value));


    // Variable pour tester les champs obligatoire
    this.submitted = true;


    if (this.sousetapeForm.invalid) {
          return;
    }



      // Ajout d'une ligne sous etape dans la BDD
    this.id = this.route.snapshot.paramMap.get('id');
    this.etatProjet.setFormulaireAdmin(this.id, this.sousetapeForm).subscribe((data2: string[]) => {
      // Déclenche le clic pour les fênetres pop up
      console.log(data2);
      document.getElementById('openModal').click();
      // data2.forEach(element => this.lignechiffrageprojets.push(element)); // remi
    });

    // CALCUL TOTAL cout
    this.calcul = 0;
    for (this.index = 0; this.index < this.lignechiffrageprojets.length; this.index++) {
        this.calcul = this.calcul + this.lignechiffrageprojets[this.index].valeur_total;
    }
    this.calcul = this.calcul + this.sousetapeForm.get('total').value;


    // vider les champs à remplir sur la page web
    this.sousetapeForm.get('sousetape').setValue('');
    this.sousetapeForm.get('acteur').setValue('');
    this.sousetapeForm.get('charge').setValue('');
    this.sousetapeForm.get('grade').setValue('');
    this.sousetapeForm.get('tjm').setValue('');
    this.sousetapeForm.get('total').setValue('');
    this.sousetapeForm.get('remarques').setValue('');


  }

  deleteEtape(id) {

      // Permet de supprimer une ligne sous etape à l'écran et dans la BDD
      this.iddemande = this.route.snapshot.paramMap.get('id');
      this.etatProjet.setDeleteFormulaire(id, this.iddemande).subscribe((data: string[]) => {
          this.lignechiffrageprojets = data;

          // CALCUL TOTAL cout mis a jour en direct
          this.calcul = 0;
          for (this.index = 0; this.index < this.lignechiffrageprojets.length; this.index++) {
            this.calcul = this.calcul + this.lignechiffrageprojets[this.index].valeur_total;
          }
          this.calcul = this.calcul + this.sousetapeForm.get('total').value;

          });

  }

  // Redirection
  onClickRetourResume() {
      this.id = this.route.snapshot.paramMap.get('id');
      this.router.navigate(['/resumeprojetadmin/', this.id]);
  }

  // Valide le chiffrage de l'admin qui sera a disposition du client désormais
  onClickValiderChiffrage() {
      this.id = this.route.snapshot.paramMap.get('id');
      // passage du projet à l'état 3 (Demande chiffrée)
      this.etatProjet.setEtatProjetTraiteAdmin(this.id, 3).subscribe((data: string[]) => {
          console.log(data);
          // Envoi du coût total du projet
          this.etatProjet.setValeurTotal(this.id, this.calcul).subscribe((data2: string[]) => {
            console.log(data2);
            // Redirection
            this.onClickRetourResume();
          });
      });
  }

  isMontrerFormulaireChiffrage(etat: number) {
    if (etat === 2 || etat === null) {
        return true;
    } else {
        return false;
    }
}

  modifEtape(id, index) {

      document.getElementById('openModal2').click();
      console.log(id);
      console.log(this.lignechiffrageprojets);

      this.id3 = id;



      this.sousetapeForm.get('etape').setValue(this.lignechiffrageprojets[index].nom_etape);
      this.sousetapeForm.get('sousetape').setValue(this.lignechiffrageprojets[index].nom_sous_etape);
      this.sousetapeForm.get('acteur').setValue(this.lignechiffrageprojets[index].nom_acteur);
      this.sousetapeForm.get('grade').setValue(this.lignechiffrageprojets[index].nom_grade);
      this.sousetapeForm.get('charge').setValue(this.lignechiffrageprojets[index].valeur_charge);
      this.sousetapeForm.get('tjm').setValue(this.lignechiffrageprojets[index].valeur_tjm);
      this.sousetapeForm.get('total').setValue(this.lignechiffrageprojets[index].valeur_total);
      this.sousetapeForm.get('remarques').setValue(this.lignechiffrageprojets[index].remarque);

      // CALCUL TOTAL // remi
      // this.calcul = 0;
      // for (this.index = 0; this.index < this.lignechiffrageprojets.length; this.index++) {
      //   this.calcul = this.calcul + this.lignechiffrageprojets[this.index].valeur_total;
      // }
      // this.calcul = this.calcul + this.sousetapeForm.get('total').value;

    }

  sauv() {
    this.deleteEtape(this.id2);
  }


    // Tests des champs obligatoires
    get f() {
      return this.sousetapeForm.controls;
    }

    recuperationID(id) {
      this.id2 = id;
      console.log(this.id2);

  }

  onChangePage(pageChiffrage: Array < any > ) {
      // update current page of items

      this.pageChiffrage = pageChiffrage;
  }



}
