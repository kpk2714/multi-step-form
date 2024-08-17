import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../candidate-register-form/sharedService/service.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from 'src/app/Service/auth.service';
import { Personal } from '../candidate-register-form/personal-details/personal';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  time : any = new Date().getHours();

  width : any;

  personal : any= new Personal();

  constructor(private http : HttpClient , private authService : AuthService , private toastr : ToastrService , private router : Router){}

  ngOnInit(): void {

      const tokenId = this.authService.getToken();
      const headers = new HttpHeaders().set('Authorization',tokenId);

      this.http.get('http://localhost:1010/getWidth/userId='+this.authService.getCurrentLoggedUser(),{headers}).subscribe({
        next : (data)=>{
          this.width = data;
        },
        error : (error)=>{
          if(error.error.message==='Token Expired !!!'){
            this.toastr.warning('Token Expired !!!','Warning' , {timeOut : 2000 , positionClass : 'toast-top-center' , progressBar : true , closeButton : true});
            this.router.navigate(['/login']);
          }
        }
      });

      this.http.get('http://localhost:1010/getPersonal/id='+this.authService.getCurrentLoggedUser(),{headers}).subscribe((data)=>{
        this.personal = data;
      })
  }

  pendingForm : String = "hidden";

  pendingFormDesign : String = "false";

  activeFormDesign : String = "false";


  pendingFormStatus(){
    this.pendingForm = "inline-block";
    this.activeForm = "hidden";

    this.pendingFormDesign = "true";
    this.activeFormDesign = "false";
  }

  activeForm : String = "hidden";

  activeFormStatus(){
    this.activeForm = "inline-block";
    this.pendingForm = "hidden";

    this.activeFormDesign = "true";
    this.pendingFormDesign = "false";
  }

  optionalSpace : String = "inline-block";
}
