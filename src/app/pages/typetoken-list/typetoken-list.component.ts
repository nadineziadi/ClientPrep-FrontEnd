import { Observable } from "rxjs";
import { TypetokenService } from "../../services/typetoken.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { TokenStorageService } from "../../services/token-storage.service";

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Typetoken } from "src/app/models/typetoken";
@Component({
  selector: "app-typetoken-list",
  templateUrl: "./typetoken-list.component.html",
  styleUrls: ["./typetoken-list.component.css"],
})
export class TypetokenListComponent implements OnInit {
  typetokens: Typetoken[] = [];
  username: string;
  user: any;
  typetoken: Typetoken = new Typetoken();
  submitted = false;
  form_add_type_token: FormGroup;
  form_update_type_token: FormGroup;
  operation: string = "add";
  deletedTokenId!: number;
  constructor(
    private typetokenService: TypetokenService,
    private router: Router,
    private modalService: NgbModal,
    private tokenStorageService: TokenStorageService,
    private formBuilder: FormBuilder,
    form_update_type_token: FormBuilder,
    private toastr: ToastrService
  ) {
    this.form_add_type_token = this.formBuilder.group({
      libelle: ["", [Validators.required]],
      prix: ["", [Validators.required, Validators.min(0)]],
    });

    this.form_update_type_token = this.formBuilder.group({
      libelleU: ["", [Validators.required, Validators.minLength(3)]],
      prixU: ["", [Validators.required, Validators.min(0)]],
    });
  }

  get libelle() {
    return this.form_add_type_token.get("libelle");
  }
  get prix() {
    return this.form_add_type_token.get("prix");
  }

  get libelleU() {
    return this.form_update_type_token.get("libelleU");
  }
  get prixU() {
    return this.form_update_type_token.get("prixU");
  }

  getAllTypeToken() {
    this.typetokenService.getTypeTokenList().subscribe(
      (res) => {
        this.typetokens = res;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  ngOnInit() {
    this.user = this.tokenStorageService.getUser();
    this.getAllTypeToken();
  }

  onSubmit() {
    this.submitted = true;
    if (this.operation == "add") {
      if (this.form_add_type_token.invalid) {
        return;
      }
      this.save();
    } else {
      if (this.form_update_type_token.invalid) {
        return;
      }
      this.save();
    }
  }

  save() {
    console.log("typetoken", this.typetoken);
    this.typetokenService.saveTypeToken(this.typetoken).subscribe(
      (data) => console.log(data),
      (error) => console.log(error),
      () => {
        if (this.operation == "add") {
          this.toastr.success("Type Token ajouté avec succès!", "Succès!");
        } else {
          this.toastr.success("Type Token modifié avec succès!", "Succès!");
        }
        this.submitted = false;
        this.typetoken = new Typetoken();
        this.modalService.dismissAll();
        this.getAllTypeToken();
      }
    );
  }

  addNewToken(content) {
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

  getTypeToken(id: number) {
    this.typetokenService.getTypeToken(id).subscribe(
      (data) => {
        console.log(data);
        this.typetoken = data;
      },
      (error) => console.log(error)
    );
  }

  updateTypetoken(id: number, contentUpdate) {
    this.operation = "update";
    //this.router.navigate(['update-typetoken', id]);
    this.getTypeToken(id);
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

  deleteTypetoken(id: number, contentDelete) {
    this.modalService.open(contentDelete, {
      windowClass: "customModal",
      backdrop: "static",
      keyboard: false,
      centered: true,
    });
    this.deletedTokenId = id;
  }

  cancelDeleteToken() {
    this.modalService.dismissAll();
    this.deletedTokenId = undefined;
  }

  confirmDeleteToken() {
    this.typetokenService.deleteTypeToken(this.deletedTokenId).subscribe(
      (data) => {},
      (error) => console.log(error),
      () => {
        this.modalService.dismissAll();
        this.toastr.warning("Type Token supprimé avec succès!", "Succès!");

        this.getAllTypeToken();
        this.deletedTokenId = undefined;
      }
    );
  }
}
