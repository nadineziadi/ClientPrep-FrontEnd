import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { TransfertSolde } from "src/app/models/TransfertSolde";
import { SoldeService } from "src/app/services/solde.service";

@Component({
  selector: "app-porte-monnaie",
  templateUrl: "./i-solde.component.html",
  styleUrls: ["./i-solde.component.css"],
})
export class ISoldeComponent implements OnInit {
  monSolde: number = 0;
  transfertSolde: TransfertSolde = new TransfertSolde();
  form_Transfert: FormGroup;
  form_Alimenter: FormGroup;
  submittedTransfert: boolean = false;
  submittedAlimenter: boolean = false;
 
  constructor(
    private soldeService: SoldeService,
    private modalService: NgbModal,
    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {
    this.form_Transfert = this.formBuilder.group({
      telephone: ["", [Validators.required, Validators.pattern(/^\d{8}$/)]],
      somme: ["", [Validators.required, Validators.min(0)]],
    });

    this.form_Alimenter = this.formBuilder.group({
      montant: ["", [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit() {
    this.getMonSolde();
  }

  get montant() {return this.form_Alimenter.get('montant')}
  getMonSolde() {
    this.soldeService.getMonSolde().subscribe((res) => {
      this.monSolde = res;
    });
  }

  transferSolde(contentTransfert) {
    this.modalService
      .open(contentTransfert, {
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

  alimenterSolde(contentAlimenter) {
    this.modalService
      .open(contentAlimenter, {
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

  get telephone() {
    return this.form_Transfert.get("telephone");
  }
  get somme() {
    return this.form_Transfert.get("somme");
  }

  save() {
    this.submittedTransfert = true;
    if (this.form_Transfert.invalid) {
      return;
    }

    this.soldeService.createtransfertSolde(this.transfertSolde).subscribe(
      res => {
        if(!res.success)
        {
          this.toastr.warning(res.message, 'Erreur');
          this.modalService.dismissAll();
          this.submittedTransfert = false;
          this.transfertSolde = new TransfertSolde();
        } else {
          this.transfertSolde = new TransfertSolde();
          this.toastr.success("Transfert effectué!", "Succès!");
      
          this.modalService.dismissAll();
          this.submittedTransfert = false;
          this.getMonSolde();
        }
      } ,
      (error) => console.log(error)
    );
    //this.transfertsolde = new TransfertSolde();
 
  }

  alimenterMonSolde() {
    this.submittedAlimenter = true;
    if(this.form_Alimenter.invalid)
    {
      return;
    }
 
    this.soldeService.alimenterCompte(+this.form_Alimenter.value.montant).subscribe(
      (res) => {
        this.toastr.success(
          "Vous avez alimenter votre solde d'un montant de " + this.form_Alimenter.value.montant,
          "succès"
        );
      },
      (error) => {},
      () => {
        this.form_Alimenter.reset()
        this.modalService.dismissAll();
        this.getMonSolde();
        this.submittedAlimenter = false;
      }
    );
  }
}
