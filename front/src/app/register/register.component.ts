import { Component, Inject, OnInit } from '@angular/core';
import { ServerConnectService } from '../server-connect.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  public echo = "";
  constructor(@Inject(ServerConnectService) private server: ServerConnectService, @Inject(Router) private router:Router) { }
  nextpage(){
    this.router.navigate(['/login']);
  }
  ngOnInit() {
  }
  loginF(user,pass,fname,lname){
  this.echo = "Please wait";
  this.server.register(user.value,pass.value,fname.value,lname.value).subscribe(
    (data : any)=>{
      console.log(data);
      if(data.secsess){
        this.echo = "You redirect";
        this.nextpage();
      }
      else this.echo = "Login Fail";
      }
    )
  }
}