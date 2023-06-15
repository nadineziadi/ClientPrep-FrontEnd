import { TokenLoggedUser } from "../../models/tokenLoggedUser";

import { Observable } from "rxjs";
import { TokenService } from "../../services/token.service";
import { Token } from "../../models/token";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TokenStorageService } from "../../services/token-storage.service";
import { Compteur } from "../../models/compteur";
import { CompteurService } from "../../services/compteur.service";
import { TypetokenService } from "../../services/typetoken.service";
import { Typetoken } from "../../models/typetoken";


@Component({
  selector: "app-token-list",
  templateUrl: "./token-list.component.html",
  styleUrls: ["./token-list.component.css"],
})
export class TokenListComponent implements OnInit {
  tokens: Observable<Token[]>;

  token: Token = new Token();
  compteurs: Observable<Compteur[]>;
  typetokens: Observable<Typetoken[]>;
  submitted = false;
  form_Add_Token: FormGroup;
  form_Update_Token: FormGroup;
  operation: string = "add";
  deletedTokenId!: number;

  username: string;
  user: any;

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private tokenStorageService: TokenStorageService,
    private tokenService: TokenService,
    private compteurService: CompteurService,

    private typetokenService: TypetokenService,
  
  ) {}

  ngOnInit() {
    this.user = this.tokenStorageService.getUser();
    this.getTokenList();
    this.getUserCompteurs();
    this.getTypeTokensByUser();
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }
  getTokenList() {
    this.tokens = this.tokenService.getClientTokenList();
  }

  getToken(id: number) {
    this.tokenService.getToken(id).subscribe(
      (data) => {
        this.token = data;
      },
      (error) => console.log(error)
    );
  }
  getUserCompteurs() {
    this.compteurs = this.compteurService.getCompteursByClient();
  }

  getTypeTokensByUser() {
    this.typetokens = this.typetokenService.getTypetokensByUserList();
  }

  deleteToken(id: number, contentDelete) {
    this.modalService.open(contentDelete, {
      windowClass: "customModal",
      backdrop: "static",
      keyboard: false,
      centered: true,
    });
    this.deletedTokenId = id;
  }

  c;
  cancelDeleteToken() {
    this.modalService.dismissAll();
    this.deletedTokenId = undefined;
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

  save() {
    if (this.operation == "add") {
      this.tokenService.createToken(this.token).subscribe(
        (data) => console.log(data),
        (error) => console.log(error),
        () => {
          this.toastr.success("token ajouté avec succès!", "Succès!");

          this.submitted = false;
          this.token = new Token();
          this.modalService.dismissAll();
          this.getTokenList();
        }
      );
    } else {
      this.tokenService.updateToken(this.token).subscribe(
        (data) => console.log(data),
        (error) => console.log(error),
        () => {
          this.toastr.success("token modifié avec succès!", "Succès!");

          this.submitted = false;
          this.token = new Token();
          this.modalService.dismissAll();
          this.getTokenList();
        }
      );
    }
  }

  updateToken(id: number, contentUpdate) {
    this.operation = "update";
    //this.router.navigate(['update-compteur', id]);
    this.getToken(id);
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

  confirmDeleteToken() {
    this.tokenService.deleteToken(this.deletedTokenId).subscribe(
      (data) => {},
      (error) => console.log(error),
      () => {
        this.modalService.dismissAll();
        this.toastr.warning("Token supprimé avec succès!", "Succès!");

        this.getTokenList();
        this.deletedTokenId = undefined;
      }
    );
  }
}
