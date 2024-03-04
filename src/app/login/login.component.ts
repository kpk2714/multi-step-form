import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router : Router){}

  loginHidden : String = "inline";


  navigateTOHome() : void{
    this.router.navigate(['/pages/home']);
    this.loginHidden = "hidden";
  }
}
