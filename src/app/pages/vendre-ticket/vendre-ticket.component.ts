import { Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { Ticket } from "../../models/ticket";
import { Typetoken } from "../../models/typetoken";
import { Compteur } from "../../models/compteur";
import { TypetokenService } from "../../services/typetoken.service";
import { TicketService } from "../../services/ticket.service";
import { TokenStorageService } from "../../services/token-storage.service";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { PackService } from "src/app/services/pack.service";
import { Pack } from "src/app/models/Pack";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-vendre-ticket",
  templateUrl: "./vendre-ticket.component.html",
  styleUrls: ["./vendre-ticket.component.css"],
})
export class VendreTicketComponent implements OnInit {
  ticket: Ticket = new Ticket();
  typetokens: Observable<Typetoken[]>;
  packs: Observable<Pack[]>;
  pack: Pack = new Pack();

  submitted = false;
  username: string;
  serial: number;

  numCompteur: string;

  @ViewChild("contentSell", { static: true })
  private contentSell: TemplateRef<any>;
  successSell: boolean = false;
  formVente:FormGroup;
  constructor(
    private ticketService: TicketService,
    private typetokenService: TypetokenService,
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private modalService: NgbModal,
    private packservice: PackService,
    private toastr: ToastrService,
    private fb:FormBuilder
  ) {}

  ngOnInit() {
    this.formVente = this.fb.group({
      prix:['null' , Validators.required],
      compteur:[Validators.required, Validators.pattern(/^c-\d{5}$/)]
    })
    this.reloadData();
  }

  get prix() {return this.formVente.get('prix')};
  get compteur() {return this.formVente.get('compteur')};
  reloadData() {
    this.typetokens = this.typetokenService.getTypetokensByUserList();
    const user = this.tokenStorageService.getUser();
    this.username = user.username;
  }

  newTicket(): void {
    this.submitted = false;
    this.ticket = new Ticket();
  }


  onSubmit() {
    this.submitted = true;
    if(this.formVente.invalid)
    {
      return
    }
    this.modalService.open(this.contentSell, {
      windowClass: "customModal",
      backdrop: "static",
      keyboard: false,
      centered: true,
    });
    //this.confirmVendreTicket();
  }

  getRndLong(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  cancelVendre() {
    this.modalService.dismissAll();
  }

  confirmVendreTicket() {
    this.serial = this.getRndLong(10000000000000, 100000000000000);
    this.ticketService
      .ticketrwithLoggedcentreTicket(this.serial, this.ticket)
      .subscribe(
        (res) => {
            if(!res.success)
            {
              this.toastr.warning(res.message, "Echec!");
            } else {
              this.toastr.success("ticket vendre avec succées!", "Succès!");
              this.successSell = true;
            }
        },
        (error) => console.log(error),
        () => {
          this.modalService.dismissAll();
         
          this.ticket = new Ticket();
          this.submitted = false;
        }
      );

    // this.router.navigate(['tickets', this.serial, this.numCompteur]);
  }
}
