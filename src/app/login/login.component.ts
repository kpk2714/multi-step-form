import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from './user/user';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../Service/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router : Router, private http : HttpClient , private service : AuthService , 
              private activateRoute : ActivatedRoute){}

  tokenId!: String;
  
  
  ngOnInit(): void {
    this.activateRoute.queryParamMap.subscribe((queries)=>{
      const logout = Boolean(queries.get('logout'));
      console.log(logout);
      if(logout){
        this.service.logout();
        // alert('You are Logged Out . isLogged : '+this.service.isLogged);
      }
    });

    this.tokenId = this.service.getToken();
    
    if(this.tokenId!=null){
      console.log(this.tokenId);
      console.log(this.service.getCurrentLoggedUser());
      this.http.delete('http://localhost:1010/deleteToken/tokenId='+this.tokenId).subscribe({
        next : ()=>{
          console.log("Token is Deleted .");
        },
        error : (error)=>{
          console.log(error);
        }
      });
    }
  }

  user : User = new User();

  errorData : string = "";
  
  loginUser() {
    
    return this.http.post('http://localhost:1010/login',this.user).subscribe({
      next : (token : any)=>{
        this.router.navigate(['/pages/home']);
        this.service.setIsLoggedTrue();
        this.service.setCurrentLoggedUser(token);
      },
      error : (error)=>{
        if(error.error.message==='Previous Session is still active !!!'){
            this.errorData = "Previous Session is still active , wait for some time then try again !!!";
        }
        else{
            this.errorData = "Wrong Credentails !!!";
        }
        this.service.setIsLoggedFalse();
      }
    });
  }

  
}
