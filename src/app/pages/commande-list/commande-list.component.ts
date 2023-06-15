import { Observable } from "rxjs";
import { CommandeService } from "../../services/commande.service";
import { Commande } from "../../models/commande";
import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { TokenStorageService } from '../../services/token-storage.service';


@Component({
  selector: "app-commande-list",
  templateUrl: "./commande-list.component.html",
  styleUrls: ["./commande-list.component.css"]
})
export class CommandeListComponent implements OnInit {
  commandes: Observable<Commande[]>;

  constructor(private commandeService: CommandeService,private tokenStorageService: TokenStorageService,
    private router: Router) {}

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.commandes = this.commandeService.getCommandesList();
  }

  deleteCommande(id: number) {
    this.commandeService.deleteCommande(id)
      .subscribe(
        data => {
          console.log(data);
          this.reloadData();
        },
        error => console.log(error));
  }

  

  updateCommande(id: number){
    this.router.navigate(['update-commande', id]);
  }
}
