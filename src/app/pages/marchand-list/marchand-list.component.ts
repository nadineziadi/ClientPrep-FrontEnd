import { Observable } from "rxjs";

import { CentreRecharge } from "../../models/centreRecharge";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { MarchandInformations } from "src/app/models/marchandInformations";
import { Gouvernorat } from "src/app/models/gouvernorat";
import { GouvernoratService } from "src/app/services/gouvernorat.service";
import { TokenStorageService } from "src/app/services/token-storage.service";
import { Marchand } from "src/app/models/marchand";
import { UserService } from "src/app/services/user.service";
import { MarchandInfos } from "src/app/models/marchandInfos";

@Component({
  selector: "app-marchand-list",
  templateUrl: "./marchand-list.component.html",
  styleUrls: ["./marchand-list.component.css"],
})
export class MarchandListComponent implements OnInit {
  marchands: Observable<Marchand[]>;
  centrerecharge: CentreRecharge = new CentreRecharge();
  submitted = false;
  form_Add_Marchand: FormGroup;
  form_Update_Marchand: FormGroup;
  username: String;
  user: any;

  marchand: MarchandInformations = new MarchandInformations();
  marchandU: MarchandInfos = new MarchandInfos();
  gouvernorats: Observable<Gouvernorat[]>;

  operation: string = "add";
  deletedMarchandId!: number;
  constructor(
    private router: Router,
    private gouvernoratService: GouvernoratService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private tokenStorageService: TokenStorageService,
    private userService: UserService
  ) {
    this.form_Add_Marchand = this.formBuilder.group({
      libelle: ["", [Validators.required, Validators.minLength(3)]],
      telephone: ["", [Validators.required, Validators.minLength(8)]],
      login: ["", [Validators.required, Validators.minLength(3)]],
      password: ["", [Validators.required]],
      gouvernorat: ["", [Validators.required]],
    });

    this.form_Update_Marchand = this.formBuilder.group({
      libelleU: ["", [Validators.required, Validators.minLength(3)]],
      telephoneU: ["", [Validators.required, Validators.minLength(8)]],
      loginU: ["", [Validators.required, Validators.minLength(3)]],
      gouvernoratU: ["", [Validators.required]],
    });
  }

  ngOnInit() {
    this.user = this.tokenStorageService.getUser();
    this.getAllMarchands();
    this.getAllGouvernerats();
  }

  getAllMarchands() {
    this.marchands = this.userService.getAllMarchands();
  }

  get libelle() {
    return this.form_Add_Marchand.get("libelle");
  }
  get telephone() {
    return this.form_Add_Marchand.get("telephone");
  }
  get login() {
    return this.form_Add_Marchand.get("login");
  }
  get password() {
    return this.form_Add_Marchand.get("password");
  }
  get gouvernorat() {
    return this.form_Add_Marchand.get("gouvernorat");
  }

  get libelleU() {
    return this.form_Update_Marchand.get("libelleU");
  }
  get telephoneU() {
    return this.form_Update_Marchand.get("telephoneU");
  }
  get loginU() {
    return this.form_Update_Marchand.get("loginU");
  }
  get gouvernoratU() {
    return this.form_Update_Marchand.get("gouvernoratU");
  }

  getAllGouvernerats() {
    this.gouvernorats = this.gouvernoratService.getGouvernoratsList();
  }

  addNewMarchand(content) {
    this.operation = "add";
    this.username = this.user.username;

    this.marchand.gouvernorat = null;

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

  onSubmit() {
    this.submitted = true;
    if (this.operation == "add") {
      if (this.form_Add_Marchand.invalid) {
        return;
      }
      this.userService.addMarchand(this.marchand).subscribe(
        (data) => console.log(data),
        (error) => console.log(error),
        () => {
          this.toastr.success("Marchand ajouté avec succès!", "Succès!");

          this.submitted = false;
          this.marchand = new MarchandInformations();
          this.modalService.dismissAll();
          this.getAllMarchands();
        }
      );
    }

    if (this.operation == "update") {
      if (this.form_Update_Marchand.invalid) {
        return;
      }
      this.userService.updateMarchand(this.marchandU).subscribe(
        (data) => console.log(data),
        (error) => console.log(error),
        () => {
          this.toastr.success("Marchand modifié avec succès!", "Succès!");

          this.submitted = false;
          this.marchandU = new MarchandInfos();
          this.modalService.dismissAll();
          this.getAllMarchands();
        }
      );
    }
  }

  gotoList() {
    this.router.navigate(["/marchands"]);
  }

  getMarchand(id: number) {
    this.userService.getMarchand(id).subscribe(
      (data) => {
        console.log("marchand ", data);
        this.marchandU = data;
      },
      (error) => console.log(error)
    );
  }
  updateMarchand(id: number, contentUpdate: any) {
    this.operation = "update";
    //this.router.navigate(['update-typetoken', id]);
    this.getMarchand(id);
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

  deleteMarchand(id: number, contentDelete: any) {
    this.modalService.open(contentDelete, {
      windowClass: "customModal",
      backdrop: "static",
      keyboard: false,
      centered: true,
    });
    this.deletedMarchandId = id;
  }
  cancelDeleteMarchand() {
    this.modalService.dismissAll();
    this.deletedMarchandId = undefined;
  }

  confirmDeleteMarchand() {
    this.userService.deleteUser(this.deletedMarchandId).subscribe(
      (data) => {},
      (error) => console.log(error),
      () => {
        this.modalService.dismissAll();
        this.toastr.warning("Marchand supprimé avec succès!", "Succès!");

        this.getAllMarchands();
        this.deletedMarchandId = undefined;
      }
    );
  }
}
