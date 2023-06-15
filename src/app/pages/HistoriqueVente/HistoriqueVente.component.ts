import { Ticket } from "../../models/ticket";
import { Observable } from "rxjs";

import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TicketService } from "../../services/ticket.service";
import { TokenStorageService } from "../../services/token-storage.service";

@Component({
  selector: "app-HistoriqueVente",
  templateUrl: "./HistoriqueVente.component.html",
  styleUrls: ["./HistoriqueVente.component.css"],
})
export class HistoriqueVenteComponent implements OnInit {
  tickets: Observable<Ticket[]>;
  username: string;

  constructor(
    private tokenStorageService: TokenStorageService,
    private ticketService: TicketService,
    private router: Router
  ) {}

  ngOnInit() {
    const user = this.tokenStorageService.getUser();
    this.username = user.username;

    this.reloadData(this.username);
  }

  reloadData(username: string) {
    this.tickets = this.ticketService.getTicketsMarchand();
  }

  deleteTicket(id: number) {
    this.ticketService.deleteTicket(id).subscribe(
      (data) => {
        console.log(data);
        this.reloadData(this.username);
      },
      (error) => console.log(error)
    );
  }

  updateTicket(id: number) {
    this.router.navigate(["update-ticket", id]);
  }
}
