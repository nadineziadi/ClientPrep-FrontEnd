import { Observable } from "rxjs";
import { CompteurService } from "../../services/compteur.service";
import { Compteur } from "../../models/compteur";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { TokenStorageService } from "src/app/services/token-storage.service";

@Component({
  selector: "app-compteur-list",
  templateUrl: "./compteur-list.component.html",
  styleUrls: ["./compteur-list.component.css"],
})
export class CompteurListComponent implements OnInit {
  /* tableau compteurs */
  compteurs: Observable<Compteur[]>;
  compteur: Compteur = new Compteur();
  submitted = false;
  form_Add_Compteur: FormGroup;
  form_Update_Compteur: FormGroup;
  operation: string = "add";
  deletedCompteurId!: number;
  username: String;
  user: any;

  constructor(
    private compteurService: CompteurService,
    private router: Router,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private tokenStorageService: TokenStorageService
  ) {
    this.form_Add_Compteur = this.formBuilder.group({
      libelle: ["", [Validators.required, Validators.pattern(/^c-\d{5}$/)]],
    });
    this.form_Update_Compteur = this.formBuilder.group({
      libelleU: ["", [Validators.required, Validators.pattern(/^c-\d{5}$/)]],
    });
  }

  ngOnInit() {
    this.user = this.tokenStorageService.getUser();
    this.getAllCompteurs();
  }

  getAllCompteurs() {
    this.compteurs = this.compteurService.getCompteursByClient();
  }

  get libelle() {
    return this.form_Add_Compteur.get("libelle");
  }
  get libelleU() {
    return this.form_Update_Compteur.get("libelleU");
  }

  onSubmit() {
    if (this.operation == "add") {
      this.submitted = true;
      if (this.form_Add_Compteur.invalid) {
        return;
      }
      this.save();
    } else {
      this.submitted = true;
      if (this.form_Update_Compteur.invalid) {
        return;
      }
      this.save();
    }
  }

  save() {
    this.compteurService.saveCompteur(this.compteur).subscribe(
      (data) => console.log(data),
      (error) => console.log(error),
      () => {
        if (this.operation == "add") {
          this.toastr.success("compteur ajouté avec succès!", "Succès!");
        } else {
          this.toastr.success("compteur modifié avec succès!", "Succès!");
        }
        this.submitted = false;
        this.compteur = new Compteur();
        this.modalService.dismissAll();
        this.getAllCompteurs();
      }
    );
  }

  addNewCompteur(content) {
    this.operation = "add";
    this.username = this.user.username;
    this.modalService
      .open(content, {
        windowClass: "customModal",
        backdrop: "static",
        keyboard: false,
        centered: true,
      })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }

  getCompteur(id: number) {
    this.compteurService.getCompteur(id).subscribe(
      (data) => {
        this.compteur = data;
      },
      (error) => console.log(error)
    );
  }

  updateCompteur(id: number, contentUpdate) {
    this.operation = "update";
    this.getCompteur(id);
    this.modalService
      .open(contentUpdate, {
        windowClass: "customModal",
        backdrop: "static",
        keyboard: false,
        centered: true,
      })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }

  deleteCompteur(id: number, contentDelete) {
    this.modalService.open(contentDelete, {
      windowClass: "customModal",
      backdrop: "static",
      keyboard: false,
      centered: true,
    });
    this.deletedCompteurId = id;
  }

  confirmDeleteCompteur() {
    this.compteurService.deleteCompteur(this.deletedCompteurId).subscribe(
      (data) => {},
      (error) => console.log(error),
      () => {
        this.modalService.dismissAll();
        this.toastr.warning("Compteur supprimé avec succès!", "Succès!");
        this.getAllCompteurs();
        this.deletedCompteurId = undefined;
      }
    );
  }

  cancelDeleteCompteur() {
    this.modalService.dismissAll();
    this.deleteCompteur = undefined;
  }
}
