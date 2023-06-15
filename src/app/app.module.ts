import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { StatistiqueComponent} from "./pages/statistique/statistique.component";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./pages/login/login.component";
import { RegisterComponent } from "./pages/register/register.component";
import { HomeComponent } from "./pages/home/home.component";
import { ProfileComponent } from "./pages/profile/profile.component";
import { TypetokenListComponent } from "./pages/typetoken-list/typetoken-list.component";
import { TokenListComponent } from "./pages/token-list/token-list.component";
import { CompteurListComponent } from "./pages/compteur-list/compteur-list.component";
import { UserListComponent } from "./pages/user-list/user-list.component";
import { PanierListComponent } from "./pages/panier-list/panier-list.component";
import { CommandeListComponent } from "./pages/commande-list/commande-list.component";
import { MarchandListComponent } from "./pages/marchand-list/marchand-list.component";
import { VendreTicketComponent } from "./pages/vendre-ticket/vendre-ticket.component";
import { AuthInterceptor } from "./services/interceptor/auth.interceptor";
import { AdminLayoutComponent } from "./pages/admin-layout/admin-layout.component";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ToastrModule } from "ngx-toastr";
import { UserLayoutComponent } from "./pages/user-layout/user-layout.component";
import { MarchandLayoutComponent } from "./pages/marchand-layout/marchand-layout.component";
import { CommonModule } from "@angular/common";
import { HistoriqueVenteComponent } from "./pages/HistoriqueVente/HistoriqueVente.component";
import { PackComponent } from "./pages/pack/pack.component";
import { ISoldeComponent} from "./pages/i-solde/i-solde.component";
import { CommandeLoggedUserListComponent } from "./pages/commandeLoggedUser-list/commandeLoggedUser-list.component";

@NgModule({
  declarations: [
    StatistiqueComponent,
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    TypetokenListComponent,
    TokenListComponent,
    CompteurListComponent,
    UserListComponent,
    PanierListComponent,
    CommandeListComponent,
    CommandeLoggedUserListComponent,
    MarchandListComponent,
    VendreTicketComponent,
    AdminLayoutComponent,
    UserLayoutComponent,
    MarchandLayoutComponent,
    HistoriqueVenteComponent,
    PackComponent,
    ISoldeComponent,
  ],

  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
