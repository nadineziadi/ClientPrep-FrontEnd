import { Component, OnInit } from "@angular/core";

import { TokenStorageService } from "../../services/token-storage.service";
import { Profile } from "../../models/profile";
import { ProfileService } from "../../services/profile.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { Gouvernorat } from "../../models/gouvernorat";
import { GouvernoratService } from "../../services/gouvernorat.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.css"],
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  submitted = false;

  role: string;
  profile: Profile = new Profile();
  form_Update_Profile: FormGroup;
  gouvernorats: Observable<Gouvernorat[]>;
  constructor(
    private profileService: ProfileService,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private gouvernoratService: GouvernoratService
  ) {
    this.form_Update_Profile = this.formBuilder.group({
      username: ["", [Validators.required, Validators.minLength(3)]],
      telephone: ["", [Validators.required, Validators.pattern(/^\d{8}$/)]],
      libelle: ["", [Validators.required, Validators.minLength(3)]],
      gouvernorat: ["", [Validators.required]],
    });
  }

  get username() {
    return this.form_Update_Profile.get("username");
  }
  get telephone() {
    return this.form_Update_Profile.get("telephone");
  }
  get libelle() {
    return this.form_Update_Profile.get("libelle");
  }
  get gouvernorat() {
    return this.form_Update_Profile.get("gouvernorat");
  }

  ngOnInit() {
    const user = this.tokenStorageService.getUser();
    this.role = user.role;
    this.getProfile();
    if (this.role == "ROLE_CLIENT") {
      this.libelle.setValidators([]);
      this.libelle.updateValueAndValidity();
      this.gouvernorat.setValidators([]);
      this.gouvernorat.updateValueAndValidity();
    }
    if (this.role == "ROLE_MARCHAND") {
      this.getAllGouvernerats();
    }
  }
  open(content) {
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
    this.profile.username = this.username.value;
    this.profile.telephone = this.telephone.value;

    if (this.role == "ROLE_MARCHAND") {
      this.profile.libelle = this.libelle.value;
      this.profile.gouvernorat.id = this.gouvernorat.value;
    }
    this.profileService.updateLoggedProfile(this.profile).subscribe(
      (data) => {
        this.toastr.success("Profile Updated Successfully", "Success");
      },
      (error) => console.log(error),
      () => {
        this.modalService.dismissAll();
        this.router.navigate(["login"]);
      }
    );
  }

  onSubmit() {
    this.submitted = true;
    if (this.form_Update_Profile.invalid) {
      return;
    }
    this.save();
  }

  getProfile() {
    this.profileService.getLoggedProfile().subscribe(
      (res) => {
        this.profile = res;
      },
      (error) => {
        console.error(error);
      },
      () => {
        this.username.setValue(this.profile.username);
        this.telephone.setValue(this.profile.telephone);
        if (this.role == "ROLE_MARCHAND") {
          this.libelle.setValue(this.profile.libelle);
          this.gouvernorat.setValue(this.profile.gouvernorat.id);
        }
      }
    );
  }
  getAllGouvernerats() {
    this.gouvernorats = this.gouvernoratService.getGouvernoratsList();
  }
}
