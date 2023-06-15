import { Component, OnInit, HostListener, ViewChild, ElementRef } from "@angular/core";
import { UserService } from "../../services/user.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  @ViewChild('devenirmarchand',{ static: true }) devenirmarchand: ElementRef;

  isScrolled: boolean = false;

  @HostListener("window:scroll")
  onWindowScroll() {
    this.isScrolled = window.scrollY > 0;
  }

  scrollToSection(sectionId: string) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
