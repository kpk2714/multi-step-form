import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Service/auth.service';
import { Personal } from '../multi-step-registration/candidate-register-form/personal-details/personal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-one',
  templateUrl: './nav-one.component.html',
  styleUrls: ['./nav-one.component.css']
})
export class NavOneComponent implements OnInit {

  constructor(private http : HttpClient , private authService : AuthService , private router : Router){}

  personal : any = new Personal();

  ngOnInit(){

    const tokenId = this.authService.getToken();
    const headers = new HttpHeaders().set('Authorization',tokenId.toString());

    this.http.get('http://localhost:1010/getPersonal/id='+this.authService.getCurrentLoggedUser(),{headers}).subscribe({
      next : (data)=>{
        this.personal = data;
      },
      error : (error)=>{
        console.log(error);
      }
    });
  }

  showModal: boolean = false;

  openModal(): void {
    this.showModal = true;
  }

  onConfirm(result: boolean): void {
    this.showModal = false;
    if (result) {
      this.router.navigate(['/login'],{queryParams : {logout : true}});
    }
  }
}
