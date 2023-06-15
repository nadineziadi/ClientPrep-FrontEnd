import { Observable } from "rxjs";

import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { PackService } from "../../services/pack.service";
import { TokenStorageService } from "../../services/token-storage.service";
import { Pack } from "../../models/Pack";

@Component({
  selector: "app-pack",
  templateUrl: "./pack.component.html",
  styleUrls: ["./pack.component.css"],
})
export class PackComponent implements OnInit {
  packs: Observable<Pack[]>;
  username: string;

  constructor(
    private packService: PackService,
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    const user = this.tokenStorageService.getUser();

    this.username = user.username;
    console.log(this.username);
    this.packs = this.packService.getPacksMarchand();
  }
}
