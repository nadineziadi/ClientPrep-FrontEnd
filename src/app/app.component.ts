import { Component, OnInit } from "@angular/core";
import { TokenStorageService } from "./services/token-storage.service";
import { SoldeService } from "./services/solde.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  private role: string = "";
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  showSimpleUserBoard = false;
  username: string;
  telephone: string;
  valeurSolde: string;

  listSolde = true;
  constructor(
    private tokenStorageService: TokenStorageService,
    private soldeService: SoldeService
  ) {}

  ngOnInit() {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();

      this.role = user.role;

      this.showAdminBoard = this.role == "ROLE_ADMIN";
      this.showModeratorBoard = this.role == "ROLE_MARCHAND";
      this.showSimpleUserBoard = this.role == "ROLE_CLIENT";

      this.username = user.username;
      this.telephone = user.telephone;
    }
  }

  logout() {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
