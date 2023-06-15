import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  form: any = {};
  isSuccessful = false;

  errorMessage = "";

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}

  onSubmit() {
    this.authService.register(this.form).subscribe(
      (data) => {
        console.log(data);
        this.isSuccessful = true;

        this.toastr.success("Inscription effectuée", "Succès");
        this.router.navigate(["/login"]);
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.toastr.warning("Inscription echoué" + this.errorMessage, "Echec");
      }
    );
  }
}
