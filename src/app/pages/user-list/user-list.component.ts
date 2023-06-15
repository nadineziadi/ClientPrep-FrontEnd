import { Observable } from "rxjs";
import { UserService } from "../../services/user.service";
import { User } from "../../models/user";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { TokenStorageService } from "src/app/services/token-storage.service";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"],
})
export class UserListComponent implements OnInit {
  users: Observable<User[]>;
  user: User = new User();
  submitted = false;
  deletedUserId!: number;
  form_update_user: FormGroup;
  operation: string = "add";
  deletedCentreRechargeId!: number;
  usernames: String;
  usero: any;

  constructor(
    private userService: UserService,
    private router: Router,

    private modalService: NgbModal,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private tokenStorageService: TokenStorageService
  ) {
    this.form_update_user = this.formBuilder.group({
      username: ["", [Validators.required, Validators.minLength(3)]],
      telephone: ["", [Validators.required, Validators.maxLength(8)]],
    });
  }

  ngOnInit() {
    this.usero = this.tokenStorageService.getUser();
    this.getAllUsers();
  }

  getAllUsers() {
    this.users = this.userService.getUsersList();
  }
  get libelle() {
    return this.form_update_user.get("libelle");
  }
  get telephone() {
    return this.form_update_user.get("telephone");
  }

  reloadData() {
    this.users = this.userService.getUsersList();
  }

  getUser(id: number) {
    this.userService.getUser(id).subscribe(
      (data) => {
        console.log("res get ", data);
        this.user = data;
      },
      (error) => console.log(error)
    );
  }

  updateUser(id: number, contentUpdate) {
    this.operation = "update";
    //this.router.navigate(['update-user', id]);
    this.getUser(id);
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

  deleteUser(id: number, contentDelete) {
    this.modalService.open(contentDelete, {
      windowClass: "customModal",
      backdrop: "static",
      keyboard: false,
      centered: true,
    });
    this.deletedUserId = id;
  }

  confirmDeleteUser() {
    this.userService.deleteUser(this.deletedCentreRechargeId).subscribe(
      (data) => {},
      (error) => console.log(error),
      () => {
        this.modalService.dismissAll();
        this.toastr.warning("utilisateur supprimé avec succès!", "Succès!");

        this.getAllUsers();
        this.deletedCentreRechargeId = undefined;
      }
    );
  }

  cancelDeleteUser() {
    this.modalService.dismissAll();
    this.deleteUser = undefined;
  }

  blockUser(id: number) {
    this.userService.blockUser(id).subscribe((res) => {
      this.toastr.warning("Utilisateur bloqué ", "Succès");
      this.getAllUsers();
    });
  }

  unblockUser(id: number) {
    this.userService.unblockUser(id).subscribe((res) => {
      this.toastr.success("Utilisateur débloqué ", "Succès");
      this.getAllUsers();
    });
  }
}
