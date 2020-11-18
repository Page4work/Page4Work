import { Component, OnInit,Inject } from "@angular/core";
import { Router } from "@angular/router";
import { ServerConnectService } from "../server-connect.service";
import { Login } from "../login";
import { CookieService } from "ngx-cookie-service";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  public echo = "";
  constructor(
    @Inject(Router) private router: Router,
    @Inject(ServerConnectService) private server: ServerConnectService,
    @Inject(CookieService) private cookieService: CookieService
  ) {}
  nextpage() {
    this.router.navigate(["/selectWorkPage"]);
  }
  loginF(user, pass) {
    this.echo = "Verifies details...";
    console.log(this.router)
    this.server.login(user.value, pass.value).subscribe((data: Login) => {
      if (data.secsess) {
        this.echo = "You redirect";
        this.cookieService.set("Token", data.token);
        this.nextpage();
      } else this.echo = "Login Fail";
    });
  }
  ngOnInit() {}
}
