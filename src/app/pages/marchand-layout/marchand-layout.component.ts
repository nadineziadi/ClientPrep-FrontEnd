import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: "app-marchand-layout",
  templateUrl: "./marchand-layout.component.html",
  styleUrls: ["./marchand-layout.component.css"],
})
export class MarchandLayoutComponent implements OnInit {
  constructor(private modalService: NgbModal) {}

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
