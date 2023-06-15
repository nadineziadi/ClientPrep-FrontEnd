import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { SoldeService } from "src/app/services/solde.service";

@Component({
  selector: "app-user-layout",
  templateUrl: "./user-layout.component.html",
  styleUrls: ["./user-layout.component.css"],
})
export class UserLayoutComponent implements OnInit {
  constructor(
    private soldeService: SoldeService,
    private modalService: NgbModal,
    private toster: ToastrService
  ) {}

  ngOnInit() {
    const scriptElement = document.createElement("script");
    scriptElement.textContent = `
    let card = document.querySelector(".card"); //declearing profile card element
    let displayPicture = document.querySelector(".display-picture"); //declearing profile picture
    
    displayPicture.addEventListener("click", function() { //on click on profile picture toggle hidden class from css
    card.classList.toggle("hidden")})
    `;

    document.head.appendChild(scriptElement);
  }

  logout() {}
  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: "modal-basic-title" })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }
}
